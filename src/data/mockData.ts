
import { Student, Faculty, Admin, Course, Attendance, Exam, Result, Fee, Notice } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@college.edu',
    role: 'student',
    studentId: 'CS2021001',
    semester: 6,
    department: 'Computer Science',
    batch: '2021-2025',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@college.edu',
    role: 'student',
    studentId: 'EE2021002',
    semester: 4,
    department: 'Electrical Engineering',
    batch: '2021-2025'
  }
];

export const mockFaculty: Faculty[] = [
  {
    id: '3',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@college.edu',
    role: 'faculty',
    facultyId: 'FAC001',
    department: 'Computer Science',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems']
  },
  {
    id: '4',
    name: 'Prof. Lisa Anderson',
    email: 'lisa.anderson@college.edu',
    role: 'faculty',
    facultyId: 'FAC002',
    department: 'Mathematics',
    subjects: ['Calculus', 'Linear Algebra', 'Statistics']
  }
];

export const mockAdmins: Admin[] = [
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.wilson@college.edu',
    role: 'admin',
    adminId: 'ADM001',
    permissions: ['all']
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Data Structures and Algorithms',
    code: 'CS301',
    credits: 4,
    semester: 6,
    department: 'Computer Science',
    facultyId: '3',
    facultyName: 'Dr. Michael Chen'
  },
  {
    id: '2',
    name: 'Database Management Systems',
    code: 'CS401',
    credits: 3,
    semester: 6,
    department: 'Computer Science',
    facultyId: '3',
    facultyName: 'Dr. Michael Chen'
  },
  {
    id: '3',
    name: 'Linear Algebra',
    code: 'MATH201',
    credits: 3,
    semester: 4,
    department: 'Mathematics',
    facultyId: '4',
    facultyName: 'Prof. Lisa Anderson'
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    date: '2024-06-17',
    status: 'present'
  },
  {
    id: '2',
    studentId: '1',
    courseId: '1',
    date: '2024-06-16',
    status: 'present'
  },
  {
    id: '3',
    studentId: '1',
    courseId: '1',
    date: '2024-06-15',
    status: 'absent'
  }
];

export const mockExams: Exam[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Data Structures and Algorithms',
    type: 'midterm',
    date: '2024-06-25',
    time: '10:00 AM',
    venue: 'Room 101',
    duration: 180
  },
  {
    id: '2',
    courseId: '2',
    courseName: 'Database Management Systems',
    type: 'final',
    date: '2024-06-30',
    time: '2:00 PM',
    venue: 'Room 205',
    duration: 180
  }
];

export const mockResults: Result[] = [
  {
    id: '1',
    studentId: '1',
    examId: '1',
    courseName: 'Data Structures and Algorithms',
    marks: 85,
    totalMarks: 100,
    grade: 'A'
  }
];

export const mockFees: Fee[] = [
  {
    id: '1',
    studentId: '1',
    semester: 'Fall 2024',
    amount: 12000,
    dueDate: '2024-07-15',
    status: 'paid',
    paymentDate: '2024-06-10'
  },
  {
    id: '2',
    studentId: '1',
    semester: 'Spring 2025',
    amount: 12000,
    dueDate: '2024-12-15',
    status: 'pending'
  }
];

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Mid-Semester Exam Schedule Released',
    content: 'The mid-semester examination schedule for all departments has been published. Please check your respective department notice boards.',
    author: 'Academic Office',
    date: '2024-06-18',
    priority: 'high',
    targetRole: 'all'
  },
  {
    id: '2',
    title: 'Library Hours Extended',
    content: 'The central library will remain open until 11 PM during exam weeks to facilitate student preparation.',
    author: 'Library Administration',
    date: '2024-06-17',
    priority: 'medium',
    targetRole: 'student'
  },
  {
    id: '3',
    title: 'Faculty Meeting - June 20th',
    content: 'Monthly faculty meeting scheduled for June 20th at 3 PM in the main conference room. Attendance is mandatory.',
    author: 'Dean Office',
    date: '2024-06-16',
    priority: 'high',
    targetRole: 'faculty'
  }
];
