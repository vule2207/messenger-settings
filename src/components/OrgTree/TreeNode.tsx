import { Department, SelectedOrgItem, SelectedOrgItemList } from '@/types';
import React from 'react';
import DepartmentItem from './DepartmentItem';
import UserItem from './UserItem';

interface TreeNodeProps {
  node: SelectedOrgItem;
  isExpand?: boolean;
  userChoosed: SelectedOrgItemList;
  departmentChoosed: SelectedOrgItemList;
  handleChoose: (dept: SelectedOrgItem | SelectedOrgItem[], isChecked?: boolean, children?: SelectedOrgItem[]) => void;
}

const TreeNode = ({ node, isExpand, userChoosed, departmentChoosed, handleChoose }: TreeNodeProps) => {
  const { isFolder } = node;
  return (
    <>
      {isFolder ? (
        <DepartmentItem
          isExpand={isExpand}
          department={node as Department}
          handleChoose={handleChoose}
          departmentChoosed={departmentChoosed}
          userChoosed={userChoosed}
        />
      ) : (
        <UserItem user={node} userChoosed={userChoosed} handleChoose={handleChoose} />
      )}
    </>
  );
};

export default TreeNode;
