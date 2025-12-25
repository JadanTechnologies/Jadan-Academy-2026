import React, { useState } from 'react';
import { User, ResultEntry } from '../types';
import { MOCK_SCHOOLS, MOCK_SESSIONS, MOCK_PAYMENTS } from '../constants';
import ReportSheet from '../components/ReportSheet';
import { Eye, Download, GraduationCap, Calendar, History, TrendingUp, DollarSign, Layout } from 'lucide-react';

interface StudentParentDashboardProps {
  user: User;
  defaultTab?: string;
}

const StudentParentDashboard: React.FC<StudentParentDashboardProps> = ({ user, defaultTab }) => {
  const [activeTab, setActiveTab] = useState<'dash' | 'finance' | 'performance' | 'history'>(defaultTab as any || 'dash');
  const [viewingReport, setViewingReport] = useState(false);

  // Mock results
  const results: ResultEntry[] = [
    {
      id: 're-1',
      studentId: 'st1',
      subjectId: 'sub1',
      sessionId: 'ses1',
      term: '1st',
      score: { test1: 12, test2: 14, assignment: 9, exam: 55, total: 90, grade: 'A1', remark: 'Distinction', isApproved: true },
      teacherId: 't1',
      schoolId: user.schoolId || 's1',
      branchId: user.branchId || 'b1',
      submissionTime: new Date().toISOString()
    },
    {
      id: 're-2',
      studentId: 'st1',
      subjectId: 'sub2',
      sessionId: 'ses1',
      term: '1st',
      score: { test1: 10, test2: 11, assignment: 7, exam: 42, total: 70, grade: 'B2', remark: 'Very Good', isApproved: true },
      teacherId: 't1',
      schoolId: user.schoolId || 's1',
      branchId: user.branchId || 'b1',
      submissionTime: new Date().toISOString()
    },
    {
      id: 're-3',
      studentId: 'st1',
      subjectId: 'sub3',
      sessionId: 'ses1',
      term: '1st',
      score: { test1: 14, test2: 12, assignment: 8, exam: 51, total: 85, grade: 'A1', remark: 'Distinction', isApproved: true },
      teacherId: 't1',
      schoolId: user.schoolId || 's1',
      branchId: user.branchId || 'b1',
      submissionTime: new Date().toISOString()
    }
  ];

  const studentData = {
    id: 'st1',
    name: user.name,
    email: user.email,
    role: 'STUDENT' as any,
    studentId: 'ADM-2023-0102',
    classId: 'Grade 10',
    arm: 'B',
    parentEmail: 'parent@home.com',
    schoolId: user.schoolId || 's1',
    branchId: user.branchId || 'b1'
  };

  const renderFinance = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase">Financial Ledger</h2>
          <p className="text-sm text-slate-500 italic">Institutional fee status and payment history.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Outstanding Balance</p>
          <p className="text-3xl font-black text-rose-600">$700.00</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Recent Payments</h3>
          <div className="space-y-4">
            {MOCK_PAYMENTS.filter(p => p.studentId === user.id).map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase">{p.date}</div>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{p.method}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-slate-900">${p.amount}</div>
                  <div className="text-[8px] text-emerald-600 font-black uppercase tracking-widest">Cleared</div>
                </div>
              </div>
            ))}
            {MOCK_PAYMENTS.filter(p => p.studentId === user.id).length === 0 && (
              <p className="text-xs text-slate-400 font-medium italic">No recent payment traces found.</p>
            )}
          </div>
          <button className="mt-8 w-full py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-600 transition-all">Make Secure Payment</button>
        </div>
        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-6"><Download size={32} /></div>
          <h3 className="text-xl font-black uppercase mb-2">Fee Structure PDF</h3>
          <p className="text-indigo-200 text-sm mb-8 px-4 italic">Download the detailed breakdown of all institutional charges for the 2024 session.</p>
          <button className="px-8 py-3 bg-white text-indigo-600 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-indigo-50 transition-colors">Download Document</button>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-8 animate-in fade-in duration-500 text-center py-12">
      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <TrendingUp size={40} />
      </div>
      <h2 className="text-2xl font-black text-slate-900 uppercase">Academic Progress Engine</h2>
      <p className="text-slate-500 max-w-sm mx-auto font-medium">Coming soon: Real-time grade distribution, topic mastery mapping, and semester trend analysis.</p>
    </div>
  );

  if (viewingReport) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center no-print">
          <button
            onClick={() => setViewingReport(false)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 font-bold hover:text-slate-900 transition-colors"
          >
            ← Back to Portal
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            <Download size={20} />
            Download PDF / Print
          </button>
        </div>
        <ReportSheet
          school={MOCK_SCHOOLS[0]}
          student={studentData}
          results={results}
          session={MOCK_SESSIONS[0]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-slate-500 font-medium italic">Academic summary | {MOCK_SCHOOLS[0].branches.find(b => b.id === user.branchId)?.name || 'Main Campus'}</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <GraduationCap size={24} />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Enrollment Node</div>
            <div className="text-sm font-bold text-slate-900 uppercase">ACTIVE - Grade 10B</div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-slate-200/50 p-1.5 rounded-[1.5rem] w-fit overflow-x-auto no-scrollbar">
        {[
          { id: 'dash', label: 'Summary', icon: Layout },
          { id: 'finance', label: 'Financials', icon: DollarSign },
          { id: 'performance', label: 'Performance', icon: TrendingUp },
          { id: 'history', label: 'Archives', icon: History },
        ].map(tab => (
          <button
            key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`px-8 py-3 rounded-[1.2rem] font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'dash' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-200">
                <div className="text-sm font-medium text-indigo-200 uppercase tracking-widest mb-4">Cumulative Average</div>
                <div className="text-6xl font-black mb-8 tracking-tighter">81.7%</div>
                <div className="flex items-center gap-2 text-indigo-100 font-bold">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">↑</div>
                  <span>+4.2% from last term</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Attendance Track</div>
                <div className="flex items-end gap-1 mb-8">
                  {[40, 70, 45, 90, 65, 80, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group h-24">
                      <div
                        style={{ height: `${h}%` }}
                        className={`w-full rounded-t-lg transition-all absolute bottom-0 ${h > 70 ? 'bg-indigo-500' : 'bg-slate-300'}`}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-black text-slate-900">97.4%</div>
                  <div className="text-xs font-bold text-slate-400 uppercase">This Term</div>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl">
                <div className="flex justify-between items-start mb-10">
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Next Major Event</div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <Calendar size={18} />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-2">Inter-House Sports</div>
                <p className="text-slate-400 text-sm mb-6">Main Campus Playground</p>
                <div className="flex items-center gap-2 text-indigo-400 font-black">
                  <span>MAY 14, 2024</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finance' && renderFinance()}
        {activeTab === 'performance' && renderPerformance()}

        {activeTab === 'history' && (
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100">
                  <History size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Academic Archives</h2>
                  <p className="text-sm text-slate-500 font-medium">Download your terminal reports and performance history.</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { term: '1st Term', session: '2023/2024', status: 'Published', date: 'April 12, 2024' },
                  { term: '3rd Term', session: '2022/2023', status: 'Archived', date: 'Aug 21, 2023' },
                  { term: '2nd Term', session: '2022/2023', status: 'Archived', date: 'April 05, 2023' },
                  { term: '1st Term', session: '2022/2023', status: 'Archived', date: 'Dec 15, 2022' },
                ].map((item, i) => (
                  <div key={i} className="group p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-xl hover:shadow-slate-100 hover:border-indigo-100 transition-all">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black ${item.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                        <span className="text-lg leading-none">{item.term.split(' ')[0]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-black text-slate-900 uppercase tracking-tight">{item.term} Report</h3>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${item.status === 'Published' ? 'bg-green-600 text-white' : 'bg-slate-400 text-white'}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">{item.session} Academic Session • Released {item.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewingReport(true)}
                        className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        title="View Online"
                      >
                        <Eye size={22} />
                      </button>
                      <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="Download PDF">
                        <Download size={22} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentParentDashboard;