import React, { useState, useEffect } from 'react';
import { School, User, UserRole, InventoryItem, BusRoute, LibraryBook, Student, FeeStructure, PaymentRecord } from '../types';
import {
  Users, GraduationCap, ClipboardCheck, Settings2, Plus, CheckCircle2, XCircle, Eye,
  Building, BookOpen, Layers, DollarSign, Megaphone, ArrowRight, Truck, Box,
  HeartPulse, ShieldAlert, Library, Calendar, Search, Layout,
  UserPlus, CreditCard, UserCheck, Briefcase, Clock, Printer, BellRing, ReceiptText, ChevronDown, ShieldCheck,
  ShoppingCart, Fingerprint, FileText, HardDrive, Zap, History, ClipboardList,
  Radar, Stethoscope, Wallet, Fuel, Hammer, Trophy, Apple, Dna, Siren, Radio,
  Monitor, Activity, Database, Wifi, Settings, FileCheck
} from 'lucide-react';
import { MOCK_INVENTORY, MOCK_BUS_ROUTES, MOCK_BOOKS, MOCK_SUBJECTS, MOCK_CLASSES, MOCK_FEE_STRUCTURES, MOCK_PAYMENTS } from '../constants';
import { useSystem } from '../SystemContext';

interface SchoolAdminDashboardProps {
  school: School;
  user: User;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const SchoolAdminDashboard: React.FC<SchoolAdminDashboardProps> = ({ school, user, activeTab = 'dash', onTabChange }) => {
  const { state: systemState } = useSystem();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // UI state for sub-modules
  const [financeSubTab, setFinanceSubTab] = useState<'track' | 'structure' | 'history'>('track');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);
  const isSystemLocked = systemState.emergencyLockdown;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const [localInventory, setLocalInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem(`inventory_${user.branchId}`);
    return saved ? JSON.parse(saved) : MOCK_INVENTORY.filter(i => i.branchId === user.branchId);
  });

  const [localTransport, setLocalTransport] = useState<BusRoute[]>(() => {
    const saved = localStorage.getItem(`transport_${user.branchId}`);
    return saved ? JSON.parse(saved) : MOCK_BUS_ROUTES.filter(r => r.branchId === user.branchId);
  });

  const [localBooks, setLocalBooks] = useState<LibraryBook[]>(() => {
    const saved = localStorage.getItem(`books_${user.branchId}`);
    return saved ? JSON.parse(saved) : MOCK_BOOKS.filter(b => b.branchId === user.branchId);
  });

  const [localStudents, setLocalStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(`students_${user.branchId}`);
    if (saved) return JSON.parse(saved);
    return [
      { id: 's1', name: 'Alice Thompson', studentId: 'STU-1001', classId: 'c1', arm: 'A', parentEmail: 'p.thompson@email.com', branchId: 'b1', feeStatus: 'Paid' as 'Paid', totalPaid: 1300, role: UserRole.STUDENT, email: 'a@t.com' },
      { id: 's2', name: 'Bob Wilson', studentId: 'STU-1002', classId: 'c1', arm: 'A', parentEmail: 'b.wilson@email.com', branchId: 'b1', feeStatus: 'Partial' as 'Partial', totalPaid: 600, role: UserRole.STUDENT, email: 'b@w.com' },
      { id: 's3', name: 'Charlie Dean', studentId: 'STU-1003', classId: 'c2', arm: 'B', parentEmail: 'c.dean@email.com', branchId: 'b1', feeStatus: 'Unpaid' as 'Unpaid', totalPaid: 0, role: UserRole.STUDENT, email: 'c@d.com' },
    ].filter(s => s.branchId === user.branchId);
  });

  useEffect(() => {
    localStorage.setItem(`inventory_${user.branchId}`, JSON.stringify(localInventory));
  }, [localInventory, user.branchId]);

  useEffect(() => {
    localStorage.setItem(`transport_${user.branchId}`, JSON.stringify(localTransport));
  }, [localTransport, user.branchId]);

  useEffect(() => {
    localStorage.setItem(`books_${user.branchId}`, JSON.stringify(localBooks));
  }, [localBooks, user.branchId]);

  useEffect(() => {
    localStorage.setItem(`students_${user.branchId}`, JSON.stringify(localStudents));
  }, [localStudents, user.branchId]);

  const branchInventory = localInventory;
  const branchTransport = localTransport;
  const branchBooks = localBooks;
  const branchClasses = MOCK_CLASSES.filter(c => c.branchId === user.branchId);
  const branchFeeStructures = MOCK_FEE_STRUCTURES.filter(f => f.branchId === user.branchId);
  const branchPayments = MOCK_PAYMENTS.filter(p => p.branchId === user.branchId);
  const branchStudents = localStudents;

  const getFeeTotalForClass = (classId: string) => {
    return branchFeeStructures.find(f => f.classId === classId)?.total || 0;
  };

  const renderOperations = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h4 className="font-black text-slate-900 uppercase flex items-center gap-2 mb-6"><Truck className="text-indigo-600" /> Transport Fleet</h4>
        <div className="space-y-4">
          {branchTransport.map(r => (
            <div key={r.id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-slate-900">{r.routeName}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">{r.driverName}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-slate-900">{r.occupied}/{r.capacity}</div>
                <div className="w-20 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${(r.occupied / r.capacity) * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
          {branchTransport.length === 0 && <p className="text-xs text-slate-400 font-medium">No transport routes assigned.</p>}
        </div>
      </div>
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h4 className="font-black text-slate-900 uppercase flex items-center gap-2 mb-6"><Box className="text-emerald-600" /> Inventory Node</h4>
        <div className="space-y-4">
          {branchInventory.map(i => (
            <div key={i.id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-slate-900">{i.name}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">{i.category}</div>
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase ${i.status === 'Good' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{i.status}</span>
            </div>
          ))}
          {branchInventory.length === 0 && <p className="text-xs text-slate-400 font-medium">No inventory records found.</p>}
        </div>
      </div>
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h4 className="font-black text-slate-900 uppercase flex items-center gap-2 mb-6"><Library className="text-amber-600" /> Library Log</h4>
        <div className="space-y-4">
          {branchBooks.map(b => (
            <div key={b.id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{b.title}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">{b.author}</div>
              </div>
              <div className={`w-2 h-2 rounded-full ${b.isAvailable ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            </div>
          ))}
          {branchBooks.length === 0 && <p className="text-xs text-slate-400 font-medium">No library records available.</p>}
        </div>
      </div>
    </div>
  );

  const renderFeeManagement = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Fee Management Console</h2>
          <p className="text-sm text-slate-500 font-medium italic">Financial node administration for {user.branchId} Campus.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => triggerToast('Notification dispatched to all debtors.')} className="px-6 py-3 bg-rose-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-xl shadow-rose-100 flex items-center gap-2">
            <BellRing size={16} /> Send Debt Reminders
          </button>
          <button onClick={() => triggerToast('New payment record initialized.')} className="px-6 py-3 bg-indigo-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 flex items-center gap-2">
            <Plus size={16} /> Record Payment
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        {[
          { id: 'track', label: 'Payment Tracker', icon: Users },
          { id: 'structure', label: 'Fee Structures', icon: Layers },
          { id: 'history', label: 'Revenue History', icon: Clock },
        ].map(sub => (
          <button
            key={sub.id}
            onClick={() => setFinanceSubTab(sub.id as any)}
            className={`px-6 py-4 font-black text-[10px] uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${financeSubTab === sub.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            <sub.icon size={16} /> {sub.label}
          </button>
        ))}
      </div>

      {financeSubTab === 'track' && (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Student Candidate</th>
                <th className="px-8 py-5">Class</th>
                <th className="px-8 py-5">Expected</th>
                <th className="px-8 py-5">Amount Paid</th>
                <th className="px-8 py-5">Balance</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {branchStudents.map(stu => {
                const total = getFeeTotalForClass(stu.classId);
                const balance = total - (stu.totalPaid || 0);
                return (
                  <tr key={stu.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 uppercase text-xs">{stu.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{stu.studentId}</div>
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-slate-600 uppercase">
                      {MOCK_CLASSES.find(c => c.id === stu.classId)?.name}
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-slate-900">${total.toLocaleString()}</td>
                    <td className="px-8 py-6 text-xs font-black text-emerald-600">${stu.totalPaid?.toLocaleString()}</td>
                    <td className="px-8 py-6 text-xs font-black text-rose-600">${balance.toLocaleString()}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${stu.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                        stu.feeStatus === 'Partial' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                        }`}>{stu.feeStatus}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Record Part Payment"><DollarSign size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg" title="Send SMS reminder"><BellRing size={18} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {financeSubTab === 'structure' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branchClasses.map(cls => {
            const structure = branchFeeStructures.find(f => f.classId === cls.id);
            return (
              <div key={cls.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Layers size={80} />
                </div>
                <h4 className="text-lg font-black text-slate-900 uppercase mb-1">{cls.name}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Arm {cls.arm} Node</p>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-bold">Tuition</span>
                    <span className="font-black text-slate-900">${structure?.tuition || 0}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-bold">Development</span>
                    <span className="font-black text-slate-900">${structure?.development || 0}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-bold">Other Levies</span>
                    <span className="font-black text-slate-900">${structure?.other || 0}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex justify-between">
                    <span className="text-[10px] font-black text-indigo-600 uppercase">Term Total</span>
                    <span className="text-xl font-black text-indigo-600">${structure?.total || 0}</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-slate-50 text-slate-600 font-black text-[10px] uppercase rounded-xl hover:bg-indigo-600 hover:text-white transition-all">Edit Structure</button>
              </div>
            );
          })}
          <button className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-indigo-300 hover:bg-white transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:shadow-lg transition-all">
              <Plus size={24} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Add Class Level</span>
          </button>
        </div>
      )}

      {financeSubTab === 'history' && (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-black text-slate-900 uppercase">Recent Transactions</h3>
            <button className="text-xs font-black text-indigo-600 uppercase flex items-center gap-1"><Printer size={14} /> Export CSV</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Ref ID</th>
                <th className="px-8 py-5">Student</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Method</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {branchPayments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-6 font-mono text-[10px] text-indigo-600 font-black">{p.id.toUpperCase()}</td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-900">{p.studentName}</td>
                  <td className="px-8 py-6 text-xs text-slate-500 font-bold">{p.date}</td>
                  <td className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase">{p.method}</td>
                  <td className="px-8 py-6 text-xs font-black text-emerald-600">${p.amount.toLocaleString()}</td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => setSelectedReceipt(p)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><ReceiptText size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderFleet = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase">Fleet & Logistics Nexus</h2>
          <p className="text-sm text-slate-500 italic">Tracking {branchTransport.length} active routes and fuel orchestration.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
            <p className="text-[8px] font-black text-emerald-600 uppercase mb-1">Fuel Credits</p>
            <p className="text-lg font-black text-emerald-700">840L</p>
          </div>
          <button className="px-8 py-4 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all flex items-center gap-2">
            <Fuel size={16} /> Bulk Re-Fuel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30 font-black text-slate-900 uppercase flex justify-between items-center">
            Active Fleet Status
            <span className="text-[10px] font-black text-indigo-600 tracking-widest">Live Shards</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-4">Vehicle/Driver</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Load</th>
                <th className="px-8 py-4 text-right">Comm Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {branchTransport.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-6">
                    <div className="text-xs font-black text-slate-900 uppercase">{r.routeName}</div>
                    <div className="text-[10px] text-slate-400 font-bold italic">{r.driverName}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase rounded-full">In Transit</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-[10px] font-black text-slate-600 mb-1">{((r.occupied / r.capacity) * 100).toFixed(0)}%</div>
                    <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${(r.occupied / r.capacity) * 100}%` }}></div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Radio size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col">
          <Siren size={150} className="absolute -top-10 -right-10 opacity-10" />
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Emergency Dispatch</h3>
          <p className="text-slate-400 text-sm mb-8 font-medium italic">HQ-level dispatch override for institutional fleet redirection.</p>
          <div className="space-y-4 mb-8">
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
              <div className="text-[10px] font-black text-rose-400 uppercase mb-2">Protocol Shard</div>
              <p className="text-xs text-slate-300 font-medium">Automatic re-routing active for Downtown cluster due to traffic sharding.</p>
            </div>
          </div>
          <button className="mt-auto w-full py-4 bg-rose-600 text-white font-black rounded-2xl uppercase text-[10px] tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-900/40">Broadcast Alert</button>
        </div>
      </div>
    </div>
  );

  const renderFacilities = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Facility Health & Ops <Hammer className="text-slate-900" />
          </h2>
          <p className="text-sm text-slate-500 italic">Institutional asset lifecycle and maintenance orchestration.</p>
        </div>
        <button className="px-8 py-4 bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-indigo-600 transition-all flex items-center gap-2">
          Add Repair Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Asset Diagnostics</h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              { l: 'ICT Infrastructure', v: '92%', c: 'indigo' },
              { l: 'Lab Equipment', v: '78%', c: 'amber' },
              { l: 'Power Systems', v: '100%', c: 'emerald' },
              { l: 'HVAC Nodes', v: '64%', c: 'rose' },
            ].map((a, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{a.l}</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-black text-slate-900">{a.v}</p>
                  <div className={`w-8 h-8 bg-${a.c}-50 text-${a.c}-600 rounded-xl flex items-center justify-center`}><Monitor size={16} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <Settings2 size={180} className="absolute -bottom-10 -right-10 opacity-10 rotate-12" />
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Maintenance Sharding</h3>
            <p className="text-indigo-100 text-sm font-medium italic mb-8">Predictive scheduling for janitorial and technical intervention nodes.</p>
            <div className="space-y-4">
              {[
                { t: 'Science Lab 2', a: 'Calibration', d: 'In 2 Days' },
                { t: 'Main Gen-Set', a: 'Oil Shard Change', d: 'In 4 Days' },
              ].map((s, i) => (
                <div key={i} className="p-4 bg-white/10 rounded-2xl border border-white/5 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-black uppercase text-white">{s.t}</div>
                    <div className="text-[8px] font-black uppercase text-indigo-300">{s.a}</div>
                  </div>
                  <span className="text-[10px] font-black text-indigo-400 bg-white px-3 py-1 rounded-full">{s.d}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all">Launch Task Orchestrator</button>
        </div>
      </div>
    </div>
  );

  const renderHealth = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Sickbay & Health Shard <Stethoscope className="text-emerald-600" />
          </h2>
          <p className="text-sm text-slate-500 italic">Institutional wellbeing and medical records orchestration.</p>
        </div>
        <button className="px-8 py-4 bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all flex items-center gap-2">
          New Incident Log
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900 uppercase">Active Medical Logs</h3>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Shards</span>
          </div>
          <div className="p-0">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Student</th>
                  <th className="px-8 py-4">Complaint</th>
                  <th className="px-8 py-4">Treated By</th>
                  <th className="px-8 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { n: 'David Okafor', c: 'Mild Fever', t: 'Nurse Sarah', s: 'Observing' },
                  { n: 'Grace Evans', c: 'Allergy Shard Trigger', t: 'Dr. Mike', s: 'Discharged' },
                ].map((l, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-6 font-bold text-slate-900 text-xs uppercase">{l.n}</td>
                    <td className="px-8 py-6 text-[10px] font-black text-slate-600 uppercase italic">{l.c}</td>
                    <td className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase">{l.t}</td>
                    <td className="px-8 py-6 text-right">
                      <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase ${l.s === 'Observing' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{l.s}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col">
          <Dna size={150} className="absolute -top-10 -right-10 opacity-10" />
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Bio-Medical Shard</h3>
          <p className="text-emerald-400 text-sm mb-8 font-medium italic">Aggregated health data across student and staff clusters.</p>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase text-emerald-300">Medication Sync</span>
                <span className="text-xs font-black">100% Correct</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase text-indigo-300">Vitals Verification</span>
                <span className="text-xs font-black">Phase 1 Done</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-emerald-900 transition-all">Health Analytics</button>
        </div>
      </div>
    </div>
  );

  const renderLocalFinance = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Local Treasury & Petty Cash <Wallet className="text-indigo-600" />
          </h2>
          <p className="text-sm text-slate-500 italic">Branch-level orchestration of operational expenditure shards.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100">
            <p className="text-[8px] font-black text-indigo-600 uppercase mb-1">Treasury Balance</p>
            <p className="text-lg font-black text-indigo-700">₦4,250.00</p>
          </div>
          <button className="px-8 py-4 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all flex items-center gap-2">
            <Plus size={16} /> Fund Requisition
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Daily Expense Ledger</h3>
          <div className="space-y-4">
            {[
              { i: 'Janitorial Supplies', a: '₦120.00', t: '09:00 AM', s: 'Approved' },
              { i: 'Lab Reagents Shard', a: '₦350.00', t: '11:30 AM', s: 'Pending' },
              { i: 'Emergency Bus Maintenance', a: '₦200.00', t: '01:15 PM', s: 'Approved' },
            ].map((e, idx) => (
              <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-all">
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase">{e.i}</div>
                  <div className="text-[8px] text-slate-400 font-bold uppercase">{e.t}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-slate-900">{e.a}</div>
                  <span className={`text-[8px] font-black uppercase ${e.s === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}`}>{e.s}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <Briefcase size={180} className="absolute -bottom-10 -right-10 opacity-5" />
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">PTA & Project Shards</h3>
            <p className="text-slate-400 text-sm font-medium italic mb-8">Tracking local community-funded project nodes.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { l: 'Sports Pavilion', p: '85%', t: '₦12,000' },
                { l: 'Library Shard Expansion', p: '40%', t: '₦5,000' },
              ].map((p, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] font-black uppercase text-indigo-400 mb-1">{p.l}</div>
                  <div className="text-lg font-black">{p.t}</div>
                  <div className="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: p.p }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-8 py-4 bg-white/10 border border-white/5 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">Audit Treasury</button>
        </div>
      </div>
    </div>
  );

  const renderAdmissions = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Admissions Terminal <Fingerprint className="text-indigo-600" size={24} />
          </h2>
          <p className="text-sm text-slate-500 italic">Electronic candidate processing and enrollment verification.</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">
          Review Entry Queue (14)
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/30">
          <h3 className="text-xl font-black text-slate-900 uppercase">Awaiting Documentation</h3>
        </div>
        <div className="p-0">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Nominee</th>
                <th className="px-8 py-4">Target Node</th>
                <th className="px-8 py-4">Progress</th>
                <th className="px-8 py-4 text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { n: 'Samuel Okafor', c: 'Grade 10', p: 80, id: 'ADM-PR-01' },
                { n: 'Amara Wilson', c: 'Grade 7', p: 30, id: 'ADM-PR-02' },
              ].map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900 uppercase text-xs">{c.n}</div>
                  </td>
                  <td className="px-8 py-6 text-xs font-black text-slate-600 uppercase">{c.c}</td>
                  <td className="px-8 py-6">
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${c.p}%` }}></div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right font-black text-slate-400 text-[10px] tracking-widest">{c.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <ShieldCheck size={180} className="absolute -bottom-10 -right-10 opacity-5" />
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Offer Orchestrator</h3>
            <p className="text-indigo-400 text-sm font-medium italic mb-8">Generate and dispatch official Admission Offer shards.</p>
            <div className="space-y-4">
              {[
                { n: 'Dispatch Formal Offer', i: FileCheck, desc: 'Institutional watermark applied' },
                { n: 'Review Acceptance Log', i: History, desc: 'Real-time sync node' },
              ].map((o, i) => (
                <button key={i} className="w-full p-6 bg-white/5 border border-white/5 rounded-[2rem] text-left hover:bg-white/10 transition-all flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform"><o.i size={24} /></div>
                  <div>
                    <p className="font-black uppercase tracking-tight">{o.n}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{o.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button className="flex-1 py-4 bg-indigo-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-slate-900 transition-all">New Admission Portal</button>
            <button className="flex-1 py-4 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">Audit Entries</button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest pl-4">Active Offer Shards</h3>
          {[
            { n: 'Chima Obi', s: 'Awaiting Response', d: 'Oct 22', r: 'ADM-OFF-92' },
            { n: 'Blessing Ade', s: 'Offer Viewed', d: 'Oct 24', r: 'ADM-OFF-94' },
          ].map((o, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">?</div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase text-xs">{o.n}</h4>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{o.r}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase ${o.s === 'Offer Viewed' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>{o.s}</span>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-2">Expiry: {o.d}</p>
              </div>
            </div>
          ))}
          <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><Activity size={20} /></div>
            <div>
              <p className="text-xs font-black text-indigo-900 uppercase">Institutional Conversion</p>
              <p className="text-[10px] font-medium text-indigo-600 italic">82% of sent offer nodes have successfully sharded into enrollment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcurement = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Procurement Node <ShoppingCart className="text-amber-600" size={24} />
          </h2>
          <p className="text-sm text-slate-500 italic">Requisition lifecycle and vendor asset management.</p>
        </div>
        <button className="px-8 py-4 bg-amber-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">
          New Requisition
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
          <h3 className="text-xl font-black uppercase mb-8">Asset Requests</h3>
          <div className="space-y-4">
            {[
              { item: 'Chemical Reagents (Set B)', cost: '₦1,200', status: 'Awaiting HQ Approval' },
              { item: 'Bus Spare Parts (Engine)', cost: '₦850', status: 'Verified' },
            ].map((r, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-sm font-black uppercase text-white">{r.item}</div>
                  <div className="text-xs font-bold text-slate-500">{r.cost}</div>
                </div>
                <span className="text-[8px] font-black uppercase px-3 py-1 bg-white/10 rounded-full">{r.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mb-6"><FileText size={32} /></div>
          <h3 className="text-xl font-black text-slate-900 uppercase mb-2">Vendor Database</h3>
          <p className="text-slate-500 text-sm mb-8 px-4 font-medium italic">Directory of certified institutional suppliers and maintenance partners.</p>
          <button className="px-8 py-3 bg-slate-100 text-slate-900 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-indigo-50 transition-colors">Catalog View</button>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Security & Biometrics <ShieldCheck className="text-rose-600" size={24} />
          </h2>
          <p className="text-sm text-slate-500 italic">Identity verification and visitor management terminal.</p>
        </div>
        <button className="px-8 py-4 bg-rose-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">
          Log New Visitor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900 uppercase">Visitor Registry</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Logs</span>
          </div>
          <div className="p-0">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Visitor</th>
                  <th className="px-8 py-4">Purpose</th>
                  <th className="px-8 py-4">Time In</th>
                  <th className="px-8 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { n: 'Robert Vance', p: 'Parent Meeting', t: '09:12 AM', s: 'On Site' },
                  { n: 'Contracting Service', p: 'AC Maintenance', t: '10:45 AM', s: 'Signed Out' },
                ].map((v, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 uppercase text-xs">{v.n}</div>
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-slate-600 uppercase">{v.p}</td>
                    <td className="px-8 py-6 text-xs text-slate-400 font-bold">{v.t}</td>
                    <td className="px-8 py-6 text-right">
                      <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${v.s === 'On Site' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{v.s}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col">
          <div className="absolute -top-10 -right-10 p-10 opacity-10 rotate-12">
            <HardDrive size={150} />
          </div>
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Biometric Sync</h3>
          <p className="text-slate-400 text-sm mb-8 font-medium italic">Identity node synchronization for staff and student clusters.</p>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase text-indigo-400">Staff Biometrics</span>
                <span className="text-xs font-black">100% Verified</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase text-rose-400">Student Biometrics</span>
                <span className="text-xs font-black">84% Synced</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
          <button className="mt-auto w-full py-4 bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">Force Re-Sync</button>
        </div>
      </div>
    </div>
  );

  const renderExams = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Exam Orchestrator <Layers className="text-rose-600" />
          </h2>
          <p className="text-sm text-slate-500 italic">Global scheduling, security protocols, and result shard processing.</p>
        </div>
        <button className="px-8 py-4 bg-rose-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all flex items-center gap-2">
          <Plus size={16} /> Schedule Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2">Live Session Nodes</h3>
          {[
            { t: 'Unified Grade 10 Mid-Term', b: 'Main Campus', s: 'Active', p: '88%' },
            { t: 'Staff Proficiency Assessment', b: 'ICT Lab', s: 'Pending Sync', p: '0%' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex justify-between items-center group hover:border-rose-200 transition-all">
              <div>
                <h4 className="text-xl font-black text-slate-900 uppercase leading-tight mb-1">{s.t}</h4>
                <div className="flex gap-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{s.b} Node</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{s.p} Completion</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase ${s.s === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {s.s}
                </span>
                <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-rose-600 transition-all"><Settings size={18} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <ShieldCheck size={120} className="absolute -bottom-5 -right-5 opacity-10" />
            <h3 className="text-xl font-black uppercase mb-6">Security Firewall</h3>
            <div className="space-y-4">
              {[
                { l: 'IP Whitelisting', v: 'Active', s: true },
                { l: 'Identity Sync', v: 'Enforced', s: true },
                { l: 'Plagiarism Shard', v: 'Scanning', s: true },
              ].map((f, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-black uppercase text-slate-400">{f.l}</span>
                  <span className="text-[8px] font-black uppercase text-emerald-400">{f.v}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Update Protocols</button>
          </div>

          <div className="bg-rose-600 rounded-[2.5rem] p-8 text-white">
            <h4 className="text-xl font-black uppercase mb-2">Automated Grading</h4>
            <p className="text-rose-100 text-[10px] font-medium italic mb-6">Scripted grading shards for objective paper nodes.</p>
            <div className="text-4xl font-black mb-6">24,500 <span className="text-sm font-normal">Processed</span></div>
            <button className="w-full py-3 bg-white text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">View Grade Map</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDiscipline = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Discipline & Events <Zap className="text-amber-500" size={24} />
          </h2>
          <p className="text-sm text-slate-500 italic">Institutional event orchestration and disciplinary registry.</p>
        </div>
        <button className="px-8 py-4 bg-amber-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">
          Schedule Global Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Disciplinary Case Log</h3>
          <div className="space-y-4">
            {[
              { n: 'James Peterson', c: 'Grade 9B', i: 'Unauthorized Device Usage', s: 'Suspended (3 Days)', l: 'High' },
              { n: 'Emily Summers', c: 'Grade 11A', i: 'Late Submission Pattern', s: 'Warning Issued', l: 'Low' },
            ].map((caseItem, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center group hover:border-amber-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full ${caseItem.l === 'High' ? 'bg-rose-500' : 'bg-amber-400'}`}></div>
                  <div>
                    <div className="text-sm font-black text-slate-900 uppercase">{caseItem.n}</div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{caseItem.c} • {caseItem.i}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black text-slate-900 uppercase mb-1">{caseItem.s}</div>
                  <button className="text-[8px] font-black text-indigo-600 uppercase hover:underline">View Dossier</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col">
          <Calendar size={120} className="absolute -top-10 -right-10 opacity-10" />
          <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter leading-tight">Branch Calendar</h4>
          <div className="space-y-4 mb-8">
            {[
              { e: 'Inter-House Sports', d: 'Oct 24, 2025' },
              { e: 'Mid-Term Assessment', d: 'Nov 02, 2025' },
            ].map((ev, i) => (
              <div key={i} className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <div className="text-xs font-black uppercase">{ev.e}</div>
                <div className="text-[10px] text-indigo-200 font-bold">{ev.d}</div>
              </div>
            ))}
          </div>
          <button className="mt-auto w-full py-4 bg-white text-indigo-600 font-black rounded-2xl uppercase text-[10px] tracking-widest hover:bg-indigo-50 transition-all">Launch Scheduler</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {selectedReceipt && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-indigo-600 p-10 text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Fee Receipt</h3>
                <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest">{school.name}</p>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><XCircle size={24} /></button>
            </div>
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Received From</p>
                  <p className="font-black text-slate-900 uppercase text-sm">{selectedReceipt.studentName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date Issued</p>
                  <p className="font-bold text-slate-900 text-sm">{selectedReceipt.date}</p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold italic">Payment for: Academic Tuition & Levies</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-slate-200">
                  <span className="text-[10px] font-black text-indigo-600 uppercase">Paid via {selectedReceipt.method}</span>
                  <span className="text-3xl font-black text-slate-900">${selectedReceipt.amount.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => window.print()} className="flex-1 py-4 bg-slate-900 text-white font-black uppercase text-xs rounded-2xl flex items-center justify-center gap-2"><Printer size={16} /> Print Copy</button>
                <button onClick={() => triggerToast('Receipt shared to parent email.')} className="flex-1 py-4 bg-indigo-50 text-indigo-600 font-black uppercase text-xs rounded-2xl">Share Digital</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase tracking-widest leading-none">Branch Command</h1>
          <p className="text-slate-500 font-medium italic">{school.name} | Campus Node: {user.branchId}</p>
        </div>
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'dash' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Campus Command HUD */}
            <div className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-indigo-200">
              <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><Activity size={200} /></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest">Branch Node Active</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full text-[8px] font-black uppercase tracking-widest">Sync Priority: High</span>
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{user.branchId} Campus Terminal</h2>
                <p className="text-slate-400 text-sm italic font-medium">Orchestrating local educational shards with HQ synchronization.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10 w-full md:w-auto">
                {[
                  { l: 'Local Uptime', v: '100%', i: Zap },
                  { l: 'Active Shards', v: '840', i: Database },
                  { l: 'Staff Pulse', v: 'Stable', i: HeartPulse },
                  { l: 'Network Latency', v: '8ms', i: Wifi },
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

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { l: 'Total Revenue', v: '₦420,000', i: DollarSign, c: 'indigo', tab: 'finance' },
                { l: 'Academic Health', v: '88% Shard', i: GraduationCap, c: 'emerald', tab: 'results' },
                { l: 'Asset Vitality', v: '92% Good', i: Hammer, c: 'fleet', tab: 'fleet' },
                { l: 'Incident Logs', v: '2 Today', i: Siren, c: 'rose', tab: 'security' },
              ].map((s, i) => (
                <div key={i} onClick={() => s.tab && onTabChange?.(s.tab)} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-indigo-200 transition-all cursor-pointer">
                  <div className={`w-12 h-12 bg-${s.c}-50 text-${s.c}-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}><s.i size={24} /></div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">{s.l}</div>
                    <div className="text-lg font-black text-slate-900">{s.v}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Audit Explorer */}
              <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-slate-900 uppercase">System Audit Explorer</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded-xl">Full Audit</button>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { u: 'Teacher J. Wilson', a: 'Modified Math Scores (Grade 10A)', t: '12 mins ago', s: 'Secure' },
                    { u: 'Bursar A. Jane', a: 'Generated Monthly Payroll Draft', t: '1 hour ago', s: 'Verified' },
                    { u: 'Admin Proxy', a: 'Updated Library Access Policy', t: '3 hours ago', s: 'Security Alert' }
                  ].map((log, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className={`w-1.5 h-1.5 rounded-full ${log.s === 'Security Alert' ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                        <div>
                          <span className="text-sm font-bold text-slate-900">{log.u}</span>
                          <p className="text-[10px] text-slate-500 font-medium italic">{log.a}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400">{log.t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Hub */}
              <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col">
                <Settings2 size={120} className="absolute -top-10 -right-10 opacity-10" />
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter leading-tight">Asset Maintenance</h4>
                <p className="text-indigo-200 text-sm mb-8 font-medium italic">Schedule repairs and track asset lifecycles for this campus.</p>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-black uppercase mb-1 text-indigo-100">Gen Set Maintenance</div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full mt-2"><div className="h-full bg-white rounded-full w-[15%]"></div></div>
                    <p className="text-[8px] mt-2 font-bold uppercase text-indigo-300">Due in 4 days</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-black uppercase mb-1 text-indigo-100">Lab Tech Calibration</div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full mt-2"><div className="h-full bg-emerald-400 rounded-full w-[85%]"></div></div>
                  </div>
                </div>

                <button className="mt-auto w-full py-4 bg-white text-indigo-600 font-black rounded-2xl uppercase text-[10px] tracking-widest hover:bg-indigo-50 transition-all">Maintenance Portal</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900 uppercase">Staff Directory Hub</h2>
              <button className="px-6 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase rounded-xl flex items-center gap-2">
                <UserPlus size={16} /> Add New Faculty
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { n: 'Dr. Sarah Collins', r: 'Vice Principal (Academic)', e: 's.collins@school.com', s: 'On Campus', p: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop' },
                { n: 'Mark Thompson', r: 'Head of Sciences', e: 'm.thompson@school.com', s: 'In Class', p: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop' },
                { n: 'Elizabeth Reed', r: 'Chief Bursar', e: 'e.reed@school.com', s: 'In Office', p: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop' }
              ].map((staff, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-100 transition-all group">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={staff.p} className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform" alt={staff.n} />
                    <div>
                      <h4 className="font-black text-slate-900 uppercase text-sm leading-tight">{staff.n}</h4>
                      <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-tight">{staff.r}</p>
                    </div>
                  </div>
                  <div className="space-y-3 border-t border-slate-50 pt-6">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                      <span className="text-slate-400">Email</span>
                      <span className="text-slate-900 tracking-tight">{staff.e}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase">
                      <span className="text-slate-400">Activity Status</span>
                      <span className="text-emerald-500">{staff.s}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-8">
                    <button className="flex-1 py-3 bg-slate-50 text-slate-400 text-[10px] font-black uppercase rounded-xl hover:bg-slate-900 hover:text-white transition-all">Profile</button>
                    <button className="flex-1 py-3 bg-slate-50 text-slate-400 text-[10px] font-black uppercase rounded-xl hover:bg-indigo-600 hover:text-white transition-all">Appraisal</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Verify Results Terminal</h2>
                <p className="text-sm text-slate-500 font-medium italic">Approval scope: {user.branchId} Campus Node.</p>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="px-8 py-5">Teacher</th>
                    <th className="px-8 py-5">Subject & Class</th>
                    <th className="px-8 py-5 text-center">Students</th>
                    <th className="px-8 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">J</div>
                      <div className="font-bold text-slate-900">James Wilson</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-black text-xs text-slate-900 uppercase">Mathematics</div>
                      <div className="text-[10px] text-indigo-600 font-bold uppercase">Grade 10A</div>
                    </td>
                    <td className="px-8 py-6 text-center font-black text-slate-600">42</td>
                    <td className="px-8 py-6 text-right flex justify-end gap-2">
                      <button onClick={() => triggerToast('Rejected')} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><XCircle size={20} /></button>
                      <button onClick={() => triggerToast('Approved')} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg"><CheckCircle2 size={20} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'ops' && renderOperations()}
        {activeTab === 'finance' && renderFeeManagement()}
        {activeTab === 'academics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h4 className="font-black text-slate-900 uppercase flex items-center gap-2 mb-8"><Calendar className="text-indigo-600" /> Class Timetables</h4>
              <p className="text-slate-500 text-sm mb-6">Build and manage scheduling for all class clusters in this branch.</p>
              <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-xs">Visual Scheduler</button>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h4 className="font-black text-slate-900 uppercase flex items-center gap-2 mb-8"><Briefcase className="text-emerald-600" /> Lesson Plan Terminal</h4>
              <p className="text-slate-500 text-sm mb-6">Verify and approve weekly teaching lesson plans submitted by branch staff.</p>
              <button className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl shadow-indigo-100">Review Submissions</button>
            </div>
          </div>
        )}
        {activeTab === 'admissions' && renderAdmissions()}
        {activeTab === 'procurement' && renderProcurement()}
        {activeTab === 'security' && renderSecurity()}
        {activeTab === 'discipline' && renderDiscipline()}
        {activeTab === 'exams' && renderExams()}
        {activeTab === 'fleet' && renderFleet()}
        {activeTab === 'facilities' && renderFacilities()}
        {activeTab === 'health' && renderHealth()}
        {activeTab === 'finance_local' && renderLocalFinance()}
        {activeTab === 'setup' && renderSecurity()}
      </div>

      {showToast && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-300 z-50 border border-white/10">
          <CheckCircle2 className="text-emerald-400" />
          <span className="font-black text-sm uppercase tracking-widest">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default SchoolAdminDashboard;