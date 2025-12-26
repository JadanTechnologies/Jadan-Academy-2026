
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { School, Branch, StaffRecord, Student, User, UserRole } from './types';
import { MOCK_SCHOOLS, MOCK_STAFF, MOCK_STUDENTS } from './constants';

interface InstitutionContextType {
    schools: School[];
    staff: StaffRecord[];
    students: Student[];
    users: User[];
    addSchool: (school: Omit<School, 'id' | 'branches' | 'isActive'>) => void;
    addBranch: (schoolId: string, branch: Omit<Branch, 'id' | 'schoolId'>) => void;
    addStaff: (record: Omit<StaffRecord, 'id'>) => void;
    addStudent: (record: Omit<Student, 'id'>) => void;
    updateStudentStatus: (studentId: string, status: Student['feeStatus']) => void;
}

const InstitutionContext = createContext<InstitutionContextType | undefined>(undefined);

export const InstitutionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [schools, setSchools] = useState<School[]>(() => {
        const saved = localStorage.getItem('inst_schools');
        return saved ? JSON.parse(saved) : MOCK_SCHOOLS;
    });

    const [staff, setStaff] = useState<StaffRecord[]>(() => {
        const saved = localStorage.getItem('inst_staff');
        return saved ? JSON.parse(saved) : MOCK_STAFF.map(s => ({
            ...s,
            phone: '08000000000',
            qualification: 'B.Ed',
            dateJoined: s.joinDate || '2024-01-01'
        }));
    });

    const [students, setStudents] = useState<Student[]>(() => {
        const saved = localStorage.getItem('inst_students');
        return saved ? JSON.parse(saved) : MOCK_STUDENTS;
    });

    const [users, setUsers] = useState<User[]>(() => {
        const saved = localStorage.getItem('inst_users');
        if (saved) return JSON.parse(saved);

        // Initial users based on mock data
        return [
            { id: 'u1', name: 'HQ Director', email: 'admin@jadan.edu', role: UserRole.SUPER_ADMIN },
            { id: 'u2', name: 'Main Campus Admin', email: 'b1@jadan.edu', role: UserRole.SCHOOL_ADMIN, schoolId: 's1', branchId: 'b1' },
            { id: 'u3', name: 'Teacher James', email: 'james@jadan.edu', role: UserRole.TEACHER, schoolId: 's1', branchId: 'b1' }
        ];
    });

    useEffect(() => {
        localStorage.setItem('inst_schools', JSON.stringify(schools));
    }, [schools]);

    useEffect(() => {
        localStorage.setItem('inst_staff', JSON.stringify(staff));
    }, [staff]);

    useEffect(() => {
        localStorage.setItem('inst_students', JSON.stringify(students));
    }, [students]);

    useEffect(() => {
        localStorage.setItem('inst_users', JSON.stringify(users));
    }, [users]);

    const addSchool = (schoolData: Omit<School, 'id' | 'branches' | 'isActive'>) => {
        const newSchool: School = {
            ...schoolData,
            id: `s${schools.length + 1}`,
            branches: [],
            isActive: true
        };
        setSchools([...schools, newSchool]);
    };

    const addBranch = (schoolId: string, branchData: Omit<Branch, 'id' | 'schoolId'>) => {
        setSchools(prev => prev.map(s => {
            if (s.id === schoolId) {
                const newBranch: Branch = {
                    ...branchData,
                    id: `b${Math.random().toString(36).substr(2, 5)}`,
                    schoolId
                };
                return { ...s, branches: [...s.branches, newBranch] };
            }
            return s;
        }));
    };

    const addStaff = (staffData: Omit<StaffRecord, 'id'>) => {
        const newId = `stf${staff.length + 1}`;
        const newRecord: StaffRecord = { ...staffData, id: newId };
        setStaff([...staff, newRecord]);

        // Also create a user account for them
        let role = UserRole.TEACHER;
        if (staffData.role.toLowerCase().includes('bursar')) role = UserRole.BURSAR;
        if (staffData.role.toLowerCase().includes('librarian')) role = UserRole.LIBRARIAN;
        if (staffData.role.toLowerCase().includes('receptionist')) role = UserRole.RECEPTIONIST;
        if (staffData.role.toLowerCase().includes('principal') || staffData.role.toLowerCase().includes('admin')) role = UserRole.SCHOOL_ADMIN;

        const newUser: User = {
            id: `u_${newId}`,
            name: staffData.name,
            email: staffData.email,
            role,
            schoolId: schools[0].id, // Default to first school for now
            branchId: staffData.branchId
        };
        setUsers([...users, newUser]);
    };

    const addStudent = (studentData: Omit<Student, 'id'>) => {
        const newRecord: Student = { ...studentData, id: `st${students.length + 1}` };
        setStudents([...students, newRecord]);
    };

    const updateStudentStatus = (studentId: string, status: Student['feeStatus']) => {
        setStudents(prev => prev.map(s => s.id === studentId ? { ...s, feeStatus: status } : s));
    };

    return (
        <InstitutionContext.Provider value={{
            schools, staff, students, users,
            addSchool, addBranch, addStaff, addStudent, updateStudentStatus
        }}>
            {children}
        </InstitutionContext.Provider>
    );
};

export const useInstitution = () => {
    const context = useContext(InstitutionContext);
    if (!context) {
        throw new Error('useInstitution must be used within an InstitutionProvider');
    }
    return context;
};
