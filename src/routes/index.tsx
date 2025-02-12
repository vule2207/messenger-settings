import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import { useAuthorizedRoutes } from './useAuthorizedRoutes';

const TitleSettingsPage = lazy(() => import('@/pages/TitleSettings'));
const AutoTimePuchPage = lazy(() => import('@/pages/AutoPunchTimeCard'));
const AccessHistoryPage = lazy(() => import('@/pages/AccessHistory'));
const AwaySettingsPage = lazy(() => import('@/pages/AwaySettings'));
const LockTimePage = lazy(() => import('@/pages/LockTime'));
const LockOffTimePage = lazy(() => import('@/pages/LockOffTime'));
const DuplicateLogInPage = lazy(() => import('@/pages/DuplicateLogIn'));
const DeleteTransferFilePage = lazy(() => import('@/pages/DeleteTransferFile'));
const AvailableUsersListPage = lazy(() => import('@/pages/AvailableUsersList'));

export const routes = [
  {
    title: 'approval_messenger_messheadersig',
    path: 'messenger/title',
    element: <TitleSettingsPage />,
  },
  {
    title: 'approval_messenger_autologonoff',
    path: 'messenger/autotimepunch',
    element: <AutoTimePuchPage />,
  },
  {
    title: 'approval_messenger_loginhistory',
    path: 'messenger/accesshistory',
    element: <AccessHistoryPage />,
  },
  {
    title: 'approval_messenger_idletime',
    path: 'messenger/absencetime',
    element: <AwaySettingsPage />,
  },
  {
    title: 'approval_messenger_locktime',
    path: 'messenger/locktime',
    element: <LockTimePage />,
  },
  {
    title: 'approval_messenger_logofftime',
    path: 'messenger/logofftime',
    element: <LockOffTimePage />,
  },
  {
    title: 'approval_messenger_duplicatelogin',
    path: 'messenger/duplicatelogin',
    element: <DuplicateLogInPage />,
  },
  {
    title: 'approval_messenger_deletetransferfile',
    path: 'messenger/deletetransferfile',
    element: <DeleteTransferFilePage />,
  },
  {
    title: 'approval_messenger_list_users_logedin',
    path: 'messenger/usersloggedin',
    element: <AvailableUsersListPage />,
  },
  {
    title: 'kick_out_users',
    path: 'messenger/kickoutuser',
    element: <>Setting Permission for Kick-Out</>,
  },
];

function AppRoutes() {
  const authorizedRoutes = useAuthorizedRoutes();

  return useRoutes([authorizedRoutes, LoginRoutes]);
}

export default AppRoutes;
