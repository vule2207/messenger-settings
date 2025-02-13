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
