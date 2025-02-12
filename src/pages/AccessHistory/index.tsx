import BaseTable, { TableHeadType, TableRowType } from '@/components/BaseTable';
import LoadingOverlay from '@/components/LoadingOverlay';
import { apiURL } from '@/constants';
import { useGetSettings } from '@/hooks/useGetSettings';
import { useAppStore } from '@/store';
import { AccessHistoryItemType } from '@/types';
import { BaseResponse } from '@/types/api';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AccessHistory = () => {
  const { t } = useTranslation();

  const { triggerRefresh } = useAppStore();

  const [userList, setUserList] = useState<AccessHistoryItemType[]>([]);

  const { data, isLoading, refetch } = useGetSettings<BaseResponse<AccessHistoryItemType[]>>(
    apiURL.history.list,
  );

  useEffect(() => {
    if (data && data.success && data.rows) {
      setUserList(data.rows);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [triggerRefresh]);

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

  const footer = (
    <div className='h-full flex items-center'>{`${t('common_total')} ${userList.length}`}</div>
  );

  return (
    <div className='h-[calc(100%-76px)]'>
      {isLoading && <LoadingOverlay />}
      <BaseTable heads={heads} rows={rows} footer={footer} />
    </div>
  );
};

export default AccessHistory;
