import { useContext } from 'react';

// auth provider
import GroupwareAuthContext from '@/contexts/GroupwareAuthContext';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
  const context = useContext(GroupwareAuthContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
};

export default useAuth;
