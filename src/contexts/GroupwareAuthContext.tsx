import React, { createContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { COOKIES_HMAIL_KEY, COOKIES_HANBIRO_GW } from '@/constants';
import { GroupwareAuthContextType } from '@/types/auth';
import useUserActions from '@/hooks/useUserAction';
import { useAppStore } from '@/store';
import LoadingOverlay from '@/components/LoadingOverlay';

// ==============================|| Vora Auth CONTEXT & PROVIDER ||============================== //

const GroupwareAuthContext = createContext<GroupwareAuthContextType | null>(null);

export const GroupwareAuthProvider = ({ children }: { children: React.ReactElement }) => {
  const { login, logout, loginSuccess, loadingApp } = useUserActions();
  const [cookies] = useCookies();
  const { auth, setAuth } = useAppStore();
  console.log('auth:', auth);

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      if (cookies[COOKIES_HANBIRO_GW] && cookies[COOKIES_HMAIL_KEY]) {
        console.log('cookies:', cookies);
        // return await loginSuccess();
        setAuth({
          isCheckingLoggedIn: false,
          isLoggedIn: true,
          token: null,
        });
      } else {
        setAuth({
          isCheckingLoggedIn: false,
          isLoggedIn: false,
          token: null,
        });
      }
    };

    checkIsLoggedIn();
  }, [cookies[COOKIES_HANBIRO_GW], cookies[COOKIES_HMAIL_KEY]]);

  return (
    <GroupwareAuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
      }}
    >
      {loadingApp ? <LoadingOverlay /> : children}
    </GroupwareAuthContext.Provider>
  );
};

export default GroupwareAuthContext;
