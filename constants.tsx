
import { School, Class, Subject, AcademicSession, InventoryItem, BusRoute, LibraryBook, FeeStructure, PaymentRecord, Student, UserRole } from './types';

export const MOCK_SCHOOLS: School[] = [
  {
    id: 's1',
    name: 'St. Andrews International College',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&h=200&auto=format&fit=crop',
    isActive: true,
    subscriptionPlan: 'Enterprise',
    branches: [
      { id: 'b1', name: 'Main Campus (Downtown)', location: 'New York', schoolId: 's1' },
      { id: 'b2', name: 'Westside Campus', location: 'California', schoolId: 's1' },
      { id: 'b3', name: 'East Hill Campus', location: 'Chicago', schoolId: 's1' },
      { id: 'b4', name: 'North Wing', location: 'Texas', schoolId: 's1' },
      { id: 'b5', name: 'South Lake', location: 'Florida', schoolId: 's1' },
      { id: 'b6', name: 'Valley Hub', location: 'Arizona', schoolId: 's1' }
    ]
  }
];

export const MOCK_STAFF: any[] = [
  { id: 'stf1', name: 'Dr. Sarah Jenkins', role: 'Principal', email: 'sarah.j@standrews.edu', basicSalary: 5000, branchId: 'b1', joinDate: '2020-01-15' },
  { id: 'stf2', name: 'James Miller', role: 'Senior Teacher', email: 'james.m@standrews.edu', basicSalary: 3500, branchId: 'b1', joinDate: '2021-03-10' },
  { id: 'stf3', name: 'Elena Rodriguez', role: 'Accountant', email: 'elena.r@standrews.edu', basicSalary: 3200, branchId: 'b2', joinDate: '2022-06-05' },
  { id: 'stf4', name: 'David Chen', role: 'Librarian', email: 'david.c@standrews.edu', basicSalary: 2800, branchId: 'b3', joinDate: '2019-11-20' }
];

export const MOCK_PAYROLL: any[] = [
  { id: 'pay1', staffId: 'stf1', month: 'May', year: '2024', amount: 5000, deductions: 200, allowances: 500, status: 'Paid', branchId: 'b1' },
  { id: 'pay2', staffId: 'stf2', month: 'May', year: '2024', amount: 3500, deductions: 150, allowances: 300, status: 'Paid', branchId: 'b1' },
  { id: 'pay3', staffId: 'stf3', month: 'May', year: '2024', amount: 3200, deductions: 100, allowances: 200, status: 'Pending', branchId: 'b2' }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'Dual Desks', category: 'Furniture', quantity: 150, status: 'Good', branchId: 'b1' },
  { id: 'i2', name: 'Smart Boards', category: 'Electronics', quantity: 12, status: 'Good', branchId: 'b1' },
  { id: 'i3', name: 'Whiteboards', category: 'Furniture', quantity: 20, status: 'Needs Replacement', branchId: 'b2' },
  { id: 'i4', name: 'Lab Microscopes', category: 'Lab', quantity: 25, status: 'Good', branchId: 'b4' }
];

export const MOCK_BUS_ROUTES: BusRoute[] = [
  { id: 'r1', routeName: 'Greenwich Avenue', driverName: 'Mike Ross', capacity: 30, occupied: 24, branchId: 'b1' },
  { id: 'r2', routeName: 'Sunset Blvd', driverName: 'Harvey Specter', capacity: 25, occupied: 25, branchId: 'b2' },
  { id: 'r3', routeName: 'Arizona Bypass', driverName: 'Jesse Pinkman', capacity: 20, occupied: 12, branchId: 'b6' }
];

export const MOCK_BOOKS: LibraryBook[] = [
  { id: 'bk1', title: 'Advanced Physics', author: 'Stephen Hawking', isbn: 'PH-001', isAvailable: true, branchId: 'b1' },
  { id: 'bk2', title: 'Modern Biology', author: 'Charles Darwin', isbn: 'BIO-202', isAvailable: false, branchId: 'b6' }
];

export const MOCK_SUBJECTS: Subject[] = [
  { id: 'sub1', name: 'Mathematics', code: 'MTH', schoolId: 's1' },
  { id: 'sub2', name: 'English', code: 'ENG', schoolId: 's1' },
  { id: 'sub3', name: 'Biology', code: 'BIO', schoolId: 's1' },
  { id: 'sub4', name: 'Physics', code: 'PHY', schoolId: 's1' }
];

export const MOCK_CLASSES: Class[] = [
  { id: 'c1', name: 'Grade 10', arm: 'A', schoolId: 's1', branchId: 'b1' },
  { id: 'c2', name: 'Grade 10', arm: 'B', schoolId: 's1', branchId: 'b1' },
  { id: 'c3', name: 'Grade 11', arm: 'A', schoolId: 's1', branchId: 'b2' },
  { id: 'c4', name: 'Grade 12', arm: 'Z', schoolId: 's1', branchId: 'b5' }
];

export const MOCK_SESSIONS: AcademicSession[] = [
  { id: 'ses1', year: '2023/2024', currentTerm: '1st', schoolId: 's1' }
];

