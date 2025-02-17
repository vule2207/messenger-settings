import { MutableRefObject, SyntheticEvent, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { NodeRendererProps } from 'react-arborist';
import OrgContext from './OrgContext';
import { ChevronDown, ChevronRight, Folder, User } from 'lucide-react';
import { useGetOrgExpandData } from '@/hooks/useGetOrgData';
import { BaseResponse } from '@/types/api';
import { Department, SelectedOrgItem } from '@/types';
import { orgConfig } from '@/constants';
import { optimizeDepartments } from '@/utils';

export const UNIQUE_ID_KEY = 'nodeId';

const getNewTreeData = (treeData: any, curId: any, child: any) => {
  const loop = (data: any) => {
    return data.map((item: any) => {
      if (curId === item?.[UNIQUE_ID_KEY]) {
        return {
          ...item,
          children: child,
        };
      } else {
        if (item.children && item.children?.length > 0) {
          return {
            ...item,
            children: loop(item.children),
          };
        } else {
          return item;
        }
      }
    });
  };
  return loop(treeData);
};

const isCheckedAllChildren = (parent: any, selectedNodes: any[]) => {
  if (!parent || !selectedNodes) return false;
  const childrenKeyArr = selectedNodes.map((node: any) => {
    return node.data?.[UNIQUE_ID_KEY];
  });
  for (let child of parent?.children) {
    if (!childrenKeyArr.includes(child?.[UNIQUE_ID_KEY])) return false;
  }
  return true;
};

const selectOrDeselectAllChildren = (node: any, type: 'deselect' | 'selectMulti') => {
  if (node && node.children && node.children?.length > 0) {
    node.children.forEach((child: any) => {
      child[type]();
      if (child.data.isFolder && child.children && child.children?.length > 0) {
        selectOrDeselectAllChildren(child, type);
      }
    });
  }
};

const Node = (props: NodeRendererProps<any>) => {
  const { node, style, dragHandle, tree } = props;
  const { isLazy, children, key } = node.data;
  const uniqueId = node.data?.[UNIQUE_ID_KEY];
  // State
  const [enableLoadData, setEnableLoadData] = useState<boolean>(false);

  // Ref
  const inputRef: any = useRef(null);
  const listDataExpandRef: MutableRefObject<any> = useRef<any>({});

  // Context Org Tree
  const { data: treeData, setData: setTreeData, isAllChildGetParent, onChangeSelectDept, onChangeSelectUser } = useContext(OrgContext) || {};
  const hasChildren: boolean = node.data?.hasChildren || node.data?.isLazy;
  const departmentHasChildren: boolean = !!node.data?.children && Array.isArray(node.data?.children) && node.data?.children?.length > 0;

  const IconExpand = useMemo(() => {
    if (node.isOpen) {
      return <ChevronDown size={16} />;
    } else {
      return <ChevronRight size={16} />;
    }
  }, [node.isOpen]);

  const { mutate, isLoading } = useGetOrgExpandData<BaseResponse<SelectedOrgItem[]>>();

  const lazyLoad = () => {
    if (isLazy && ((children && children?.length === 0) || !children)) {
      mutate(orgConfig.expand.getParams({ idURL: key }), {
        onSuccess: (res) => {
          if (res && res.rows && res.rows?.length > 0) {
            const nTreeData = getNewTreeData([...treeData], node.data?.[UNIQUE_ID_KEY], optimizeDepartments(res.rows as Department[]));
            setTreeData(nTreeData);
            setEnableLoadData(false);
            node.open();
          }
        },
      });
    }
  };

  // useEffect(() => {
  //   if (currentKeyword !== keyword) {
  //     tree.deselectAll();
  //     setCurrentKeyword(keyword);
  //   }
  // }, [keyword]);

  // auto checked if it is in checked list
  useEffect(() => {
    if (node.parent?.isSelected) {
      node.selectMulti();
    }
  }, [node.parent?.isSelected]);

  // Handle get data user/dept when checked during expand/not expand
  const { depts, users } = useMemo(() => {
    let depts: any = {};
    let users: any = {};
    tree.selectedNodes.forEach((node: any) => {
      if (node.data.isFolder) {
        depts[node?.[UNIQUE_ID_KEY]] = node.data;
      } else {
        users[node?.[UNIQUE_ID_KEY]] = node.data;
      }
    });
    return { depts, users };
  }, [tree.selectedNodes]);

  // Handle auto change data user/dept when checked during expand/not expand >>> Case: Previous checked data is not in expand list
  useEffect(() => {
    onChangeSelectDept && onChangeSelectDept(depts);
    onChangeSelectUser && onChangeSelectUser(users);
  }, [depts, users]);

  const handleChecked = (event: any) => {
    event.stopPropagation();

    if (!event.target.checked) {
      node.deselect();
      if (node.parent && node.parent.level !== -1 && isAllChildGetParent) {
        node.parent.deselect();
      }
      if (isAllChildGetParent) {
        selectOrDeselectAllChildren(node, 'deselect');
      }
    } else {
      // if (expandOnCheck) {
      //   node.isInternal && node.toggle();
      //   lazyLoad();
      // }
      node.selectMulti();
      if (node.parent && node.parent.level !== -1) {
        if (isCheckedAllChildren(node.parent, tree.selectedNodes) && isAllChildGetParent) {
          node.parent.selectMulti();
        }
      }
      if (isAllChildGetParent) {
        selectOrDeselectAllChildren(node, 'selectMulti');
      }
    }

    let depts: any = {};
    let users: any = {};
    tree.selectedNodes.forEach((node: any) => {
      if (node.data.isFolder) {
        depts[node?.data?.[UNIQUE_ID_KEY]] = node.data;
      } else {
        users[node?.data?.[UNIQUE_ID_KEY]] = node.data;
      }
    });
    onChangeSelectDept && onChangeSelectDept(depts);
    onChangeSelectUser && onChangeSelectUser(users);
  };

  return (
    <div className='h-6 flex items-center cursor-pointer' style={style}>
      {hasChildren || departmentHasChildren ? (
        <div
          className='w-6 flex justify-center items-center'
          onClick={(event: SyntheticEvent) => {
            event.stopPropagation();
            node.isInternal && node.toggle();
            lazyLoad();
          }}
        >
          {isLoading ? (
            <div className='w-6 h-6 flex items-center justify-center'>
              <div className='w-4 h-4 border border-transparent animate-spin border-t-blue-500 rounded-full'></div>
            </div>
          ) : (
            <>{IconExpand}</>
          )}
        </div>
      ) : (
        <div className='w-6'></div>
      )}

      {!node.data.isRoot && (
        <div className='w-6 flex justify-center items-center cursor-pointer' onClick={(e) => e.stopPropagation()}>
          <input
            ref={inputRef}
            type='checkbox'
            className='cursor-pointer'
            checked={tree.isSelected(node?.data?.[UNIQUE_ID_KEY])}
            onChange={handleChecked}
          />
        </div>
      )}

      <div className='w-6 flex justify-center items-center'>
        {node.data.isFolder ? <Folder size={16} className='text-yellow-500' /> : <User size={16} className='text-blue-500' />}
      </div>
      <span
        className='ml-1'
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        {node.data.name}
      </span>
    </div>
  );
};

export default Node;
