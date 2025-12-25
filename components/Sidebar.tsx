
import React from 'react';
import {
  LayoutDashboard, Building2, Users, BookOpen, Settings, LogOut, FileText,
  ClipboardCheck, CalendarDays, Layers, Truck, Box, Library, ShieldCheck,
  ChevronLeft, ChevronRight, Menu
} from 'lucide-react';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  onLogout: () => void;
  schoolLogo?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, schoolLogo, activeTab, onTabChange, isCollapsed, onToggleCollapse }) => {
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
    <div className={`h-full bg-slate-900 text-white flex flex-col transition-all duration-300 ease-in-out relative border-r border-slate-800 ${isCollapsed ? 'p-3' : 'p-6'}`}>
      {/* Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-10 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg border border-slate-800 hover:scale-110 transition-transform z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`flex items-center gap-3 mb-12 px-2 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
        {schoolLogo ? (
          <img src={schoolLogo} alt="Logo" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">E</div>
        )}
        {!isCollapsed && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <h1 className="font-bold text-lg leading-tight tracking-tight uppercase">EduCore</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Global EdMS</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
        {getNavItems().map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange?.(item.id)}
            className={`w-full flex items-center gap-3 rounded-xl transition-all group relative ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'} ${activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon size={20} className={`flex-shrink-0 ${activeTab === item.id ? 'text-white' : 'group-hover:text-indigo-400 transition-colors'}`} />
            {!isCollapsed && <span className="font-medium text-sm animate-in fade-in slide-in-from-left-2 duration-300">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-6">
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 rounded-xl transition-all text-red-400 hover:bg-red-500/10 ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}`}
          title={isCollapsed ? 'Sign Out' : ''}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && <span className="font-medium animate-in fade-in duration-300">Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
