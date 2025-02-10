import { COOKIES_HANBIRO_GW, COOKIES_HMAIL_KEY } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { ReactElement, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export type GuardProps = { children: ReactElement | null };

const AuthGuard = ({ children }: GuardProps) => {
  // const { isLoggedIn, isCheckingLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsLoggedIn = () => {
      return !!(cookies[COOKIES_HANBIRO_GW] && cookies[COOKIES_HMAIL_KEY]);
    };

    const nLog = checkIsLoggedIn();
    setIsLoggedIn(nLog);
  }, [cookies[COOKIES_HANBIRO_GW], cookies[COOKIES_HMAIL_KEY]]);

  useEffect(() => {
    if (typeof isLoggedIn === 'boolean' && !isLoggedIn) {
      navigate(`/login`, { replace: true });
    }
  }, [isLoggedIn]);

  return isLoggedIn ? children : null;
};

export default AuthGuard;
