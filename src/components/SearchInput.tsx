import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface SearchInputProps {
  value?: string;
  isSearchByEnter?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  onChange: (val: string) => void;
}

const SearchInput = ({ isSearchByEnter = false, placeholder = '검색', fullWidth = false, onChange }: SearchInputProps) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = debounce((value: string) => {
    onChange(value);
  }, 300);

  useEffect(() => {
    if (!isSearchByEnter) {
      debouncedSearch(query);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSearchByEnter && e.key === 'Enter') {
      onChange(query);
    }
  };

  return (
    <div className={cn('relative w-64', { 'w-full': fullWidth })}>
      <Input
        type='text'
        value={query}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        className='py-2 border border-slate-400 rounded-md'
      />
      <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
    </div>
  );
};

export default SearchInput;
