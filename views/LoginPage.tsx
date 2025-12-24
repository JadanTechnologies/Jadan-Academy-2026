import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ShieldCheck, School, Users, GraduationCap, Building2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const roles = [
    { label: 'HQ Admin', role: UserRole.SUPER_ADMIN, icon: ShieldCheck, color: 'bg-indigo-900', branch: null },
    { label: 'Branch Admin', role: UserRole.SCHOOL_ADMIN, icon: Building2, color: 'bg-indigo-600', branch: 'b1' },
    { label: 'Teacher (Downtown)', role: UserRole.TEACHER, icon: Users, color: 'bg-teal-500', branch: 'b1' },
    { label: 'Student (Downtown)', role: UserRole.STUDENT, icon: GraduationCap, color: 'bg-orange-500', branch: 'b1' },
  ];

  const handleSimulatedLogin = (config: any) => {
    setLoading(true);
    setTimeout(() => {
      onLogin({
        id: 'u-' + Math.random().toString(36).substr(2, 9),
        name: config.label.includes('Student') ? 'John Doe' : `${config.label}`,
        email: `${config.role.toLowerCase()}@standrews.edu`,
        role: config.role,
        schoolId: 's1', // Fixed single school ID
        branchId: config.branch,
        avatar: `https://i.pravatar.cc/150?u=${config.role}`
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="z-10 text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-500/30 mb-6 border border-white/20">
          <School size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">St. Andrews Portal</h1>
        <p className="text-slate-400 text-lg">Multi-Branch Academic Terminal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl z-10">
        {roles.map((item) => (
          <button
            key={item.label}
            onClick={() => handleSimulatedLogin(item)}
            disabled={loading}
            className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all`}>
              <item.icon size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1 whitespace-nowrap">{item.label}</h3>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Scope: {item.branch || 'HQ / All Branches'}</p>
            
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 rounded-2xl">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-12 text-slate-500 text-xs font-black uppercase tracking-widest z-10 opacity-50">
        Secure Academic Infrastructure Node
      </div>
    </div>
  );
};

export default LoginPage;