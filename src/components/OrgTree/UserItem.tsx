import { SelectedOrgItem, SelectedOrgItemList, User } from '@/types';
import { User as UserIcon } from 'lucide-react';
import React, { useRef } from 'react';

interface UserItemProps {
  user: User;
  userChoosed: SelectedOrgItemList;
  handleChoose: (dept: SelectedOrgItem | SelectedOrgItem[], isChecked?: boolean) => void;
}
const UserItem = ({ user, userChoosed, handleChoose }: UserItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { name, key } = user;

  return (
    <div className='h-6 flex items-center cursor-pointer'>
      <div className='w-6'></div>

      <div className='w-6 flex justify-center items-center'>
        <input
          ref={inputRef}
          type='checkbox'
          checked={Object.keys(userChoosed).includes(key as string)}
          onChange={(event) => {
            handleChoose(user, event.target.checked);
          }}
        />
      </div>

      <div className='w-6 flex justify-center items-center' onClick={() => inputRef.current?.click()}>
        <UserIcon size={16} className='text-blue-500' />
      </div>
      <span
        className='ml-1'
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default UserItem;
