import { orgConfig, typograhyClass } from '@/constants';
import { useGetOrgData } from '@/hooks/useGetOrgData';
import { Department, SelectedOrgItem, SelectedOrgItemList } from '@/types';
import { BaseResponse } from '@/types/api';
import { optimizeDepartments } from '@/utils';
import { Loader, Users } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Tree } from 'react-arborist';
import { useTranslation } from 'react-i18next';
import SearchInput from '../SearchInput';
import Node from './Node';
import OrgContext, { OrgProvider } from './OrgContext';
import OrgTree from './OrgTree';

interface OrgTreeV2Props {
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

const OrgTreeV2 = (props: OrgTreeV2Props) => {
  const { onChangeSelectDept, onChangeSelectUser, sizes } = props;
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState<string>('');

  return (
    <OrgProvider onChangeSelectDept={onChangeSelectDept} onChangeSelectUser={onChangeSelectUser}>
      <div className='w-full h-full bg-white border rounded-2xl overflow-hidden flex flex-col !text-sm'>
        <div className='px-4 h-[50px] bg-slate-700 text-white items-center flex gap-2 font-semibold'>
          <Users />
          {t('hr_org_tree')}
        </div>
        <div className='p-4 flex flex-col gap-3 !h-[calc(100%-50px)]'>
          <SearchInput fullWidth isSearchByEnter onChange={(val) => setKeyword(val)} />
          <OrgTree keyword={keyword} />
        </div>
      </div>
    </OrgProvider>
  );
};

export default OrgTreeV2;
