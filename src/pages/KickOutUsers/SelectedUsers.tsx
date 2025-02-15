import { Button } from '@/components/ui/button';
import { Trash2, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserType } from '@/types/';
import useUniqueSet from '@/hooks/useUniqueSet';
import EmptyData from '@/components/EmptyData';
import { Input } from '@/components/ui/input';

const sample: UserType[] = [
  {
    key: '102_7215_103423',
    title: 'Le Vu - 이수태 (회계)',
    groupno: '7215',
    cn: '102',
    groupname: 'ViewGroup',
    userno: '103423',
    id: 'vult',
    email: 'vult@global.hanbiro.com',
    mobile: '',
    position: '회계',
    rankno: '7470',
    ishead: '0',
    username: 'Le Vu - 이수태',
    duty: '',
    dutyno: '36',
    fullname: 'Le Vu - 이수태',
    fulldept: 'ViewGroup',
    long: 'Le Vu - 이수태 ()',
    seqno: '102_103423',
    fax: '',
    baseGroup: '7215',
    name: 'Le Vu - 이수태 (회계)',
  },
  {
    key: '102_7215_103572',
    title: 'GGGGG 1 ',
    groupno: '7215',
    cn: '102',
    groupname: 'ViewGroup',
    userno: '103572',
    id: 'gggg1',
    email: 'gggg1@global.hanbiro.com',
    mobile: '',
    position: '',
    rankno: '7620',
    ishead: '0',
    username: 'GGGGG 1',
    duty: '',
    dutyno: '36',
    fullname: 'GGGG 1',
    fulldept: 'ViewGroup',
    long: 'GGGG ()',
    seqno: '102_103572',
    fax: '',
    baseGroup: '7215',
    name: 'GGGGG 1 ',
  },
  {
    key: '102_7215_102496',
    title: 'Ngo Luu 17 ',
    groupno: '7215',
    cn: '102',
    groupname: 'ViewGroup',
    userno: '102496',
    id: 'luu17',
    email: 'luu17@global.hanbiro.com',
    mobile: '',
    position: '',
    rankno: '7620',
    ishead: '0',
    username: 'Ngo Luu 17',
    duty: '',
    dutyno: '36',
    fullname: 'Ngo Luu 17',
    fulldept: 'ViewGroup',
    long: 'Ngo Luu 17 ()',
    seqno: '102_102496',
    fax: '',
    baseGroup: '7215',
    name: 'Ngo Luu 17 ',
  },
  {
    key: '102_7215_103560',
    title: 'Ngo Luu xoa ',
    groupno: '7215',
    cn: '102',
    groupname: 'ViewGroup',
    userno: '103560',
    id: 'xoaxoa',
    email: 'xoaxoa@global.hanbiro.com',
    mobile: '',
    position: '',
    rankno: '7620',
    ishead: '0',
    username: 'Ngo Luu xoa',
    duty: '',
    dutyno: '36',
    fullname: '',
    fulldept: 'ViewGroup',
    long: 'Ngo Luu xoa ()',
    seqno: '102_103560',
    fax: '',
    baseGroup: '7215',
    name: 'Ngo Luu xoa ',
  },
  {
    key: '102_7215_103571',
    title: 'Ozzzz ',
    groupno: '7215',
    cn: '102',
    groupname: 'ViewGroup',
    userno: '103571',
    id: 'ozzz',
    email: 'ozzz@global.hanbiro.com',
    mobile: '',
    position: '',
    rankno: '7620',
    ishead: '0',
    username: 'Ozzzz',
    duty: '',
    dutyno: '36',
    fullname: 'Ozzzz',
    fulldept: 'ViewGroup',
    long: 'Ozzzz ()',
    seqno: '102_103571',
    fax: '',
    baseGroup: '7215',
    name: 'Ozzzz ',
  },
  {
    key: '102_7215_103606',
    title: 'm5 ',
    groupno: '7215',
    cn: '102',
    groupname: 'ViewGroup',
    userno: '103606',
    id: 'm5',
    email: 'm5@global.hanbiro.com',
    mobile: '',
    position: '',
    ishead: '0',
    username: 'm5',
    duty: '',
    dutyno: '',
    fullname: '',
    fulldept: 'ViewGroup',
    long: 'm5 ()',
    seqno: '102_103606',
    fax: '',
    baseGroup: '7215',
    name: 'm5 ',
  },
  {
    key: '102_7215_103608',
    title: 'test241101!! ',
    groupno: '7215',
    cn: '102',
    groupname: 'ViewGroup',
    userno: '103608',
    id: 'test241101',
    email: 'test241101@global.hanbiro.com',
    mobile: '',
    position: '',
    ishead: '0',
    username: 'test241101!!',
    duty: '',
    dutyno: '',
    fullname: '',
    fulldept: 'ViewGroup',
    long: 'test241101!! ()',
    seqno: '102_103608',
    fax: '',
    baseGroup: '7215',
    name: 'test241101!! ',
  },
  {
    key: '102_7215_103609',
    title: 'test241101 ',
    groupno: '7215',
    cn: '102',
    groupname: 'ViewGroup',
    userno: '103609',
    id: 'test2411012',
    email: 'test2411012@global.hanbiro.com',
    mobile: '',
    position: '',
    ishead: '0',
    username: 'test241101',
    duty: '',
    dutyno: '',
    fullname: '',
    fulldept: 'ViewGroup',
    long: 'test241101 ()',
    seqno: '102_103609',
    fax: '',
    baseGroup: '7215',
    name: 'test241101 ',
  },
  {
    key: '102_7215_102493',
    title: 'Ngo Luu 14 (책임약사)',
    groupno: '7215',
    cn: '102',
    groupname: 'ViewGroup',
    userno: '102493',
    id: 'luu14',
    email: 'luu14@global.hanbiro.com',
    mobile: '',
    position: '책임약사',
    rankno: '7190',
    ishead: '0',
    username: 'Ngo Luu 14',
    duty: '123 English Name',
    dutyno: '7',
    fullname: 'Ngo Luu 14',
    fulldept: 'ViewGroup',
    long: 'Ngo Luu 14 ()',
    seqno: '102_102493',
    fax: '',
    baseGroup: '7215',
    name: 'Ngo Luu 14 (책임약사)',
  },
];

