import { lazy } from 'react';

const TitleSettingsPage = lazy(() => import('@/pages/TitleSettings'));
const AutoTimePuchPage = lazy(() => import('@/pages/AutoPunchTimeCard'));
const AwaySettingsPage = lazy(() => import('@/pages/AwaySettings'));

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
    element: <>Access History</>,
  },
  {
    title: 'approval_messenger_idletime',
    path: 'messenger/absencetime',
    element: <AwaySettingsPage />,
  },
  {
    title: 'approval_messenger_locktime',
    path: 'messenger/locktime',
    element: <>Lock Time</>,
  },
  {
    title: 'approval_messenger_logofftime',
    path: 'messenger/logofftime',
    element: <>Log Off Time</>,
  },
  {
    title: 'approval_messenger_duplicatelogin',
    path: 'messenger/duplicatelogin',
    element: <>Duplicate Log In</>,
  },
  {
    title: 'approval_messenger_deletetransferfile',
    path: 'messenger/deletetransferfile',
    element: <>Deleting Transferred Files</>,
  },
  {
    title: 'approval_messenger_list_users_logedin',
    path: 'messenger/usersloggedin',
    element: <>Available Users List</>,
  },
  {
    title: 'kick_out_users',
    path: 'messenger/kickoutuser',
    element: <>Setting Permission for Kick-Out</>,
  },
];

import { useRoutes } from 'react-router-dom';

import LoginRoutes from './LoginRoutes';
import { useAuthorizedRoutes } from './useAuthorizedRoutes';

function AppRoutes() {
  const authorizedRoutes = useAuthorizedRoutes();

  return useRoutes([authorizedRoutes, LoginRoutes]);
}

export default AppRoutes;
