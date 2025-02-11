import AlertDialog, { AlertDialogProps } from '@/components/AlertDialog';
import CardSection from '@/components/CardSection';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { typograhyClass } from '@/constants';
import { useGetAutoPunch } from '@/hooks/auto-punch/useGetAutoPunch';
import { useUpdateAutoPunch } from '@/hooks/auto-punch/useUpdateAutoPunch';
import { BaseResponse } from '@/types/api';
import { PunchDataResponseType } from '@/types/response';
import { PunchDataType } from '@/types/state';
import { Megaphone, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AutoPunchTimeCard = () => {
  const { t } = useTranslation();

  const [punchData, setPunchData] = useState<PunchDataType>({
    punch: false,
    punch_on_work_day: false,
  });
  const [alertData, setAlertData] = useState<Omit<AlertDialogProps, 'setOpen'>>({
    open: false,
    title: '',
    content: '',
  });

  const { data, isLoading } = useGetAutoPunch<BaseResponse<PunchDataResponseType>>();
  const { mutate, isLoading: isUpdating } = useUpdateAutoPunch<BaseResponse>({
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
      setPunchData({
        punch: data.rows?.punch === '1',
        punch_on_work_day: data.rows?.punch_on_work_day === '1',
      });
    }
  }, [data]);

  const handleSave = () => {
    mutate(punchData);
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className='flex-grow'>
        <CardSection
          content={
            <div className='mt-5 flex flex-col gap-4'>
              <div className='flex gap-1.5 items-center p-2 border border-slate-200 rounded-md bg-slate-50'>
                <Megaphone className={typograhyClass.secondaryText} />
                <span
                  className={typograhyClass.secondaryText}
                  dangerouslySetInnerHTML={{ __html: t('approval_manager_autologonoff_detail') }}
                ></span>
              </div>

              <div className='flex flex-col gap-2'>
                <div className='flex items-center space-x-2'>
                  <Switch
                    id='autologonoff'
                    checked={punchData?.punch}
                    onClick={() => {
                      setPunchData((prev) => ({ ...prev, punch: !prev.punch }));
                    }}
                  />
                  <Label htmlFor='autologonoff'>{t('approval_messenger_autologonoff')}</Label>
                </div>

                <div className='flex items-center space-x-2'>
                  <Switch
                    id='punch-on-work-day'
                    checked={punchData?.punch_on_work_day}
                    onClick={() => {
                      setPunchData((prev) => ({
                        ...prev,
                        punch_on_work_day: !prev.punch_on_work_day,
                      }));
                    }}
                  />
                  <Label htmlFor='punch-on-work-day'>
                    {t('approval_messenger_punch_on_work_day')}
                  </Label>
                </div>
              </div>
            </div>
          }
          footer={
            <Button onClick={handleSave} disabled={isUpdating}>
              <Save /> {t('admin_save_msg')}
            </Button>
          }
        />
      </div>

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

export default AutoPunchTimeCard;