export const MOCK_FEE_STRUCTURES: FeeStructure[] = [
  { id: 'fs1', classId: 'c1', tuition: 1000, development: 200, other: 100, total: 1300, branchId: 'b1' },
  { id: 'fs2', classId: 'c2', tuition: 1000, development: 200, other: 100, total: 1300, branchId: 'b1' },
  { id: 'fs3', classId: 'c3', tuition: 1200, development: 250, other: 150, total: 1600, branchId: 'b2' },
  { id: 'fs4', classId: 'c4', tuition: 1500, development: 300, other: 200, total: 2000, branchId: 'b5' }
];

export const MOCK_PAYMENTS: PaymentRecord[] = [
  { id: 'p1', studentId: 'st1', studentName: 'Alice Thompson', amount: 1300, date: '2024-05-01', method: 'Bank Transfer', receivedBy: 'Elana R', branchId: 'b1' },
  { id: 'p2', studentId: 'st2', studentName: 'Bob Wilson', amount: 600, date: '2024-05-03', method: 'POS', receivedBy: 'Elana R', branchId: 'b1' },
  { id: 'p3', studentId: 'st1', studentName: 'Alice Thompson', amount: 1300, date: '2024-01-10', method: 'Cash', receivedBy: 'Elana R', branchId: 'b1' }
];

export const GRADING_SCALE = [
  { min: 75, max: 100, grade: 'A1', remark: 'Excellent' },
  { min: 70, max: 74, grade: 'B2', remark: 'Very Good' },
  { min: 65, max: 69, grade: 'B3', remark: 'Good' },
  { min: 60, max: 64, grade: 'C4', remark: 'Credit' },
  { min: 55, max: 59, grade: 'C5', remark: 'Credit' },
  { min: 50, max: 54, grade: 'C6', remark: 'Credit' },
  { min: 45, max: 49, grade: 'D7', remark: 'Pass' },
  { min: 40, max: 44, grade: 'E8', remark: 'Pass' },
  { min: 0, max: 39, grade: 'F9', remark: 'Fail' }
];

export const MOCK_STUDENTS: Student[] = [
  { id: 'st1', name: 'Alice Thompson', email: 'a@t.com', role: UserRole.STUDENT, studentId: 'ADM-001', classId: 'c1', arm: 'A', parentEmail: 'p@t.com', schoolId: 's1', branchId: 'b1', feeStatus: 'Paid', totalPaid: 1300 },
  { id: 'st2', name: 'Bob Wilson', email: 'b@w.com', role: UserRole.STUDENT, studentId: 'ADM-002', classId: 'c1', arm: 'A', parentEmail: 'p@w.com', schoolId: 's1', branchId: 'b1', feeStatus: 'Partial', totalPaid: 600 },
  { id: 'st3', name: 'Catherine Grace', email: 'c@g.com', role: UserRole.STUDENT, studentId: 'ADM-003', classId: 'c1', arm: 'A', parentEmail: 'p@g.com', schoolId: 's1', branchId: 'b1', feeStatus: 'Unpaid', totalPaid: 0 },
  { id: 'st4', name: 'David Beckham', email: 'd@b.com', role: UserRole.STUDENT, studentId: 'ADM-004', classId: 'c2', arm: 'B', parentEmail: 'p@b.com', schoolId: 's1', branchId: 'b1', feeStatus: 'Paid', totalPaid: 1300 },
  { id: 'st5', name: 'Emma Watson', email: 'e.w@st.com', role: UserRole.STUDENT, studentId: 'ADM-005', classId: 'c3', arm: 'A', parentEmail: 'p.e@st.com', schoolId: 's1', branchId: 'b2', feeStatus: 'Paid', totalPaid: 1600 },
  { id: 'st6', name: 'Frank Castle', email: 'f.c@st.com', role: UserRole.STUDENT, studentId: 'ADM-006', classId: 'c4', arm: 'Z', parentEmail: 'p.f@st.com', schoolId: 's1', branchId: 'b5', feeStatus: 'Unpaid', totalPaid: 0 },
];

export const MOCK_PAYMENT_PROVIDERS: any[] = [
  { id: 'pp1', name: 'Stripe', logo: 'https://cdn.brandfetch.io/stripe.com/fallback/lettermark?t=1667575647000', isActive: true, configFields: ['Secret Key', 'Publishable Key'] },
  { id: 'pp2', name: 'PayPal', logo: 'https://cdn.brandfetch.io/paypal.com/fallback/lettermark?t=1667575647000', isActive: false, configFields: ['Client ID', 'Client Secret'] },
  { id: 'pp3', name: 'Flutterwave', logo: 'https://cdn.brandfetch.io/flutterwave.com/fallback/lettermark?t=1667575647000', isActive: true, configFields: ['Public Key', 'Secret Key'] },
  { id: 'pp4', name: 'Paystack', logo: 'https://cdn.brandfetch.io/paystack.com/fallback/lettermark?t=1667575647000', isActive: true, configFields: ['Public Key', 'Secret Key'] },
  { id: 'pp5', name: 'Razorpay', logo: 'https://cdn.brandfetch.io/razorpay.com/fallback/lettermark?t=1667575647000', isActive: false, configFields: ['Key ID', 'Key Secret'] },
];

export const MOCK_COMM_PROVIDERS: any[] = [
  { id: 'cp1', name: 'Email (Resend)', type: 'Email', provider: 'Resend', isActive: true },
  { id: 'cp2', name: 'SMS (Twilio)', type: 'SMS', provider: 'Twilio', isActive: true },
  { id: 'cp3', name: 'Push (OneSignal)', type: 'Push', provider: 'OneSignal', isActive: true },
];
