import OrgTree from '@/components/OrgTree';
import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import SelectedUsers from './SelectedUsers';
import { useState } from 'react';
import { User } from '@/types';
import { useTranslation } from 'react-i18next';

const KickOutUsers = () => {
  const { t } = useTranslation();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <div className='w-full h-[calc(100%-112px)] flex flex-col md:flex-row gap-2 md:gap-0'>
      <div className='w-full md:w-[45%] md:h-full h-[500px]'>
        <OrgTree />
      </div>
      <div className='flex md:flex-col flex-row gap-2 justify-center items-center w-full md:w-[10%] '>
        <Button variant={'default'} className='px-3'>
          {t('common_add_msg')}
        </Button>
      </div>
      <div className='w-full md:w-[45%] md:h-full h-[500px]'>
        <SelectedUsers data={selectedUsers} />
      </div>
    </div>
  );
};

export default KickOutUsers;
