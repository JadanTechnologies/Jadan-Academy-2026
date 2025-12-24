
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId?: string;
  branchId?: string;
  avatar?: string;
}

export interface School {
  id: string;
  name: string;
  logo: string;
  branches: Branch[];
  isActive: boolean;
  subscriptionPlan: 'Basic' | 'Pro' | 'Enterprise';
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  schoolId: string;
}

export interface Student extends User {
  studentId: string;
  classId: string;
  arm: string;
  parentEmail: string;
  photo?: string;
  feeStatus?: 'Paid' | 'Partial' | 'Unpaid';
  totalPaid?: number;
  busRoute?: string;
  hostelRoom?: string;
  medicalNotes?: string;
  disciplineScore?: number;
}

export interface Score {
  test1: number;
  test2: number;
  assignment: number;
  exam: number;
  total: number;
  grade: string;
  remark: string;
  isApproved: boolean;
}

export interface ResultEntry {
  id: string;
  studentId: string;
  subjectId: string;
  sessionId: string;
  term: string;
  score: Score;
  teacherId: string;
  schoolId: string;
  branchId: string;
  submissionTime: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Furniture' | 'Electronics' | 'Stationery' | 'Lab';
  quantity: number;
  status: 'Good' | 'Damaged' | 'Needs Replacement';
  branchId: string;
}

export interface BusRoute {
  id: string;
  routeName: string;
  driverName: string;
  capacity: number;
  occupied: number;
  branchId: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
  branchId: string;
}

export interface Class {
  id: string;
  name: string;
  arm: string;
  schoolId: string;
  branchId: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  schoolId: string;
}

export interface AcademicSession {
  id: string;
  year: string;
  currentTerm: '1st' | '2nd' | '3rd';
  schoolId: string;
}

export interface FeeStructure {
  id: string;
  classId: string;
  tuition: number;
  development: number;
  other: number;
  total: number;
  branchId: string;
}

export interface PaymentRecord {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string;
  method: 'Cash' | 'Bank Transfer' | 'POS' | 'Check';
  receivedBy: string;
  branchId: string;
}
