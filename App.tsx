
import React, { useState, useEffect } from 'react';
import { User, UserRole, School } from './types';
import { MOCK_SCHOOLS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SuperAdminDashboard from './views/SuperAdminDashboard';
import SchoolAdminDashboard from './views/SchoolAdminDashboard';
import TeacherDashboard from './views/TeacherDashboard';
import StudentParentDashboard from './views/StudentParentDashboard';
import StaffDashboard from './views/StaffDashboard';
import LoginPage from './views/LoginPage';
import { SystemProvider, useSystem } from './SystemContext';
import { InstitutionProvider, useInstitution } from './InstitutionContext';
import { XCircle, Users } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeSchool, setActiveSchool] = useState<School | null>(null);
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('global_active_tab') || 'dash';
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { state: systemState, exitGhostMode } = useSystem();
  const { schools } = useInstitution();

  useEffect(() => {
    localStorage.setItem('global_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (currentUser?.schoolId) {
      const school = schools.find(s => s.id === currentUser.schoolId);
      setActiveSchool(school || null);
    } else {
      setActiveSchool(null);
    }
  }, [currentUser, schools]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveTab('dash');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveSchool(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    if (currentUser.role === UserRole.SUPER_ADMIN && systemState.ghostMode.isActive) {
      const targetBranchId = systemState.ghostMode.targetBranchId;
      return (
        <div className="relative h-full animate-in fade-in duration-700">
          <div className="absolute top-0 left-0 right-0 z-50 bg-rose-600 text-white px-6 py-2 flex justify-between items-center rounded-b-2xl shadow-lg border-x border-b border-rose-500">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <p className="text-[10px] font-black uppercase tracking-widest">GHOST MODE ACTIVE: Controlling Branch {targetBranchId}</p>
            </div>
            <button
              onClick={exitGhostMode}
              className="flex items-center gap-1 text-[10px] font-black uppercase bg-white/10 hover:bg-white text-white hover:text-rose-600 px-3 py-1 rounded-lg transition-all"
            >
              <XCircle size={14} /> Exit Terminal
            </button>
          </div>
          <SchoolAdminDashboard
            school={activeSchool!}
            user={currentUser}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      );
    }

    if (currentUser.role === UserRole.SCHOOL_ADMIN && !activeSchool) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-3xl border border-slate-100">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6">
            <Users size={40} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">School Data Missing</h2>
          <p className="text-slate-500 mt-2">Please contact HQ to assign your account to a school.</p>
        </div>
      );
    }

    switch (currentUser.role) {
      case UserRole.SUPER_ADMIN:
        return <SuperAdminDashboard activeTab={activeTab} onTabChange={setActiveTab} />;
      case UserRole.SCHOOL_ADMIN:
        return <SchoolAdminDashboard school={activeSchool!} user={currentUser} activeTab={activeTab} onTabChange={setActiveTab} />;
      case UserRole.TEACHER:
        return <TeacherDashboard user={currentUser} activeTab={activeTab} onTabChange={setActiveTab} />;
      case UserRole.STUDENT:
      case UserRole.PARENT:
        return <StudentParentDashboard user={currentUser} activeTab={activeTab} onTabChange={setActiveTab} />;
      case UserRole.BURSAR:
      case UserRole.LIBRARIAN:
      case UserRole.RECEPTIONIST:
        return <StaffDashboard user={currentUser} activeTab={activeTab} onTabChange={setActiveTab} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h2 className="text-xl font-bold text-slate-900">Unauthorized Access</h2>
            <p className="text-slate-500 mt-2">Your role does not have access to any dashboard.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        user={currentUser}
        onLogout={handleLogout}
        schoolLogo={activeSchool?.logo}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          user={currentUser}
          schoolName={activeSchool?.name}
          activeTab={activeTab}
        />
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50 custom-scrollbar">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SystemProvider>
      <InstitutionProvider>
        <AppContent />
      </InstitutionProvider>
    </SystemProvider>
  );
};

export default App;
