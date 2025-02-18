import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { MESSAGE_TOKEN_API_TABS } from '@/types/enums';

export type TabItem = {
  id: MESSAGE_TOKEN_API_TABS;
  label: string;
};

interface HeaderTabsProps {
  tabs: TabItem[];
  className?: string;
  initActiveTab?: MESSAGE_TOKEN_API_TABS;
  onTabSelected: (tabId: MESSAGE_TOKEN_API_TABS) => void;
}

const HeaderTabs = ({ tabs, initActiveTab, onTabSelected }: HeaderTabsProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<MESSAGE_TOKEN_API_TABS>(initActiveTab || MESSAGE_TOKEN_API_TABS.USERS);

  return (
    <div className='h-[56px] w-[1000px] flex border border-slate-200 bg-white rounded-lg overflow-hidden'>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);
            onTabSelected(tab.id);
          }}
          className={cn(
            'flex-1 py-2 text-center font-medium border-b-2',
            activeTab === tab.id ? 'text-textBlue border-textBlue border-r-slate-200' : 'text-slate-500 border-b-white',
            index === 0 ? 'border-r' : '',
          )}
        >
          {t(tab.label)}
        </button>
      ))}
    </div>
  );
};
export default HeaderTabs;
