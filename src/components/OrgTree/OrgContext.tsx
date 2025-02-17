import { ReactNode, createContext, useEffect, useState } from 'react';

import { isEmpty } from 'lodash';
import _ from 'lodash';
import { SelectedOrgItemList } from '@/types';
import useMoveTreeItem from './useMoveTreeItem';

interface OrgContextInterface {
  data: any;
  setData: any;
  onChangeSelectDept: any;
  onChangeSelectUser: any;
  isAllChildGetParent?: boolean;
}

const OrgContext = createContext<OrgContextInterface | null>(null);

interface OrgProviderProps {
  children: ReactNode;
  isAllChildGetParent?: boolean;
  onChangeSelectDept: (depts: SelectedOrgItemList) => void;
  onChangeSelectUser: (users: SelectedOrgItemList) => void;
}

export const OrgProvider = (props: OrgProviderProps) => {
  const { children, isAllChildGetParent = true, onChangeSelectDept, onChangeSelectUser } = props;

  const { data, setData, onMove } = useMoveTreeItem([]);

  return (
    <OrgContext.Provider
      value={{
        data,
        setData,
        isAllChildGetParent,
        onChangeSelectDept,
        onChangeSelectUser,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
};

export default OrgContext;
