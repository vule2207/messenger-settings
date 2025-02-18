import { useGetSettings } from '@/hooks/useGetSettings';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { BaseResponse } from '@/types/api';
import { useTranslation } from 'react-i18next';
import Loader from './Loader';
import { WRITE_MODE } from '@/types/enums';

interface Option {
  apiuserno: string;
  username: string;
}

interface SearchSelectProps {
  value?: any;
  apiUrl: string;
  mode: WRITE_MODE;
  onChange: (option: Option) => void;
}

const SearchSelect: React.FC<SearchSelectProps> = ({ value: editValue, mode, apiUrl, onChange }) => {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const { data, refetch, isLoading } = useGetSettings<BaseResponse>(apiUrl, { page: 1, limit: 30, keyword: keyword }, { enabled: false });

  useEffect(() => {
    if (data && data.success && data.rows) {
      setOptions(data.rows);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [keyword]);

  return (
    <div className='w-full'>
      {mode === WRITE_MODE.UPDATE ? (
        <div className='h-10 px-3 text-sm border rounded-md bg-slate-100 flex items-center'>
          {options.find((o) => o.apiuserno === editValue)?.username || ''}
        </div>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className='w-full border-slate-200'>
            <Button variant='outline' role='combobox' aria-expanded={open} className='justify-between'>
              {value ? options.find((opt) => opt.apiuserno === value)?.username : <div className='w-2'></div>}
              <ChevronsUpDown className='opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
            <Command className='w-full'>
              <CommandInput
                placeholder=''
                className='h-9'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e: any) => {
                  e.stopPropagation();
                  if (e.key === 'Enter') {
                    setKeyword(e.target.value);
                  }
                }}
              />
              <CommandList className='relative'>
                {isLoading && (
                  <div className='absolute w-full h-full'>
                    <Loader />
                  </div>
                )}
                <CommandEmpty>{t('admin_access_nodata')}</CommandEmpty>
                <CommandGroup>
                  {options.map((opt) => (
                    <CommandItem
                      key={opt.apiuserno}
                      value={opt.apiuserno}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        onChange && onChange(options.find((opt) => opt.apiuserno === currentValue)!);
                        setOpen(false);
                      }}
                    >
                      {opt.username}
                      <Check className={cn('ml-auto', value === opt.apiuserno ? 'opacity-100' : 'opacity-0')} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default SearchSelect;
