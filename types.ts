

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  BURSAR = 'BURSAR',
  LIBRARIAN = 'LIBRARIAN',
  RECEPTIONIST = 'RECEPTIONIST'
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
  category: 'Furniture' | 'Electronics' | 'Stationery' | 'Lab' | 'Sporting' | 'Other';
  quantity: number;
  status: 'Good' | 'Damaged' | 'Needs Replacement';
  branchId: string;
}

export interface BusRoute {
  id: string;
  routeName: string;
  driverName: string;
  driverPhone?: string;
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

// --- NEW INTERFACES FOR 50 FEATURES ---

export interface Attendance {
  id: string;
  userId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  remarks?: string;
  branchId: string;
}

export interface TimetablePeriod {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string;
  endTime: string;
  subjectId: string;
  classId: string;
  teacherId: string;
  branchId: string;
}

export interface DisciplineRecord {
  id: string;
  studentId: string;
  category: 'Minor' | 'Moderate' | 'Severe';
  offense: string;
  actionTaken: string;
  date: string;
  reportedBy: string;
  branchId: string;
}

export interface StaffRecord {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  qualification: string;
  basicSalary: number;
  dateJoined: string;
  branchId: string;
}

export interface PayrollRecord {
  id: string;
  staffId: string;
  month: string;
  year: string;
  status: 'Paid' | 'Pending';
  amount: number;
  deductions: number;
  allowances: number;
  branchId: string;
}

export interface ExpenseRecord {
  id: string;
  category: 'Maintenance' | 'Utilities' | 'Supplies' | 'Marketing' | 'Other';
  description: string;
  amount: number;
  date: string;
  branchId: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetAudience: 'All' | 'Teachers' | 'Parents' | 'Students';
  date: string;
  authorId: string;
  schoolId: string;
}

export interface LessonPlan {
  id: string;
  teacherId: string;
  subjectId: string;
  classId: string;
  weekNumber: number;
  topic: string;
  content: string;
  isApproved: boolean;
  branchId: string;
}

export interface OnlineAssignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  classId: string;
  dueDate: string;
  points: number;
  branchId: string;
}

export interface HostelRoom {
  id: string;
  hostelName: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
  branchId: string;
}

export interface VisitorLog {
  id: string;
  name: string;
  purpose: string;
  timeIn: string;
  timeOut?: string;
  whomToSee: string;
  branchId: string;
}


export interface PaymentProvider {
  id: string;
  name: string;
  logo: string;
  isActive: boolean;
  configFields: string[];
}

export interface CommunicationProvider {
  id: string;
  name: string;
  type: 'Email' | 'SMS' | 'Push';
  isActive: boolean;
  provider: string; // e.g. 'Resend', 'Twilio', 'OneSignal'
}
