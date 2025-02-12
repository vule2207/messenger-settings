import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';
import { typograhyClass } from '@/constants';
import { routes } from '@/routes';
import { useAppStore } from '@/store';
import { RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

const PageLayout = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { currentMenu, setCurrentMenu, setRefresh } = useAppStore();

  const showRefreshBtn = ['usersloggedin', 'accesshistory'].some((item) => pathname.includes(item));

  useEffect(() => {
    const cMenu = routes.find((route) => pathname.includes(route.path));
    if (cMenu) {
      setCurrentMenu({ title: cMenu.title, url: cMenu.path });
    }
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full h-screen py-9 pr-9'>
        {/* <SidebarTrigger /> */}
        <div className='flex flex-col w-full h-full pt-3 px-8 pb-10 rounded-3xl bg-slate-50'>
          <div className='flex justify-between items-center'>
            <h2 className='py-5'>
              <span className={typograhyClass.titleHeader}>{t(currentMenu?.title || '')}</span>
            </h2>
            {showRefreshBtn && (
              <Button
                variant={'secondary'}
                className='px-3'
                onClick={() => setRefresh && setRefresh()}
              >
                <RefreshCcw />
              </Button>
            )}
          </div>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default PageLayout;
