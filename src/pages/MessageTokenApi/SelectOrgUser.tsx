import OrgModal from '@/components/OrgTree/OrgModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { typograhyClass } from '@/constants';
import { cn } from '@/lib/utils';
import { SelectedOrgItem, SelectedOrgItemList } from '@/types';
import { Users } from 'lucide-react';
import { useState } from 'react';

interface SelectOrgUserProps {
  value?: SelectedOrgItemList;
  onChange: (value: SelectedOrgItemList) => void;
}

const SelectOrgUser = ({ value, onChange }: SelectOrgUserProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState<SelectedOrgItemList>({});

  const handleRemove = (val: SelectedOrgItem) => {
    const nData = { ...values };
    delete nData[val.seqno as string];
    setValues(nData);
  };

  return (
    <>
      {!value && (
        <div className={cn('min-h-10 w-full border border-slate-200 flex rounded-md')}>
          <div className={cn('flex-1 p-2 max-h-[100px] overflow-y-auto', typograhyClass.scrollBarStyles)}>
            {Object.values(values).map((value) => (
              <Badge key={value.seqno || value.nodeId} variant='secondary' className='m-1 h-6'>
                {value.username || value.name}
                <Button variant='ghost' size='sm' onClick={() => handleRemove(value)} className='h-full ml-2 p-0'>
                  ✕
                </Button>
              </Badge>
            ))}
          </div>
          <div className='w-10 border-l flex justify-center items-center cursor-pointer' onClick={() => setOpenModal(true)}>
            <Users className='h-5 text-slate-500' />
          </div>
        </div>
      )}
      {openModal && (
        <OrgModal
          open={openModal}
          value={values}
          onClose={() => setOpenModal(false)}
          onChange={(val) => {
            setValues(val);
            onChange && onChange(val);
          }}
        />
      )}
    </>
  );
};

export default SelectOrgUser;
