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
