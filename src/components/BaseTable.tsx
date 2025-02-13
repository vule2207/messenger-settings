import { ReactElement } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import EmptyData from './EmptyData';
import SearchInput, { SearchInputProps } from './SearchInput';
import Pagination, { PaginationProps } from './Pagination';

export type TableHeadType = {
  className?: string;
  content: string | ReactElement;
};

export type TableColumn = {
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  content: string | ReactElement;
};

export type TableRowType = {
  className?: string;
  columns: TableColumn[];
};

interface BaseTableProps {
  heads: TableHeadType[];
  rows: TableRowType[];
  tableClassName?: string;
  footer?: ReactElement;
  isSearch?: boolean;
  searchProps?: SearchInputProps;
  isPagination?: boolean;
  paginationProps?: PaginationProps;
  headerRightButton?: ReactElement;
}

const BaseTable = ({
  heads,
  rows,
  footer,
  tableClassName = '',
  isSearch = false,
  searchProps,
  isPagination = false,
  paginationProps,
  headerRightButton,
}: BaseTableProps) => {
  return (
    <div className='h-full flex flex-col gap-2'>
      <div className='flex justify-between items-center'>
        {isSearch && searchProps && <SearchInput {...searchProps} />}
        {headerRightButton && headerRightButton}
      </div>
      <Table className={tableClassName}>
        <TableHeader className='sticky top-0'>
          <TableRow>
            {heads.length > 0 &&
              heads.map((thead, index) => {
                return (
                  <TableHead key={index} className={thead.className}>
                    {thead.content}
                  </TableHead>
                );
              })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows &&
            rows.length > 0 &&
            rows.map((row, i) => {
              return (
                <TableRow className={row.className} key={i}>
                  {row.columns.map((td, j) => {
                    return (
                      <TableCell
                        colSpan={td?.colSpan ?? 1}
                        rowSpan={td?.rowSpan ?? 1}
                        className={`${td?.className}`}
                        key={j}
                      >
                        {td.content}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={heads.length}>
                <EmptyData />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {footer && (
          <TableFooter className='sticky bottom-0 bg-slate-100'>
            <TableRow>
              <TableCell colSpan={heads.length}>{footer}</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
      {isPagination && paginationProps && <Pagination {...paginationProps} />}
    </div>
  );
};

export default BaseTable;
