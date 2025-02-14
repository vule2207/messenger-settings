import OrgTree from '@/components/OrgTree';
import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import SelectedUsers from './SelectedUsers';

const KickOutUsers = () => {
  return (
    <div className='w-full h-[calc(100%-112px)] grid grid-cols-12'>
      <div className='w-full h-full col-span-12 md:col-span-5'>
        <OrgTree />
      </div>
      <div className='flex flex-col gap-2 justify-center items-center col-span-12 md:col-span-2'>
        <Button variant={'secondary'} className='px-3 text-slate-700'>
          <ChevronsRight />
        </Button>
        <Button variant={'secondary'} className='px-3 text-slate-700'>
          <ChevronsLeft />
        </Button>
      </div>
      <div className='col-span-12 md:col-span-5'>
        <SelectedUsers />
      </div>
    </div>
  );
};

export default KickOutUsers;
