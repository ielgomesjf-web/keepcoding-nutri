import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header({ onMenuClick }) {
  const { userData } = useAuth();

  return (
    <header className="h-16 bg-bg-panel border-b border-border px-6 flex items-center justify-between shrink-0">
      <button onClick={onMenuClick} className="lg:hidden p-3 rounded-lg hover:bg-gray-100 text-text-secondary cursor-pointer">
        <Menu size={20} />
      </button>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-3">
        <button className="relative p-3 rounded-lg hover:bg-gray-100 text-text-secondary cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
          {(userData?.nome || 'N')[0]}
        </div>
      </div>
    </header>
  );
}
