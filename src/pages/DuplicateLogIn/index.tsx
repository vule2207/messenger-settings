import AlertDialog, { AlertDialogProps } from '@/components/AlertDialog';
import CardSection from '@/components/CardSection';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { apiURL, duplicateLogInOptions, typograhyClass } from '@/constants';
import { useGetSettings } from '@/hooks/useGetSettings';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { DuplicateLogInDataType, DuplicateLogInResponse } from '@/types';
import { Megaphone, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DuplicateLogIn = () => {
  const { t } = useTranslation();

  const [duplicateLogInData, setDuplicateLogInData] = useState<DuplicateLogInDataType | ''>('');
  const [alertData, setAlertData] = useState<Omit<AlertDialogProps, 'setOpen'>>({
    open: false,
    title: '',
    content: '',
  });

  const { data, isLoading } = useGetSettings<DuplicateLogInResponse<DuplicateLogInDataType>>(
    apiURL.duplicateLogIn.data,
  );
  const { mutate, isLoading: isUpdating } = useUpdateSettings<
    DuplicateLogInResponse<DuplicateLogInDataType>,
    { login_on: DuplicateLogInDataType }
  >(apiURL.duplicateLogIn.save, {
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
    if (data && data.success && data?.value) {
      setDuplicateLogInData(data.value);
    }
  }, [data]);

  const handleSave = () => {
    mutate({ login_on: duplicateLogInData as DuplicateLogInDataType });
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <CardSection
        content={
          <div className='mt-5 flex flex-col gap-4'>
            <div className='flex gap-1.5 items-center p-2 border border-slate-200 rounded-md bg-slate-50'>
              <Megaphone className={typograhyClass.secondaryText} />
              <span
                className={typograhyClass.secondaryText}
                dangerouslySetInnerHTML={{
                  __html: t('admin_messenger_duplicatelogin_device_desc'),
                }}
              ></span>
            </div>

            <RadioGroup className='flex flex-col gap-5' value={duplicateLogInData}>
              {duplicateLogInOptions.map((option) => (
                <div className='flex gap-2' key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    onClick={() => setDuplicateLogInData(option.value)}
                  />
                  <Label className='cursor-pointer' htmlFor={option.value}>
                    {t(option.label)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        }
        footer={
          <Button onClick={handleSave} disabled={isUpdating}>
            <Save /> {t('admin_save_msg')}
          </Button>
        }
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

export default DuplicateLogIn;
