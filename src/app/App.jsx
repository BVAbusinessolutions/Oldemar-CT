import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../features/landing';
import { AdminPanel } from '../features/admin';

// TODO(backend): /admin debe protegerse con autenticación real del servidor antes de producción.
export const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
