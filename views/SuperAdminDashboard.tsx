import React, { useState, useEffect } from 'react';
import { MOCK_SCHOOLS } from '../constants';
import { 
  Building2, 
  Plus, 
  Users, 
  ShieldCheck, 
  Activity, 
  Search, 
  Settings,
  Database,
  CheckCircle2,
  TrendingUp,
  Megaphone,
  DollarSign,
  ArrowRight,
  ShieldAlert,
  Server,
  Zap
} from 'lucide-react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface SuperAdminDashboardProps {
  defaultTab?: string;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ defaultTab }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'branches' | 'finance' | 'settings'>('overview');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (defaultTab === 'dash' || !defaultTab) setActiveTab('overview');
    else if (['branches', 'finance', 'settings'].includes(defaultTab)) setActiveTab(defaultTab as any);
  }, [defaultTab]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const branchData = [
    { name: 'Downtown', students: 520, performance: 88, revenue: 120000 },
    { name: 'Westside', students: 310, performance: 76, revenue: 85000 },
    { name: 'East Hill', students: 450, performance: 82, revenue: 105000 },
  ];

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Network Nodes', value: '3 Branches', icon: Server, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Global Enrollment', value: '1,280', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'System Uptime', value: '99.98%', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Monthly Revenue', value: '$310k', icon: DollarSign, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={28} />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">{stat.label}</div>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Node Performance Index</h2>
              <p className="text-sm text-slate-500 font-medium italic">Academic success rate per branch node</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Settings size={20} /></button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="performance" radius={[10, 10, 0, 0]}>
                  {branchData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col h-full shadow-2xl shadow-indigo-900/20">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Megaphone size={120} />
          </div>
          <h3 className="text-2xl font-black mb-2 leading-tight">HQ Broadcasting</h3>
          <p className="text-slate-400 text-sm font-medium mb-8">Send high-priority directives to all campus administrators instantly.</p>
          
          <div className="space-y-4 mb-8">
            <input type="text" placeholder="Directive Subject..." className="w-full bg-white/10 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
            <textarea placeholder="Write directive details..." className="w-full bg-white/10 border-none rounded-xl p-4 text-sm h-32 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
          </div>

          <button 
            onClick={() => triggerToast('Global directive broadcasted!')}
            className="mt-auto w-full py-4 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-950"
          >
            Dispatch to All Nodes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase tracking-widest leading-none">Global Infrastructure</h1>
          <p className="text-slate-500 font-medium italic">Managing {MOCK_SCHOOLS[0].name} Corporate Network</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
           <div className="text-right px-4 border-r border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Status</p>
              <p className="text-xs font-black text-emerald-500 uppercase flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Nominal
              </p>
           </div>
           <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
             <ShieldCheck size={24} />
           </div>
        </div>
      </div>

      <div className="flex gap-1 bg-slate-200/50 p-1.5 rounded-[1.5rem] w-fit overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Network Health', icon: Zap },
          { id: 'branches', label: 'Branch Nodes', icon: Building2 },
          { id: 'finance', label: 'HQ Finance', icon: DollarSign },
          { id: 'settings', label: 'Security Console', icon: ShieldAlert },
        ].map(tab => (
          <button 
            key={tab.id} onClick={() => setActiveTab(tab.id as any)} 
            className={`px-8 py-3 rounded-[1.2rem] font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'branches' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {MOCK_SCHOOLS[0].branches.map(branch => (
              <div key={branch.id} className="bg-white rounded-[2rem] border border-slate-100 p-8 hover:shadow-2xl hover:shadow-slate-200 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Building2 size={80} />
                </div>
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Server size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">{branch.name}</h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">{branch.location}</p>
                <div className="space-y-4 border-t border-slate-50 pt-6">
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-slate-400 uppercase">Latency</span>
                     <span className="text-xs font-black text-emerald-500">12ms</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-slate-400 uppercase">Operational Nodes</span>
                     <span className="text-xs font-black text-slate-900">14 Units</span>
                   </div>
                </div>
                <button className="mt-8 w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                  Inspect Branch <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'finance' && (
          <div className="bg-white p-12 rounded-[2rem] border border-slate-100 text-center animate-in zoom-in-95 duration-500 shadow-sm">
             <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <DollarSign size={40} />
             </div>
             <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Consolidated Financial Audit</h2>
             <p className="text-slate-500 max-w-md mx-auto mt-2 italic font-medium">Platform-wide revenue tracking and expense auditing for all branch nodes.</p>
             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {branchData.map(b => (
                  <div key={b.name} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                     <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{b.name} Cashflow</div>
                     <div className="text-xl font-black text-slate-900">${(b.revenue / 1000).toFixed(0)}k</div>
                     <div className="h-1.5 w-full bg-slate-200 rounded-full mt-4">
                        <div className="h-full bg-indigo-600 rounded-full" style={{width: '75%'}}></div>
                     </div>
                  </div>
                ))}
             </div>
             <button className="mt-12 px-10 py-4 bg-slate-900 text-white font-black text-xs rounded-2xl uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all">Download Network Audit Log</button>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3">
                  <ShieldAlert className="text-rose-500" /> Administrative Constraints
                </h3>
                <div className="space-y-4">
                   {[
                     { l: 'Enable Global Result Override', d: 'Allow HQ to edit branch-locked results', v: true },
                     { l: 'Enforce Branch Sharding', d: 'Isolate data strictly per campus node', v: true },
                     { l: 'HQ Notification Bypass', d: 'Mute alerts for standard operations', v: false },
                     { l: 'Automated Log Clearing', d: 'Delete logs older than 24 months', v: true }
                   ].map((s, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="max-w-xs">
                           <div className="text-xs font-black text-slate-900 uppercase mb-1">{s.l}</div>
                           <p className="text-[10px] text-slate-400 font-bold leading-tight">{s.d}</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${s.v ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                           <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.v ? 'right-1' : 'left-1'}`}></div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="bg-slate-900 text-white p-10 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <div className="absolute bottom-0 right-0 p-10 opacity-5 rotate-12">
                   <Database size={180} />
                </div>
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">Database Sharding Information</h4>
                <p className="text-slate-400 text-sm mb-8 italic">Your EdMS is currently running on distributed branch nodes for maximum availability and low latency interaction.</p>
                <div className="p-6 bg-white/10 rounded-2xl border border-white/5 space-y-4">
                   <div>
                      <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Downtown Node Capacity</div>
                      <div className="h-2 w-full bg-white/5 rounded-full"><div className="h-full bg-indigo-500 rounded-full w-[84%]"></div></div>
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Westside Node Capacity</div>
                      <div className="h-2 w-full bg-white/5 rounded-full"><div className="h-full bg-indigo-500 rounded-full w-[45%]"></div></div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      {showToast && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-300 z-50 border border-white/10">
          <div className="w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
             <CheckCircle2 size={20} />
          </div>
          <span className="font-black text-sm uppercase tracking-widest">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;