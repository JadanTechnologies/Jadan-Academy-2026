import React, { useState, useEffect } from 'react';
import { MOCK_SCHOOLS, MOCK_STUDENTS, MOCK_PAYMENT_PROVIDERS, MOCK_COMM_PROVIDERS, MOCK_STAFF, MOCK_PAYROLL, MOCK_PAYMENTS } from '../constants';
import {
  Building2, Plus, Users, ShieldCheck, Activity, Search, Settings, Database,
  CheckCircle2, TrendingUp, Megaphone, DollarSign, ArrowRight, ShieldAlert,
  Server, Zap, Eye, Layout, Globe, Mail, MessageSquare, Bell, CreditCard,
  Trash2, Edit, Filter, GraduationCap, Briefcase, History, Package,
  HeartPulse, ClipboardList, Stamp, Box, BarChart3, Shield, Gem,
  AlertTriangle, Wifi, Globe2, Hammer, LifeBuoy, Newspaper, SearchCode,
  Map, Fingerprint, Lock, Unlock, Gavel, Landmark, BadgeCheck, Network,
  UserPlus, X
} from 'lucide-react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie } from 'recharts';
import { useSystem } from '../SystemContext';
import { useInstitution } from '../InstitutionContext';

interface SuperAdminDashboardProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ activeTab = 'dash', onTabChange }) => {
  const {
    state: systemState,
    setEmergencyLockdown,
    setGlobalFinancesLocked,
    setForceGradeSync,
    setAutoBackupEnabled
  } = useSystem();

