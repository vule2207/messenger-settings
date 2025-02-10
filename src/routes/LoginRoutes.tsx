import CommonLayout from '@/layouts/CommonLayout';
import GuestGuard from '@/utils/route-guard/GuestGuard';
import { lazy } from 'react';

const LoginPage = lazy(() => import('@/pages/Login'));

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <CommonLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
      ],
    },
  ],
};

export default LoginRoutes;
