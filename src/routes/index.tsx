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
const KickOutUsersPage = lazy(() => import('@/pages/KickOutUsers'));
const MessageTokenApiPage = lazy(() => import('@/pages/MessageTokenApi'));
const HanbiroTalkSettingsPage = lazy(() => import('@/pages/HanbiroTalkSettings'));

export const routes = [
  {
    title: 'approval_messenger_messheadersig',
    path: 'title',
    element: <TitleSettingsPage />,
  },
  {
    title: 'approval_messenger_autologonoff',
    path: 'autotimepunch',
    element: <AutoTimePuchPage />,
  },
  {
    title: 'approval_messenger_loginhistory',
    path: 'accesshistory',
    element: <AccessHistoryPage />,
  },
  {
    title: 'approval_messenger_idletime',
    path: 'absencetime',
    element: <AwaySettingsPage />,
  },
  {
    title: 'approval_messenger_locktime',
    path: 'locktime',
    element: <LockTimePage />,
  },
  {
    title: 'approval_messenger_logofftime',
    path: 'logofftime',
    element: <LockOffTimePage />,
  },
  {
    title: 'approval_messenger_duplicatelogin',
    path: 'duplicatelogin',
    element: <DuplicateLogInPage />,
  },
  {
    title: 'approval_messenger_deletetransferfile',
    path: 'deletetransferfile',
    element: <DeleteTransferFilePage />,
  },
  {
    title: 'approval_messenger_list_users_logedin',
    path: 'usersloggedin',
    element: <AvailableUsersListPage />,
  },
  {
    title: 'kick_out_users',
    subTitle: 'setting_for_kick_out_permission',
    path: 'kickoutuser',
    element: <KickOutUsersPage />,
  },
  {
    title: 'admin_messenger_token_api_title',
    path: 'message_token_api',
    element: <MessageTokenApiPage />,
  },
  // {
  //   title: 'hanbirotalk_setting',
  //   path: 'hanbiroTalkSetting',
  //   element: <HanbiroTalkSettingsPage />,
  // },
];

function AppRoutes() {
  const authorizedRoutes = useAuthorizedRoutes();

  return useRoutes([authorizedRoutes, LoginRoutes]);
}

export default AppRoutes;
