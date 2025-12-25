import React, { useState, useEffect } from 'react';
import { User, ResultEntry } from '../types';
import { MOCK_SCHOOLS, MOCK_SESSIONS, MOCK_PAYMENTS, MOCK_SUBJECTS } from '../constants';
import ReportSheet from '../components/ReportSheet';
import {
  Eye, Download, GraduationCap, Calendar, History, TrendingUp, DollarSign, Layout,
  QrCode, Activity, HeartPulse, Trophy, Clock, CheckCircle2, Star, ShieldCheck,
  Zap, BrainCircuit, Dumbbell, Apple, Map, BookOpen, Fingerprint, Receipt,
  Sparkles, Database, Layers, Printer, FileCheck, ArrowUpRight
} from 'lucide-react';

interface StudentParentDashboardProps {
  user: User;
  activeTab?: string;
}

const StudentParentDashboard: React.FC<StudentParentDashboardProps> = ({ user, activeTab = 'dash' }) => {
  const [viewingReport, setViewingReport] = useState(false);
  const [takingExam, setTakingExam] = useState<string | null>(null);
  const [examTimer, setExamTimer] = useState(3600); // 1 hour in seconds

  // Persistent results
  const [results, setResults] = useState<ResultEntry[]>(() => {
    const saved = localStorage.getItem(`results_${user.id}`);
    if (saved) return JSON.parse(saved);
    return [
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
  });


  useEffect(() => {
    localStorage.setItem(`results_${user.id}`, JSON.stringify(results));
  }, [results, user.id]);

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

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Student Growth Radar HUD */}
      <div className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-8 shadow-2xl shadow-indigo-200">
        <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><BrainCircuit size={200} /></div>
        <div className="relative z-10 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest">Growth Portal Active</span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full text-[8px] font-black uppercase tracking-widest">Global Rank: #12</span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{user.name.split(' ')[0]}'s Growth Radar</h2>
          <p className="text-slate-400 text-sm italic font-medium">Orchestrating personal institutional growth trajectories.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 relative z-10 w-full lg:w-auto">
          {[
            { l: 'Study Pulse', v: 'Optimal', i: Zap },
            { l: 'Spirit Points', v: '14,200', i: Star },
            { l: 'Attendance Shard', v: '98%', i: CheckCircle2 },
            { l: 'Identity Node', v: 'Verified', i: ShieldCheck },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Overall Average', value: '82.4%', icon: GraduationCap, color: 'indigo' },
          { label: 'Next Deadline', value: 'Literature', icon: Clock, color: 'amber' },
          { label: 'Achievements', value: '14 Shards', icon: Trophy, color: 'emerald' },
          { label: 'Canteen Balance', value: '₦420.00', icon: DollarSign, color: 'rose' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-indigo-200 transition-all">
            <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}><stat.icon size={24} /></div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-lg font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Institutional Announcements</h3>
          <div className="space-y-4">
            {[
              { t: 'Science Fair Registration', d: 'Oct 12', b: 'STEM Node' },
              { t: 'Internal Exams Update', d: 'Oct 09', b: 'Registry' }
            ].map((a, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase">{a.t}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{a.b}</p>
                </div>
                <span className="text-[8px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">{a.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {viewingReport ? (
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5"><GraduationCap size={200} /></div>
          <div className="flex justify-between items-start mb-16 border-b border-slate-100 pb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Official Academic Shard</h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Terminal Result: 2025/2026 Session</p>
            </div>
            <div className="text-right">
              <div className="bg-slate-900 text-white p-6 rounded-3xl inline-block">
                <p className="text-[8px] font-black uppercase tracking-widest mb-1 opacity-50">Aggregate GPA</p>
                <p className="text-3xl font-black">4.82/5.0</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest">Student Identity Node</h3>
              <div className="flex gap-6 items-center bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-slate-900 shadow-sm">{user.name.charAt(0)}</div>
                <div>
                  <p className="text-xl font-black text-slate-900 uppercase tracking-tight">{user.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">UID: {user.id.slice(0, 8)} | Class: {user.classId || 'Senior Secondary'}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Institutional Verification</h3>
              <div className="flex gap-6 items-center bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm"><ShieldCheck size={32} /></div>
                <div>
                  <p className="text-xl font-black text-emerald-700 uppercase tracking-tight">Status: Verified</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Released by Registrar Node</p>
                </div>
              </div>
            </div>
          </div>

          <table className="w-full mb-16">
            <thead className="border-b border-slate-200">
              <tr>
                <th className="text-left py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject Shard</th>
                <th className="text-center py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Exam Score</th>
                <th className="text-center py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade</th>
                <th className="text-right py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { s: 'Advanced Mathematics', sc: 88, g: 'A' },
                { s: 'Institutional Physics', sc: 76, g: 'B' },
                { s: 'English Language Node', sc: 92, g: 'A' },
                { s: 'Computational Logic', sc: 84, g: 'A' },
              ].map((r, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                  <td className="py-6 font-black text-slate-900 uppercase tracking-tight">{r.s}</td>
                  <td className="py-6 text-center font-bold text-slate-600 tabular-nums">{r.sc}/100</td>
                  <td className="py-6 text-center">
                    <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-black text-xs">{r.g}</span>
                  </td>
                  <td className="py-6 text-right text-[10px] font-black text-slate-400 uppercase italic">Excellence Shard</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center bg-slate-900 text-white p-8 rounded-[2.5rem]">
            <div className="flex gap-8">
              <div>
                <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Class Rank</p>
                <p className="text-xl font-black tracking-tighter">03/42</p>
              </div>
              <div className="border-l border-white/10 pl-8">
                <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Attendance Shard</p>
                <p className="text-xl font-black tracking-tighter">98%</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-2">
                <Printer size={16} /> Print Shard
              </button>
              <button onClick={() => setViewingReport(false)} className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all">Exit View</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-end mb-8 px-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Academic Proficiency Matrix</h2>
              <p className="text-sm text-slate-500 italic">Historical performance shards mapped across institutional semesters.</p>
            </div>
            <button onClick={() => setViewingReport(true)} className="px-8 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-slate-900 transition-all flex items-center gap-2">
              Full Terminal Report <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((r, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 group hover:border-indigo-200 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 font-black shadow-inner">
                      {r.score.grade}
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject Shard</p>
                      <p className="text-sm font-black text-slate-900 uppercase truncate max-w-[120px]">{MOCK_SUBJECTS.find(s => s.id === r.subjectId)?.name}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${r.score.total}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500">
                      <span>Score: {r.score.total}/100</span>
                      <span className="text-emerald-500">Passed Node</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <TrendingUp size={150} className="absolute -bottom-10 -right-10 opacity-10 rotate-12" />
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Growth Pulse</h3>
                <div className="space-y-8 mt-8">
                  <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Current Trajectory</p>
                    <p className="text-3xl font-black">UPWARD</p>
                  </div>
                  <div className="border-t border-white/5 pt-8">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Global Ranking Node</p>
                    <p className="text-3xl font-black">TOP 5%</p>
                  </div>
                </div>
              </div>
              <button className="py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all">Sync Achievements</button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderFinance = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">Institutional Wallet <Receipt className="text-indigo-600" /></h2>
          <p className="text-sm text-slate-500 italic">Fee status, canteen shards, and institutional project funding.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Outstanding Balance</p>
          <p className="text-3xl font-black text-rose-600">₦700.00</p>
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
                  <div className="text-sm font-black text-slate-900">₦{p.amount}</div>
                  <div className="text-[8px] text-emerald-600 font-black uppercase tracking-widest">Cleared</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between items-start relative overflow-hidden">
          <DollarSign size={180} className="absolute -bottom-10 -right-10 opacity-10" />
          <h3 className="text-2xl font-black uppercase mb-4">Canteen & Micro-Payments</h3>
          <p className="text-indigo-100 text-sm mb-8 font-medium italic">Managed canteen shard balance and virtual student wallet.</p>
          <div className="text-5xl font-black mb-10">₦420.00</div>
          <button className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all">Reload Digital Shard</button>
        </div>
      </div>
    </div>
  );


  const renderHistory = () => (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100">
            <History size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Academic Archives</h2>
            <p className="text-sm text-slate-500 font-medium">Download terminal reports and performance history.</p>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { term: '1st Term', session: '2023/2024', status: 'Published', date: 'April 12, 2024' },
            { term: '3rd Term', session: '2022/2023', status: 'Archived', date: 'Aug 21, 2023' },
            { term: '2nd Term', session: '2022/2023', status: 'Archived', date: 'April 05, 2023' },
          ].map((item, i) => (
            <div key={i} className="group p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-xl transition-all">
              <div>
                <h3 className="font-black text-slate-900 uppercase tracking-tight">{item.term} Report</h3>
                <div className="text-[10px] text-slate-500 font-medium">{item.session} released on {item.date}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setViewingReport(true)} className="p-3 text-slate-400 hover:text-indigo-600 transition-all"><Eye size={22} /></button>
                <button className="p-3 text-slate-400 hover:text-indigo-600 transition-all"><Download size={22} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIdentity = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center font-black text-slate-400 text-3xl shadow-inner border border-slate-100">{user.name.charAt(0)}</div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase">{user.name}</h2>
            <p className="text-sm text-slate-500 font-medium italic">Student Identity Node • {studentData.studentId}</p>
            <div className="flex gap-2 mt-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-indigo-100">Grade 10 Shard</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-emerald-100">Status: Active</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-3xl flex items-center gap-6 shadow-2xl">
          <div className="bg-white p-2 rounded-xl"><QrCode size={80} className="text-slate-900" /></div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase leading-tight mb-1">Institutional Pass</p>
            <p className="text-xs font-black text-white italic">Scan at Campus Gates</p>
            <button className="mt-4 w-full py-2 bg-indigo-600 text-white text-[8px] font-black uppercase rounded-lg hover:bg-white hover:text-indigo-600 transition-all">Reload Micro-Payment Shard</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWellness = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Health & Wellness Shard <HeartPulse className="text-rose-600" />
          </h2>
          <p className="text-sm text-slate-500 italic">Tracking fitness diagnostics and institutional health passports.</p>
        </div>
        <button className="px-8 py-4 bg-rose-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">Apply for Clearance</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Vitals History</h3>
          <div className="space-y-4">
            {[
              { l: 'BMI Shard', v: '22.1', d: 'Oct 01' },
              { l: 'Vision Sync', v: 'Normal', d: 'Sept 20' },
              { l: 'Vaccination History', v: 'Synced', d: 'Aug 12' }
            ].map((v, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase">{v.l}</div>
                  <div className="text-[8px] text-slate-400 font-bold uppercase">{v.d}</div>
                </div>
                <span className="text-xs font-black text-indigo-600 uppercase">{v.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-rose-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between items-start relative overflow-hidden">
          <Activity size={180} className="absolute -bottom-10 -right-10 opacity-10" />
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Fitness Pulse</h3>
          <p className="text-rose-100 text-sm mb-8 font-medium italic">Aggregated fitness data from campus athletic nodes.</p>
          <div className="text-5xl font-black mb-10">Alpha Level</div>
          <button className="w-full py-4 bg-white text-rose-600 font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all">View Athletic Dossier</button>
        </div>
      </div>
    </div>
  );

  const renderPlanner = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">Study Planner Shard <Calendar className="text-indigo-600" /></h2>
          <p className="text-sm text-slate-500 italic">Homework deadlines and institutional sessions orchestration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Homework Deadlines</h3>
          <div className="space-y-4">
            {[
              { t: 'Literature Essay', d: 'Today (11:59 PM)', s: 'English' },
              { t: 'Physics Lab Report', d: 'Tomorrow', s: 'Science' },
              { t: 'Matrix Calculations', d: 'In 3 Days', s: 'Mathematics' }
            ].map((h, i) => (
              <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="text-sm font-black text-slate-900 uppercase">{h.t}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{h.s}</div>
                </div>
                <span className="text-[8px] font-black text-rose-600 uppercase tracking-widest">{h.d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col items-center justify-center text-center">
          <Clock size={48} className="mb-6 text-indigo-400" />
          <h4 className="text-xl font-black uppercase mb-2">Next Session Shard</h4>
          <div className="text-4xl font-black mb-2">09:12 AM</div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-8">Science Lab 2</p>
          <button className="w-full py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">Open Class Node</button>
        </div>
      </div>
    </div>
  );

  const renderExams = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Institutional Examination Hall <Layers className="text-indigo-600" />
          </h2>
          <p className="text-sm text-slate-500 italic">Centralized node for terminal exams and continuous assessment shards.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
            <p className="text-[8px] font-black text-emerald-600 uppercase mb-1">Clearance Status</p>
            <p className="text-lg font-black text-emerald-700">VERIFIED</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2">Active & Upcoming Shards</h3>
          {[
            { t: 'Mid-Term Mathematics', s: '10:00 AM Today', d: '90 Mins', q: '40 MCQs', c: 'indigo', status: 'ready' },
            { t: 'Literature Theory', s: 'Tomorrow', d: '120 Mins', q: '5 Essays', c: 'slate-400', status: 'wait' },
            { t: 'Advanced Chemistry', s: 'Oct 30', d: '60 Mins', q: '30 MCQs', c: 'slate-400', status: 'wait' },
          ].map((e, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-all">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 bg-${e.c === 'indigo' ? 'indigo' : 'slate'}-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner`}><BookOpen size={24} /></div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 uppercase leading-tight mb-1">{e.t}</h4>
                  <div className="flex gap-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{e.s}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{e.d} Duration</span>
                  </div>
                </div>
              </div>
              {e.status === 'ready' ? (
                <button onClick={() => setTakingExam(e.t)} className="px-8 py-4 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">Start Exam</button>
              ) : (
                <div className="text-[10px] font-black text-slate-400 uppercase bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 italic">Waiting for Sync</div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between">
          <ShieldCheck size={180} className="absolute -bottom-10 -right-10 opacity-10 rotate-12" />
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Exam Integrity Node</h3>
            <p className="text-slate-400 text-sm font-medium italic mb-8">Current active surveillance and proctoring protocols for your identity shard.</p>
            <div className="space-y-4">
              {[
                { l: 'Browser Lock', v: 'Active Force-Field', c: 'indigo' },
                { l: 'Focus Tracking', v: 'Identity Verified', i: ShieldCheck },
                { l: 'Institutional AI', v: 'Proctoring Active', i: Activity }
              ].map((p, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-3xl">
                  <p className="text-[8px] font-black text-indigo-400 uppercase mb-2">{p.l}</p>
                  <p className="text-sm font-black italic">{p.v}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">Verfiy Connectivity</button>
        </div>
      </div>
    </div>
  );

  const renderExtra = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">Milestones & Stars <Trophy className="text-amber-500" /></h2>
          <p className="text-sm text-slate-500 italic">Achievements, leadership nodes, and cultural contribution shards.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { l: 'Sports Shard', v: 'Athletic Gold', i: Trophy, c: 'indigo' },
          { l: 'Leadership', v: 'Peer Mentor Node', i: Star, c: 'amber' },
          { l: 'Arts Cluster', v: 'Theatre Alpha', i: Sparkles, c: 'rose' }
        ].map((m, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center group hover:border-indigo-200 transition-all">
            <div className={`w-16 h-16 bg-${m.c}-50 text-${m.c}-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}><m.i size={32} /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{m.l}</p>
            <h3 className="text-2xl font-black text-slate-900 uppercase">{m.v}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  if (takingExam) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 rounded-[3rem] relative overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><Layout size={300} /></div>
        <div className="flex justify-between items-center mb-12 relative z-10 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">{takingExam}</h2>
            <div className="flex gap-4 mt-2">
              <span className="px-3 py-1 bg-indigo-600 rounded-full text-[8px] font-black uppercase tracking-widest">Live Shard Mode</span>
              <span className="px-3 py-1 bg-rose-600/20 text-rose-400 border border-rose-600/20 rounded-full text-[8px] font-black uppercase tracking-widest">Anti-Cheat Active</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase leading-none mb-1">Time Remaining</p>
            <div className="text-4xl font-black tabular-nums">59:42</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
          <div className="lg:col-span-3 space-y-12">
            <div className="space-y-6">
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Question 1 of 40</div>
              <h3 className="text-4xl font-black leading-tight tracking-tight">Given a matrix A = [[2, 4], [6, 8]], determine the determinant shard of the inverse node?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Determinant: 1/8', 'Determinant: -1/8', 'Determinant: 2', 'Identity Matrix Node'].map((opt, i) => (
                <button key={i} className="p-8 bg-white/5 border border-white/5 rounded-[2rem] text-left hover:bg-white hover:text-slate-900 transition-all group">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black group-hover:bg-indigo-50 group-hover:text-indigo-600">{String.fromCharCode(65 + i)}</span>
                    <span className="text-lg font-black uppercase">{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-12 border-t border-white/5">
              <button className="px-8 py-4 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-slate-900 transition-all">Previous Shard</button>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">Flag for Review</button>
                <button className="px-10 py-4 bg-indigo-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all shadow-2xl">Confirm & Next</button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Question Palette</h4>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className={`h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500 hover:text-white transition-all cursor-pointer'}`}>{i + 1}</div>
                ))}
              </div>
            </div>
            <button onClick={() => setTakingExam(null)} className="w-full py-5 bg-rose-600/10 text-rose-400 border border-rose-600/20 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 hover:text-white transition-all">Terminate & Submit</button>
          </div>
        </div>
      </div>
    );
  }

  if (viewingReport) {
    return (
      <div className="animate-in zoom-in-95 duration-500">
        <div className="mb-8 flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <button onClick={() => setViewingReport(false)} className="px-6 py-2 text-[10px] font-black uppercase text-slate-500 hover:text-slate-900 flex items-center gap-2">← Back to Dashboard</button>
          <div className="flex gap-2">
            <button className="p-3 text-indigo-600 hover:bg-slate-50 rounded-xl transition-all"><Download size={22} /></button>
          </div>
        </div>
        <ReportSheet
          student={studentData}
          results={results}
          session={MOCK_SESSIONS[0]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Nexus Terminal: {user.name.split(' ')[0]}</h1>
          <p className="text-slate-400 font-medium italic">Academic summary | {MOCK_SCHOOLS[0].branches.find(b => b.id === user.branchId)?.name || 'Main Campus Shard'}</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600"><GraduationCap size={24} /></div>
          <div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Enrollment Node</div>
            <div className="text-sm font-bold text-slate-900 uppercase">GRADE 10B • ACTIVE</div>
          </div>
        </div>
      </div>


      <div className="min-h-[400px]">
        {activeTab === 'dash' && renderOverview()}
        {activeTab === 'exams' && renderExams()}
        {activeTab === 'performance' && renderPerformance()}
        {activeTab === 'finance' && renderFinance()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'identity' && renderIdentity()}
        {activeTab === 'wellness' && renderWellness()}
        {activeTab === 'planner' && renderPlanner()}
        {activeTab === 'extra' && renderExtra()}
      </div>
    </div>
  );
};

export default StudentParentDashboard;