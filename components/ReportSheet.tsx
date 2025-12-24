
import React from 'react';
import { School, Student, ResultEntry, AcademicSession } from '../types';
import { MOCK_SUBJECTS, GRADING_SCALE } from '../constants';
import { QrCode, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

interface ReportSheetProps {
  school: School;
  student: Student;
  results: ResultEntry[];
  session: AcademicSession;
}

const ReportSheet: React.FC<ReportSheetProps> = ({ school, student, results, session }) => {
  const computeAverage = (): string => {
    if (results.length === 0) return '0.00';
    const total = results.reduce((acc, r) => acc + r.score.total, 0);
    return (total / results.length).toFixed(2);
  };

  const getStatus = (avg: number) => {
    return avg >= 40 ? 'Promoted to Next Grade' : 'Repeat Grade';
  };

  const branchName = school.branches.find(b => b.id === student.branchId)?.name || 'Main Campus';

  return (
    <div className="bg-white p-12 shadow-2xl max-w-[1000px] mx-auto border-t-[14px] border-slate-900 print:shadow-none print:p-8 relative overflow-hidden">
      {/* Security Watermark - Subtle bg logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none rotate-[-15deg]">
        <img src={school.logo} alt="" className="w-[80%] max-w-[500px]" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-10 border-b-2 border-slate-100 pb-8 relative z-10">
        <div className="flex gap-8 items-center">
          <div className="w-24 h-24 bg-slate-50 rounded-2xl p-1 border border-slate-200">
            <img src={school.logo} alt="School Logo" className="w-full h-full rounded-xl object-cover shadow-sm" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{school.name}</h1>
            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] mb-4">{branchName} Node • Official Transcript</p>
            <div className="flex gap-4">
              <span className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">{session.year} Session</span>
              <span className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">{session.currentTerm} Term</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-100 mb-2 shadow-sm">
            <QrCode size={48} className="text-slate-900 mb-2" />
            <p className="text-[8px] text-slate-400 font-mono uppercase tracking-widest">VERIFY-ID-982</p>
          </div>
        </div>
      </div>

      {/* Student Biodata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 bg-slate-50/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-100 relative z-10">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Student Candidate</label>
          <p className="font-black text-slate-900 uppercase truncate text-sm">{student.name}</p>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Registration ID</label>
          <p className="font-black text-indigo-600 uppercase text-sm font-mono">{student.studentId}</p>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Level & Group</label>
          <p className="font-black text-slate-900 uppercase text-sm">{student.classId} / {student.arm}</p>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Standing</label>
          <p className="font-black text-emerald-600 text-sm">3rd in Class Cluster</p>
        </div>
      </div>

      {/* Results Table */}
      <div className="mb-10 overflow-hidden border border-slate-200 rounded-3xl shadow-sm relative z-10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-900 text-white font-black uppercase tracking-widest text-[9px]">
              <th className="px-6 py-5">Subject Component</th>
              <th className="px-4 py-5 text-center">T1+T2(20)</th>
              <th className="px-4 py-5 text-center">ASGN(20)</th>
              <th className="px-4 py-5 text-center">EXAM(60)</th>
              <th className="px-6 py-5 text-center">TOTAL(100)</th>
              <th className="px-6 py-5 text-center">GRADE</th>
              <th className="px-6 py-5">REMARK</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((res, i) => {
              const sub = MOCK_SUBJECTS.find(s => s.id === res.subjectId);
              return (
                <tr key={res.subjectId} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="px-6 py-4 font-black text-slate-800 uppercase text-xs">{sub?.name}</td>
                  <td className="px-4 py-4 text-center text-slate-600 font-bold">{(res.score.test1 + res.score.test2).toFixed(0)}</td>
                  <td className="px-4 py-4 text-center text-slate-600 font-bold">{res.score.assignment.toFixed(0)}</td>
                  <td className="px-4 py-4 text-center text-slate-600 font-bold">{res.score.exam.toFixed(0)}</td>
                  <td className="px-6 py-4 text-center font-black text-slate-900 text-base">{res.score.total}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1.5 rounded-lg font-black text-xs ${res.score.grade === 'F9' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
                      {res.score.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 italic text-[10px] font-bold uppercase">{res.score.remark}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 relative z-10">
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Administrative Comment</h4>
            <p className="text-xs text-slate-700 italic font-medium leading-relaxed">"{student.name} has demonstrated significant cognitive development in STEM subjects this term. We encourage consistent focus on creative arts to balance the academic profile."</p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
              <div className="text-[8px] font-black text-emerald-900 uppercase mb-1">Session Attendance</div>
              <div className="text-lg font-black text-emerald-600">100%</div>
            </div>
            <div className="flex-1 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-center">
              <div className="text-[8px] font-black text-indigo-900 uppercase mb-1">Node Standing</div>
              <div className="text-lg font-black text-indigo-600">Top 5%</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center shadow-xl shadow-slate-200">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Aggregated Campus Average</div>
          <div className="text-7xl font-black mb-6 tracking-tighter">{computeAverage()}<span className="text-3xl text-indigo-500">%</span></div>
          <div className="w-full bg-white/10 rounded-2xl p-4 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Academic Status</div>
            <div className="text-sm font-black uppercase text-indigo-300">{getStatus(parseFloat(computeAverage()))}</div>
          </div>
        </div>
      </div>

      {/* Verification Footer */}
      <div className="flex justify-between items-end pt-12 border-t border-slate-100 relative z-10">
        <div className="text-center">
          <div className="w-48 h-16 flex items-end justify-center mb-2">
             <span className="font-serif italic text-slate-400 text-3xl opacity-40 select-none">JW-Verify</span>
          </div>
          <div className="w-56 h-[1px] bg-slate-200 mb-2 mx-auto"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Class Administrator</p>
        </div>
        
        <div className="hidden md:flex flex-col items-center opacity-30 select-none grayscale">
          <ShieldCheck size={64} className="text-slate-900 mb-2" />
          <p className="text-[8px] font-black uppercase tracking-[0.3em]">SECURE NODE SEAL</p>
        </div>

        <div className="text-center">
          <div className="w-48 h-16 flex items-end justify-center mb-2">
             <span className="font-serif italic text-slate-400 text-3xl opacity-40 select-none underline-offset-8">HQ-Admin-Node</span>
          </div>
          <div className="w-56 h-[1px] bg-slate-200 mb-2 mx-auto"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Principal Authority</p>
        </div>
      </div>
    </div>
  );
};

export default ReportSheet;
