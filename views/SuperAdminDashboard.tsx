import React, { useState, useEffect } from 'react';
import { MOCK_SCHOOLS, MOCK_STUDENTS, MOCK_PAYMENT_PROVIDERS, MOCK_COMM_PROVIDERS, MOCK_STAFF, MOCK_PAYROLL, MOCK_PAYMENTS } from '../constants';
import {
  Building2, Plus, Users, ShieldCheck, Activity, Search, Settings, Database,
  CheckCircle2, TrendingUp, Megaphone, DollarSign, ArrowRight, ShieldAlert,
  Server, Zap, Eye, Layout, Globe, Mail, MessageSquare, Bell, CreditCard,
  Trash2, Edit, Filter, GraduationCap, Briefcase, History, Package,
  HeartPulse, ClipboardList, Stamp, Box, BarChart3, Shield, Gem,
  AlertTriangle, Wifi, Globe2, Hammer, LifeBuoy, Newspaper, SearchCode,
  Map, Fingerprint, Lock, Unlock, Gavel, Landmark, BadgeCheck, Network
} from 'lucide-react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie } from 'recharts';

interface SuperAdminDashboardProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

import { useSystem } from '../SystemContext';

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ activeTab = 'dash', onTabChange }) => {
  const {
    state: systemState,
    setEmergencyLockdown,
    setGlobalFinancesLocked,
    setForceGradeSync,
    setAutoBackupEnabled
  } = useSystem();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [showSchoolModal, setShowSchoolModal] = useState(false);

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
              {MOCK_SCHOOLS[0].branches.map(b => (
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

  const renderFeeManagement = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase">Institutional Fee Architecture</h2>
          <p className="text-sm text-slate-500 italic">Tracking collection success across {MOCK_SCHOOLS[0].branches.length} campus nodes.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-emerald-50 px-6 py-4 rounded-2xl border border-emerald-100">
            <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Total Collected</p>
            <p className="text-xl font-black text-emerald-700">₦{MOCK_STUDENTS.reduce((acc, s) => acc + (s.totalPaid || 0), 0).toLocaleString()}</p>
          </div>
          <div className="bg-indigo-50 px-6 py-4 rounded-2xl border border-indigo-100">
            <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest leading-none mb-1">Active Students</p>
            <p className="text-xl font-black text-indigo-700">{MOCK_STUDENTS.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Branch Revenue Shards</h3>
          <div className="space-y-4">
            {MOCK_SCHOOLS[0].branches.map(branch => {
              const branchTotal = MOCK_STUDENTS.filter(s => s.branchId === branch.id).reduce((acc, s) => acc + (s.totalPaid || 0), 0);
              return (
                <div key={branch.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black text-slate-900 uppercase">{branch.name}</div>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{branch.location} Node</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-slate-900">₦{branchTotal.toLocaleString()}</div>
                    <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-2"><div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }}></div></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Recent Payment Traces</h3>
          <div className="space-y-4">
            {MOCK_PAYMENTS.map(pay => (
              <div key={pay.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm"><DollarSign size={20} /></div>
                  <div>
                    <div className="text-xs font-black text-slate-900 uppercase">{pay.studentName}</div>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{pay.method} • {pay.date}</p>
                  </div>
                </div>
                <div className="text-sm font-black text-slate-900">₦{pay.amount}</div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-600 transition-all">Audit Full Network Finances</button>
        </div>
      </div>
    </div>
  );

  const renderPayroll = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase">Global Payroll Shard</h2>
          <p className="text-sm text-slate-500 italic">Managing disbursements across {MOCK_SCHOOLS[0].branches.length} campus nodes.</p>
        </div>
        <button className="px-8 py-4 bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-indigo-600 transition-all">
          Execute Network-Wide Payroll
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_STAFF.map(staff => {
          const payroll = MOCK_PAYROLL.find(p => p.staffId === staff.id);
          return (
            <div key={staff.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Users size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${payroll?.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {payroll?.status || 'Unprocessed'}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 uppercase leading-tight">{staff.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">{staff.role} • {MOCK_SCHOOLS[0].branches.find(b => b.id === staff.branchId)?.name}</p>

              <div className="space-y-2 pt-4 border-t border-slate-50">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span className="text-slate-400">Basic Shard</span>
                  <span className="text-slate-900">₦{staff.basicSalary}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase text-indigo-600">
                  <span>Net Payable</span>
                  <span>₦{(payroll?.amount || staff.basicSalary) + (payroll?.allowances || 0) - (payroll?.deductions || 0)}</span>
                </div>
              </div>
              <button className="mt-6 w-full py-3 bg-slate-50 text-slate-900 text-[8px] font-black uppercase rounded-xl hover:bg-indigo-600 hover:text-white transition-all">View Payslip</button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase">Inventory Orchestrator</h2>
          <p className="text-sm text-slate-500 italic">Cross-branch asset transfers and global logistics tracking.</p>
        </div>
        <button onClick={handleCreateTransfer} className="px-8 py-4 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all flex items-center gap-2">
          <Plus size={16} /> New Transfer Order
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30 font-black text-slate-900 uppercase">Live Transfer Queue</div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-4">Item Shard</th>
                <th className="px-8 py-4">Route</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transfers.map((tx, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-slate-900 uppercase">{tx.item}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Asset Node</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-600">
                      {tx.from} <ArrowRight size={10} className="text-indigo-400" /> {tx.to}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${tx.status === 'In Transit' ? 'bg-amber-50 text-amber-600' : tx.status === 'Approved' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right font-mono text-[10px] text-slate-400 font-black">{tx.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-indigo-900/20 transition-all">
          <div className="absolute -top-10 -right-10 p-10 opacity-10 rotate-12">
            <Package size={150} />
          </div>
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Global Asset Health</h3>
          <p className="text-slate-400 text-sm mb-8 font-medium italic">Consolidated equipment diagnostics across the entire institutional network.</p>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase text-indigo-400">ICT Infrastructure</span>
                <span className="text-xs font-black">92%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase text-amber-400">Science Labs</span>
                <span className="text-xs font-black">74%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: '74%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase text-emerald-400">Fleet Mobility</span>
                <span className="text-xs font-black">88%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>
          <button className="mt-auto w-full py-4 bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">Consolidated Audit</button>
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase">Compliance & Recruitment Hub</h2>
          <p className="text-sm text-slate-500 italic">Institutional standards tracking and global faculty onboarding.</p>
        </div>
        <div className="flex gap-2">
          {
            [
              { label: 'Faculty Health', val: '98%', c: 'emerald' },
              { label: 'Legal Audit', val: 'Pass', c: 'indigo' },
            ].map((stat, i) => (
              <div key={i} className={`bg-${stat.c}-50 px-6 py-3 rounded-2xl border border-${stat.c}-100`}>
                <p className={`text-[8px] font-black text-${stat.c}-600 uppercase mb-1`}>{stat.label}</p>
                <p className={`text-lg font-black text-${stat.c}-700`}>{stat.val}</p>
              </div>
            ))
          }
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900 uppercase">Faculty Recruitment Pipeline</h3>
            <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors"><Plus size={20} /></button>
          </div>
          <div className="space-y-4">
            {[
              { n: 'Prof. David Mendel', r: 'Mathematics HoD', s: 'Intervening', p: 85 },
              { n: 'Dr. Elena Rossi', r: 'Research Lead', s: 'Vetting', p: 40 },
              { n: 'Sarah Jenkins', r: 'Primary Coordinator', s: 'Contracting', p: 100 },
            ].map((r, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-colors"><Users size={24} /></div>
                  <div>
                    <div className="text-sm font-black text-slate-900 uppercase">{r.n}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{r.r}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase text-indigo-600 mb-1">{r.s}</div>
                  <div className="w-20 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${r.p}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8 flex items-center gap-3"><Stamp className="text-rose-600" /> Compliance Registry</h3>
          <div className="space-y-4">
            {[
              { l: 'Ministry of Education Permit', d: 'Expires in 4 months', s: 'Valid' },
              { l: 'ISO 9001 Quality Shard', d: 'Audit scheduled for Week 12', s: 'In Review' },
              { l: 'Child Protection Protocol', d: 'Verified across all branches', s: 'Certified' },
            ].map((c, i) => (
              <div key={i} className="p-5 border border-slate-100 rounded-2xl flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase">{c.l}</div>
                  <p className="text-[10px] text-slate-400 font-medium italic">{c.d}</p>
                </div>
                <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full ${c.s === 'In Review' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{c.s}</span>
              </div>
            ))}
          </div>
          <button className="mt-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Generate Institutional Report</button>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
          <Activity size={200} />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">AI Institutional Cerebro</h2>
          <p className="text-slate-400 max-w-2xl italic">Real-time predictive diagnostics across 1,280 student shards and 200+ staff nodes. Our neural engine predicts a 4.2% increase in academic success this quarter.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          {[
            { l: 'Churn Risk', v: 'Low (0.8%)', c: 'text-emerald-400', i: TrendingUp },
            { l: 'Network Health', v: '99.99%', c: 'text-indigo-400', i: Wifi },
            { l: 'Sentiment Index', v: 'Positive', c: 'text-rose-400', i: HeartPulse },
            { l: 'Growth Vector', v: '+12.5%', c: 'text-amber-400', i: Zap },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <s.i size={20} className={s.c} />
                <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Shard Auto-Verifed</span>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-500 mb-1">{s.l}</p>
              <p className={`text-2xl font-black ${s.c}`}>{s.v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8 flex items-center gap-3">
            Predictive Academic Churn <BarChart3 className="text-indigo-600" />
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={branchData}>
                <defs>
                  <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="performance" stroke="#4f46e5" fillOpacity={1} fill="url(#colorPerf)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Intelligence Feeds</h3>
          <div className="space-y-6">
            {[
              { t: 'Staff Burnout Alert', d: 'High intensity detected in Westside campus shards.', l: 'Warning', c: 'amber' },
              { t: 'Infrastructure ROI', d: 'East Hill Lab upgrades showing 15% better results.', l: 'Insight', c: 'emerald' },
              { t: 'Early Intervention', d: '12 Students in Grade 9B need academic sharding.', l: 'Action', c: 'indigo' },
            ].map((f, i) => (
              <div key={i} className="group relative flex gap-4">
                <div className={`mt-1 w-2 h-2 rounded-full bg-${f.c}-500 shrink-0`}></div>
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase tracking-tight">{f.t}</div>
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{f.d}</p>
                  <span className={`inline-block mt-2 text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-${f.c}-50 text-${f.c}-600`}>{f.l}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">Deep Diagnostics</button>
        </div>
      </div>
    </div>
  );

  const renderGovernance = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Governance & Policy Shard <Gavel className="text-rose-600" />
          </h2>
          <p className="text-sm text-slate-500 italic">Institutional compliance orchestration and multi-branch policy deployment.</p>
        </div>
        <button onClick={() => triggerToast('Initializing Global Audit...')} className="px-8 py-4 bg-rose-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all flex items-center gap-2">
          <Shield size={16} /> Deploy New Policy Shard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900 uppercase">Non-Repudiable Policy Ledger</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Shards</span>
          </div>
          <div className="space-y-4">
            {[
              { p: 'Antiharassment Protocol v4', s: 'Force-Synced', d: 'All Branches', t: 'Verified' },
              { p: 'Acceptable AI Usage Policy', s: 'Awaiting Sign-off', d: 'Staff Cluster', t: 'Pending' },
              { p: 'Fiscal Responsibility Act', s: 'Synced', d: 'HQ & Bursars', t: 'Verified' },
            ].map((p, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-rose-200 transition-all">
                <div>
                  <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{p.p}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[8px] font-black uppercase text-slate-400">{p.d}</span>
                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                    <span className="text-[8px] font-bold text-rose-500 italic">{p.s}</span>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase ${p.t === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {p.t} <BadgeCheck size={10} className="inline ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between">
          <Map size={180} className="absolute -bottom-10 -right-10 opacity-5" />
          <div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Regional Compliance Map</h3>
            <p className="text-slate-400 text-sm mb-8 font-medium italic">Tracing legal shards across all geographic node locations.</p>
            <div className="space-y-6">
              {[
                { r: 'Northern Shard', s: '100%', l: 'Ministry Standard v12' },
                { r: 'Southern Node', s: '94%', l: 'Local Educational Act 2024' },
              ].map((r, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black uppercase text-indigo-400">{r.r}</span>
                    <span className="text-xs font-black">{r.s} Sync</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: r.s }}></div>
                  </div>
                  <p className="text-[8px] text-slate-500 mt-2 font-bold uppercase italic">{r.l}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-white text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all">Institutional Audit Log</button>
        </div>
      </div>
    </div>
  );

  const renderWealth = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner"><Gem size={32} /></div>
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Trust Fund Shard</h3>
            <p className="text-slate-500 text-sm font-medium italic">Consolidated institutional endowment tracking.</p>
          </div>
          <div className="mt-12">
            <div className="text-5xl font-black text-slate-900 tracking-tighter mb-4">₦14.2M</div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase">
              <TrendingUp size={16} /> +2.4% yield this cycle
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all">Investment Portal</button>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 uppercase mb-8 flex items-center gap-3"><Landmark className="text-indigo-600" /> Scholarship Allocation Node</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { l: 'Merit Shards', v: '120 Units', p: '80%', c: 'indigo' },
                { l: 'Need-Based Shards', v: '85 Units', p: '45%', c: 'emerald' },
                { l: 'Special Talent Node', v: '32 Units', p: '100%', c: 'amber' },
              ].map((s, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{s.l}</p>
                  <p className="text-lg font-black text-slate-900 mb-4">{s.v}</p>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full bg-${s.c}-500`} style={{ width: s.p }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden flex items-center justify-between">
            <Network size={120} className="absolute -right-10 opacity-10" />
            <div>
              <h4 className="text-xl font-black uppercase mb-1">Procurement Arbitrage</h4>
              <p className="text-xs text-indigo-100 italic">Optimizing vendor contracts across {MOCK_SCHOOLS[0].branches.length} campus nodes.</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black">₦42.5K</div>
              <div className="text-[10px] font-bold uppercase opacity-60 italic">Saved this Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCrisis = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-rose-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <AlertTriangle size={200} className="absolute -left-10 -bottom-10 opacity-10" />
        <div className="relative z-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
            <LifeBuoy className="animate-spin-slow" /> Crisis Orchestration Hub
          </h2>
          <p className="text-rose-100 max-w-xl font-medium italic">HQ-Level override for institutional emergencies. Instantly broadcast directives and lock down campus shards.</p>
        </div>
        <div className="flex gap-4 relative z-10">
          <button onClick={() => setEmergencyLockdown(!systemState.emergencyLockdown)} className={`px-10 py-5 ${systemState.emergencyLockdown ? 'bg-white text-rose-600' : 'bg-rose-900/50 text-white'} font-black uppercase text-xs tracking-widest rounded-3xl shadow-2xl border-2 border-white/20 hover:scale-105 transition-all`}>
            {systemState.emergencyLockdown ? <Unlock className="inline mr-2" /> : <Lock className="inline mr-2" />}
            {systemState.emergencyLockdown ? 'Initialize Network Unlock' : 'Trigger Global Lockdown'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Lockdown Map Shard</h3>
          <div className="aspect-video bg-slate-900 rounded-[2rem] relative flex items-center justify-center border-8 border-slate-50 shadow-inner">
            <Map size={100} className="text-white/10" />
            {MOCK_SCHOOLS[0].branches.map((b, i) => (
              <div key={i} className={`absolute p-4 rounded-2xl border-2 ${systemState.emergencyLockdown ? 'bg-rose-500/20 border-rose-500 text-rose-500' : 'bg-emerald-500/10 border-emerald-500 text-emerald-500'} flex flex-col items-center gap-1 transition-all animate-pulse`}
                style={{ top: `${20 + (i * 25)}%`, left: `${15 + (i * 30)}%` }}>
                <Shield size={20} />
                <span className="text-[10px] font-black uppercase tracking-tighter">{b.name}</span>
              </div>
            ))}
            <div className="absolute bottom-6 right-6 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-white">
              <div className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">Status Tracer</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${systemState.emergencyLockdown ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}></div>
                <span className="text-xs font-black uppercase">{systemState.emergencyLockdown ? 'LOCKED' : 'NOMINAL'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Crisis Comms Shard</h3>
          <div className="space-y-4 flex-1">
            <textarea className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-rose-500 outline-none resize-none" placeholder="Draft emergency directive for all nodes..."></textarea>
            <div className="grid grid-cols-2 gap-2">
              {['All Faculty', 'All Parents', 'Local Authorities', 'Emergency Services'].map((t, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:border-rose-200 transition-all">
                  <div className="w-4 h-4 rounded bg-white border border-slate-200"></div>
                  <span className="text-[8px] font-black uppercase text-slate-500">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-8 py-4 bg-rose-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-lg shadow-rose-100">Broadcast Directive</button>
        </div>
      </div>
    </div>
  );

  const renderBrand = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          { l: 'Mentions', v: '1.2K', i: MessageSquare, c: 'text-indigo-600' },
          { l: 'Sentiment', v: '88%', i: HeartPulse, c: 'text-emerald-600' },
          { l: 'Reach', v: '250K', i: Globe2, c: 'text-blue-600' },
          { l: 'Alerts', v: 'None', i: ShieldCheck, c: 'text-emerald-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <s.i size={18} className={s.c} />
              <span className="text-[8px] font-black text-slate-300 uppercase">24h Shard</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{s.l}</p>
            <p className="text-xl font-black text-slate-900">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900 uppercase flex items-center gap-3">
              Reputation Trace Ledger <Newspaper className="text-blue-600" />
            </h3>
          </div>
          <div className="space-y-4">
            {[
              { s: 'Google News', t: 'Jadan Academy wins "Innovation Node" Award.', l: 'Positive', c: 'emerald' },
              { s: 'Twitter Shard', t: 'Parents discussing new AI analytics rollout.', l: 'Neutral', c: 'slate' },
              { s: 'Local Press', t: 'East Hill branch expansion approved.', l: 'Positive', c: 'emerald' },
            ].map((m, i) => (
              <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400"><Globe size={18} /></div>
                  <div>
                    <div className="text-xs font-black text-slate-900 uppercase">{m.s}</div>
                    <p className="text-[10px] text-slate-500 font-medium">{m.t}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase bg-${m.c}-50 text-${m.c}-600`}>{m.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black uppercase mb-4">Press Hub</h3>
            <p className="text-slate-400 text-xs italic mb-8">Deploy synchronized press releases to all news shards.</p>
            <div className="space-y-4">
              <input type="text" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs font-medium" placeholder="Release Title..." />
              <textarea className="w-full h-32 bg-white/5 border border-white/5 p-4 rounded-xl text-xs font-medium focus:ring-1 focus:ring-blue-500 outline-none resize-none" placeholder="Release Content..."></textarea>
            </div>
          </div>
          <button className="mt-8 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px]">Execute Sync Broadcast</button>
        </div>
      </div>
    </div>
  );

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
      {/* Command HUD */}
      <div className="bg-indigo-600 p-1 rounded-[2.5rem] shadow-2xl shadow-indigo-200">
        <div className="bg-slate-900 rounded-[2.3rem] p-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><Network size={200} /></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-indigo-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">Live Network Shard</div>
              <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest">HQ Nominal</div>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Institutional Command Center</h2>
            <p className="text-slate-400 text-sm italic font-medium">Orchestrating {MOCK_SCHOOLS[0].branches.length} campus nodes with distributed intelligence.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {[
              { l: 'Global Latency', v: '14ms', i: Wifi },
              { l: 'Data Shards', v: '2,480', i: Database },
              { l: 'System Uptime', v: '99.98%', i: Zap },
              { l: 'Security Level', v: 'Alpha', i: ShieldCheck },
            ].map((h, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                <h.i size={16} className="text-indigo-400" />
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase leading-none mb-1">{h.l}</p>
                  <p className="text-xs font-black text-white leading-none">{h.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Network Nodes', value: `${MOCK_SCHOOLS.reduce((acc, s) => acc + (s.branches?.length || 0), 0)} Clusters`, icon: Server, color: 'text-indigo-600', bg: 'bg-indigo-50', tab: 'branches' },
          { label: 'Global Enrollment', value: '1,280 Students', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50', tab: 'students' },
          { label: 'Cloud Uptime', value: '99.98%', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50', tab: 'analytics' },
          { label: 'Consolidated Revenue', value: '₦310,000', icon: DollarSign, color: 'text-rose-600', bg: 'bg-rose-50', tab: 'finance' },
        ].map((stat, i) => (
          <div key={i} onClick={() => stat.tab && onTabChange?.(stat.tab)} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer">
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
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-2">Alpha Command</h1>
          <p className="text-slate-500 font-medium italic">Global EdMS Infrastructure | Orchestrating {MOCK_SCHOOLS[0].branches.length} Branch Nodes</p>
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
                <p className="text-sm text-slate-500 font-medium italic">Overseeing {MOCK_SCHOOLS[0].branches.length} active campus shards.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_SCHOOLS[0].branches.map(branch => (
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
              ))}
            </div>
          </div>
        )}
        {activeTab === 'students' && renderStudentManagement()}
        {activeTab === 'payroll' && renderPayroll()}
        {activeTab === 'finance' && renderFeeManagement()}
        {activeTab === 'inventory' && renderInventory()}
        {activeTab === 'compliance' && renderCompliance()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'governance' && renderGovernance()}
        {activeTab === 'wealth' && renderWealth()}
        {activeTab === 'crisis' && renderCrisis()}
        {activeTab === 'brand' && renderBrand()}
        {activeTab === 'integrations' && renderIntegrations()}
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
                    <div
                      onClick={s.action}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${s.v ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
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