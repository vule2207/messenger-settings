import useAuth from '@/hooks/useAuth';
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type GuardProps = {
  children: ReactElement | null;
};

const AuthGuard = ({ children }: GuardProps) => {
  const { isLoggedIn, isCheckingLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingLoggedIn) {
      if (!isLoggedIn) {
        navigate(`/login`, { replace: true });
      }
    }
  }, [isLoggedIn, isCheckingLoggedIn]);

  return isLoggedIn ? children : null;
};

export default AuthGuard;
