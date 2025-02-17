import { Department, SelectedOrgItem, SelectedOrgItemList, User } from '@/types';
import React, { useRef, useState } from 'react';
import TreeNode from './TreeNode';
import { isArray, isEmpty } from 'lodash';
import { unCheckedParentFolder } from '@/utils';

interface TreeViewProps {
  data: Department[];
  onChangeDepts?: (depts: SelectedOrgItemList) => void;
  onChangeUsers?: (users: SelectedOrgItemList) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onChangeUsers, onChangeDepts }) => {
  const allRef = useRef({});

  const [users, setUsers] = useState<{ [x: string]: User }>({});
  const [depts, setDepts] = useState<{ [x: string]: Department }>({});

  const handleChoose = (item: SelectedOrgItem | SelectedOrgItem[], checked?: boolean, children?: SelectedOrgItem[]) => {
    const nDepts = { ...depts };
    const nUsers = { ...users };

    if (isArray(item)) {
      item.forEach((_item) => {
        const key = _item.key;
        if (checked) {
          if (_item.isFolder) {
            nDepts[key as string] = _item as Department;
          } else {
            nUsers[key as string] = _item;
          }
        } else {
          if (_item.isFolder) {
            delete nDepts[key as string];
          } else {
            delete nUsers[key as string];
          }
        }
      });
    } else {
      if (checked) {
        if (item.isFolder) {
          nDepts[item.key as string] = item as Department;
          if (!isEmpty(children) && isArray(children)) {
            children.forEach((child) => {
              const nKey = child.key as string;
              if (child.isFolder) {
                nDepts[nKey] = child as Department;
              } else {
                nUsers[nKey] = child;
              }
            });
          }
        } else {
          nUsers[item.key as string] = item;
        }
      } else {
        if (item.isFolder) {
          delete nDepts[item.key as string];
          const nKey = unCheckedParentFolder(item, nDepts);
          if (nKey) {
            delete nDepts[nKey];
          }
          if (!isEmpty(children) && isArray(children)) {
            children.forEach((child) => {
              if (child.isFolder) {
                delete nDepts[child.key as string];
              } else {
                const uKey = child.key as string;
                delete nUsers[uKey];
              }
            });
          }
        } else {
          const key = item.key as string;
          delete nUsers[key];
          const nKey = unCheckedParentFolder(item, nDepts);
          if (nKey) {
            delete nDepts[nKey];
          }
        }
      }
    }

    setDepts(nDepts);
    onChangeDepts && onChangeDepts(nDepts);
    setUsers(nUsers);
    onChangeUsers && onChangeUsers(nUsers);
    allRef.current = { ...nDepts, ...nUsers };
  };

  return (
    <div className='w-full'>
      {data?.length > 0 &&
        data.map((node) => (
          <TreeNode key={node.nodeId} isExpand={node.isRoot} node={node} userChoosed={users} departmentChoosed={depts} handleChoose={handleChoose} />
        ))}
    </div>
  );
};

export default TreeView;