interface SelectedUsersProps {
  data: UserType[];
}

const SelectedUsers = ({ data }: SelectedUsersProps) => {
  console.log(data);
  const { t } = useTranslation();

  const { items, add, remove, removeAll } = useUniqueSet<UserType>((user: UserType) => user.key as string, sample);
  const [selected, setSelected] = useState<string[]>([]);

  const handleSave = () => {};

  const handleSelectAll = (checked: boolean) => {
    setSelected(() => (checked ? items.map((item) => item.key as string) : []));
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
      <div className='flex flex-col text-sm'>
        <div className='px-2 h-[32px] border-b bg-slate-100 flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <Input
              id='select-all'
              type='checkbox'
              className='w-4 h-4 cursor-pointer'
              onChange={(e) => handleSelectAll(e.target.checked)}
              checked={items.every((item) => selected.includes(item.key as string))}
            />
            <label htmlFor='select-all' className='w-full cursor-pointer'>
              {t('timecard_time_checkall_msg')}
            </label>
          </div>
          {selected.length > 0 && <Trash2 className='w-5 h-5 text-slate-500' />}
        </div>

        <div className='flex flex-col flex-1 overflow-y-auto'>
          {items.map((item) => (
            <div key={item.key} className='h-[30px] px-2 flex gap-2 items-center hover:bg-slate-50'>
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
    );
  };

  return (
    <div className='w-full h-full bg-white border rounded-2xl overflow-hidden flex flex-col'>
      <div className='px-4 h-[50px] bg-slate-700 text-white flex items-center gap-2 font-semibold'>
        <UserIcon />
        {t('holiday_adminreg_menu')}
      </div>
      <div className='flex-1'>{items.length === 0 ? <EmptyData /> : <>{renderUserList()}</>}</div>
      <div className='flex border-t border-slate-200 bg-slate-100 justify-center items-center gap-3 py-2'>
        <Button variant={'default'} className='w-[80px]' size={'sm'} onClick={handleSave}>
          {t('common_save_msg')}
        </Button>
        <Button variant={'secondary'} className='w-[80px]' size={'sm'} onClick={removeAll}>
          {t('common_reset')}
        </Button>
      </div>
    </div>
  );
};

export default SelectedUsers;
