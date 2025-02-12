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

interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onPageLimitChange?: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  initialPage = 1,
  onPageChange,
  onPageLimitChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageLimit, setPageLimit] = useState(5);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const handlePageLimitChange = (limit: number) => {
    setPageLimit(limit);
    onPageLimitChange?.(limit);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 10;

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
        onClick={() => typeof page === 'number' && handlePageChange(page)}
        disabled={page === '...'}
        className={cn(
          'w-10 h-10',
          currentPage === page ? 'bg-gray-600 text-white' : 'bg-white hover:bg-gray-200',
        )}
      >
        {page}
      </Button>
    ));
  };

  return (
    <div className='flex items-center space-x-4'>
      <Select onValueChange={(value) => handlePageLimitChange(Number(value))}>
        <SelectTrigger className='w-[120px]'>
          <SelectValue placeholder={`${pageLimit}개 보기`} />
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 15, 20].map((limit) => (
            <SelectItem key={limit} value={limit.toString()}>{`${limit}개 보기`}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className='text-gray-600 text-sm'>Total {totalPages} pages</span>
      <div className='flex items-center space-x-2'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='w-5 h-5' />
        </Button>
        {renderPageNumbers()}
        <Button
          variant='ghost'
          size='icon'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className='w-5 h-5' />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
