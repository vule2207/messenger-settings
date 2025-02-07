import { ChevronRight, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { routes } from '@/routes';
import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useTranslation } from 'react-i18next';

const AppSidebar = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { currentMenu, setCurrentMenu } = useAppStore();

  useEffect(() => {
    if (!currentMenu) {
      const cMenu = routes.find((route) => pathname.includes(route.path));
      if (cMenu) {
        setCurrentMenu({ title: cMenu.title, url: cMenu.path });
      }
    }
  }, []);

  return (
    <Sidebar className='sidebar-menu'>
      <SidebarContent className='!text-base'>
        <Collapsible defaultOpen className='group/collapsible'>
          <SidebarGroup className='p-2 pl-3'>
            <SidebarGroupLabel
              asChild
              className='border border-transparent hover:border-slate-200 hover:bg-blue-50 transition-all duration-300'
            >
              <CollapsibleTrigger className='flex gap-2 !h-[50px] text-caps_blue'>
                <ChevronRight className='!size-5 group-data-[state=open]/collapsible:rotate-90' />
                <MessageCircle className='!size-5' />
                <p className='!text-base'>{t('admin_menu_messenger_msg')}</p>
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className='pl-2'>
              <SidebarGroupContent>
                <SidebarMenu className='pl-4'>
                  {routes.map((route) => (
                    <SidebarMenuItem key={route.path} className='py-1'>
                      <SidebarMenuButton
                        isActive={currentMenu?.url === route.path}
                        asChild
                        className={`!text-base ${currentMenu?.url === route.path ? '!opacity-8 !bg-transparent' : 'text-slate-500'}`}
                      >
                        <Link
                          to={route.path}
                          onClick={() => {
                            if (currentMenu?.title !== route.path) {
                              setCurrentMenu({ title: route.title, url: route.path });
                            }
                          }}
                        >
                          <span
                            className={`!text-base ${currentMenu?.url === route.path ? 'text-caps_blue !opacity-8 !bg-transparent' : 'text-slate-500'}`}
                          >
                            {t(route.title)}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
