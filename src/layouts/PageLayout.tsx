import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';
import { apiURL, COOKIES_HANBIR0_INTEGRATE, typograhyClass } from '@/constants';
import { useGetSettings } from '@/hooks/useGetSettings';
import { cn } from '@/lib/utils';
import { routes } from '@/routes';
import { GlobalConfig, useAppStore } from '@/store';
import { BaseResponse } from '@/types/api';
import { RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

const PageLayout = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [cookies] = useCookies();

  const { setGlobalConfig, currentMenu, setCurrentMenu, setRefresh } = useAppStore();

  const showRefreshBtn = ['usersloggedin', 'accesshistory'].some((item) => pathname.includes(item));

  const { data, isLoading } = useGetSettings<BaseResponse<GlobalConfig>>(apiURL.globalConfig);

  useEffect(() => {
    if (data && data.success && data.rows) {
      setGlobalConfig(data.rows);
    }
  }, [data]);

  useEffect(() => {
    const cMenu = routes.find((route) => pathname.includes(route.path));
    if (cMenu) {
      setCurrentMenu({ title: cMenu.subTitle || cMenu.title, url: cMenu.path });
    }
  }, [pathname]);

  return (
    <SidebarProvider>
      {(!cookies[COOKIES_HANBIR0_INTEGRATE] || cookies[COOKIES_HANBIR0_INTEGRATE] != 1) && <AppSidebar />}
      <main className={cn('w-full h-screen py-9 pr-9', cookies[COOKIES_HANBIR0_INTEGRATE] == 1 ? 'px-9' : '')}>
        {/* <SidebarTrigger /> */}
        <div className='flex flex-col w-full h-full pt-3 px-8 pb-10 rounded-3xl bg-slate-50'>
          <div className='flex justify-between items-center'>
            <h2 className='py-5'>
              <span dangerouslySetInnerHTML={{ __html: t(currentMenu?.title || '') }} className={typograhyClass.titleHeader}></span>
            </h2>
            {showRefreshBtn && (
              <Button variant={'secondary'} className='px-3 text-slate-700' onClick={() => setRefresh && setRefresh()}>
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
