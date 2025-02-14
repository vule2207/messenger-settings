import BaseTable, { TableHeadType, TableRowType } from '@/components/BaseTable';
import LoadingOverlay from '@/components/LoadingOverlay';
import { PaginationProps } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { apiURL } from '@/constants';
import { useGetSettings } from '@/hooks/useGetSettings';
import { useAppStore } from '@/store';
import { AccessHistoryGetParams, AccessHistoryItemType, AccessHistoryResponse } from '@/types';
import { Download } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExportModal from './ExportModal';

const AccessHistory = () => {
  const { t } = useTranslation();

  const { triggerRefresh } = useAppStore();

  const [userList, setUserList] = useState<AccessHistoryItemType[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [paging, setPaging] = useState<PaginationProps>({
    totalPages: 0,
    currentPage: 1,
    pageLimit: 20,
  });

  const [openExportModal, setOpenExportModal] = useState(false);

  const { data, isLoading, refetch } = useGetSettings<AccessHistoryResponse<AccessHistoryItemType[]>, AccessHistoryGetParams>(
    apiURL.history.list,
    { page: paging.currentPage, limit: paging.pageLimit, keyword },
    { enabled: false },
  );

  useEffect(() => {
    if (data && data.success && data.rows) {
      setUserList(data.rows);
      setPaging((prev) => ({ ...prev, totalPages: data.attr.maxpage }));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [paging.currentPage, paging.pageLimit, triggerRefresh, keyword]);

  const heads: TableHeadType[] = [
    { content: t('approval_messenger_history_col_id'), className: 'w-[10%]' },
    { content: t('approval_messenger_history_col_name') },
    { content: t('approval_messenger_history_col_accesstime') },
    { content: t('approval_messenger_history_col_useragent') },
    { content: t('approval_messenger_history_col_ip') },
    { content: t('approval_messenger_history_col_status') },
  ];

  const rows: TableRowType[] = useMemo(() => {
    return userList.map((user) => ({
      className: '',
      columns: [
        { content: user.userid },
        { content: user.name },
        { content: user.access },
        { content: user.user_agent },
        { content: user.remote_ip },
        { content: user.type },
      ],
    }));
  }, [userList]);

  const footer = <div className='h-full flex items-center'>{`${t('common_total')} ${data?.attr?.total}`}</div>;

  return (
    <div className='h-[calc(100%-76px)]'>
      {isLoading && <LoadingOverlay />}
      <BaseTable
        isSearch
        isPagination
        rows={rows}
        heads={heads}
        footer={footer}
        searchProps={{
          isSearchByEnter: true,
          onChange: (val) => {
            setKeyword(val);
            setPaging((prev) => ({ ...prev, currentPage: 1 }));
          },
        }}
        paginationProps={{
          ...paging,
          onPageChange: (page) => setPaging((prev) => ({ ...prev, currentPage: page })),
          onPageLimitChange: (limit) => setPaging((prev) => ({ ...prev, pageLimit: limit, currentPage: 1 })),
        }}
        headerRightButton={
          <Button variant={'secondary'} className='px-3 ' onClick={() => setOpenExportModal(true)}>
            <Download />
          </Button>
        }
      />
      {openExportModal && <ExportModal open={openExportModal} onClose={() => setOpenExportModal(false)} keyword={keyword ? keyword : undefined} />}
    </div>
  );
};

export default AccessHistory;
