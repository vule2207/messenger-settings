import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UseStatusProps {
  value: string;
  onChange: (value: string) => void;
}
const UseStatus = ({ value, onChange }: UseStatusProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [statusValue, setStatusValue] = useState<string>(value);
  const [showSelect, setShowSelect] = useState(false);
  const statusOptions = [
    { value: '1', label: t('approval_used') },
    { value: '0', label: t('approval_unused') },
  ];

  const currentStatus = statusOptions.find((s) => s.value === statusValue)?.label || '';

  return (
    <>
      {!showSelect && (
        <div className={cn('text-textBlue underline cursor-pointer', statusValue === '0' ? 'text-red-500' : '')} onClick={() => setShowSelect(true)}>
          {currentStatus}
        </div>
      )}
      {showSelect && (
        <Popover
          open={open}
          onOpenChange={(val) => {
            setOpen(val);
            setShowSelect(val);
          }}
        >
          <PopoverTrigger asChild className='w-[80px] h-7 border-slate-200'>
            <Button variant='outline' role='combobox' aria-expanded={open} className='justify-between'>
              {statusValue ? statusOptions.find((opt) => opt.value === statusValue)?.label : <div className='w-2'></div>}
              <ChevronDown className='opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] overflow-hidden'>
            {statusOptions.map((opt) => (
              <div
                key={opt.value}
                className={cn(
                  'text-sm px-3 py-2 flex justify-between items-center cursor-pointer',
                  value === opt.value ? 'bg-textBlue text-white' : '',
                )}
                onClick={() => {
                  onChange && onChange(opt.value);
                  setStatusValue(opt.value);
                  setOpen(false);
                  setShowSelect(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default UseStatus;
