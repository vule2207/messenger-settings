import { orgConfig, typograhyClass } from '@/constants';
import { useGetOrgData } from '@/hooks/useGetOrgData';
import { Department, SelectedOrgItem } from '@/types';
import { BaseResponse } from '@/types/api';
import { optimizeDepartments } from '@/utils';
import { useContext, useEffect, useRef } from 'react';
import { Tree } from 'react-arborist';
import Loader from '../Loader';
import Node from './Node';
import OrgContext from './OrgContext';

export interface TreeViewProps {
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

const TreeView = (props: TreeViewProps) => {
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
    <div className={`h-full overflow-y-auto`}>
      {isLoading ? (
        <Loader />
      ) : (
        <div ref={boxRef} className='w-full h-full'>
          <Tree
            padding={10}
            width={'100%'}
            data={treeData}
            selectionFollowsFocus={false}
            height={boxRef?.current?.offsetHeight}
            className={typograhyClass.scrollBarStyles}
            idAccessor={'nodeId'}
            {...{ rowHeight: 24, ...sizes }}
          >
            {Node}
          </Tree>
        </div>
      )}
    </div>
  );
};

export default TreeView;
