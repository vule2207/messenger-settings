import AppSidebar from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { typograhyClass } from '@/constants';
import { useAppStore } from '@/store';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  const { t } = useTranslation();
  const { currentMenu } = useAppStore();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full py-9 pr-9'>
        {/* <SidebarTrigger /> */}
        <div className='flex flex-col w-full h-full pt-3 px-8 pb-10 rounded-3xl bg-slate-50'>
          <h2 className='py-5'>
            <span className={typograhyClass.titleHeader}>{t(currentMenu?.title || '')}</span>
          </h2>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default PageLayout;
