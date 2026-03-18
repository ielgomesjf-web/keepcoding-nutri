import { NavLink, Outlet } from 'react-router-dom';
import { Home, UtensilsCrossed, BookOpen, TrendingUp, MessageSquare } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Inicio', path: '/paciente' },
  { icon: UtensilsCrossed, label: 'Dieta', path: '/paciente/dieta' },
  { icon: BookOpen, label: 'Diario', path: '/paciente/diario' },
  { icon: TrendingUp, label: 'Evolucao', path: '/paciente/evolucao' },
  { icon: MessageSquare, label: 'Chat', path: '/paciente/chat' },
];

export default function PacienteLayout() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="h-14 bg-white border-b border-border flex items-center justify-center shrink-0">
        <span className="text-primary font-heading font-bold">KeepCoding Nutri</span>
      </header>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <nav className="shrink-0 bg-white border-t border-border">
        <div className="grid grid-cols-5 h-16">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/paciente'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
                  isActive ? 'text-primary' : 'text-text-muted'
                }`
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
