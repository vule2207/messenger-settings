import {
  COOKIES_HANBIRO_GW,
  COOKIES_HMAIL_KEY,
  LOCAL_STORAGE_TOKEN,
  URL_GET_APP_INFO,
  URL_LOGIN,
  URL_LOGOUT,
} from '@/constants';
import { AuthResponse, LoginData } from '@/types/auth';
import { getGroupwareUrl, isDevelopment } from '@/utils';
import { axiosGet, axiosPost } from '@/utils/axios/api';
import { encrypt } from '@/utils/encrypt';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import useLocalStorage from './useLocalStorage';
import { useNavigate } from 'react-router-dom';
import i18n from '@/utils/i18n';
import { useAppStore } from '@/store';

const authServices = {
  login: (params: LoginData) => {
    return axiosPost<AuthResponse>(URL_LOGIN, params, Headers);
  },
  logout: () => {
    return axiosGet([getGroupwareUrl(), URL_LOGOUT].join('/'), {}, Headers);
  },
  getAppInfo: (params: any) => {
    return axiosGet(URL_GET_APP_INFO, params);
  },
};

const useUserActions = () => {
  const navigate = useNavigate();

  const { auth, setAuth } = useAppStore();

  const [loadingApp, setLoadingApp] = useState<boolean>(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  const [localStorageToken, setLocalStorageToken, removeLocalStorageToken] = useLocalStorage(
    LOCAL_STORAGE_TOKEN,
    null,
  );

  const login = (params: LoginData) => {
    const loginData = {
      ...params,
      gw_id: encrypt(params.gw_id),
      gw_pass: encrypt(params.gw_pass),
    };
    return authServices.login(loginData as LoginData);
  };

  const logout = async () => {
    const res: any = await authServices.logout();
    if (res?.success) {
      removeLocalStorageToken();

      removeCookie(COOKIES_HMAIL_KEY);
      removeCookie(COOKIES_HANBIRO_GW);

      setAuth({
        isLoggedIn: false,
        isCheckingLoggedIn: false,
        token: null,
      });
      navigate('/login', {
        replace: true,
      });
    } else {
    }
  };

  const loginSuccess = async (data: AuthResponse | null = null) => {
    setLoadingApp(true);

    if (data) {
      if (typeof data?.jwt === 'string') {
        setLocalStorageToken(data?.jwt);
      }

      if (isDevelopment()) {
        setCookie(COOKIES_HMAIL_KEY, data?.hmail_key);
        setCookie(COOKIES_HANBIRO_GW, data?.session);
      }
    }
    // const config: any = await getAppConfig({ im_not_app: 1 });
    setLoadingApp(false);
    setAuth({
      isCheckingLoggedIn: false,
      isLoggedIn: true,
      token: data ? data.jwt : null,
    });
    return true;
    // if (config?.success) {
    // } else {
    //   return false;
    // }
  };

  const getAppConfig = async (params: any = { im_not_app: 1 }) => {
    setLoadingApp(true);
    const res: any = await authServices.getAppInfo(params);
    setLoadingApp(false);
    if (res.success) {
      // set language
      if (res?.rows?.user_config?.lang) {
        i18n.changeLanguage(res?.rows?.user_config?.lang);
      }
    }
    return res;
  };

  return {
    login,
    logout,
    loadingApp,
    loginSuccess,
    getAppConfig,
  };
};

export default useUserActions;
