import { Department, SelectedOrgItem, SelectedOrgItemList } from '@/types';
import React, { useState, useTransition } from 'react';
import BaseModal from '../BaseModal';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Plus, Save, X } from 'lucide-react';
import OrgTree from './';
import { isEmpty } from 'lodash';
import { optimizeDepartments } from '@/utils';
import { BaseResponse } from '@/types/api';
import { orgConfig } from '@/constants';
import SelectedUsers from './SelectUsers';

interface OrgModalProps {
  open: boolean;
  value?: SelectedOrgItemList;
  onClose: () => void;
  onChange: (val: SelectedOrgItemList) => void;
}
const OrgModal = ({ value, open, onClose, onChange }: OrgModalProps) => {
  const { t } = useTranslation();

  const [depts, setDepts] = useState<SelectedOrgItemList>({});
  const [users, setUsers] = useState<SelectedOrgItemList>({});
  // console.log('depts:', depts);
  // console.log('users:', users);
  const [addUsers, setAddUsers] = useState<SelectedOrgItemList>(value || {});

  const [isLoading, startTransition] = useTransition();

  const getUsers = async () => {
    if (!isEmpty(depts)) {
      let nUsers = { ...users };
      const arrayAPI = [];
      for (const key in depts) {
        const params = orgConfig.user.getParams({ idURL: key });
        arrayAPI.push(orgConfig.user.api(params));
      }

      const responses = await Promise.all<BaseResponse<SelectedOrgItem[]>>(arrayAPI);
      for (const element of responses) {
        if (element && element.success && element.rows) {
          for (const user of optimizeDepartments(element.rows as Department[])!) {
            if (!user.isFolder) {
              const key = user.key;
              nUsers[key as string] = user;
            }
          }
        }
      }
      setAddUsers(nUsers);
    } else {
      if (!isEmpty(users)) {
        setAddUsers(users);
      }
    }
  };

  const handleAddUsers = () => {
    startTransition(async () => {
      await getUsers();
    });
  };

  const Body = (
    <div className='w-full h-[60vh] flex flex-col md:flex-row gap-2 md:gap-0'>
      <div className='w-full md:w-[45%] md:h-full h-[500px]'>
        <OrgTree onChangeSelectDept={setDepts} onChangeSelectUser={setUsers} />
      </div>
      <div className='flex md:flex-col flex-row gap-2 justify-center items-center w-full md:w-[10%]'>
        <Button variant={'default'} className='px-3' disabled={isLoading} onClick={handleAddUsers}>
          <Plus />
          {t('common_add_msg')}
        </Button>
      </div>
      <div className='w-full md:w-[45%] md:h-full h-[500px]'>
        <SelectedUsers
          data={addUsers}
          onClose={onClose}
          onSave={(val) => {
            onChange && onChange(val);
            onClose && onClose();
          }}
        />
      </div>
    </div>
  );

  return <BaseModal open={open} onClose={onClose} body={Body} modalClass='sm:max-w-[1000px]' header={<>{t('hr_org_tree')}</>} />;
};

export default OrgModal;
