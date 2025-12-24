
import React, { useState, useEffect } from 'react';
import { User, UserRole, School } from './types';
import { MOCK_SCHOOLS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SuperAdminDashboard from './views/SuperAdminDashboard';
import SchoolAdminDashboard from './views/SchoolAdminDashboard';
import TeacherDashboard from './views/TeacherDashboard';
import StudentParentDashboard from './views/StudentParentDashboard';
import LoginPage from './views/LoginPage';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeSchool, setActiveSchool] = useState<School | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dash');

  useEffect(() => {
    if (currentUser?.schoolId) {
      const school = MOCK_SCHOOLS.find(s => s.id === currentUser.schoolId);
      setActiveSchool(school || null);
    } else {
      setActiveSchool(null);
    }
    // Reset tab on login
    setActiveTab('dash');
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveSchool(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    if (currentUser.role === UserRole.SCHOOL_ADMIN && !activeSchool) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-3xl border border-slate-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900">School Data Missing</h2>
          <p className="text-slate-500 mt-2">We couldn't find the school associated with your account. Please contact the Super Admin.</p>
        </div>
      );
    }

    switch (currentUser.role) {
      case UserRole.SUPER_ADMIN:
        return <SuperAdminDashboard defaultTab={activeTab} />;
      case UserRole.SCHOOL_ADMIN:
        return <SchoolAdminDashboard school={activeSchool!} user={currentUser} defaultTab={activeTab} />;
      case UserRole.TEACHER:
        return <TeacherDashboard user={currentUser} initialTab={activeTab} />;
      case UserRole.STUDENT:
      case UserRole.PARENT:
        return <StudentParentDashboard user={currentUser} defaultTab={activeTab} />;
      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden">
      <div className="no-print w-64 flex-shrink-0">
        <Sidebar 
          user={currentUser} 
          onLogout={handleLogout} 
          schoolLogo={activeSchool?.logo} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={currentUser} schoolName={activeSchool?.name} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default App;
