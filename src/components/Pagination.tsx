import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  pageLimit: number;
  onPageChange?: (page: number) => void;
  onPageLimitChange?: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage = 1,
  pageLimit = 20,
  onPageChange,
  onPageLimitChange,
}) => {
  // const [currentPage, setCurrentPage] = useState(initialPage);
  // const [pageLimit, setPageLimit] = useState(5);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    // setCurrentPage(page);
    onPageChange?.(page);
  };

  const handlePageLimitChange = (limit: number) => {
    // setPageLimit(limit);
    onPageLimitChange?.(limit);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 5;

    for (let i = 1; i <= totalPages; i++) {
      if (showEllipsis && i > 2 && i < totalPages - 1 && Math.abs(i - currentPage) > 2) {
        if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
        continue;
      }
      pages.push(i);
    }

    return pages.map((page, index) => (
      <Button
        key={index}
        variant={'group'}
        onClick={() => typeof page === 'number' && handlePageChange(page)}
        disabled={page === '...'}
        className={cn(
          'w-auto h-10 min-w-10 px-1',
          currentPage === page ? 'bg-slate-500 text-white' : 'bg-white hover:bg-slate-200',
        )}
      >
        {page}
      </Button>
    ));
  };

  return (
    <div className='flex items-center space-x-2'>
      <Select onValueChange={(value) => handlePageLimitChange(Number(value))}>
        <SelectTrigger className='w-[120px] border-slate-400'>
          <SelectValue placeholder={`${pageLimit}개 보기`} />
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 15, 20].map((limit) => (
            <SelectItem key={limit} value={limit.toString()}>{`${limit}개 보기`}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className='flex border border-slate-400 rounded-md divide-x overflow-hidden'>
        <Button
          variant={'group'}
          size='icon'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          <ChevronLeft className='w-5 h-5' />
        </Button>
        {renderPageNumbers()}
        <Button
          variant={'group'}
          size='icon'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight className='w-5 h-5' />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
