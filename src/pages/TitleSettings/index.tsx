import CardSection from '@/components/CardSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { typograhyClass } from '@/constants';
import { Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import meesengerTop from '@/assets/images/messenger_top.gif';
import LoadingOverlay from '@/components/LoadingOverlay';
import { useGetTitle } from '@/hooks/title/useGetTitle';
import { useUpdateTitle } from '@/hooks/title/useUpdateTitle';
import { BaseResponse } from '@/types/api';
import { useEffect, useState } from 'react';
import AlertDialog, { AlertDialogProps } from '@/components/AlertDialog';

const TitleSettings = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [alertData, setAlertData] = useState<Omit<AlertDialogProps, 'setOpen'>>({
    open: false,
    title: '',
    content: '',
  });

  const { data, isLoading, refetch } = useGetTitle<BaseResponse<string>>();
  const { mutate, isLoading: isUpdating } = useUpdateTitle<BaseResponse>({
    onSuccess: (data) => {
      if (data?.success) {
        setAlertData({ open: true, title: t('alert_success_msg'), content: data.msg || '' });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (data && data.rows) {
      setTitle(data.rows);
    }
  }, [data]);

  const handleSaveTitle = async () => {
    mutate({ title });
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className='flex-grow'>
        <CardSection
          content={
            <div className='mt-5 flex flex-col gap-4'>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              <div className='p-4 border border-slate-200 rounded-md bg-slate-50'>
                <span
                  className={typograhyClass.secondaryText}
                  dangerouslySetInnerHTML={{ __html: t('admin_messheadersig_noticemsg') }}
                ></span>
                <img src={meesengerTop} alt='messenger-top' />
              </div>
            </div>
          }
          footer={
            <Button onClick={handleSaveTitle} disabled={isUpdating}>
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

export default TitleSettings;
