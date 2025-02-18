import { SelectedOrgItemList } from '@/types';
import { Users } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchInput from '../SearchInput';
import { OrgProvider } from './OrgContext';
import TreeView from './TreeView';
import { cn } from '@/lib/utils';

interface OrgTreeProps {
  treeClass?: string;
  onChangeSelectDept: (depts: SelectedOrgItemList) => void;
  onChangeSelectUser: (users: SelectedOrgItemList) => void;
  sizes?: {
    rowHeight?: number;
    overscanCount?: number;
    width?: number | string;
    height?: number;
    indent?: number;
    paddingTop?: number;
    paddingBottom?: number;
    padding?: number;
  };
}

const OrgTree = (props: OrgTreeProps) => {
  const { onChangeSelectDept, onChangeSelectUser, sizes, treeClass = '' } = props;
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState<string>('');

  return (
    <OrgProvider onChangeSelectDept={onChangeSelectDept} onChangeSelectUser={onChangeSelectUser}>
      <div className={cn('w-full h-full bg-white border rounded-2xl overflow-hidden flex flex-col !text-sm', treeClass)}>
        <div className='px-4 h-[50px] bg-slate-700 text-white items-center flex gap-2 font-semibold'>
          <Users />
          {t('hr_org_tree')}
        </div>
        <div className='p-4 flex flex-col gap-3 !h-[calc(100%-50px)]'>
          <SearchInput fullWidth isSearchByEnter onChange={(val) => setKeyword(val)} />
          <TreeView keyword={keyword} sizes={sizes} />
        </div>
      </div>
    </OrgProvider>
  );
};

export default OrgTree;
