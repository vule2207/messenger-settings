import { TimeOptionsType } from '@/types/state';

// auth
export const URL_LOGIN = '/sign/auth';
export const URL_LOGOUT = 'sign/out';
export const URL_GET_APP_INFO = '/common/config/mode/all';
export const URL_CHANGE_EXPIRED_PASSWORD = '/sign/security';
export const COOKIES_HMAIL_KEY = 'hmail_key';
export const COOKIES_HANBIRO_GW = 'HANBIRO_GW';
export const LOCAL_STORAGE_TOKEN = 'auth.token';

// typography
export const typograhyClass = {
  titleHeader: 'text-2xl font-bold leading-normal text-slate-700',
  primaryText: 'text-slate-700',
  secondaryText: 'text-slate-500 text-sm',
};

// api url
export const apiURL = {
  titleSettings: {
    data: 'admin/messenger/title',
    save: 'admin/messenger/title_save',
  },
  autoTimePunch: {
    data: 'admin/messenger/autotimepunch',
    save: 'admin/messenger/autotimepunch_save',
  },
  awaySettings: {
    data: 'admin/messenger/absencetime',
    save: 'admin/messenger/absencetime_save',
  },
  lockTime: {
    data: 'admin/messenger/locktime',
    save: 'admin/messenger/locktime_save',
  },
  lockOffTime: {
    data: 'admin/messenger/logofftime',
    save: 'admin/messenger/logofftime_save',
  },
};

// time options
export const timeOptions: TimeOptionsType[] = [
  { value: '0', label: 'approval_form_useNo' },
  { value: '1', label: 'approval_messenger_set_server', isTime: true },
  { value: '-1', label: 'approval_messenger_set_client' },
];
