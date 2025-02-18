import BaseTable, { TableHeadType, TableRowType } from '@/components/BaseTable';
import HeaderTabs from '@/components/HeaderTabs';
import LoadingOverlay from '@/components/LoadingOverlay';
import { PaginationProps } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { apiURL, messageTabs } from '@/constants';
import { useGetSettings } from '@/hooks/useGetSettings';
import { useAppStore } from '@/store';
import { AccessHistoryGetParams, AccessHistoryResponse, MessageRoomItemType } from '@/types';
import { MESSAGE_TOKEN_API_TABS } from '@/types/enums';
import { Edit, Plus, RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import WriteRoomModal from './WriteRoomModal';

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

  const { data, isLoading, refetch } = useGetSettings<AccessHistoryResponse<MessageRoomItemType[]>, AccessHistoryGetParams>(
    tabSelected === MESSAGE_TOKEN_API_TABS.USERS ? apiURL.messageTokenApi.users.list : apiURL.messageTokenApi.rooms.list,
    { page: paging.currentPage, limit: paging.pageLimit, keyword },
    { enabled: false },
  );

  useEffect(() => {
    if (data && data.success && data.rows) {
      setList(data.rows);
      setPaging((prev) => ({ ...prev, totalPages: data.attr.maxpage }));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [paging.currentPage, paging.pageLimit, triggerRefresh, keyword, tabSelected]);

  const heads: TableHeadType[] = [
    { content: t('approval_messenger_history_col_id'), className: 'w-[10%]' },
    { content: t('approval_messenger_history_col_name') },
    { content: t('approval_messenger_history_col_accesstime') },
    { content: t('approval_messenger_history_col_useragent') },
    { content: t('approval_messenger_history_col_ip') },
    { content: t('approval_messenger_history_col_status') },
  ];

  // rooms
  const headsRooms: TableHeadType[] = [
    { content: t('admin_messenger_token_api_room_name') },
    { content: t('admin_messenger_token_api_room_key') },
    { content: t('admin_messenger_token_api_token') },
    { content: t('messenger_history_backup_status') },
    { content: '', className: 'w-[10%]' },
  ];

  const rows: TableRowType[] = useMemo(() => {
    return list.map((user) => ({
      className: '',
      columns: [
        { content: user.room_name },
        { content: user.room_key },
        { content: user.token },
        { content: user.use },
        {
          content: (
            <>
              <Edit className='w-5 text-slate-700 cursor-pointer' />
            </>
          ),
        },
      ],
    }));
  }, [list]);

  const footer = <div className='h-full flex items-center'>{`${t('common_total')} ${data?.attr?.total}`}</div>;

  return (
    <div className='h-full flex flex-col gap-6'>
      <HeaderTabs tabs={messageTabs} onTabSelected={setTabSelected} />
      {isLoading && <LoadingOverlay />}
      <BaseTable
        isSearch
        isPagination
        rows={rows}
        heads={tabSelected === MESSAGE_TOKEN_API_TABS.USERS ? heads : headsRooms}
        footer={footer}
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
            <Button variant={'secondary'} className='px-3 ' onClick={() => {}}>
              <RefreshCcw />
            </Button>
            <Button variant={'default'} className='px-3 ' onClick={() => setOpenWriteRoom(true)}>
              <Plus />
            </Button>
          </div>
        }
      />

      {openWriteRoom && <WriteRoomModal open={openWriteRoom} onClose={() => setOpenWriteRoom(false)} />}
    </div>
  );
};

export default MessageTokenApi;
