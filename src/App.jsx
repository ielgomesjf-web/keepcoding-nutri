import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Loading from './components/shared/Loading';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NutriLayout from './components/layout/NutriLayout';
import PacienteLayout from './components/layout/PacienteLayout';
import DashboardPage from './pages/nutri/DashboardPage';
import PacientesPage from './pages/nutri/PacientesPage';
import PacienteDetailPage from './pages/nutri/PacienteDetailPage';
import PlanoFormPage from './pages/nutri/PlanoFormPage';
import AgendaPage from './pages/nutri/AgendaPage';
import ChatPage from './pages/nutri/ChatPage';
import RelatoriosPage from './pages/nutri/RelatoriosPage';
import PacienteDashboardPage from './pages/paciente/PacienteDashboardPage';
import DietaPage from './pages/paciente/DietaPage';
import DiarioPage from './pages/paciente/DiarioPage';
import EvolucaoPage from './pages/paciente/EvolucaoPage';
import PacienteChatPage from './pages/paciente/PacienteChatPage';

function ProtectedRoute({ children, allowedType }) {
  const { user, userData, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" />;
  if (allowedType && userData?.tipo !== allowedType) {
    return <Navigate to={userData?.tipo === 'nutricionista' ? '/nutri' : '/paciente'} />;
  }
  return children;
}

export default function App() {
  const { user, userData, loading } = useAuth();

  if (loading) return <Loading />;

  const home = userData?.tipo === 'nutricionista' ? '/nutri' : '/paciente';

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={home} /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to={home} /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to={home} /> : <RegisterPage />} />

      <Route path="/nutri" element={<ProtectedRoute allowedType="nutricionista"><NutriLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="pacientes" element={<PacientesPage />} />
        <Route path="pacientes/:id" element={<PacienteDetailPage />} />
        <Route path="pacientes/:id/plano" element={<PlanoFormPage />} />
        <Route path="agenda" element={<AgendaPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="relatorios" element={<RelatoriosPage />} />
      </Route>

      <Route path="/paciente" element={<ProtectedRoute allowedType="paciente"><PacienteLayout /></ProtectedRoute>}>
        <Route index element={<PacienteDashboardPage />} />
        <Route path="dieta" element={<DietaPage />} />
        <Route path="diario" element={<DiarioPage />} />
        <Route path="evolucao" element={<EvolucaoPage />} />
        <Route path="chat" element={<PacienteChatPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
