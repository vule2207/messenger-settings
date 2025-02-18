import { useGetSettings } from '@/hooks/useGetSettings';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { BaseResponse } from '@/types/api';

interface Option {
  apiuserno: string;
  username: string;
}

interface SearchSelectProps {
  apiUrl: string;
  onChange: (option: Option) => void;
}

const SearchSelect: React.FC<SearchSelectProps> = ({ apiUrl, onChange }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([]);

  const { data, refetch } = useGetSettings<BaseResponse>(apiUrl, { page: 1, limit: 30, keyword: inputValue }, { enabled: false });

  useEffect(() => {
    if (data && data.success && data.rows) {
      setOptions(data.rows);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [inputValue]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <div className='w-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className='w-full border-slate-200'>
          <Button variant='outline' role='combobox' aria-expanded={open} className='justify-between'>
            {value ? options.find((opt) => opt.apiuserno === value)?.username : <div className='w-2'></div>}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command className=''>
            <CommandInput placeholder='' className='h-9' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <CommandList>
              <CommandEmpty>No data.</CommandEmpty>
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
    </div>
  );
};

export default SearchSelect;
