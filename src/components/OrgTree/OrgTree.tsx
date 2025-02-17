import React, { useContext, useEffect, useRef, useState } from 'react';
import { Tree } from 'react-arborist';
import OrgContext from './OrgContext';
import { useGetOrgData } from '@/hooks/useGetOrgData';
import { BaseResponse } from '@/types/api';
import { Department, SelectedOrgItem } from '@/types';
import { orgConfig, typograhyClass } from '@/constants';
import { optimizeDepartments } from '@/utils';
import Node from './Node';
import Loader from '../Loader';

export interface OrgTreeProps {
  keyword?: string;
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
  rootDepartment?: Department;
  openByDefault?: boolean; // Using to open folder by default
}

const OrgTree = (props: OrgTreeProps) => {
  const { sizes, keyword = '', rootDepartment, openByDefault = false } = props;

  const boxRef = useRef<any>(null);

  const { data: treeData, setData: setTreeData } = useContext(OrgContext) || {};

  const { data, isLoading, refetch } = useGetOrgData<BaseResponse<SelectedOrgItem[]>>(orgConfig.init.getParams({ keyword }), { enabled: false });

  useEffect(() => {
    refetch();
  }, [keyword]);

  useEffect(() => {
    if (data && data.success && data.rows) {
      setTreeData(optimizeDepartments(data.rows as Department[]));
    }
  }, [data]);

  return (
    <div className={`h-full overflow-y-auto ${typograhyClass.scrollBarStyles}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <div ref={boxRef} className='w-full h-full'>
          <Tree
            selectionFollowsFocus={false}
            data={treeData}
            width={'100%'}
            height={boxRef?.current?.offsetHeight}
            padding={10}
            className='org-tree-v2'
            idAccessor={'nodeId'}
            {...{ rowHeight: 32, ...sizes }}
          >
            {Node}
          </Tree>
        </div>
      )}
    </div>
  );
};

export default OrgTree;
