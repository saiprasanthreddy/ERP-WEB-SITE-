
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  avatar?: string;
}

export interface Student extends User {
  studentId: string;
  semester: number;
  department: string;
  batch: string;
}

export interface Faculty extends User {
  facultyId: string;
  department: string;
  subjects: string[];
}

export interface Admin extends User {
  adminId: string;
  permissions: string[];
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  semester: number;
  department: string;
  facultyId: string;
  facultyName: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface Exam {
  id: string;
  courseId: string;
  courseName: string;
  type: 'midterm' | 'final' | 'quiz';
  date: string;
  time: string;
  venue: string;
  duration: number;
}

export interface Result {
  id: string;
  studentId: string;
  examId: string;
  courseName: string;
  marks: number;
  totalMarks: number;
  grade: string;
}

export interface Fee {
  id: string;
  studentId: string;
  semester: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  targetRole?: 'student' | 'faculty' | 'admin' | 'all';
}
