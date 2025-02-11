import AlertDialog, { AlertDialogProps } from '@/components/AlertDialog';
import { TimeSettingsResponseType } from '@/types/response';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OptionSelect from '../AwaySettings/OptionSelect';
import { useGetSettings } from '@/hooks/useGetSettings';
import { apiURL } from '@/constants';
import { BaseResponse } from '@/types/api';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import LoadingOverlay from '@/components/LoadingOverlay';

const LockOffTime = () => {
  const { t } = useTranslation();

  const [awayData, setAwayData] = useState<TimeSettingsResponseType>({
    value: '1',
    checktype: '0',
  });
  const [alertData, setAlertData] = useState<Omit<AlertDialogProps, 'setOpen'>>({
    open: false,
    title: '',
    content: '',
  });

  const { data, isLoading } = useGetSettings<BaseResponse<TimeSettingsResponseType>>(
    apiURL.awaySettings.data,
  );
  const { mutate, isLoading: isUpdating } = useUpdateSettings<
    BaseResponse,
    TimeSettingsResponseType
  >(apiURL.awaySettings.save, {
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
      setAwayData(data.rows);
    }
  }, [data]);

  const handleSave = () => {
    mutate(awayData);
  };
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <OptionSelect
        data={awayData}
        note={t('approval_messenger_logofftime_detail')}
        onSave={handleSave}
        onChange={setAwayData}
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

export default LockOffTime;
