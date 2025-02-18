import BaseModal from '@/components/BaseModal';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { apiURL } from '@/constants';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { cn } from '@/lib/utils';
import { BaseResponse } from '@/types/api';
import { WRITE_MODE } from '@/types/enums';
import { Save, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type WriteFormType = { username: string; description: string };

interface WriteUserModalProps {
  value: WriteFormType;
  mode: WRITE_MODE;
  open: boolean;
  onClose: (success?: boolean) => void;
}

const WriteUserModal = ({ value, mode, open, onClose }: WriteUserModalProps) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<WriteFormType>(
    value || {
      username: '',
      description: '',
    },
  );

  const { mutate, isLoading } = useUpdateSettings<BaseResponse, any>(apiURL.messageTokenApi.users.update);

  const handleSaveGroup = () => {
    mutate(formData, {
      onSuccess: (res) => {
        if (res && res.success) {
          onClose && onClose(res.success);
        }
      },
    });
  };

  const Body = (
    <div className='relative flex flex-col gap-4'>
      {isLoading && (
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
          value={formData?.username}
          className='w-full col-span-9'
          onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
        />
      </div>

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

      <div className='flex justify-end gap-2'>
        <Button type='submit' variant={'default'} size={'sm'} className='w-[100px]' onClick={handleSaveGroup} disabled={isLoading}>
          <Save /> {t('admin_save_msg')}
        </Button>
        <Button size={'sm'} className='w-[100px]' onClick={() => onClose()} disabled={isLoading}>
          <X /> {t('common_close_msg')}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <BaseModal open={open} onClose={onClose} header={<>{t('admin_messenger_token_api_create_user')}</>} body={Body} />
    </>
  );
};

export default WriteUserModal;
