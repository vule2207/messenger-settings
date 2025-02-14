import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SelectedUsers = () => {
  const { t } = useTranslation();
  return (
    <div className='w-full h-full bg-white border rounded-2xl overflow-hidden flex flex-col'>
      <div className='px-4 h-[50px] bg-slate-700 text-white flex items-center gap-2 font-semibold'>
        <User />
        {t('holiday_adminreg_menu')}
      </div>
      <div className='p-4 flex flex-col gap-3'></div>
    </div>
  );
};

export default SelectedUsers;
