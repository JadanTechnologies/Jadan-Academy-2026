import React, { useState, useEffect } from 'react';
import { User, Student, Score } from '../types';
import { MOCK_SUBJECTS, MOCK_CLASSES, GRADING_SCALE } from '../constants';
import {
  Save,
  AlertCircle,
  FileSpreadsheet,
  Trash2,
  Calendar,
  Users,
  TrendingUp,
  BookOpen,
  ArrowUpRight,
  Download,
  CheckCircle2,
  Sparkles,
  Activity,
  History,
  Layout,
  Plus,
  Contact,
  Trophy,
  ShoppingCart,
  Award,
  Cpu,
  Star,
  BrainCircuit,
  Zap,
  Briefcase,
  Layers
} from 'lucide-react';

interface TeacherDashboardProps {
  user: User;
  activeTab?: string;
}

import { useSystem } from '../SystemContext';

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, activeTab = 'dash' }) => {
  const { state: systemState } = useSystem();
  const [showSaveToast, setShowSaveToast] = useState(false);

  const isLocked = systemState.emergencyLockdown;
  const isForceSync = systemState.forceGradeSync;

  // Strict Multi-Branch Filtering
  const filteredClasses = MOCK_CLASSES.filter(c => c.schoolId === user.schoolId && c.branchId === user.branchId);
  const filteredSubjects = MOCK_SUBJECTS.filter(s => s.schoolId === user.schoolId);

  const [selectedClass, setSelectedClass] = useState(filteredClasses[0]?.id || '');
  const [selectedSubject, setSelectedSubject] = useState(filteredSubjects[0]?.id || '');
  const [scores, setScores] = useState<Record<string, Partial<Score>>>(() => {
    const saved = localStorage.getItem(`scores_${user.branchId}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(`scores_${user.branchId}`, JSON.stringify(scores));
  }, [scores, user.branchId]);

  // Mock students strictly scoped by branch and class
  const students: Student[] = [
    { id: 'st1', name: 'Alice Thompson', email: 'a@t.com', role: 'STUDENT' as any, studentId: 'ADM-001', classId: 'c1', arm: 'A', parentEmail: 'p@t.com', schoolId: 's1', branchId: 'b1' },
    { id: 'st2', name: 'Bob Wilson', email: 'b@w.com', role: 'STUDENT' as any, studentId: 'ADM-002', classId: 'c1', arm: 'A', parentEmail: 'p@w.com', schoolId: 's1', branchId: 'b1' },
    { id: 'st3', name: 'Catherine Grace', email: 'c@g.com', role: 'STUDENT' as any, studentId: 'ADM-003', classId: 'c1', arm: 'A', parentEmail: 'p@g.com', schoolId: 's1', branchId: 'b1' },
    { id: 'st4', name: 'David Beckham', email: 'd@b.com', role: 'STUDENT' as any, studentId: 'ADM-004', classId: 'c1', arm: 'A', parentEmail: 'p@b.com', schoolId: 's1', branchId: 'b1' },
  ].filter(s =>
    s.schoolId === user.schoolId &&
    s.branchId === user.branchId &&
    s.classId === selectedClass
  );

  const calculateTotal = (s: Partial<Score>) => {
    return (s.test1 || 0) + (s.test2 || 0) + (s.assignment || 0) + (s.exam || 0);
  };

  const getGradeInfo = (total: number) => {
    return GRADING_SCALE.find(g => total >= g.min && total <= g.max) || { grade: 'F9', remark: 'Fail' };
  };

  const handleScoreChange = (studentId: string, field: keyof Score, value: string) => {
    const limits: Record<string, number> = {
      test1: 10,
      test2: 10,
      assignment: 20,
      exam: 60
    };

    let numValue = parseInt(value) || 0;
    if (numValue < 0) numValue = 0;
    if (numValue > limits[field]) numValue = limits[field];

    setScores(prev => {
      const current = prev[studentId] || { test1: 0, test2: 0, assignment: 0, exam: 0 };
      const updated = { ...current, [field]: numValue };
      const total = calculateTotal(updated);
      const gradeInfo = getGradeInfo(total);

      return {
        ...prev,
        [studentId]: {
          ...updated,
          total,
          grade: gradeInfo.grade,
          remark: gradeInfo.remark
        }
      };
    });
  };

  const handleSave = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 text-white p-8 rounded-[2rem] shadow-xl shadow-indigo-100 flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">My Classes</span>
            <Users size={20} />
          </div>
          <div>
            <div className="text-4xl font-black mb-1">{filteredClasses.length}</div>
            <p className="text-xs text-indigo-100 font-medium tracking-tight">Scope: Branch {user.branchId}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Avg. Subject Grade</span>
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
          <div>
            <div className="text-4xl font-black text-slate-900 mb-1">B2</div>
            <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
              <ArrowUpRight size={14} />
              <span>Above branch average</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Term Progress</span>
            <Calendar size={20} />
          </div>
          <div>
            <div className="text-4xl font-black mb-1">65%</div>
            <p className="text-xs text-slate-400 font-medium">1st Term - Week 8</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h2 className="text-xl font-black text-slate-900">Current Grading Queue</h2>
          <p className="text-sm text-slate-500 font-medium italic">Classes requiring score updates for {user.name}.</p>
        </div>
        <div className="p-8 space-y-4">
          {filteredClasses.length > 0 ? filteredClasses.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-indigo-50/30 transition-all cursor-pointer group" onClick={() => setActiveTab('entry')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-indigo-600 group-hover:scale-110 transition-transform">
                  <BookOpen size={20} />
                </div>
                <div>
                  <div className="font-black text-slate-900 uppercase tracking-tight">{item.name} • {item.arm}</div>
                  <div className="text-xs text-slate-500 font-medium">Click to enter marks</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase text-slate-400">Needs Entry</span>
              </div>
            </div>
          )) : <div className="p-12 text-center text-slate-400 font-medium">No classes assigned.</div>}
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Personal Clock Logs</h2>
            <p className="text-sm text-slate-500 font-medium">Your attendance records for the current term.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
            <Download size={16} />
            Download Log
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Clock In</th>
                <th className="px-8 py-4">Clock Out</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { date: 'May 12, 2024', in: '07:42 AM', out: '04:15 PM', status: 'On Time' },
                { date: 'May 11, 2024', in: '07:55 AM', out: '04:30 PM', status: 'On Time' },
                { date: 'May 10, 2024', in: '08:15 AM', out: '04:20 PM', status: 'Late' },
                { date: 'May 09, 2024', in: '07:30 AM', out: '05:00 PM', status: 'On Time' },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6 font-bold text-slate-900">{log.date}</td>
                  <td className="px-8 py-6 text-slate-600 text-sm">{log.in}</td>
                  <td className="px-8 py-6 text-slate-600 text-sm">{log.out}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${log.status === 'On Time' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderResultInput = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Academic Grading Terminal</h1>
          <p className="text-slate-500 font-medium">Branch: {user.branchId} | Session: 2023/2024</p>
        </div>
        <div className="flex gap-2">
          {isForceSync && (
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              <TrendingUp size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Force-Sync Active</span>
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={isLocked}
            className={`flex items-center gap-2 px-8 py-4 ${isLocked ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100'} font-black rounded-2xl transition-all text-xs uppercase tracking-widest`}
          >
            <Save size={18} />
            {isLocked ? 'Sync Disabled by HQ' : 'Sync Results'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          >
            {filteredClasses.length > 0 ? filteredClasses.map(c => <option key={c.id} value={c.id}>{c.name} - {c.arm}</option>) : <option>No classes</option>}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Select Subject</label>
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          >
            {filteredSubjects.length > 0 ? filteredSubjects.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>) : <option>No subjects</option>}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5">Student Details</th>
                <th className="px-4 py-5 text-center">T1 (10)</th>
                <th className="px-4 py-5 text-center">T2 (10)</th>
                <th className="px-4 py-5 text-center">Asgn (20)</th>
                <th className="px-4 py-5 text-center">Exam (60)</th>
                <th className="px-4 py-5 text-center">Total</th>
                <th className="px-8 py-5 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => {
                const s = scores[student.id] || { test1: 0, test2: 0, assignment: 0, exam: 0 };
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="font-black text-slate-900 uppercase tracking-tight">{student.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{student.studentId}</div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <input
                        type="number"
                        max="10"
                        className="w-14 p-2 bg-slate-100 border-none rounded-lg text-center font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={s.test1 ?? 0}
                        onChange={e => handleScoreChange(student.id, 'test1', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-5 text-center">
                      <input
                        type="number"
                        max="10"
                        className="w-14 p-2 bg-slate-100 border-none rounded-lg text-center font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={s.test2 ?? 0}
                        onChange={e => handleScoreChange(student.id, 'test2', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-5 text-center">
                      <input
                        type="number"
                        max="20"
                        className="w-14 p-2 bg-slate-100 border-none rounded-lg text-center font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={s.assignment ?? 0}
                        onChange={e => handleScoreChange(student.id, 'assignment', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-5 text-center">
                      <input
                        type="number"
                        max="60"
                        className="w-16 p-2 bg-slate-100 border-none rounded-lg text-center font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={s.exam ?? 0}
                        onChange={e => handleScoreChange(student.id, 'exam', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-5 text-center font-black text-indigo-600 text-lg">
                      {calculateTotal(s)}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-sm ${calculateTotal(s) >= 40 ? 'bg-indigo-50 text-indigo-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {getGradeInfo(calculateTotal(s)).grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {students.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400 font-medium uppercase tracking-widest text-xs">
                    No student matching class and branch criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showSaveToast && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300 z-50 border border-white/10">
          <CheckCircle2 className="text-emerald-400" size={24} />
          <div className="flex flex-col">
            <span className="font-black text-sm uppercase tracking-tight">Sync Successful</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Results saved to branch node database</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderPlanning = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            AI Lesson Orchestrator <Sparkles className="text-indigo-600" size={24} />
          </h2>
          <p className="text-sm text-slate-500 italic">Predictive curriculum coverage and automated resource generation.</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all flex items-center gap-2">
          <Sparkles size={16} /> Generate Week 12 Blueprint
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
          <h3 className="text-xl font-black uppercase mb-8">Current Curriculum Shards</h3>
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', topic: 'Calculus Fundamentals', progress: 85 },
              { subject: 'Further Maths', topic: 'Matrix Theory', progress: 40 },
            ].map((c, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{c.subject}</div>
                    <div className="text-sm font-black uppercase">{c.topic}</div>
                  </div>
                  <div className="text-xs font-black text-indigo-400">{c.progress}%</div>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${c.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mb-6"><FileSpreadsheet size={32} /></div>
          <h3 className="text-xl font-black text-slate-900 uppercase mb-2">Resource Repository</h3>
          <p className="text-slate-500 text-sm mb-8 px-4 font-medium italic">Awaiting AI synchronization of PDF handouts, quizzes, and multimedia assets.</p>
          <button className="px-8 py-3 bg-slate-100 text-slate-900 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-indigo-50 transition-colors">Open Vault</button>
        </div>
      </div>
    </div>
  );

  const renderBehavior = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Behavioral Analytics <Activity className="text-rose-600" size={24} />
          </h2>
          <p className="text-sm text-slate-500 italic">Discipline tracking and wellness registry mapping.</p>
        </div>
        <button className="px-8 py-4 bg-rose-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all flex items-center gap-2">
          <Plus size={16} /> Log Behavioral Incident
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="text-xl font-black text-slate-900 uppercase">Recent Peer Interactions</h3>
        </div>
        <div className="p-8 space-y-4">
          {[
            { name: 'Alice Thompson', type: 'Positive Contribution', desc: 'Exceptional teamwork during lab session.', color: 'emerald' },
            { name: 'Bob Wilson', type: 'Minor Distraction', desc: 'Frequent interruptions during Matrix lecture.', color: 'amber' },
          ].map((b, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Users size={20} />
                </div>
                <div>
                  <div className="font-black text-slate-900 uppercase tracking-tight">{b.name}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{b.type}</div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-500 italic max-w-md">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDossier = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Student Growth Dossier <Contact className="text-indigo-600" />
          </h2>
          <p className="text-sm text-slate-500 italic">360-degree pedagogical mapping for {students.length} students in class.</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">
          Generate Class Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 group hover:shadow-2xl hover:shadow-indigo-100 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400 text-lg uppercase">{s.name.charAt(0)}</div>
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase leading-none mb-1">{s.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.studentId}</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { l: 'Cognitive Load', v: 'Optimal', c: 'emerald' },
                { l: 'Engagement Shard', v: 'High', c: 'indigo' },
                { l: 'Behavioral Sync', v: 'Stable', c: 'emerald' },
              ].map((stat, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-50 px-4 py-2 rounded-xl">
                  <span className="text-[8px] font-black text-slate-400 uppercase">{stat.l}</span>
                  <span className={`text-[8px] font-black uppercase text-${stat.c}-600`}>{stat.v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-indigo-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <Trophy size={200} className="absolute -left-10 -bottom-10 opacity-10" />
        <div className="relative z-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
            Classroom Economics <Star className="animate-pulse text-amber-400" />
          </h2>
          <p className="text-indigo-100 max-w-xl font-medium italic">Incentivizing academic milestones via digital token shards and badging nodes.</p>
        </div>
        <button className="px-10 py-5 bg-white text-indigo-600 font-black uppercase text-xs tracking-widest rounded-3xl shadow-2xl hover:scale-105 transition-all relative z-10">
          Award Global Badge
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Token Ledger</h3>
          <div className="space-y-4">
            {students.map((s, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-black text-[10px]">{s.name.charAt(0)}</div>
                  <span className="text-xs font-black text-slate-900 uppercase">{s.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs font-black text-indigo-600">45 Shards</div>
                    <div className="text-[8px] text-slate-400 font-bold uppercase">Level 4</div>
                  </div>
                  <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-slate-900 transition-all"><Plus size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between">
          <Award size={180} className="absolute -bottom-10 -right-10 opacity-5 rotate-12" />
          <div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter leading-tight">Achievement Vault</h3>
            <p className="text-slate-400 text-sm mb-8 font-medium italic">Unlocked pedagogical milestones for the current term node.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { l: 'Perfect Attendance', v: '12 Students', c: 'indigo' },
                { l: 'Alpha Grades', v: '8 Students', c: 'emerald' },
                { l: 'Clean Dossier', v: '22 Students', c: 'amber' },
                { l: 'Lab Master', v: '5 Students', c: 'rose' },
              ].map((a, i) => (
                <div key={i} className={`p-4 bg-white/5 border border-white/5 rounded-2xl`}>
                  <div className={`text-[8px] font-black uppercase text-${a.c}-400 mb-1`}>{a.l}</div>
                  <div className="text-lg font-black">{a.v}</div>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">Download Certificates</button>
        </div>
      </div>
    </div>
  );

  const renderRequisition = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Resource Requisition <ShoppingCart className="text-amber-500" />
          </h2>
          <p className="text-sm text-slate-500 italic">Digital requests for classroom shards and laboratory assets.</p>
        </div>
        <button className="px-8 py-4 bg-amber-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">
          New Requisition
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Pending Orders</h3>
          <div className="space-y-4">
            {[
              { i: 'Lab Beakers (Set of 12)', s: 'In Transit', d: 'Oct 28', c: 'indigo' },
              { i: 'Visual Aid Projector', s: 'HQ Review', d: 'Oct 30', c: 'amber' },
            ].map((o, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="text-sm font-black text-slate-900 uppercase">{o.i}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{o.d} Arrival Shard</div>
                </div>
                <span className={`px-3 py-1 bg-${o.c}-50 text-${o.c}-600 rounded-full text-[8px] font-black uppercase`}>{o.s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
          <Cpu size={150} className="absolute -right-20 -top-20 opacity-10 rotate-12" />
          <h4 className="text-3xl font-black uppercase mb-4 tracking-tighter">Digital Asset Hub</h4>
          <p className="text-amber-100 mb-8 max-w-xs font-medium italic">Instant access to virtual classroom nodes and digital content shards.</p>
          <button className="w-full py-4 bg-white text-amber-600 font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-amber-50 transition-all">Open Library Shard</button>
        </div>
      </div>
    </div>
  );

  const renderExams = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Question Lab & Proctoring <Layers className="text-indigo-600" />
          </h2>
          <p className="text-sm text-slate-500 italic">Authoring assessment shards and monitoring live examination nodes.</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all flex items-center gap-2">
          <Plus size={16} /> Author New Paper
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Active Mid-Term Monitoring</h3>
          <div className="space-y-4">
            {students.slice(0, 5).map((s, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-black text-[10px]">{s.name.charAt(0)}</div>
                  <div>
                    <span className="text-xs font-black text-slate-900 uppercase block leading-none mb-1">{s.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Question 14/40</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[8px] font-black text-emerald-600 uppercase">Focus Stable</div>
                    <div className="text-[8px] text-slate-400 font-bold uppercase">92% Progress</div>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between">
          <BrainCircuit size={180} className="absolute -bottom-10 -right-10 opacity-10 rotate-12" />
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Question Shard Library</h3>
            <p className="text-slate-400 text-sm font-medium italic mb-8">Aggregated repository of validated pedagogical assessment shards.</p>
            <div className="grid grid-cols-1 gap-4">
              {[
                { t: 'Mathematics (Algebra)', q: '120 Shards', d: 'Updated Oct 20' },
                { t: 'Literature (Modern)', q: '85 Shards', d: 'Updated Oct 15' },
              ].map((l, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-3xl group hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-black uppercase text-indigo-400">{l.t}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">{l.d}</p>
                    </div>
                    <p className="text-lg font-black">{l.q}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-8 py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">Generate Random Paper</button>
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-3">
            Staff Development Vault <Briefcase className="text-indigo-600" />
          </h2>
          <p className="text-sm text-slate-500 italic">Professional growth shards and appraisal history for {user.name}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner"><BrainCircuit size={48} /></div>
          <h3 className="text-xl font-black text-slate-900 uppercase mb-2">Teaching Proficiency</h3>
          <div className="text-3xl font-black text-indigo-600 mb-6">Level Alpha</div>
          <div className="w-full space-y-4 text-left">
            {[
              { l: 'Curriculum Delivery', p: '92%' },
              { l: 'Classroom Control', p: '88%' },
              { l: 'AI Orchestration', p: '100%' },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-[8px] font-black uppercase mb-1">
                  <span className="text-slate-400">{s.l}</span>
                  <span className="text-slate-900">{s.p}</span>
                </div>
                <div className="h-1 w-full bg-slate-100 rounded-full">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: s.p }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
          <History size={150} className="absolute -bottom-10 -right-10 opacity-5" />
          <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter">Appraisal Feedback Shards</h3>
          <div className="space-y-4">
            {[
              { d: 'Term 1, 2025', r: 'Exceptional integration of AI planning tools into the classroom node.', by: 'Principal sarah' },
              { d: 'Term 3, 2024', r: 'Commendable improvement in student engagement metrics for Grade 10A.', by: 'Super Admin HQ' },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl group hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black uppercase text-indigo-400">{f.d}</span>
                  <span className="text-[8px] font-black uppercase text-slate-500 italic">By {f.by}</span>
                </div>
                <p className="text-xs text-slate-300 italic">"{f.r}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {activeTab === 'rewards' && renderRewards()}
      {activeTab === 'requisition' && renderRequisition()}
      {activeTab === 'portfolio' && renderPortfolio()}
    </div>
  );
};

export default TeacherDashboard;