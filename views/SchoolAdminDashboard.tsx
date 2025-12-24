
import React, { useState, useEffect } from 'react';
import { School, User, UserRole, InventoryItem, BusRoute, LibraryBook, Student, FeeStructure, PaymentRecord } from '../types';
import {
  Users, GraduationCap, ClipboardCheck, Settings2, Plus, CheckCircle2, XCircle, Eye,
  Building, BookOpen, Layers, DollarSign, Megaphone, ArrowRight, Truck, Box,
  HeartPulse, ShieldAlert, Library, Calendar, Search, Layout,
  UserPlus, CreditCard, UserCheck, Briefcase, Clock, Printer, BellRing, ReceiptText, ChevronDown, ShieldCheck
} from 'lucide-react';
import { MOCK_INVENTORY, MOCK_BUS_ROUTES, MOCK_BOOKS, MOCK_SUBJECTS, MOCK_CLASSES, MOCK_FEE_STRUCTURES, MOCK_PAYMENTS } from '../constants';

interface SchoolAdminDashboardProps {
  school: School;
  user: User;
  defaultTab?: string;
}

const SchoolAdminDashboard: React.FC<SchoolAdminDashboardProps> = ({ school, user, defaultTab }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || 'dash');
  const [financeSubTab, setFinanceSubTab] = useState<'track' | 'structure' | 'history'>('track');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  useEffect(() => {
    if (defaultTab) setActiveTab(defaultTab);
  }, [defaultTab]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // --- Strict Filtering Logic ---
  const branchInventory = MOCK_INVENTORY.filter(i => i.branchId === user.branchId);
  const branchTransport = MOCK_BUS_ROUTES.filter(r => r.branchId === user.branchId);
  const branchBooks = MOCK_BOOKS.filter(b => b.branchId === user.branchId);
  const branchClasses = MOCK_CLASSES.filter(c => c.branchId === user.branchId);
  const branchFeeStructures = MOCK_FEE_STRUCTURES.filter(f => f.branchId === user.branchId);
  const branchPayments = MOCK_PAYMENTS.filter(p => p.branchId === user.branchId);

  // Mock Students for this branch
  // Fixed role to use UserRole enum and feeStatus to use proper union literals
  const branchStudents: Student[] = [
    { id: 's1', name: 'Alice Thompson', studentId: 'STU-1001', classId: 'c1', arm: 'A', parentEmail: 'p.thompson@email.com', branchId: 'b1', feeStatus: 'Paid' as 'Paid', totalPaid: 1300, role: UserRole.STUDENT, email: 'a@t.com' },
    { id: 's2', name: 'Bob Wilson', studentId: 'STU-1002', classId: 'c1', arm: 'A', parentEmail: 'b.wilson@email.com', branchId: 'b1', feeStatus: 'Partial' as 'Partial', totalPaid: 600, role: UserRole.STUDENT, email: 'b@w.com' },
    { id: 's3', name: 'Charlie Dean', studentId: 'STU-1003', classId: 'c2', arm: 'B', parentEmail: 'c.dean@email.com', branchId: 'b1', feeStatus: 'Unpaid' as 'Unpaid', totalPaid: 0, role: UserRole.STUDENT, email: 'c@d.com' },
  ].filter(s => s.branchId === user.branchId);

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
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <Building size={24} />
          </div>
        </div>
      </div>


      <div className="flex gap-1 bg-slate-200/50 p-1.5 rounded-[1.5rem] w-fit overflow-x-auto no-scrollbar">
        {[
          { id: 'dash', label: 'Dashboard', icon: Layout },
          { id: 'results', label: 'Verify Results', icon: ClipboardCheck },
          { id: 'ops', label: 'Operations', icon: Settings2 },
          { id: 'finance', label: 'Fee Management', icon: DollarSign },
          { id: 'staff', label: 'Staff Hub', icon: Users },
          { id: 'academics', label: 'Curriculum', icon: BookOpen },
        ].map(tab => (
          <button
            key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-3 rounded-[1.2rem] font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'dash' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { l: 'Total Revenue', v: '$420,000', i: DollarSign, c: 'indigo' },
                { l: 'Pending Audits', v: '18 Records', i: ShieldCheck, c: 'amber' },
                { l: 'Asset Health', v: '92% Good', i: Box, c: 'emerald' },
                { l: 'Guest Logs', v: '12 Today', i: Users, c: 'rose' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${s.c}-50 text-${s.c}-600 rounded-2xl flex items-center justify-center`}><s.i size={24} /></div>
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
      </div>

      {showToast && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-300 z-50 border border-white/10">
          <CheckCircle2 className="text-emerald-400" />
          <span className="font-black text-sm uppercase tracking-widest">{toastMsg}</span>
        </div>
      )}
    </div>
  );
};

export default SchoolAdminDashboard;