import BaseField from '@/components/BaseField';
import BaseModal from '@/components/BaseModal';
import SearchSelect from '@/components/SearchSelect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiURL } from '@/constants';
import { Save, X } from 'lucide-react';
import { ReactNode, useActionState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectOrgUser from './SelectOrgUser';
import { Textarea } from '@/components/ui/textarea';
import { SelectedOrgItemList } from '@/types';

interface WriteRoomModalProps {
  open: boolean;
  onClose: () => void;
}

const WriteRoomModal = ({ open, onClose }: WriteRoomModalProps) => {
  const { t } = useTranslation();
  const [state, formAction] = useActionState((prevState: any, formData: any) => {
    console.log('formData:', formData.entries());
    return formData.entries();
  }, {});

  const formConfig = [
    { name: 'room_name', title: 'admin_mac_names', isRequired: true },
    {
      name: 'api_user',
      title: 'admin_messenger_token_api_token_user',
      isRequired: true,
      component: SearchSelect,
      componentProps: {
        apiUrl: apiURL.messageTokenApi.users.list,
        onChange: (data: any) => formAction(new FormData().append('api_user', data.apiuserno)),
      },
    },
    {
      name: 'users',
      title: 'manager_list_user',
      subTitle: 'admin_messenger_token_api_least_2_users',
      isRequired: true,
      component: SelectOrgUser,
      componentProps: {
        value: '',
        onChange: (data: SelectedOrgItemList) => {
          const form = new FormData();
          Object.values(data).forEach((value) => {});
        },
      },
    },
    { name: 'first_message', title: 'admin_messenger_token_api_first_message', isRequired: true },
    {
      name: 'description',
      title: 'admin_usb_auth_memo',
      component: Textarea,
      componentProps: {},
    },
  ];

  const Body = (
    <form action={formAction} className='flex flex-col gap-4'>
      {formConfig.map((item) => (
        <BaseField
          key={item.name}
          name={item.name}
          title={t(item.title)}
          subTitle={t(item.subTitle as string)}
          required={item.isRequired}
          Component={item.component}
          componentProps={item.componentProps}
        />
      ))}
      <div className='flex justify-end gap-2'>
        <Button type='submit' variant={'default'} size={'sm'} className='w-[100px]'>
          <Save /> {t('admin_save_msg')}
        </Button>
        <Button size={'sm'} className='w-[100px]' onClick={onClose}>
          <X /> {t('common_close_msg')}
        </Button>
      </div>
    </form>
  );

  return <BaseModal open={open} onClose={onClose} header={<>{t('admin_messenger_token_api_create_room')}</>} body={Body} />;
};

export default WriteRoomModal;
