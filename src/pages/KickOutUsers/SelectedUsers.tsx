import AlertDialog, { AlertDialogProps } from '@/components/AlertDialog';
import EmptyData from '@/components/EmptyData';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiURL, typograhyClass } from '@/constants';
import { useGetSettings } from '@/hooks/useGetSettings';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { SelectedOrgItem, SelectedOrgItemList } from '@/types/';
import { BaseResponse } from '@/types/api';
import { isEmpty } from 'lodash';
import { Trash2, User as UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type SaveKickOutParamsType = {
  usercn: string;
  userno: string;
  userid: string;
};

interface SelectedUsersProps {
  data: SelectedOrgItemList;
}

const SelectedUsers = ({ data }: SelectedUsersProps) => {
  const { t } = useTranslation();

  const [items, setItems] = useState<SelectedOrgItemList>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [alertData, setAlertData] = useState<Omit<AlertDialogProps, 'setOpen'>>({
    open: false,
    title: '',
    content: '',
  });

  const { data: userData, isLoading } = useGetSettings<BaseResponse<SelectedOrgItem[]>>(apiURL.kickOutUsers.list);

  const { mutate, isLoading: isSaveLoading } = useUpdateSettings<BaseResponse<any>, { users: SaveKickOutParamsType[] }>(
    apiURL.kickOutUsers.saveKickOutUsers,
  );

  useEffect(() => {
    if (userData && userData.success) {
      let nItems: SelectedOrgItemList = {};
      userData.rows?.forEach((row) => {
        nItems[row.seqno as string] = { ...row, key: row.seqno };
      });
      setItems(nItems);
    }
  }, [userData]);

  useEffect(() => {
    const nItems = { ...items };
    Object.values(data).forEach((item) => {
      if (!nItems.hasOwnProperty(item.key as string)) {
        nItems[item.key as string] = item;
      }
    });
    setItems(nItems);
  }, [data]);

  const handleSave = () => {
    const params = Object.values(items).map((item) => ({
      usercn: item.cn as string,
      userno: item.userno as string,
      userid: item.id as string,
    }));
    mutate(
      { users: params },
      {
        onSuccess: (res) => {
          if (res && res.success) {
            setAlertData({ open: true, title: t('alert_success_msg'), content: res.msg || '' });
          }
        },
      },
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(() => (checked ? Object.values(items).map((item) => item.key as string) : []));
  };

  const handleSelectItem = (checked: boolean, val: string) => {
    setSelected((prev) => {
      if (checked) {
        const nSelected = [...prev];
        nSelected.push(val);
        return nSelected;
      } else {
        return [...prev].filter((item) => item !== val);
      }
    });
  };

  const renderUserList = () => {
    return (
      <div className='h-full flex flex-col text-sm'>
        <div className='px-4 border-b bg-slate-100 flex justify-between items-center'>
          <div className='h-12 flex gap-2 items-center'>
            <Input
              id='select-all'
              type='checkbox'
              className='w-4 h-4 cursor-pointer'
              onChange={(e) => handleSelectAll(e.target.checked)}
              checked={Object.values(items).every((item) => selected.includes(item.key as string))}
            />
            <label htmlFor='select-all' className='cursor-pointer'>
              {t('timecard_time_checkall_msg')}
            </label>
          </div>
          {selected.length > 0 && (
            <Trash2
              className='w-5 h-5 text-slate-500 cursor-pointer'
              onClick={() => {
                const nItems = { ...items };
                selected.forEach((key) => {
                  delete nItems[key];
                });
                setItems(nItems);
                setSelected([]);
              }}
            />
          )}
        </div>

        <div className={`h-[calc(100%-48px)] py-3 flex flex-col overflow-y-auto ${typograhyClass.scrollBarStyles}`}>
          <div>
            {Object.values(items).map((item) => (
              <div key={item.key} className='h-[30px] px-4 flex gap-2 items-center hover:bg-slate-50'>
                <Input
                  type='checkbox'
                  className='w-4 h-4 cursor-pointer'
                  id={`select-${item.key}`}
                  checked={selected.includes(item.key as string)}
                  onChange={(e) => handleSelectItem(e.target.checked, item.key as string)}
                />
                <label htmlFor={`select-${item.key}`} className='w-full cursor-pointer truncate'>
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='w-full h-full bg-white border rounded-2xl overflow-hidden flex flex-col'>
        <div className='px-4 h-[50px] bg-slate-700 text-white flex items-center gap-2 font-semibold'>
          <UserIcon />
          {t('holiday_adminreg_menu')}
        </div>
        <div className='h-[calc(100%-100px)]'>{isLoading ? <Loader /> : <>{isEmpty(items) ? <EmptyData /> : <>{renderUserList()}</>}</>}</div>
        <div className='h-[50px] flex border-t border-slate-200 bg-slate-100 justify-center items-center gap-3 py-2'>
          <Button variant={'default'} className='w-[80px]' size={'sm'} onClick={handleSave} disabled={isSaveLoading}>
            {t('common_save_msg')}
          </Button>
          <Button
            size={'sm'}
            variant={'secondary'}
            className='w-[80px]'
            disabled={isSaveLoading}
            onClick={() => {
              setItems({});
              setSelected([]);
            }}
          >
            {t('common_reset')}
          </Button>
        </div>
      </div>

      {alertData.open && (
        <AlertDialog
          open={alertData.open}
          title={alertData.title}
          content={alertData.content}
          setOpen={(val) => setAlertData((prev) => ({ ...prev, open: val }))}
        />
      )}
    </>
  );
};

export default SelectedUsers;
