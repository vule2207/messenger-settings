import BaseTable, { TableHeadType, TableRowType } from '@/components/BaseTable';
import LoadingOverlay from '@/components/LoadingOverlay';
import { apiURL } from '@/constants';
import { useGetSettings } from '@/hooks/useGetSettings';
import { useAppStore } from '@/store';
import { AvailableUserItemType } from '@/types';
import { BaseResponse } from '@/types/api';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AvailableUsersList = () => {
  const { t } = useTranslation();

  const { triggerRefresh } = useAppStore();

  const [userList, setUserList] = useState<AvailableUserItemType[]>([]);

  const { data, isLoading, refetch } = useGetSettings<BaseResponse<AvailableUserItemType[]>>(
    apiURL.availableUsersList.list,
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
    { content: t('admin_messenger_users_logged_in_list_no_text'), className: 'w-[10%]' },
    { content: t('admin_messenger_users_logged_in_list_user_name_text') },
    { content: t('admin_messenger_users_logged_in_list_department_text') },
    { content: t('admin_messenger_users_logged_in_list_status_text') },
    { content: t('admin_messenger_users_logged_in_list_device_text') },
  ];

  const rows: TableRowType[] = useMemo(() => {
    return userList.map((user, index) => ({
      className: '',
      columns: [
        { content: (index + 1).toString() },
        { content: user.user_name },
        { content: user.dept },
        { content: user.status_text },
        { content: user.device_text.join(', ') },
      ],
    }));
  }, [userList]);

  const footer = (
    <div className='h-full flex items-center'>{`${t('common_total')} ${userList.length}`}</div>
  );

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <BaseTable heads={heads} rows={rows} footer={footer} />
    </>
  );
};

export default AvailableUsersList;
