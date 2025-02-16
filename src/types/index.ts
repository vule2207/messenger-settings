import { BaseResponse } from './api';
import { CRON_TIME_VALUE, DUPLICATE_LOGIN_VALUE } from './enums';

export type PunchDataResponseType = {
  punch: string | number;
  punch_on_work_day: string | number;
};

export type TimeSettingsResponseType = {
  value: string | number;
  checktype: string;
};

export type PunchDataType = {
  punch: boolean;
  punch_on_work_day: boolean;
};

export type TimeOptionsType<TValue = string> = {
  value: TValue;
  label: string;
  isTime?: boolean;
};

export interface DuplicateLogInResponse<T = any> extends BaseResponse<T> {
  value: DuplicateLogInDataType;
}

export type DuplicateLogInDataType = DUPLICATE_LOGIN_VALUE;

export interface DeleteTransferFileResponse<T = any> extends BaseResponse<T> {
  cron_time: CRON_TIME_VALUE;
  used_space: string;
}

export type DeleteTransferFileDataType = {
  cron_time: CRON_TIME_VALUE;
  used_space: string;
};

export type AvailableUserItemType = {
  user_no: string;
  user_name: string;
  user_cn: string;
  status_text: string;
  status: string | number;
  dept: string;
  device: string[];
  device_text: string[];
};

export interface AccessHistoryResponse<T> extends BaseResponse<T> {
  attr: {
    curpage: number;
    limit: number;
    maxpage: number;
    total: string | number;
  };
}

export type AccessHistoryItemType = {
  userid: string;
  name: string;
  access: string;
  user_agent: string;
  type: string;
  remote_ip: string;
  proxy_ip: string;
  lhseq: string;
};

export type AccessHistoryGetParams = {
  page: number;
  limit: number;
  keyword: string;
};

export interface AccessHistoryExportResponse<T = any> extends BaseResponse<T> {
  cn: string;
  count: string | number;
  from: any;
  to: any;
  keyword: boolean;
  lang: string;
  page: number;
  time: number;
  total: string | number;
}

export interface AccessHistoryExportCheckResponse<T = any> extends AccessHistoryExportResponse<T> {
  percent: string | number;
  file: string;
}

export type AccessHistoryExportParamsType = {
  page: number;
  limit: number;
  total: boolean;
  count: number;
  keyword?: string;
};

export type OrgTreeParamsType = {
  contact: number;
  tree: string;
  keyword?: string;
  idURL?: string;
};

export interface Department {
  isFolder: true;
  isLazy: boolean;
  children?: (User | Department)[];
  hasChildren?: boolean;
  share?: boolean;
  key?: string;
  no?: string | number;
  type?: string;
  id?: string;
  fid?: string;
  leaf?: boolean;
  name?: string;
  text?: string;
  cn?: string | number;
  country?: string;
  dept_type?: string | number;
  email?: string;
  eng_name?: string;
  eng_short?: string;
  expand?: boolean;
  fulldept?: string;
  gmail?: string;
  groupmail?: string;
  groupname?: string;
  username?: string;
  groupno?: string | number;
  head?: string | number;
  receipt?: string | number;
  seq?: string | number;
  title?: string;
  up?: string | number;
  // parentDepartment to keep trach it parent folder
  parentDepartment?: Department;
  seqno?: string;
  isbase?: boolean;
  fldseq?: string;
  pos?: string;
  top?: string;
  mobile?: string;
  name2?: string;
  isRoot?: boolean;
  isFavorite?: boolean;
  [x: string]: any; // for other data type
}

export interface User {
  id: string;
  type?: string;
  isFolder?: boolean;
  userno: string;
  username: string;
  longname?: string;
  key?: string;
  cn?: string | number;
  duty?: string;
  dutyno?: string | number;
  email?: string;
  fax?: string;
  fulldept?: string;
  fullname?: string;
  fullrank?: string;
  groupname?: string;
  groupno?: string | number;
  ishead?: string | number;
  long?: string;
  mobile?: string | number;
  name?: string;
  position?: string | number;
  rankno?: string | number;
  seqno?: string;
  title?: string;
  no?: string;
  kind?: string;
  fa_auth?: string;
  [x: string]: any; // for other data type
}

export type SelectedOrgItemList = {
  [x: string | number]: SelectedOrgItem;
};

export type SelectedOrgItem = Department | User;
