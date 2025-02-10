import CardSection from '@/components/CardSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiURL, typograhyClass } from '@/constants';
import { Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import meesengerTop from '@/assets/images/messenger_top.gif';
import { useActionState, useEffect } from 'react';
import { axiosGet, Headers } from '@/utils/axios/api';
import { BaseResponse } from '@/types/api';

const getTitle = async (prevTitle: string) => {
  const data = await axiosGet<BaseResponse<string>>(apiURL.titleSettings.data, {}, Headers);
  if (data?.success && data.rows) {
    return data.rows;
  } else {
    return prevTitle;
  }
};
const TitleSettings = () => {
  const { t } = useTranslation();
  // const [title, setTitle, isPending] = useActionState<string>(getTitle, '');
  // console.log('title:', title);

  const getTitle = async () => {
    const data = await axiosGet<BaseResponse<string>>(apiURL.titleSettings.data);
    if (data?.success && data.rows) {
      console.log('data:', data);
      // return data.rows;
    }
  };

  useEffect(() => {
    getTitle();
  }, []);

  return (
    <div className='flex-grow'>
      <CardSection
        content={
          <div className='mt-5 flex flex-col gap-4'>
            <Input />
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
          <Button>
            <Save /> {t('admin_save_msg')}
          </Button>
        }
      />
    </div>
  );
};

export default TitleSettings;
