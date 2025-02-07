import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';
import '@/utils/i18n';
import './App.css';
import { routes } from '@/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route path={'/'} element={<Navigate to='/messenger/title' replace />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
