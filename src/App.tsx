import AppRoutes from '@/routes';
import '@/utils/i18n';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { GroupwareAuthProvider } from './contexts/GroupwareAuthContext';
import { isDevelopment } from './utils';

function App() {
  return (
    <BrowserRouter basename={isDevelopment() ? '/' : import.meta.env.VITE_PUBLIC_URL}>
      <GroupwareAuthProvider>
        <AppRoutes />
      </GroupwareAuthProvider>
    </BrowserRouter>
  );
}

export default App;
