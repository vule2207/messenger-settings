import AlertDialog, { AlertDialogProps } from '@/components/AlertDialog';
import { TimeSettingsResponseType } from '@/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OptionSelect from '../AwaySettings/OptionSelect';
import { useGetSettings } from '@/hooks/useGetSettings';
import { apiURL } from '@/constants';
import { BaseResponse } from '@/types/api';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import LoadingOverlay from '@/components/LoadingOverlay';

const LockTime = () => {
  const { t } = useTranslation();

  const [lockTimeData, setLockTimeData] = useState<TimeSettingsResponseType>({
    value: '1',
    checktype: '0',
  });
  const [alertData, setAlertData] = useState<Omit<AlertDialogProps, 'setOpen'>>({
    open: false,
    title: '',
    content: '',
  });

  const { data, isLoading } = useGetSettings<BaseResponse<TimeSettingsResponseType>>(
    apiURL.lockTime.data,
  );
  const { mutate, isLoading: isUpdating } = useUpdateSettings<
    BaseResponse,
    TimeSettingsResponseType
  >(apiURL.lockTime.save, {
    onSuccess: (data) => {
      if (data && data.success) {
        setAlertData({ open: true, title: t('alert_success_msg'), content: data.msg || '' });
      }
    },
    onError: (err) => {
      console.log('err:', err);
    },
  });

  useEffect(() => {
    if (data && data.success && data?.rows) {
      setLockTimeData(data.rows);
    }
  }, [data]);

  const handleSave = () => {
    mutate(lockTimeData);
  };
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <OptionSelect
        data={lockTimeData}
        onSave={handleSave}
        isUpdating={isUpdating}
        note={t('approval_messenger_locktime_detail')}
        onChange={setLockTimeData}
      />

      {alertData.open && (
        <AlertDialog
          open={alertData.open}
          title={alertData.title}
          content={alertData.content}
          setOpen={(val) => setAlertData((prev) => ({ ...prev, open: val }))}
        />
      )}
    </>
  );
};

export default LockTime;
