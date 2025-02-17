import { orgConfig, typograhyClass } from '@/constants';
import { Department, SelectedOrgItem, SelectedOrgItemList } from '@/types';
import { BaseResponse } from '@/types/api';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader';
import SearchInput from '../SearchInput';
import TreeNode from './TreeNode';
import { useGetOrgData } from '@/hooks/useGetOrgData';
import TreeView from './TreeView';
import { optimizeDepartments } from '@/utils';

interface OrgTreeProps {
  onChangeDepts?: (depts: SelectedOrgItemList) => void;
  onChangeUsers?: (users: SelectedOrgItemList) => void;
}

const OrgTree = ({ onChangeDepts, onChangeUsers }: OrgTreeProps) => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');

  const { data, isLoading, refetch } = useGetOrgData<BaseResponse<SelectedOrgItem[]>>(orgConfig.init.getParams({ keyword }), { enabled: false });

  useEffect(() => {
    refetch();
  }, [keyword]);

  return (
    <div className='w-full h-full bg-white border rounded-2xl overflow-hidden flex flex-col !text-sm'>
      <div className='px-4 h-[50px] bg-slate-700 text-white items-center flex gap-2 font-semibold'>
        <Users />
        {t('hr_org_tree')}
      </div>
      <div className='p-4 flex flex-col gap-3 !h-[calc(100%-50px)]'>
        <SearchInput fullWidth isSearchByEnter onChange={(val) => setKeyword(val)} />
        <div className={`h-full overflow-y-auto ${typograhyClass.scrollBarStyles}`}>
          {isLoading ? (
            <Loader />
          ) : (
            <TreeView data={optimizeDepartments(data?.rows as Department[])!} onChangeDepts={onChangeDepts} onChangeUsers={onChangeUsers} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgTree;
