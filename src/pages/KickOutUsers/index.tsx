import OrgTree from '@/components/OrgTree';
import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import SelectedUsers from './SelectedUsers';

const KickOutUsers = () => {
  return (
    <div className='w-full h-[calc(100%-112px)] flex flex-col md:flex-row gap-2 md:gap-0'>
      <div className='w-full md:w-[45%] md:h-full h-[500px]'>
        <OrgTree />
      </div>
      <div className='flex md:flex-col flex-row gap-2 justify-center items-center w-full md:w-[10%] '>
        <Button variant={'secondary'} className='px-3 text-slate-700'>
          <ChevronsRight />
        </Button>
        <Button variant={'secondary'} className='px-3 text-slate-700'>
          <ChevronsLeft />
        </Button>
      </div>
      <div className='w-full md:w-[45%] md:h-full h-[500px]'>
        <SelectedUsers />
      </div>
    </div>
  );
};

export default KickOutUsers;
