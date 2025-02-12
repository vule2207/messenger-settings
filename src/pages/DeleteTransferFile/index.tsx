import AlertDialog, { AlertDialogProps } from '@/components/AlertDialog';
import CardSection from '@/components/CardSection';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { apiURL, cronTimeOptions, typograhyClass } from '@/constants';
import useAlert from '@/hooks/useAlert';
import { useGetSettings } from '@/hooks/useGetSettings';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { CRON_TIME_VALUE } from '@/types/enums';
import { DeleteTransferFileDataType, DeleteTransferFileResponse } from '@/types';
import { Megaphone, Save, Trash2 } from 'lucide-react';
import { title } from 'process';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DeleteTransferFile = () => {
  const { t } = useTranslation();

  const [deleteTransferFileData, setDeleteTransferFileData] =
    useState<DeleteTransferFileDataType | null>(null);

  const [alertData, setAlertData] = useState<Omit<AlertDialogProps, 'setOpen'>>({
    open: false,
    title: '',
    content: '',
  });

  const [enabledUsedSpace, setEnabledUsedSpace] = useState<boolean>(false);

  const [DeleteConfirm, confirm] = useAlert(
    t('admin_messenger_del_transferfile_remove_files_except_thumbnails_msg'),
  );

  const { data, isLoading } = useGetSettings<DeleteTransferFileResponse>(
    apiURL.deleteTransferfile.data,
  );

  const { data: dataUsedSpace } = useGetSettings<DeleteTransferFileResponse>(
    `${apiURL.deleteTransferfile.getUsedSpace}?cron_time=${deleteTransferFileData?.cron_time}`,
    {
      enabled: enabledUsedSpace,
    },
  );

  const { mutate, isLoading: isUpdating } = useUpdateSettings<
    DeleteTransferFileResponse,
    { cron_time: CRON_TIME_VALUE }
  >(apiURL.deleteTransferfile.save, {
    onSuccess: (data) => {
      if (data && data.success) {
        setAlertData({ open: true, title: t('alert_success_msg'), content: data.msg || '' });
      }
    },
    onError: (err) => {
      console.log('err:', err);
    },
  });

  const { mutate: mutateDelete, isLoading: isDeleting } = useUpdateSettings<
    DeleteTransferFileResponse,
    {}
  >(apiURL.deleteTransferfile.delete, {
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
    if (data && data.success) {
      setDeleteTransferFileData({ cron_time: data.cron_time, used_space: data.used_space });
    }
  }, [data]);

  useEffect(() => {
    if (data && data.success) {
      setDeleteTransferFileData(
        (prev) => ({ ...prev, used_space: data.used_space }) as DeleteTransferFileDataType,
      );
      setEnabledUsedSpace(false);
    }
  }, [dataUsedSpace]);

  const handleSave = () => {
    mutate({ cron_time: deleteTransferFileData?.cron_time as CRON_TIME_VALUE });
  };

  const handleDelete = async () => {
    const ans = await confirm({ title: t('common_delete_msg') });
    if (ans) {
      mutateDelete({});
    }
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
                  __html: t('admin_messenger_del_transferfile_text'),
                }}
              ></span>
            </div>

            <Select
              value={deleteTransferFileData?.cron_time?.toString()}
              onValueChange={(val) => {
                setDeleteTransferFileData(
                  (prev) => ({ ...prev, cron_time: Number(val) }) as DeleteTransferFileDataType,
                );
                setEnabledUsedSpace(true);
              }}
            >
              <SelectTrigger className=''>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {cronTimeOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      className='cursor-pointer'
                      value={option.value.toString()}
                    >
                      {t(option.label)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        }
        footer={
          <div className='flex gap-2'>
            <Button onClick={handleDelete} disabled={isUpdating}>
              <Trash2 /> {t('admin_messenger_del_transferfile_remove_files_except_thumbnails')}
            </Button>
            <Button onClick={handleSave} disabled={isUpdating}>
              <Save /> {t('admin_save_msg')}
            </Button>
          </div>
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

      <DeleteConfirm />
    </>
  );
};

export default DeleteTransferFile;
