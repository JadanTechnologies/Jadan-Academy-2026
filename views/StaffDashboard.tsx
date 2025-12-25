
import React, { useState, useEffect } from 'react';
import { User, UserRole, PaymentRecord, InventoryItem, LibraryBook, VisitorLog } from '../types';
import {
    DollarSign, BookOpen, Users, Layout, Search, Plus,
    Printer, TrendingUp, History, UserCheck, ShieldCheck, Clock
} from 'lucide-react';
import { MOCK_PAYMENTS, MOCK_BOOKS, MOCK_INVENTORY } from '../constants';

interface StaffDashboardProps {
    user: User;
    activeTab?: string;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, activeTab = 'dash' }) => {

    const renderBursar = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { l: 'Daily Collection', v: '₦4,200', i: DollarSign, c: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { l: 'Outstanding Fees', v: '₦12.4K', i: Clock, c: 'text-amber-600', bg: 'bg-amber-50' },
                    { l: 'Operating Expenses', v: '₦1,850', i: TrendingUp, c: 'text-rose-600', bg: 'bg-rose-50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
                        <div className={`w-16 h-16 ${s.bg} ${s.c} rounded-2xl flex items-center justify-center`}><s.i size={32} /></div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.l}</p>
                            <h3 className="text-2xl font-black text-slate-900">{s.v}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-xl font-black text-slate-900 uppercase">Cash Ledger (Downtown Node)</h3>
                    <button className="px-6 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase rounded-xl flex items-center gap-2">
                        <Plus size={16} /> New Transaction
                    </button>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                            <th className="px-8 py-5">Source</th>
                            <th className="px-8 py-5">Category</th>
                            <th className="px-8 py-5">Date</th>
                            <th className="px-8 py-5">Amount</th>
                            <th className="px-8 py-5 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                        {MOCK_PAYMENTS.slice(0, 5).map(p => (
                            <tr key={p.id} className="hover:bg-slate-50/50">
                                <td className="px-8 py-6 font-bold text-slate-900 uppercase">{p.studentName}</td>
                                <td className="px-8 py-6 text-slate-500 font-medium">School Fees</td>
                                <td className="px-8 py-6 text-slate-500 font-medium">{p.date}</td>
                                <td className="px-8 py-6 font-black text-emerald-600">₦{p.amount.toLocaleString()}</td>
                                <td className="px-8 py-6 text-right">
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase">Cleared</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderLibrarian = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { l: 'Cataloged Books', v: '1,240', i: BookOpen, c: 'text-blue-600' },
                    { l: 'Issued Today', v: '28', i: Clock, c: 'text-indigo-600' },
                    { l: 'Overdue items', v: '12', i: ShieldCheck, c: 'text-rose-600' },
                    { l: 'Active Members', v: '520', i: Users, c: 'text-emerald-600' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                        <div className={`w-12 h-12 mx-auto mb-4 ${s.c} flex items-center justify-center`}><s.i size={24} /></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.l}</p>
                        <h3 className="text-xl font-black text-slate-900">{s.v}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                    <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Asset Catalog</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {MOCK_BOOKS.slice(0, 6).map(b => (
                            <div key={b.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center"><BookOpen size={20} className="text-slate-300" /></div>
                                <div>
                                    <h4 className="text-xs font-black text-slate-900 uppercase truncate max-w-[120px]">{b.title}</h4>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">{b.author}</p>
                                    <div className={`mt-2 flex items-center gap-1 text-[8px] font-black uppercase ${b.isAvailable ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        <div className={`w-1 h-1 rounded-full ${b.isAvailable ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                        {b.isAvailable ? 'Available' : 'Issued'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col relative overflow-hidden">
                    <History size={150} className="absolute -bottom-10 -right-10 opacity-5" />
                    <h3 className="text-xl font-black uppercase mb-6">Return Terminal</h3>
                    <input type="text" placeholder="Scan ISBN or Student ID..." className="bg-white/10 border-none rounded-2xl p-4 text-sm font-bold placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none mb-4" />
                    <p className="text-[10px] text-slate-400 font-medium italic mb-8 uppercase tracking-widest">Awaiting digital shard intake...</p>
                    <button className="mt-auto w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase text-[10px] tracking-widest shadow-xl shadow-blue-900/40">Initialize Return</button>
                </div>
            </div>
        </div>
    );

    const renderReceptionist = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase">Front Desk Operations</h2>
                    <p className="text-sm text-slate-500 font-medium italic">Visitor logging and campus intake terminal.</p>
                </div>
                <button className="px-8 py-4 bg-rose-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl flex items-center gap-3 shadow-xl shadow-rose-100">
                    <Plus size={18} /> New Visitor Entry
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                    <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Active Visitors</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Engr. David Mark', purpose: 'Hardware Maintenance', time: '09:12 AM', see: 'Admin Office' },
                            { name: 'Mrs. Cynthia Paul', purpose: 'Parent Inquiry', time: '10:45 AM', see: 'HOD Science' },
                        ].map((v, i) => (
                            <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm"><UserCheck size={24} /></div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase">{v.name}</h4>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">{v.purpose}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-900 uppercase">{v.time}</p>
                                    <p className="text-[8px] text-rose-600 font-bold uppercase tracking-widest">In Session</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                    <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Today's Appointment Queue</h3>
                    <div className="space-y-4">
                        {[
                            { time: '11:00 AM', client: 'Starlight Supplies', type: 'Vendor' },
                            { time: '01:30 PM', client: 'Prospective Parent', type: 'Admission' },
                            { time: '03:00 PM', client: 'Health Inspector', type: 'Governance' },
                        ].map((a, i) => (
                            <div key={i} className="p-4 flex items-center gap-6 border-b border-slate-50 last:border-0">
                                <div className="text-xs font-black text-indigo-600 uppercase tracking-widest">{a.time}</div>
                                <div className="flex-1">
                                    <p className="text-xs font-black text-slate-900 uppercase">{a.client}</p>
                                    <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-slate-100 rounded text-slate-400">{a.type}</span>
                                </div>
                                <button className="text-[10px] font-black text-slate-400 hover:text-rose-600 transition-colors uppercase tracking-widest">Pre-check</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase tracking-widest leading-none">{user.role.replace('_', ' ')} NODE</h1>
                    <p className="text-slate-500 font-medium italic">Operational Terminal | {user.name} reporting.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="px-4 border-r border-slate-100 text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Session Link</p>
                        <p className="text-xs font-black text-emerald-500 uppercase flex items-center gap-1 justify-end">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Secure
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                        <Layout size={24} />
                    </div>
                </div>
            </div>


            <div className="min-h-[500px]">
                {(activeTab === 'dash' || activeTab === 'overview') && (
                    <>
                        {user.role === UserRole.BURSAR && renderBursar()}
                        {user.role === UserRole.LIBRARIAN && renderLibrarian()}
                        {user.role === UserRole.RECEPTIONIST && renderReceptionist()}
                    </>
                )}
                {(activeTab === 'ops' || activeTab === 'reports') && (
                    <div className="bg-white p-20 rounded-[2.5rem] border border-slate-100 text-center shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Clock size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase italic">Functional Logs Aggregated</h2>
                        <p className="text-slate-500 max-w-sm mx-auto mt-2 font-medium">Detailed audit history for this node will be sharded once the session is synchronized.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaffDashboard;
