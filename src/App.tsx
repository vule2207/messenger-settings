import AppRoutes from '@/routes';
import { BrowserRouter } from 'react-router-dom';
import { GroupwareAuthProvider } from './contexts/GroupwareAuthContext';
import '@/utils/i18n';
import './App.css';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
      <GroupwareAuthProvider>
        <AppRoutes />
      </GroupwareAuthProvider>
    </BrowserRouter>
  );
}

export default App;
