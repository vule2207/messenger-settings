import { orgConfig } from '@/constants';
import { useGetOrgExpandData } from '@/hooks/useGetOrgData';
import { Department, SelectedOrgItem, SelectedOrgItemList } from '@/types';
import { BaseResponse } from '@/types/api';
import { isEmpty } from 'lodash';
import { ChevronDown, ChevronRight, Folder } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TreeNode from './TreeNode';

interface DepartmentItemProps {
  isExpand?: boolean;
  department: Department;
  userChoosed: SelectedOrgItemList;
  departmentChoosed: SelectedOrgItemList;
  parentDepartment?: Department;
  handleChoose: (dept: SelectedOrgItem | SelectedOrgItem[], isChecked?: boolean, children?: SelectedOrgItem[]) => void;
}
const DepartmentItem = (props: DepartmentItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { department, handleChoose, departmentChoosed = {}, userChoosed = {}, isExpand: defaultExpand = false } = props;

  const [isExpand, setIsExpand] = useState(defaultExpand);
  const [children, setChildren] = useState<SelectedOrgItem[]>(() => (department.children ? department.children : []));

  const { name, isLazy, key } = department;

  const isChecked = Object.keys(departmentChoosed)?.includes(department?.key as string);

  const { mutate, isLoading } = useGetOrgExpandData<BaseResponse<SelectedOrgItem[]>>();

  const isCheckedAllChildren = () => {
    if (!isEmpty(children)) {
      const deptKeyArr = Object.keys(departmentChoosed);
      const userKeyArr = Object.keys(userChoosed)?.map((_key) => _key?.split(' ')[0]);

      return children.every((child) => deptKeyArr.includes(child.key as string) || userKeyArr.includes(child.key as string));
    }
    return false;
  };

  useEffect(() => {
    if (isCheckedAllChildren()) {
      if (!Object.keys(departmentChoosed)?.includes(department.key as string)) {
        handleChoose && handleChoose({ ...department, isExpand: isExpand }, true);
      }
    } else {
      if (Object.keys(departmentChoosed)?.includes(department.key as string)) {
        handleChoose && handleChoose(department, false);
      }
    }
  }, [isCheckedAllChildren]);

  useEffect(() => {
    if (!isEmpty(children) && isExpand) {
      if (isChecked) {
        !isCheckedAllChildren() && handleChoose && handleChoose(children, true);
      } else {
        isCheckedAllChildren() && handleChoose && handleChoose(children, false);
      }
    }
  }, [isChecked, isExpand]);

  const lazyLoad = () => {
    if (isLazy || department?.children !== undefined) {
      if (children.length === 0) {
        if (isExpand) {
          setIsExpand(!isExpand);
        } else {
          mutate(orgConfig.expand.getParams({ idURL: key }), {
            onSuccess: (res) => {
              if (res && res.success && res.rows) {
                setChildren(orgConfig.expand.getValues(res.rows as Department[])!);
                setIsExpand(true);
              }
            },
          });
        }
      } else {
        setIsExpand(!isExpand);
      }
    } else {
      handleChoose && handleChoose(department);
    }
  };

  return (
    <div className=''>
      <div className='h-6 flex items-center cursor-pointer'>
        <div className='w-6 flex justify-center items-center' onClick={lazyLoad}>
          {isLoading ? (
            <div className='w-6 h-6 flex items-center justify-center'>
              <div className='w-4 h-4 border border-transparent animate-spin border-t-blue-500 rounded-full'></div>
            </div>
          ) : (
            <>{isExpand ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</>
          )}
        </div>

        {!department.isRoot && (
          <div className='w-6 flex justify-center items-center'>
            <input
              ref={inputRef}
              type='checkbox'
              checked={isChecked}
              onChange={(event) => {
                handleChoose && handleChoose({ ...department, isExpand: isExpand }, event.target.checked, isExpand ? children : undefined);
              }}
            />
          </div>
        )}

        <div className='w-6 flex justify-center items-center' onClick={() => inputRef.current?.click()}>
          <Folder size={16} className='text-yellow-500' />
        </div>
        <span
          className='ml-1'
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          {name}
        </span>
      </div>

      {children && (
        <div className='ml-3 pl-3 border-l'>
          {children.map((department) => (
            <TreeNode
              key={department.nodeId}
              node={department}
              isExpand={department.isRoot}
              handleChoose={handleChoose}
              userChoosed={userChoosed}
              departmentChoosed={departmentChoosed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentItem;
