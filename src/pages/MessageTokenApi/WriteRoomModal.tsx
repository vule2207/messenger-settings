import BaseModal from '@/components/BaseModal';
import Loader from '@/components/Loader';
import SearchSelect from '@/components/SearchSelect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { apiURL, typograhyClass } from '@/constants';
import useAlert from '@/hooks/useAlert';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { cn } from '@/lib/utils';
import { BaseResponse } from '@/types/api';
import { WRITE_MODE } from '@/types/enums';
import { Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectOrgUser from './SelectOrgUser';

type WriteFormType = {
  apiroomno?: string;
  apiuserno?: string;
  room_key?: string;
  room_name: string;
  api_user: any;
  users?: any[];
  first_message: string;
  description: string;
};

interface WriteRoomModalProps {
  value: WriteFormType;
  mode: WRITE_MODE;
  open: boolean;
  onClose: (success?: boolean) => void;
}

const WriteRoomModal = ({ value, mode, open, onClose }: WriteRoomModalProps) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<WriteFormType>(
    value || {
      room_name: '',
      api_user: { name: '', userno: '' },
      users: undefined,
      first_message: '',
      description: '',
    },
  );

  const [DeleteConfirm, confirm] = useAlert(t('approval_memo_warning_delete'));

  const { mutate, isLoading } = useUpdateSettings<BaseResponse, any>(apiURL.messageTokenApi.rooms.update);

  const { mutate: mDelete, isLoading: isDeleting } = useUpdateSettings<BaseResponse, any>(apiURL.messageTokenApi.rooms.delete);

  const handleSaveGroup = () => {
    const params =
      mode === WRITE_MODE.ADD
        ? formData
        : {
            room_name: formData.room_name,
            description: formData.description,
            apiroomno: formData.apiroomno,
          };
    mutate(params, {
      onSuccess: (res) => {
        if (res && res.success) {
          onClose && onClose(res.success);
        }
      },
    });
  };

  const handleDelete = async () => {
    const ans = await confirm({ title: t('common_delete_msg') });
    if (!ans) return;
    mDelete(
      { apiroomno: formData.apiroomno },
      {
        onSuccess: (res) => {
          if (res && res.success) {
            onClose && onClose(res.success);
          }
        },
      },
    );
  };

  const Body = (
    <div className='relative flex flex-col gap-4'>
      {(isLoading || isDeleting) && (
        <div className='w-full h-full absolute'>
          <Loader />
        </div>
      )}
      {/* name */}
      <div className={cn('grid grid-cols-12 gap-4')}>
        <div className='flex flex-col gap-2 col-span-3 justify-center'>
          <Label htmlFor={'room_name'} className=''>
            {t('admin_mac_names')}
            <span className='text-red-500'>*</span>
          </Label>
        </div>
        <Input
          value={formData?.room_name}
          className='w-full col-span-9'
          onChange={(e) => setFormData((prev) => ({ ...prev, room_name: e.target.value }))}
        />
      </div>

      {/* token user */}
      <div className={cn('grid grid-cols-12 gap-4')}>
        <div className='flex flex-col gap-2 col-span-3 justify-center'>
          <Label htmlFor={'api_user'} className=''>
            {t('admin_messenger_token_api_token_user')}
            <span className='text-red-500'>*</span>
          </Label>
        </div>
        <div className='col-span-9'>
          <SearchSelect
            mode={mode}
            value={mode === WRITE_MODE.UPDATE ? formData.apiuserno : undefined}
            apiUrl={apiURL.messageTokenApi.users.list}
            onChange={(data) =>
              setFormData((prev) => ({
                ...prev,
                api_user: {
                  name: data.username,
                  userno: data.apiuserno,
                },
              }))
            }
          />
        </div>
      </div>

      {/* users list */}
      <div className={cn('grid grid-cols-12 gap-4')}>
        <div className='flex flex-col gap-2 col-span-3 justify-center'>
          <Label htmlFor={'users'} className=''>
            {t('manager_list_user')}
            <span className='text-red-500'>*</span>
          </Label>
          <span className={typograhyClass.secondaryText}>{t('admin_messenger_token_api_least_2_users')}</span>
        </div>
        <div className='col-span-9'>
          <SelectOrgUser
            mode={mode}
            onChange={(data) => {
              const nData = Object.values(data).map((item) => ({
                usercn: item.cn,
                userno: item.userno,
                id: item.id,
              }));
              setFormData((prev) => ({ ...prev, users: nData }));
            }}
          />
        </div>
      </div>

      {/* first message */}
      {mode === WRITE_MODE.ADD && (
        <div className={cn('grid grid-cols-12 gap-4')}>
          <div className='flex flex-col gap-2 col-span-3 justify-center'>
            <Label htmlFor={'first_message'} className=''>
              {t('admin_messenger_token_api_first_message')}
              <span className='text-red-500'>*</span>
            </Label>
          </div>
          <Input
            value={formData?.first_message}
            className='w-full col-span-9'
            onChange={(e) => setFormData((prev) => ({ ...prev, first_message: e.target.value }))}
          />
        </div>
      )}

      {/* description */}
      <div className={cn('grid grid-cols-12 gap-4')}>
        <div className='flex flex-col gap-2 col-span-3 justify-center'>
          <Label htmlFor={'description'} className=''>
            {t('admin_usb_auth_memo')}
          </Label>
        </div>
        <Textarea
          value={formData?.description}
          className='w-full col-span-9'
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className='flex justify-between items-center'>
        {mode === WRITE_MODE.UPDATE ? (
          <Button type='submit' variant={'default'} size={'sm'} className='w-[100px]' onClick={handleDelete} disabled={isLoading || isDeleting}>
            <Trash2 /> {t('admin_messenger_token_api_room_out')}
          </Button>
        ) : (
          <div className='w-2'></div>
        )}
        <div className='flex justify-end gap-2'>
          <Button type='submit' variant={'default'} size={'sm'} className='w-[100px]' onClick={handleSaveGroup} disabled={isLoading || isDeleting}>
            <Save /> {t('admin_save_msg')}
          </Button>
          <Button size={'sm'} className='w-[100px]' onClick={() => onClose()} disabled={isLoading || isDeleting}>
            <X /> {t('common_close_msg')}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <BaseModal open={open} onClose={onClose} header={<>{t('admin_messenger_token_api_create_room')}</>} body={Body} />
      <DeleteConfirm />
    </>
  );
};

export default WriteRoomModal;
