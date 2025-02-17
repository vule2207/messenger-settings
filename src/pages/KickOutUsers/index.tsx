import OrgTree from '@/components/OrgTree';
import { Button } from '@/components/ui/button';
import { orgConfig } from '@/constants';
import { Department, SelectedOrgItem, SelectedOrgItemList } from '@/types';
import { BaseResponse } from '@/types/api';
import { optimizeDepartments } from '@/utils';
import { isEmpty } from 'lodash';
import { Plus } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import SelectedUsers from './SelectedUsers';

const KickOutUsers = () => {
  const { t } = useTranslation();
  const [depts, setDepts] = useState<SelectedOrgItemList>({});
  const [users, setUsers] = useState<SelectedOrgItemList>({});
  const [addUsers, setAddUsers] = useState<SelectedOrgItemList>({});

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

  const handleChangeDepts = (depts: SelectedOrgItemList) => {
    console.log('depts:', depts);
    setDepts((prev) => ({ ...prev, ...depts }));
  };
  const handleChangeUsers = (users: SelectedOrgItemList) => {
    console.log('users:', users);
    setUsers((prev) => ({ ...prev, ...users }));
  };

  return (
    <div className='w-full h-[calc(100%-112px)] flex flex-col md:flex-row gap-2 md:gap-0'>
      <div className='w-full md:w-[45%] md:h-full h-[500px]'>
        <OrgTree onChangeDepts={handleChangeDepts} onChangeUsers={handleChangeUsers} />
      </div>
      <div className='flex md:flex-col flex-row gap-2 justify-center items-center w-full md:w-[10%]'>
        <Button variant={'default'} className='px-3' disabled={isLoading} onClick={handleAddUsers}>
          <Plus />
          {t('common_add_msg')}
        </Button>
      </div>
      <div className='w-full md:w-[45%] md:h-full h-[500px]'>
        <SelectedUsers data={addUsers} />
      </div>
    </div>
  );
};

export default KickOutUsers;
