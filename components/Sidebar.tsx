
import React from 'react';
import {
  LayoutDashboard, Building2, Users, BookOpen, Settings, LogOut, FileText,
  ClipboardCheck, CalendarDays, Layers, Truck, Box, Library, ShieldCheck,
  ChevronLeft, ChevronRight, Menu, DollarSign, UserPlus, ShoppingCart,
  HeartPulse, ShieldAlert, TrendingUp, History, Fingerprint, Sparkles,
  GraduationCap, Briefcase, Activity, Landmark, Gem, AlertTriangle,
  Stamp, Network, BrainCircuit, Trophy, Award, Search, Database, Receipt, Calendar
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
          { icon: Building2, label: 'Branches', id: 'branches' },
          { icon: GraduationCap, label: 'Students', id: 'students' },
          { icon: Briefcase, label: 'Payroll', id: 'payroll' },
          { icon: DollarSign, label: 'Global Finance', id: 'finance' },
          { icon: Box, label: 'Inventory', id: 'inventory' },
          { icon: ShieldCheck, label: 'Compliance', id: 'compliance' },
          { icon: Activity, label: 'Analytics', id: 'analytics' },
          { icon: Landmark, label: 'Governance', id: 'governance' },
          { icon: Gem, label: 'Wealth Shards', id: 'wealth' },
          { icon: AlertTriangle, label: 'Crisis Hub', id: 'crisis' },
          { icon: Stamp, label: 'Brand Center', id: 'brand' },
          { icon: Network, label: 'Integrations', id: 'integrations' },
          { icon: Settings, label: 'HQ Settings', id: 'settings' },
        ];
      case UserRole.SCHOOL_ADMIN:
        return [
          ...common,
          { icon: Users, label: 'Staff Node', id: 'staff' },
          { icon: BookOpen, label: 'Academics', id: 'academics' },
          { icon: ClipboardCheck, label: 'Verify Results', id: 'results' },
          { icon: Box, label: 'Campus Ops', id: 'ops' },
          { icon: DollarSign, label: 'Treasury', id: 'finance' },
          { icon: UserPlus, label: 'Admissions', id: 'admissions' },
          { icon: ShoppingCart, label: 'Procurement', id: 'procurement' },
          { icon: ShieldCheck, label: 'Security', id: 'security' },
          { icon: ShieldAlert, label: 'Discipline', id: 'discipline' },
          { icon: Truck, label: 'Fleet Nexus', id: 'fleet' },
          { icon: Building2, label: 'Facilities', id: 'facilities' },
          { icon: HeartPulse, label: 'Sickbay', id: 'health' },
          { icon: Layers, label: 'Exam Center', id: 'exams' },
          { icon: Settings, label: 'Campus Setup', id: 'setup' },
        ];
      case UserRole.TEACHER:
        return [
          ...common,
          { icon: CalendarDays, label: 'Attendance', id: 'attendance' },
          { icon: FileText, label: 'Result Entry', id: 'entry' },
          { icon: BrainCircuit, label: 'Lesson Plan', id: 'planning' },
          { icon: ShieldAlert, label: 'Behavior', id: 'behavior' },
          { icon: History, label: 'Growth Dossier', id: 'dossier' },
          { icon: Trophy, label: 'Rewards', id: 'rewards' },
          { icon: ShoppingCart, label: 'Requisition', id: 'requisition' },
          { icon: Award, label: 'Portfolio', id: 'portfolio' },
          { icon: Layers, label: 'Exam Lab', id: 'exams' },
        ];
      case UserRole.STUDENT:
      case UserRole.PARENT:
        return [
          ...common,
          { icon: Layers, label: 'Exam Hall', id: 'exams' },
          { icon: Fingerprint, label: 'Student ID', id: 'identity' },
          { icon: Calendar, label: 'Study Planner', id: 'planner' },
          { icon: TrendingUp, label: 'Results', id: 'performance' },
          { icon: HeartPulse, label: 'Wellness', id: 'wellness' },
          { icon: Trophy, label: 'Milestones', id: 'extra' },
          { icon: Receipt, label: 'Wallet', iconColor: 'text-emerald-500', id: 'finance' },
          { icon: History, label: 'Archives', id: 'history' },
        ];
      case UserRole.BURSAR:
        return [
          ...common,
          { icon: History, label: 'Cash Ledger', id: 'ops' },
          { icon: Search, label: 'Intake Reports', id: 'reports' },
          { icon: Database, label: 'Shards', id: 'shards' },
        ];
      case UserRole.LIBRARIAN:
        return [
          ...common,
          { icon: History, label: 'Asset Activity', id: 'ops' },
          { icon: Search, label: 'Catalog Search', id: 'reports' },
        ];
      case UserRole.RECEPTIONIST:
        return [
          ...common,
          { icon: History, label: 'Visitor Logs', id: 'ops' },
          { icon: Search, label: 'Check-in Reports', id: 'reports' },
        ];
      default:
        return common;
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