  const { schools, addSchool, addBranch, staff, addStaff } = useInstitution();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  // Modals
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Form States
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchLocation, setNewBranchLocation] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');

  const [transfers, setTransfers] = useState(() => {
    const saved = localStorage.getItem('super_admin_transfers');
    return saved ? JSON.parse(saved) : [
      { item: '50 Dual Desks', from: 'Downtown', to: 'East Hill', status: 'In Transit', id: 'TX-9901' },
      { item: '12 Smart Boards', from: 'Westside', to: 'Downtown', status: 'Approved', id: 'TX-9902' },
      { item: '3 School Buses', from: 'East Hill', to: 'Westside', status: 'Pending', id: 'TX-9903' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('super_admin_transfers', JSON.stringify(transfers));
  }, [transfers]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCreateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName) return;
    addSchool({
      name: newSchoolName,
      logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&h=200&auto=format&fit=crop',
      subscriptionPlan: 'Enterprise'
    });
    setNewSchoolName('');
    setShowSchoolModal(false);
    triggerToast(`School "${newSchoolName}" created successfully.`);
  };

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchName || !newBranchLocation || !selectedSchoolId) return;
    addBranch(selectedSchoolId, { name: newBranchName, location: newBranchLocation });
    setNewBranchName('');
    setNewBranchLocation('');
    setShowBranchModal(false);
    triggerToast(`Branch "${newBranchName}" added to terminal.`);
  };

  const branchData = [
    { id: 'b1', name: 'Downtown', students: 520, performance: 88, revenue: 120000, latency: '12ms', staff: 45 },
    { id: 'b2', name: 'Westside', students: 310, performance: 76, revenue: 85000, latency: '18ms', staff: 32 },
    { id: 'b3', name: 'East Hill', students: 450, performance: 82, revenue: 105000, latency: '15ms', staff: 38 },
  ];

  const renderStudentManagement = () => {
    const filteredStudents = MOCK_STUDENTS.filter(s =>
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
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Branches</option>
              {schools.flatMap(s => s.branches).map(b => (
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
                    <p className="text-xs font-black text-slate-700 uppercase">{schools.find(s => s.id === student.schoolId)?.name}</p>
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

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
      {[
        { l: 'Network Nodes', v: schools.reduce((acc, s) => acc + s.branches.length, 0), i: Network, c: 'indigo' },
        { l: 'Global Enrollment', v: '9,240', i: Users, c: 'emerald' },
        { l: 'Cloud Uptime', v: '99.9%', i: Activity, c: 'rose' },
        { l: 'Consolidated Revenue', v: '₦4.2M', i: DollarSign, c: 'amber' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 hover:scale-105 transition-all">
          <div className={`w-14 h-14 bg-${stat.c}-50 text-${stat.c}-600 rounded-2xl flex items-center justify-center`}><stat.i size={28} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.l}</p>
            <p className="text-xl font-black text-slate-900">{stat.v}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGlobalAudit = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black text-slate-900 uppercase flex items-center gap-3">
            Institutional Audit Ledger <ClipboardList className="text-indigo-600" />
          </h3>
          <button className="text-[10px] font-black uppercase text-indigo-600 hover:underline">Full Feed</button>
        </div>
        <div className="space-y-4">
          {[
            { a: 'HQ Admin', m: 'Modified Global Tax Shard', t: '2m ago', s: 'Verified' },
            { a: 'Agent 04', m: 'Accessed Downtown Financial Node', t: '15m ago', s: 'Ghost Mode' },
            { a: 'System', m: 'Automated Backup Sequence Complete', t: '1h ago', s: 'Secure' },
            { a: 'Branch Admin', m: 'Updated Staff Payroll (Westside)', t: '3h ago', s: 'Audit Pending' }
          ].map((l, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-xs shadow-sm">{l.a.charAt(0)}</div>
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase leading-none mb-1">{l.a}</div>
                  <p className="text-[10px] text-slate-400 font-medium italic">{l.m}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-slate-900 mb-1">{l.t}</div>
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${l.s === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>{l.s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
        <Stamp size={200} className="absolute -bottom-10 -right-10 opacity-5 rotate-12" />
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-tight">Emergency<br />Directives</h3>
        <p className="text-slate-400 text-sm italic font-medium mb-8 leading-relaxed">Broadcast priority node commands to all {schools.reduce((acc, s) => acc + s.branches.length, 0)} branch terminals simultaneously.</p>
        <div className="space-y-4">
          <button onClick={() => triggerToast('Directing 100% Shard Focus...')} className="w-full py-4 bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">Immediate Lockdown</button>
          <button onClick={() => triggerToast('Syncing Grade Nodes...')} className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl">Grade Sync Burst</button>
        </div>
      </div>
    </div>
  );

  const renderFeeManagement = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase">Institutional Fee Architecture</h2>
          <p className="text-sm text-slate-500 italic">Tracking collection success across network nodes.</p>
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-8 animate-in fade-in duration-500 text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
      <Stamp size={80} className="mx-auto text-slate-200 mb-6" />
      <h2 className="text-2xl font-black text-slate-900 uppercase">Compliance Shard</h2>
      <p className="text-slate-500 italic">Monitoring governmental regulatory nodes for all branches.</p>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8 animate-in fade-in duration-500 text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
      <Activity size={80} className="mx-auto text-slate-200 mb-6" />
      <h2 className="text-2xl font-black text-slate-900 uppercase">AI Analytics Center</h2>
      <p className="text-slate-500 italic">Processing cross-branch predictive intelligence.</p>
    </div>
  );

  const renderGovernance = () => (
    <div className="space-y-8 animate-in fade-in duration-500 text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
      <Gavel size={80} className="mx-auto text-slate-200 mb-6" />
      <h2 className="text-2xl font-black text-slate-900 uppercase">Governance Terminal</h2>
      <p className="text-slate-500 italic">Institutional policy orchestration.</p>
    </div>
  );

  const renderWealth = () => (
    <div className="space-y-8 animate-in fade-in duration-500 text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
      <Gem size={80} className="mx-auto text-slate-200 mb-6" />
      <h2 className="text-2xl font-black text-slate-900 uppercase">Institutional Wealth</h2>
      <p className="text-slate-500 italic">Tracking endowment and trust fund shards.</p>
    </div>
  );

  const renderCrisis = () => (
    <div className="space-y-8 animate-in fade-in duration-500 text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
      <ShieldAlert size={80} className="mx-auto text-slate-200 mb-6" />
      <h2 className="text-2xl font-black text-slate-900 uppercase">Crisis Command</h2>
      <p className="text-slate-500 italic">Emergency response and lockdown protocols.</p>
    </div>
  );

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-2">Alpha Command</h1>
          <p className="text-slate-500 font-medium italic">Global EdMS Infrastructure | Orchestrating {schools.reduce((acc, s) => acc + s.branches.length, 0)} Branch Nodes</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-right px-4 border-r border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Status</p>
            <p className="text-xs font-black text-emerald-500 uppercase flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Nominal
            </p>
          </div>
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <ShieldCheck size={24} />
          </div>
        </div>
      </div>

      <div className="min-h-[600px]">
        {(activeTab === 'dash' || activeTab === 'overview') && (
          <>
            {renderOverview()}
            {renderGlobalAudit()}
          </>
        )}

        {activeTab === 'branches' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div>
                <h2 className="text-2xl font-black text-slate-900 uppercase">Campus Node Orchestration</h2>
                <p className="text-sm text-slate-500 font-medium italic">Overseeing {schools.reduce((acc, s) => acc + s.branches.length, 0)} active campus shards.</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setShowSchoolModal(true)} className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg">
                  <Plus size={16} /> New School Node
                </button>
                <button onClick={() => setShowBranchModal(true)} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg">
                  <Building2 size={16} /> Add Campus Shard
                </button>
                <button onClick={() => setShowAdminModal(true)} className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg">
                  <UserPlus size={16} /> Assign Branch Admin
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {schools.flatMap(school => school.branches.map(branch => (
                <div key={branch.id} className="bg-white rounded-[2rem] border border-slate-100 p-8 hover:shadow-2xl hover:shadow-slate-200 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Building2 size={80} />
                  </div>
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Building2 size={28} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight">{branch.name}</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">{branch.location} Node</p>
                  <div className="space-y-4 border-t border-slate-50 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Active Shards</span>
                      <span className="text-xs font-black text-indigo-600">{MOCK_STUDENTS.filter(s => s.branchId === branch.id).length} Students</span>
                    </div>
                  </div>
                  <button
                    onClick={() => triggerToast(`Assuming proxy control for ${branch.name}...`)}
                    className="mt-8 w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
                  >
                    Sync Terminal <ArrowRight size={14} />
                  </button>
                </div>
              )))}
            </div>
          </div>
        )}

        {activeTab === 'students' && renderStudentManagement()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'governance' && renderGovernance()}
        {activeTab === 'wealth' && renderWealth()}
        {activeTab === 'crisis' && renderCrisis()}
        {activeTab === 'compliance' && renderCompliance()}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3">
                <ShieldAlert className="text-rose-500" /> Administrative Constraints
              </h3>
              <div className="space-y-4">
                {[
                  { l: 'Global HQ Lockdown', d: 'Freeze all branch operations immediately', v: systemState.emergencyLockdown, action: () => setEmergencyLockdown(!systemState.emergencyLockdown) },
                  { l: 'Lock Institutional Finances', d: 'Mute all fee and payroll modifications', v: systemState.globalFinancesLocked, action: () => setGlobalFinancesLocked(!systemState.globalFinancesLocked) },
                  { l: 'Master Grade Analytics Sync', d: 'Force real-time academic node synchronization', v: systemState.forceGradeSync, action: () => setForceGradeSync(!systemState.forceGradeSync) },
                  { l: 'Automated Log Clearing', d: 'Delete logs older than 24 months', v: systemState.autoBackupEnabled, action: () => setAutoBackupEnabled(!systemState.autoBackupEnabled) }
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-all group">
                    <div className="max-w-xs">
                      <div className="text-xs font-black text-slate-900 uppercase mb-1">{s.l}</div>
                      <p className="text-[10px] text-slate-400 font-bold leading-tight">{s.d}</p>
                    </div>
                    <button
                      onClick={s.action}
                      className={`w-14 h-8 rounded-full relative transition-all ${s.v ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${s.v ? 'left-7' : 'left-1'} shadow-sm`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {showSchoolModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 relative">
            <button onClick={() => setShowSchoolModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X size={24} /></button>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">New School Node</h3>
            <form onSubmit={handleCreateSchool} className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">School Official Name</label>
                <input
                  autoFocus
                  value={newSchoolName}
                  onChange={e => setNewSchoolName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  placeholder="e.g. Royal Academy"
                />
              </div>
              <button className="w-full py-4 bg-indigo-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all">Initialize Shard</button>
            </form>
          </div>
        </div>
      )}

      {showBranchModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 relative">
            <button onClick={() => setShowBranchModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X size={24} /></button>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Add Campus Shard</h3>
            <form onSubmit={handleCreateBranch} className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Target Institution</label>
                <select
                  value={selectedSchoolId}
                  onChange={e => setSelectedSchoolId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold"
                >
                  <option value="">Select School...</option>
                  {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Campus Name</label>
                <input
                  value={newBranchName}
                  onChange={e => setNewBranchName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold"
                  placeholder="e.g. West Campus"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Geographic Location</label>
                <input
                  value={newBranchLocation}
                  onChange={e => setNewBranchLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold"
                  placeholder="e.g. Lagos"
                />
              </div>
              <button className="w-full py-4 bg-indigo-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all">Deploy Node</button>
            </form>
          </div>
        </div>
      )}

      {showAdminModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 relative">
            <button onClick={() => setShowAdminModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X size={24} /></button>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Deploy Branch Admin</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!selectedBranch || selectedBranch === 'all' || !newAdminName || !newAdminEmail) {
                if (!selectedBranch || selectedBranch === 'all') alert('Please select a specific branch from the dropdown above first.');
                return;
              }

              addStaff({
                name: newAdminName,
                role: 'Principal Administrator',
                email: newAdminEmail,
                branchId: selectedBranch,
                phone: '08000000000',
                qualification: 'M.Ed',
                basicSalary: 150000,
                dateJoined: new Date().toISOString().split('T')[0]
              });

              setNewAdminName('');
              setNewAdminEmail('');
              setShowAdminModal(false);
              triggerToast(`Administrator "${newAdminName}" deployed to branch.`);
            }} className="space-y-6">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-4 italic">Deploying Admin for: <span className="font-black text-indigo-600">{schools.flatMap(s => s.branches).find(b => b.id === selectedBranch)?.name || 'Unknown Branch'}</span></p>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Admin Full Name</label>
                <input
                  autoFocus
                  value={newAdminName}
                  onChange={e => setNewAdminName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold"
                  placeholder="e.g. Dr. A. Smith"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Official Email</label>
                <input
                  value={newAdminEmail}
                  onChange={e => setNewAdminEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold"
                  placeholder="admin@school.edu"
                />
              </div>
              <button className="w-full py-4 bg-emerald-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">Authorize Access</button>
            </form>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-300 z-[70] border border-white/10">
          <CheckCircle2 className="text-emerald-400" />
          <span className="font-black text-sm uppercase tracking-widest">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;