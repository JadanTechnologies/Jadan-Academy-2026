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
  CheckCircle2
} from 'lucide-react';

interface TeacherDashboardProps {
  user: User;
  initialTab?: string;
}

import { useSystem } from '../SystemContext';

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, initialTab }) => {
  const { state: systemState } = useSystem();
  const [activeTab, setActiveTab] = useState(initialTab || 'dash');
  const [showSaveToast, setShowSaveToast] = useState(false);

  const isLocked = systemState.emergencyLockdown;
  const isForceSync = systemState.forceGradeSync;
  // Strict Multi-Branch Filtering
  const filteredClasses = MOCK_CLASSES.filter(c => c.schoolId === user.schoolId && c.branchId === user.branchId);
  const filteredSubjects = MOCK_SUBJECTS.filter(s => s.schoolId === user.schoolId);

  const [selectedClass, setSelectedClass] = useState(filteredClasses[0]?.id || '');
  const [selectedSubject, setSelectedSubject] = useState(filteredSubjects[0]?.id || '');
  const [scores, setScores] = useState<Record<string, Partial<Score>>>({});

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

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

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex gap-1 bg-slate-200/50 p-1 rounded-2xl w-fit overflow-x-auto no-scrollbar">
        <button onClick={() => setActiveTab('dash')} className={`px-8 py-2.5 rounded-xl font-bold text-xs uppercase transition-all whitespace-nowrap ${activeTab === 'dash' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Overview</button>
        <button onClick={() => setActiveTab('attendance')} className={`px-8 py-2.5 rounded-xl font-bold text-xs uppercase transition-all whitespace-nowrap ${activeTab === 'attendance' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>My Attendance</button>
        <button onClick={() => setActiveTab('entry')} className={`px-8 py-2.5 rounded-xl font-bold text-xs uppercase transition-all whitespace-nowrap ${activeTab === 'entry' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Grades Terminal</button>
      </div>
      {activeTab === 'dash' && renderOverview()}
      {activeTab === 'attendance' && renderAttendance()}
      {activeTab === 'entry' && renderResultInput()}
    </div>
  );
};

export default TeacherDashboard;