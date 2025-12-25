import React, { useState, useEffect } from 'react';
import { MOCK_SCHOOLS, MOCK_STUDENTS, MOCK_PAYMENT_PROVIDERS, MOCK_COMM_PROVIDERS } from '../constants';
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
  Zap,
  Eye,
  Layout,
  Globe,
  Mail,
  MessageSquare,
  Bell,
  CreditCard,
  Trash2,
  Edit,
  Filter,
  GraduationCap,
  Briefcase,
  History
} from 'lucide-react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie } from 'recharts';

interface SuperAdminDashboardProps {
  defaultTab?: string;
}

import { useSystem } from '../SystemContext';

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ defaultTab }) => {
  const {
    state: systemState,
    enterGhostMode,
    setGlobalFinancesLocked,
    setForceGradeSync,
    setEmergencyLockdown,
    setAutoBackupEnabled
  } = useSystem();
  const [activeTab, setActiveTab] = useState<'overview' | 'branches' | 'students' | 'integrations' | 'finance' | 'settings'>('overview');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [showSchoolModal, setShowSchoolModal] = useState(false);

  useEffect(() => {
    if (defaultTab === 'dash' || !defaultTab) setActiveTab('overview');
    else if (['branches', 'students', 'integrations', 'finance', 'settings'].includes(defaultTab)) setActiveTab(defaultTab as any);
  }, [defaultTab]);

  const [transfers, setTransfers] = useState([
    { item: '50 Dual Desks', from: 'Downtown', to: 'East Hill', status: 'In Transit', id: 'TX-9901' },
    { item: '12 Smart Boards', from: 'Westside', to: 'Downtown', status: 'Approved', id: 'TX-9902' },
    { item: '3 School Buses', from: 'East Hill', to: 'Westside', status: 'Pending', id: 'TX-9903' }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCreateTransfer = () => {
    const newItem = {
      item: 'Interactive Projector',
      from: 'Downtown',
      to: 'Westside',
      status: 'Pending',
      id: `TX-${Math.floor(Math.random() * 9000) + 1000}`
    };
    setTransfers([newItem, ...transfers]);
    triggerToast(`Transfer order ${newItem.id} initialized.`);
  };

  const branchData = [
    { id: 'b1', name: 'Downtown', students: 520, performance: 88, revenue: 120000, latency: '12ms', staff: 45 },
    { id: 'b2', name: 'Westside', students: 310, performance: 76, revenue: 85000, latency: '18ms', staff: 32 },
    { id: 'b3', name: 'East Hill', students: 450, performance: 82, revenue: 105000, latency: '15ms', staff: 38 },
  ];


  const renderStudentManagement = () => {
    const filteredStudents = MOCK_STUDENTS.filter(s =>
      (selectedSchool === 'all' || s.schoolId === selectedSchool) &&
      (selectedBranch === 'all' || s.branchId === selectedBranch)
    );

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase">Universal Student Registry</h2>
            <p className="text-sm text-slate-500 font-medium italic">Cross-indexing {MOCK_STUDENTS.length} active shards across the network.</p>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedSchool}
              onChange={(e) => { setSelectedSchool(e.target.value); setSelectedBranch('all'); }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Schools</option>
              {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Branches</option>
              {MOCK_SCHOOLS.find(s => s.id === selectedSchool)?.branches?.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Student Identity</th>
                <th className="px-8 py-5">School/Branch</th>
                <th className="px-8 py-5 text-center">Fee Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black">{student.name.charAt(0)}</div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 uppercase">{student.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{student.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-black text-slate-700 uppercase">{MOCK_SCHOOLS.find(s => s.id === student.schoolId)?.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase italic">{student.branchId}</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${student.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                      student.feeStatus === 'Partial' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                      }`}>{student.feeStatus}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Edit size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderIntegrations = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3"><CreditCard className="text-indigo-600" /> Payment Gateways</h3>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">5 Shards Active</span>
          </div>
          <div className="space-y-4">
            {MOCK_PAYMENT_PROVIDERS.map(p => (
              <div key={p.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-4">
                  <img src={p.logo} alt={p.name} className="w-10 h-10 object-contain" />
                  <div>
                    <div className="text-sm font-black text-slate-900 lowercase">{p.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase italic">Auto-Sync Enabled</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${p.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${p.isActive ? 'right-0.5' : 'left-0.5'}`}></div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Settings size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3"><Globe className="text-blue-600" /> Communication Shards</h3>
            <div className="space-y-4">
              {MOCK_COMM_PROVIDERS.map(c => (
                <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400">
                      {c.type === 'Email' ? <Mail size={20} /> : c.type === 'SMS' ? <MessageSquare size={20} /> : <Bell size={20} />}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 uppercase">{c.name}</div>
                      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{c.provider} Terminal</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase ${c.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {c.isActive ? 'Connected' : 'Offline'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden flex items-center justify-between shadow-xl shadow-indigo-100">
            <Database size={80} className="absolute -bottom-5 -right-5 opacity-10" />
            <div className="relative z-10">
              <h4 className="text-lg font-black uppercase mb-1">Custom API Endpoint</h4>
              <p className="text-xs text-indigo-100 italic opacity-80">Sync your school data with 3rd party ERPs.</p>
            </div>
            <button className="px-6 py-3 bg-white text-indigo-600 font-black rounded-xl text-[10px] uppercase shadow-lg">Generate Token</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGlobalAudit = () => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mt-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-slate-900 uppercase">System-Wide Audit Aggregator</h3>
        <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all">
          <History size={14} /> Full Log Analysis
        </button>
      </div>
      <div className="space-y-4">
        {[
          { u: 'HQ-Admin-01', a: 'Modified Global Tax Shard for s1-Node', t: '5 mins ago', s: 'Secure' },
          { u: 'Branch-Admin-b2', a: 'Initialized Mass Transfer Order TX-9904', t: '12 mins ago', s: 'Verified' },
          { u: 'System-Auto', a: 'Hourly Distrubuted Backup (b1, b4) Completed', t: '1 hour ago', s: 'Verified' },
          { u: 'HQ-Admin-01', a: 'Added Resend API Key to Comm Shard', t: '2 hours ago', s: 'Security Alert' },
          { u: 'Ghost-Proxy', a: 'Access assuming b1 control for Audit', t: '3 hours ago', s: 'Verified' }
        ].map((log, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-indigo-100 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${log.s === 'Security Alert' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
              <div>
                <div className="text-sm font-bold text-slate-900">{log.u}</div>
                <p className="text-[10px] text-slate-500 font-medium lowercase">{log.a}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black uppercase text-slate-400">{log.t}</div>
              <div className="text-[8px] font-black text-slate-300 uppercase italic leading-none">{log.s} Trace</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Network Nodes', value: `${MOCK_SCHOOLS.reduce((acc, s) => acc + (s.branches?.length || 0), 0)} Clusters`, icon: Server, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Global Enrollment', value: '1,280 Students', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Cloud Uptime', value: '99.98%', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Consolidated Revenue', value: '$310,000', icon: DollarSign, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}>
              <stat.icon size={28} />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">{stat.label}</div>
              <div className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Node Success Latency</h2>
              <p className="text-sm text-slate-500 font-medium italic">Academic success rate indexed per branch cluster.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-50 text-[10px] font-black uppercase rounded-lg border border-slate-100">Daily</button>
              <button className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-lg">Monthly</button>
            </div>
          </div>
          <div className="h-[250px] mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
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

        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col h-full shadow-2xl shadow-indigo-900/40">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Megaphone size={120} />
          </div>
          <h3 className="text-2xl font-black mb-2 leading-tight uppercase tracking-tighter">HQ Directives</h3>
          <p className="text-slate-400 text-sm font-medium mb-8 italic">Broadcast high-priority instructions to all verified campus nodes.</p>

          <div className="space-y-4 mb-8">
            <input type="text" placeholder="Directive Subject..." className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
            <textarea placeholder="Write directive details..." className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm h-32 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
          </div>

          <button
            onClick={() => triggerToast('Global directive broadcasted!')}
            className="mt-auto w-full py-4 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-950"
          >
            Initialize Network Broadcast
          </button>
        </div>
      </div>

      {renderGlobalAudit()}
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
          { id: 'students', label: 'Student Nexus', icon: GraduationCap },
          { id: 'integrations', label: 'API & Gateways', icon: Globe },
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
        {activeTab === 'students' && renderStudentManagement()}
        {activeTab === 'integrations' && renderIntegrations()}
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
        {activeTab === 'branches' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div>
                <h2 className="text-2xl font-black text-slate-900 uppercase">School Cluster Management</h2>
                <p className="text-sm text-slate-500 font-medium italic">Overseeing {MOCK_SCHOOLS.length} verified academic institutions.</p>
              </div>
              <button
                onClick={() => setShowSchoolModal(true)}
                className="px-8 py-4 bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl flex items-center gap-3 shadow-xl shadow-indigo-100"
              >
                <Plus size={18} /> Register New School
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_SCHOOLS.map(school => (
                <div key={school.id} className="bg-white rounded-[2rem] border border-slate-100 p-8 hover:shadow-2xl hover:shadow-slate-200 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Building2 size={80} />
                  </div>
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <img src={school.logo} alt={school.name} className="w-8 h-8 rounded-lg object-cover" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight">{school.name}</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">{school.subscriptionPlan} Plan</p>
                  <div className="space-y-4 border-t border-slate-50 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Active Branches</span>
                      <span className="text-xs font-black text-indigo-600">{school.branches.length} Nodes</span>
                    </div>
                  </div>
                  <button
                    onClick={() => triggerToast(`Assuming proxy control for ${school.name}...`)}
                    className="mt-8 w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
                  >
                    Configure Clusters <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
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
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-12 px-10 py-4 bg-slate-900 text-white font-black text-xs rounded-2xl uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all">Download Network Audit Log</button>
          </div>
        )}
      </div>

      {showSchoolModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
            <div className="bg-indigo-600 p-10 text-white flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight leading-none">Initialize School</h3>
                <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mt-2">Core Infrastructure Shard Creation</p>
              </div>
              <button onClick={() => setShowSchoolModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ShieldAlert size={24} /></button>
            </div>
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution Name</label>
                  <input type="text" placeholder="St. Marys Academy..." className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Headquarters Location</label>
                  <input type="text" placeholder="London, UK..." className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Subscription Protocol</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Basic', 'Pro', 'Enterprise'].map(plan => (
                    <button key={plan} className={`py-4 rounded-2xl border-2 transition-all font-black uppercase text-[10px] tracking-widest ${plan === 'Enterprise' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400'}`}>
                      {plan}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => { setShowSchoolModal(false); triggerToast('New school shard provisioned successfully.'); }}
                className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all"
              >
                Provision Institutional Node
              </button>
            </div>
          </div>
        </div>
      )}

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