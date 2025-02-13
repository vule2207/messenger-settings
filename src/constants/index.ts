import { CRON_TIME_VALUE, DUPLICATE_LOGIN_VALUE, TIME_SETTINGS_VALUE } from '@/types/enums';
import { DuplicateLogInDataType } from '@/types';
import { TimeOptionsType } from '@/types';

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
  history: {
    list: 'admin/messenger/history',
    export: 'admin/messenger/history_export',
    exportCheck: 'admin/messenger/history_export_check',
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
  duplicateLogIn: {
    data: 'admin/messenger/duplicate_login',
    save: 'admin/messenger/duplicate_login',
  },
  deleteTransferfile: {
    data: 'admin/messenger/crontab_del_transfer',
    save: 'admin/messenger/crontab_del_transfer',
    delete: 'admin/messenger/del_transfer_except_thumbnail',
    getUsedSpace: 'admin/messenger/tranferred_file_used_space',
  },
  availableUsersList: {
    list: 'admin/messenger/list_user_logged',
  },
};

// time options
export const timeOptions: TimeOptionsType[] = [
  { value: TIME_SETTINGS_VALUE.DO_NOT_USE, label: 'approval_form_useNo' },
  {
    value: TIME_SETTINGS_VALUE.ENABLE_BY_SERVER,
    label: 'approval_messenger_set_server',
    isTime: true,
  },
  { value: TIME_SETTINGS_VALUE.ENABLE_BY_CLIENT, label: 'approval_messenger_set_client' },
];

export const duplicateLogInOptions: TimeOptionsType<DuplicateLogInDataType>[] = [
  { value: DUPLICATE_LOGIN_VALUE.ALL, label: 'admin_messenger_duplicatelogin_device_type_all' },
  {
    value: DUPLICATE_LOGIN_VALUE.MOBILE,
    label: 'admin_messenger_duplicatelogin_device_type_mobile',
  },
  { value: DUPLICATE_LOGIN_VALUE.PC, label: 'admin_messenger_duplicatelogin_device_type_pc' },
];

export const cronTimeOptions: TimeOptionsType<CRON_TIME_VALUE>[] = [
  { value: CRON_TIME_VALUE.DO_NOT_DELETED, label: 'admin_messenger_del_transferfile_not_delete' },
  { value: CRON_TIME_VALUE.A_DAY, label: 'admin_messenger_del_transferfile_cron_time_op_a_days' },
  {
    value: CRON_TIME_VALUE.THREE_DAY,
    label: 'admin_messenger_del_transferfile_cron_time_op_three_days',
  },
  { value: CRON_TIME_VALUE.A_WEEK, label: 'admin_messenger_del_transferfile_cron_time_op_a_week' },
  {
    value: CRON_TIME_VALUE.TWO_WEEKS,
    label: 'admin_messenger_del_transferfile_cron_time_op_two_weeks',
  },
  {
    value: CRON_TIME_VALUE.A_MONTH,
    label: 'admin_messenger_del_transferfile_cron_time_op_a_month',
  },
];
