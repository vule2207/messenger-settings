import useAuth from '@/hooks/useAuth';
import { ReactElement, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

export type GuardProps = {
  children: ReactElement | null;
};

const GuestGuard = ({ children }: GuardProps) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const isLogin = useMatch('login');

  useEffect(() => {
    if (isLoggedIn && isLogin) {
      navigate('/', { replace: true });
    }
  }, [navigate, isLoggedIn, isLogin]);

  return children;
};

export default GuestGuard;
