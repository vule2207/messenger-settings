import { orgConfig } from '@/constants';
import { useGetOrgExpandData } from '@/hooks/useGetOrgData';
import { Department, User } from '@/types';
import { BaseResponse } from '@/types/api';
import { isEmpty } from 'lodash';
import { ChevronDown, ChevronRight, Folder, User as UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface TreeNodeProps {
  node: Department | User;
  onToggle: (node: Department | User) => void;
  onSelect: (node: Department | User, checked: boolean) => void;
  parentChecked?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onToggle, onSelect, parentChecked }) => {
  const [expanded, setExpanded] = useState(!isEmpty(node.children));
  const [children, setChildren] = useState<(Department | User)[]>(node.children || []);
  const [checked, setChecked] = useState(parentChecked || false);

  const { mutate, isLoading } = useGetOrgExpandData<BaseResponse>();

  useEffect(() => {
    setChecked(parentChecked || false);
    if (parentChecked) {
      children.forEach((child) => onSelect(child, true));
    }
  }, [parentChecked, children]);

  useEffect(() => {
    if (children?.length > 0) {
      const allChecked = children.every((child) => (child as any).checked);
      setChecked(allChecked);
      // onSelect(node, allChecked);
    }
  }, [children]);

  const fetchChildren = () => {
    if (node.isLazy && isEmpty(children)) {
      mutate(
        { idURL: node.key },
        {
          onSuccess: (res) => {
            if (res && res.success) {
              setChildren(orgConfig.expand.getValues(res.rows));
            }
          },
        },
      );
    }
  };

  const handleToggle = () => {
    setExpanded(!expanded);
    if (!expanded) fetchChildren();
    onToggle(node);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    onSelect(node, isChecked);
    children.forEach((child) => onSelect(child, isChecked));
  };

  return (
    <div className=''>
      <div className='h-6 flex items-center cursor-pointer'>
        {node.isFolder ? (
          <div className='w-6 flex justify-center items-center'>
            {isLoading ? (
              <div className='w-6 h-6 flex items-center justify-center'>
                <div className='w-4 h-4 border border-transparent animate-spin border-t-blue-500 rounded-full'></div>
              </div>
            ) : (
              <>{expanded ? <ChevronDown size={16} onClick={handleToggle} /> : <ChevronRight size={16} onClick={handleToggle} />}</>
            )}
          </div>
        ) : (
          <div className='w-6 h-6' />
        )}
        <div className='w-6 flex justify-center items-center'>
          <input type='checkbox' checked={checked} onChange={handleCheck} />
        </div>
        <div className='w-6 flex justify-center items-center'>
          {node.isFolder ? <Folder size={16} className='text-yellow-500' /> : <UserIcon size={16} className='mr-1 text-blue-500' />}
        </div>
        <span className='ml-1' onClick={handleToggle}>
          {node.name || 'Unknown'}
        </span>
      </div>
      {expanded && children.length > 0 && (
        <div className='ml-3 pl-3 border-l'>
          {children.map((child) => (
            <TreeNode key={child.id} node={child} onToggle={onToggle} onSelect={onSelect} parentChecked={checked} />
          ))}
        </div>
      )}
    </div>
  );
};

interface TreeViewProps {
  data: (Department | User)[];
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const [users, setUsers] = useState<{ [x: string]: User }>({});
  const [depts, setDepts] = useState<{ [x: string]: Department }>({});
  console.log('Users: ', users);
  console.log('Depts: ', depts);

  const handleToggle = (node: Department | User) => {
    console.log('Toggled node:', node);
  };

  const handleSelect = (node: Department | User, checked: boolean) => {
    if (node.isFolder) {
      setDepts((prev) => {
        if (checked) {
          return { ...prev, [node.key as string]: node as Department };
        } else {
          delete prev?.[node.key as string];
          return prev;
        }
      });
    } else {
      setUsers((prev) => {
        if (checked) {
          return { ...prev, [node.key as string]: node as User };
        } else {
          delete prev?.[node.key as string];
          return prev;
        }
      });
    }
  };

  return (
    <div className='w-full'>
      {data.length > 0 && data.map((node) => <TreeNode key={node.id} node={node} onToggle={handleToggle} onSelect={handleSelect} />)}
    </div>
  );
};

export default TreeView;
