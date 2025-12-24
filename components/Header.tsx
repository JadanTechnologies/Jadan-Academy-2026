
import React from 'react';
import { Bell, Search, User as UserIcon, MapPin } from 'lucide-react';
import { User } from '../types';
import { MOCK_SCHOOLS } from '../constants';

interface HeaderProps {
  user: User;
  schoolName?: string;
}

const Header: React.FC<HeaderProps> = ({ user, schoolName }) => {
  const branchName = user.schoolId ? 
    MOCK_SCHOOLS.find(s => s.id === user.schoolId)?.branches.find(b => b.id === user.branchId)?.name 
    : 'Global';

  return (
    <header className="no-print h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">{schoolName || 'EduCore Platform'}</h2>
          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase">
            <MapPin size={12} className="text-indigo-500" />
            <span>Branch: {branchName || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search restricted scope..." 
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 w-64 text-sm"
          />
        </div>

        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-6 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-900 tracking-tight">{user.name}</p>
            <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">{user.role.replace('_', ' ')}</p>
          </div>
          <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
            ) : (
              <UserIcon size={20} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
