import PageLayout from '@/layouts/PageLayout';
import AuthGuard from '@/utils/route-guard/AuthGuard';
import { routes } from '.';
import { Navigate } from 'react-router-dom';

export const useAuthorizedRoutes = () => {
  return {
    path: '/',
    children: [
      {
        path: '/',
        element: (
          <AuthGuard>
            <PageLayout />
          </AuthGuard>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={`/messenger/title`} />,
          },
          ...routes,
        ],
      },
    ],
  };
};
