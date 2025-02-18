import BaseTable, { TableHeadType, TableRowType } from '@/components/BaseTable';
import HeaderTabs from '@/components/HeaderTabs';
import LoadingOverlay from '@/components/LoadingOverlay';
import { PaginationProps } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { apiURL, messageTabs } from '@/constants';
import { useGetSettings } from '@/hooks/useGetSettings';
import { useAppStore } from '@/store';
import { AccessHistoryGetParams, AccessHistoryResponse, MessageRoomItemType } from '@/types';
import { MESSAGE_TOKEN_API_TABS, WRITE_MODE } from '@/types/enums';
import { Edit, Plus, RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import WriteRoomModal from './WriteRoomModal';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { BaseResponse } from '@/types/api';
import useAlert from '@/hooks/useAlert';
import WriteUserModal from './WriteUserModal';
import { Input } from '@/components/ui/input';
import UseStatus from './UseStatus';

const MessageTokenApi = () => {
  const { t } = useTranslation();

  const { triggerRefresh } = useAppStore();

  const [tabSelected, setTabSelected] = useState<MESSAGE_TOKEN_API_TABS>(MESSAGE_TOKEN_API_TABS.USERS);
  const [list, setList] = useState<MessageRoomItemType[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [paging, setPaging] = useState<PaginationProps>({
    totalPages: 0,
    currentPage: 1,
    pageLimit: 20,
  });

  const [openWriteRoom, setOpenWriteRoom] = useState(false);
  const [openWriteUser, setOpenWriteUser] = useState(false);
  const [writeFormData, setWriteFormData] = useState<any>(null);
  const [userSelected, setUserSelected] = useState<string[]>([]);

  const [DeleteConfirm, confirm] = useAlert(t('approval_memo_warning_delete'));

  const { data, isLoading, refetch } = useGetSettings<AccessHistoryResponse<MessageRoomItemType[]>, AccessHistoryGetParams>(
    tabSelected === MESSAGE_TOKEN_API_TABS.USERS ? apiURL.messageTokenApi.users.list : apiURL.messageTokenApi.rooms.list,
    { page: paging.currentPage, limit: paging.pageLimit, keyword },
    { enabled: false },
  );

  const { mutate: updateUserStatus, isLoading: isLoadingUserStatus } = useUpdateSettings<BaseResponse, any>(apiURL.messageTokenApi.users.update);
  const { mutate: updateRoomStatus, isLoading: isLoadingRoomStatus } = useUpdateSettings<BaseResponse, any>(apiURL.messageTokenApi.rooms.update);

  const handleUpdateStatus = (item: MessageRoomItemType, val: string, type: MESSAGE_TOKEN_API_TABS) => {
    if (type === MESSAGE_TOKEN_API_TABS.USERS) {
      const params = {
        apiuserno: item.apiuserno,
        use: val,
      };
      updateUserStatus(params, {
        onSuccess: (res) => {
          if (res && res.success) {
            refetch();
          }
        },
      });
    } else {
      const params = {
        apiroomno: item.apiroomno,
        use: val,
      };
      updateRoomStatus(params, {
        onSuccess: (res) => {
          if (res && res.success) {
            refetch();
          }
        },
      });
    }
  };

  useEffect(() => {
    if (data && data.success && data.rows) {
      setList(data.rows);
      setPaging((prev) => ({ ...prev, totalPages: data.attr.maxpage }));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [paging.currentPage, paging.pageLimit, triggerRefresh, keyword, tabSelected]);

  // rooms
  const heads: TableHeadType[] =
    tabSelected === MESSAGE_TOKEN_API_TABS.USERS
      ? [
          {
            className: 'w-[10%]',
            content:
              list.length > 0 ? (
                <Input
                  type='checkbox'
                  className='w-5 h-5 cursor-pointer ml-2'
                  checked={list.length > 0 && list.every((item) => userSelected.includes(item.apiuserno))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUserSelected(() => list.map((item) => item.apiuserno));
                    } else {
                      setUserSelected([]);
                    }
                  }}
                />
              ) : (
                <div className='w-2'></div>
              ),
          },
          { content: t('manager_username') },
          { content: t('messenger_history_backup_status') },
          { content: '', className: 'w-[10%]' },
        ]
      : [
          { content: t('admin_messenger_token_api_room_name') },
          { content: t('admin_messenger_token_api_room_key') },
          { content: t('admin_messenger_token_api_token') },
          { content: t('messenger_history_backup_status') },
          { content: '', className: 'w-[10%]' },
        ];

  const rows: TableRowType[] = list.map((user) =>
    tabSelected === MESSAGE_TOKEN_API_TABS.ROOMS
      ? {
          className: '',
          columns: [
            { content: user.room_name },
            { content: user.room_key },
            { content: user.token },
            { content: <UseStatus value={user.use} onChange={(val) => handleUpdateStatus(user, val, MESSAGE_TOKEN_API_TABS.ROOMS)} /> },
            {
              content: (
                <div
                  onClick={() => {
                    setOpenWriteRoom(true);
                    setWriteFormData(user);
                  }}
                >
                  <Edit className='w-5 text-slate-700 cursor-pointer' />
                </div>
              ),
            },
          ],
        }
      : {
          className: '',
          columns: [
            {
              className: 'w-[10%]',
              content: (
                <Input
                  type='checkbox'
                  className='w-5 h-5 cursor-pointer ml-2'
                  checked={userSelected.includes(user?.apiuserno)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUserSelected((prev) => {
                        const nData = [...prev];
                        nData.push(user.apiuserno);
                        return nData;
                      });
                    } else {
                      setUserSelected((prev) => [...prev].filter((item) => item !== user.apiuserno));
                    }
                  }}
                />
              ),
            },
            { content: user.username as string },
            { content: <UseStatus value={user.use} onChange={(val) => handleUpdateStatus(user, val, MESSAGE_TOKEN_API_TABS.USERS)} /> },
            {
              content: (
                <div
                  onClick={() => {
                    setOpenWriteUser(true);
                    setWriteFormData(user);
                  }}
                >
                  <Edit className='w-5 text-slate-700 cursor-pointer' />
                </div>
              ),
            },
          ],
        },
  );

  const footer = <div className='h-full flex items-center'>{`${t('common_total')} ${data?.attr?.total}`}</div>;

  const { mutate: mDelete, isLoading: isDeleting } = useUpdateSettings<BaseResponse, any>(apiURL.messageTokenApi.users.delete);

  const handleDelete = async () => {
    const ans = await confirm({ title: t('common_delete_msg') });
    if (!ans) return;
    mDelete(
      { apiusernos: userSelected },
      {
        onSuccess: (res) => {
          if (res && res.success) {
            setUserSelected([]);
            refetch();
          }
        },
      },
    );
  };

  return (
    <div className='h-full flex flex-col gap-6'>
      <HeaderTabs
        tabs={messageTabs}
        onTabSelected={(tab) => {
          setTabSelected(tab);
          setList([]);
        }}
      />
      {(isLoading || isLoadingUserStatus || isLoadingRoomStatus) && <LoadingOverlay />}
      <BaseTable
        isSearch
        isPagination
        rows={rows}
        heads={heads}
        footer={footer}
        onDelete={handleDelete}
        isDelete={userSelected.length > 0}
        searchProps={{
          isSearchByEnter: true,
          onChange: (val) => {
            setKeyword(val);
            setPaging((prev) => ({ ...prev, currentPage: 1 }));
          },
        }}
        paginationProps={{
          ...paging,
          onPageChange: (page) => setPaging((prev) => ({ ...prev, currentPage: page })),
          onPageLimitChange: (limit) => setPaging((prev) => ({ ...prev, pageLimit: limit, currentPage: 1 })),
        }}
        headerRightButton={
          <div className='flex gap-2 '>
            <Button variant={'secondary'} className='px-3 ' onClick={refetch}>
              <RefreshCcw />
            </Button>
            <Button
              variant={'default'}
              className='px-3 '
              onClick={() => (tabSelected === MESSAGE_TOKEN_API_TABS.USERS ? setOpenWriteUser(true) : setOpenWriteRoom(true))}
            >
              <Plus />
            </Button>
          </div>
        }
      />

      {openWriteRoom && (
        <WriteRoomModal
          value={writeFormData}
          open={openWriteRoom}
          mode={!!writeFormData ? WRITE_MODE.UPDATE : WRITE_MODE.ADD}
          onClose={(success) => {
            setOpenWriteRoom(false);
            setWriteFormData(null);
            if (success) refetch();
          }}
        />
      )}

      {openWriteUser && (
        <WriteUserModal
          value={writeFormData}
          open={openWriteUser}
          mode={!!writeFormData ? WRITE_MODE.UPDATE : WRITE_MODE.ADD}
          onClose={(success) => {
            setOpenWriteUser(false);
            setWriteFormData(null);
            if (success) refetch();
          }}
        />
      )}

      <DeleteConfirm />
    </div>
  );
};

export default MessageTokenApi;
