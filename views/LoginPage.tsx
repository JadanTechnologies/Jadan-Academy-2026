import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ShieldCheck, School, Users, GraduationCap, Building2, DollarSign, BookOpen } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const roles = [
    { label: 'HQ Admin', role: UserRole.SUPER_ADMIN, icon: ShieldCheck, color: 'bg-indigo-900', branch: null },
    { label: 'Branch Admin', role: UserRole.SCHOOL_ADMIN, icon: Building2, color: 'bg-indigo-600', branch: 'b1' },
    { label: 'Bursar', role: UserRole.BURSAR, icon: DollarSign, color: 'bg-emerald-600', branch: 'b1' },
    { label: 'Librarian', role: UserRole.LIBRARIAN, icon: BookOpen, color: 'bg-blue-600', branch: 'b1' },
    { label: 'Receptionist', role: UserRole.RECEPTIONIST, icon: Users, color: 'bg-rose-600', branch: 'b1' },
    { label: 'Teacher', role: UserRole.TEACHER, icon: Users, color: 'bg-teal-500', branch: 'b1' },
    { label: 'Student', role: UserRole.STUDENT, icon: GraduationCap, color: 'bg-amber-500', branch: 'b1' },
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

  const [checkingAdmission, setCheckingAdmission] = useState(false);
  const [admissionStatus, setAdmissionStatus] = useState<null | 'pending' | 'offered' | 'rejected'>(null);
  const [appId, setAppId] = useState('');

  const checkAdmission = () => {
    setCheckingAdmission(true);
    setTimeout(() => {
      if (appId.includes('ADM-OFF')) setAdmissionStatus('offered');
      else if (appId.includes('ADM-REJ')) setAdmissionStatus('rejected');
      else setAdmissionStatus('pending');
      setCheckingAdmission(false);
    }, 1000);
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

      <div className="mt-16 w-full max-w-xl z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">Prospective Shards</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Check Admission Offer Status</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Reference Code (e.g. ADM-OFF-92)"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                className="flex-1 md:w-48 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold focus:outline-none focus:border-indigo-500 transition-all uppercase placeholder:text-slate-600"
              />
              <button
                onClick={checkAdmission}
                disabled={checkingAdmission || !appId}
                className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50"
              >
                {checkingAdmission ? 'Verifying...' : 'Check Node'}
              </button>
            </div>
          </div>

          {admissionStatus && (
            <div className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-white/5 animate-in slide-in-from-top-4 duration-300">
              {admissionStatus === 'offered' ? (
                <div className="flex items-center gap-4 text-emerald-400">
                  <ShieldCheck size={24} />
                  <div>
                    <p className="text-xs font-black uppercase">Institutional Offer Detected!</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Visit your branch to shard into enrollment.</p>
                  </div>
                </div>
              ) : admissionStatus === 'rejected' ? (
                <div className="flex items-center gap-4 text-rose-500">
                  <Users size={24} />
                  <div>
                    <p className="text-xs font-black uppercase">Entry Shard Terminated.</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Institutional capacity reached for this sesson.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 text-amber-500">
                  <Users size={24} className="animate-pulse" />
                  <div>
                    <p className="text-xs font-black uppercase">Shard Synchronizing...</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Your application is still in the verification queue.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 text-slate-500 text-xs font-black uppercase tracking-widest z-10 opacity-50">
        Secure Academic Infrastructure Node
      </div>
    </div>
  );
};

export default LoginPage;