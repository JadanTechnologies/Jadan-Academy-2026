
import { School, Class, Subject, AcademicSession, InventoryItem, BusRoute, LibraryBook, FeeStructure, PaymentRecord } from './types';

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
      { id: 'b3', name: 'East Hill Campus', location: 'Chicago', schoolId: 's1' }
    ]
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'Dual Desks', category: 'Furniture', quantity: 150, status: 'Good', branchId: 'b1' },
  { id: 'i2', name: 'Smart Boards', category: 'Electronics', quantity: 12, status: 'Good', branchId: 'b1' },
  { id: 'i3', name: 'Whiteboards', category: 'Furniture', quantity: 20, status: 'Needs Replacement', branchId: 'b2' }
];

export const MOCK_BUS_ROUTES: BusRoute[] = [
  { id: 'r1', routeName: 'Greenwich Avenue', driverName: 'Mike Ross', capacity: 30, occupied: 24, branchId: 'b1' },
  { id: 'r2', routeName: 'Sunset Blvd', driverName: 'Harvey Specter', capacity: 25, occupied: 25, branchId: 'b2' }
];

export const MOCK_BOOKS: LibraryBook[] = [
  { id: 'bk1', title: 'Advanced Physics', author: 'Stephen Hawking', isbn: 'PH-001', isAvailable: true, branchId: 'b1' },
  { id: 'bk2', title: 'Modern Biology', author: 'Charles Darwin', isbn: 'BIO-202', isAvailable: false, branchId: 'b1' }
];

export const MOCK_SUBJECTS: Subject[] = [
  { id: 'sub1', name: 'Mathematics', code: 'MTH', schoolId: 's1' },
  { id: 'sub2', name: 'English', code: 'ENG', schoolId: 's1' },
  { id: 'sub3', name: 'Biology', code: 'BIO', schoolId: 's1' }
];

export const MOCK_CLASSES: Class[] = [
  { id: 'c1', name: 'Grade 10', arm: 'A', schoolId: 's1', branchId: 'b1' },
  { id: 'c2', name: 'Grade 10', arm: 'B', schoolId: 's1', branchId: 'b1' },
  { id: 'c3', name: 'Grade 11', arm: 'A', schoolId: 's1', branchId: 'b2' }
];

export const MOCK_SESSIONS: AcademicSession[] = [
  { id: 'ses1', year: '2023/2024', currentTerm: '1st', schoolId: 's1' }
];

export const MOCK_FEE_STRUCTURES: FeeStructure[] = [
  { id: 'fs1', classId: 'c1', tuition: 1000, development: 200, other: 100, total: 1300, branchId: 'b1' },
  { id: 'fs2', classId: 'c2', tuition: 1000, development: 200, other: 100, total: 1300, branchId: 'b1' },
  { id: 'fs3', classId: 'c3', tuition: 1200, development: 250, other: 150, total: 1600, branchId: 'b2' }
];

export const MOCK_PAYMENTS: PaymentRecord[] = [
  { id: 'p1', studentId: 's1', studentName: 'Alice Thompson', amount: 1300, date: '2024-05-01', method: 'Bank Transfer', receivedBy: 'Admin Jane', branchId: 'b1' },
  { id: 'p2', studentId: 's2', studentName: 'Bob Wilson', amount: 600, date: '2024-05-03', method: 'POS', receivedBy: 'Admin Jane', branchId: 'b1' },
  { id: 'p3', studentId: 's1', studentName: 'Alice Thompson', amount: 1300, date: '2024-01-10', method: 'Cash', receivedBy: 'Admin Jane', branchId: 'b1' }
];

export const GRADING_SCALE = [
  { min: 75, max: 100, grade: 'A1', remark: 'Excellent' },
  { min: 40, max: 44, grade: 'E8', remark: 'Pass' },
  { min: 0, max: 39, grade: 'F9', remark: 'Fail' }
];
