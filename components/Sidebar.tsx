
import React from 'react';
import { 
  LayoutDashboard, Building2, Users, BookOpen, Settings, LogOut, FileText, 
  ClipboardCheck, CalendarDays, Layers, Truck, Box, Library, ShieldCheck
} from 'lucide-react';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  onLogout: () => void;
  schoolLogo?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, schoolLogo, activeTab, onTabChange }) => {
  const getNavItems = () => {
    const common = [{ icon: LayoutDashboard, label: 'Control Center', id: 'dash' }];
    
    switch (user.role) {
      case UserRole.SUPER_ADMIN:
        return [
          ...common,
          { icon: Building2, label: 'Organizations', id: 'branches' },
          { icon: ShieldCheck, label: 'System Audit', id: 'finance' },
          { icon: Settings, label: 'HQ Settings', id: 'settings' },
        ];
      case UserRole.SCHOOL_ADMIN:
        return [
          ...common,
          { icon: ClipboardCheck, label: 'Verify Results', id: 'results' },
          { icon: Box, label: 'Operations', id: 'ops' },
          { icon: Users, label: 'Staff Directory', id: 'staff' },
          { icon: BookOpen, label: 'Academics', id: 'academics' },
          { icon: Settings, label: 'Setup', id: 'setup' },
        ];
      case UserRole.TEACHER:
        return [
          ...common,
          { icon: FileText, label: 'Result Entry', id: 'entry' },
          { icon: CalendarDays, label: 'Attendance', id: 'attendance' },
        ];
      default:
        return [
          ...common,
          { icon: FileText, label: 'My Transcript', id: 'reports' },
          { icon: CalendarDays, label: 'My Schedule', id: 'att' },
        ];
    }
  };

  return (
    <div className="h-full bg-slate-900 text-white flex flex-col p-4 shadow-xl border-r border-slate-800">
      <div className="flex items-center gap-3 mb-10 px-2 py-4">
        {schoolLogo ? (
          <img src={schoolLogo} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
        ) : (
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">E</div>
        )}
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight uppercase">EduCore</h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Multi-Branch EdMS</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
        {getNavItems().map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange?.(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'group-hover:text-indigo-400 transition-colors'} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
