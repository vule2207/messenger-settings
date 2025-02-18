import AlertDialog, { AlertDialogProps } from '@/components/AlertDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { typograhyClass } from '@/constants';
import { SelectedOrgItemList } from '@/types/';
import { Trash2, User as UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SelectedUsersProps {
  data: SelectedOrgItemList;
  onClose: () => void;
  onSave: (vals: SelectedOrgItemList) => void;
}

const SelectedUsers = ({ data, onClose, onSave }: SelectedUsersProps) => {
  const { t } = useTranslation();

  const [items, setItems] = useState<SelectedOrgItemList>({});
  const [selected, setSelected] = useState<string[]>([]);

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
    onSave && onSave(items);
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
              checked={Object.values(items).length > 0 && Object.values(items).every((item) => selected.includes(item.key as string))}
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
                  {`${item.fulldept}/${item.username || item.long_name || item.name}`}
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
        <div className='h-[calc(100%-100px)]'>{renderUserList()}</div>
        <div className='h-[50px] flex border-t border-slate-200 bg-slate-100 justify-center items-center gap-3 py-2'>
          <Button variant={'default'} className='w-[80px]' size={'sm'} onClick={handleSave}>
            {t('common_save_msg')}
          </Button>
          <Button size={'sm'} variant={'secondary'} className='w-[80px]' onClick={onClose}>
            {t('common_close_msg')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SelectedUsers;
