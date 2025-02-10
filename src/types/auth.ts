import { BaseResponse } from './api';

export type GroupwareAuthContextType = {
  isLoggedIn: boolean;
  isCheckingLoggedIn: boolean;
  login: (data: LoginData) => Promise<AuthResponse | null>;
  logout: () => void;
};

export type LoginData = {
  gw_id: string;
  gw_pass: string;
  auto_save_id: string | number;
  [x: string]: any;
};

export interface AuthResponse extends BaseResponse {
  session: string;
  hmail_key: string;
  lang: string;
  pwd_change: number;
  is_cloud: boolean;
  is_messenger: boolean;
  theme: string;
  crm_user: boolean;
  is_crm: boolean;
  crm_service: boolean;
  only_crm: boolean;
  is_groupware: boolean;
  only_groupware: boolean;
  door_menu: string;
  door_crm_menu: string;
  hybrid_ui_version: number;
  dState: string;
  use_otp: boolean;
  useversion2: boolean;
  is_new_app: number;
  allow_native_cache: number;
  cache_number: string;
  jwt: string;
  nhr: number;
}
