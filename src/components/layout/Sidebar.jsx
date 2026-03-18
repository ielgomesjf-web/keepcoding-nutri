import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, MessageSquare, BarChart3, LogOut, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/nutri' },
  { icon: Users, label: 'Pacientes', path: '/nutri/pacientes' },
  { icon: Calendar, label: 'Agenda', path: '/nutri/agenda' },
  { icon: MessageSquare, label: 'Chat', path: '/nutri/chat' },
  { icon: BarChart3, label: 'Relatorios', path: '/nutri/relatorios' },
];

export default function Sidebar({ open, onClose }) {
  const { userData, logout } = useAuth();

  const content = (
    <div className="w-64 h-full bg-sidebar flex flex-col">
      <div className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-primary text-xl font-bold font-heading">KeepCoding</h1>
          <p className="text-gray-400 text-sm">Nutri</p>
        </div>
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white cursor-pointer">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 mt-2">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/nutri'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mx-3 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'text-white bg-sidebar-hover border-l-2 border-primary'
                  : 'text-gray-400 hover:text-white hover:bg-sidebar-hover'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
            {(userData?.nome || 'N')[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{userData?.nome || 'Nutricionista'}</p>
            <p className="text-gray-500 text-xs">Nutricionista</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm w-full px-2 py-1.5 rounded-lg hover:bg-sidebar-hover transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block h-full">{content}</div>
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="relative z-10 h-full">{content}</div>
        </div>
      )}
    </>
  );
}
