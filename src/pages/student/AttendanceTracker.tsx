
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Calendar, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  courseCode: string;
  courseName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  time: string;
  instructor: string;
}

interface CourseAttendance {
  courseCode: string;
  courseName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  requiredPercentage: number;
  classesToAttend: number;
  status: 'good' | 'warning' | 'critical';
}

const AttendanceTracker: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const courseAttendance: CourseAttendance[] = [
    {
      courseCode: 'CS601',
      courseName: 'Advanced Database Systems',
      totalClasses: 45,
      attendedClasses: 42,
      percentage: 93.3,
      requiredPercentage: 75,
      classesToAttend: 0,
      status: 'good'
    },
    {
      courseCode: 'CS602',
      courseName: 'Machine Learning',
      totalClasses: 40,
      attendedClasses: 32,
      percentage: 80.0,
      requiredPercentage: 75,
      classesToAttend: 0,
      status: 'good'
    },
    {
      courseCode: 'CS603',
      courseName: 'Software Engineering Lab',
      totalClasses: 20,
      attendedClasses: 15,
      percentage: 75.0,
      requiredPercentage: 75,
      classesToAttend: 0,
      status: 'warning'
    },
    {
      courseCode: 'CS604',
      courseName: 'Computer Networks',
      totalClasses: 38,
      attendedClasses: 26,
      percentage: 68.4,
      requiredPercentage: 75,
      classesToAttend: 3,
      status: 'critical'
    },
    {
      courseCode: 'CS605',
      courseName: 'Artificial Intelligence',
      totalClasses: 35,
      attendedClasses: 28,
      percentage: 80.0,
      requiredPercentage: 75,
      classesToAttend: 0,
      status: 'good'
    }
  ];

  const recentAttendance: AttendanceRecord[] = [
    {
      id: '1',
      courseCode: 'CS601',
      courseName: 'Advanced Database Systems',
      date: '2024-06-18',
      status: 'present',
      time: '9:00 AM',
      instructor: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      courseCode: 'CS602',
      courseName: 'Machine Learning',
      date: '2024-06-18',
      status: 'present',
      time: '2:00 PM',
      instructor: 'Prof. Michael Chen'
    },
    {
      id: '3',
      courseCode: 'CS604',
      courseName: 'Computer Networks',
      date: '2024-06-17',
      status: 'absent',
      time: '11:00 AM',
      instructor: 'Dr. James Wilson'
    },
    {
      id: '4',
      courseCode: 'CS603',
      courseName: 'Software Engineering Lab',
      date: '2024-06-17',
      status: 'present',
      time: '3:00 PM',
      instructor: 'Dr. Emily Rodriguez'
    },
    {
      id: '5',
      courseCode: 'CS605',
      courseName: 'Artificial Intelligence',
      date: '2024-06-16',
      status: 'late',
      time: '10:00 AM',
      instructor: 'Dr. Lisa Anderson'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late': return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    const variants = {
      present: 'default',
      absent: 'destructive',
      late: 'secondary'
    } as const;
    return <Badge variant={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const overallAttendance = courseAttendance.reduce((acc, course) => {
    acc.totalClasses += course.totalClasses;
    acc.attendedClasses += course.attendedClasses;
    return acc;
  }, { totalClasses: 0, attendedClasses: 0 });

  const overallPercentage = (overallAttendance.attendedClasses / overallAttendance.totalClasses) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Tracker</h1>
          <p className="text-gray-600">Monitor your class attendance and maintain the required percentage</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-md"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Overall Attendance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{overallPercentage.toFixed(1)}%</span>
                <span className="text-sm text-gray-500">
                  {overallAttendance.attendedClasses}/{overallAttendance.totalClasses} classes
                </span>
              </div>
              <Progress value={overallPercentage} className="h-3" />
              <p className="text-sm text-gray-600">
                {overallPercentage >= 75 ? 'Meeting attendance requirement' : 'Below attendance requirement (75%)'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Classes Attended</p>
                <p className="text-xl font-bold">{overallAttendance.attendedClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Critical Courses</p>
                <p className="text-xl font-bold">{courseAttendance.filter(c => c.status === 'critical').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Course-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courseAttendance.map((course) => (
              <div key={course.courseCode} className={`p-4 rounded-lg border-2 ${getStatusColor(course.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{course.courseName}</h3>
                    <p className="text-sm text-gray-600">{course.courseCode}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{course.percentage.toFixed(1)}%</p>
                    <p className="text-sm text-gray-500">{course.attendedClasses}/{course.totalClasses} classes</p>
                  </div>
                </div>
                
                <Progress value={course.percentage} className="h-2 mb-3" />
                
                <div className="flex items-center justify-between text-sm">
                  <span>Required: {course.requiredPercentage}%</span>
                  {course.classesToAttend > 0 ? (
                    <span className="text-red-600 font-medium">
                      Need to attend next {course.classesToAttend} classes
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">
                      Requirement met
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAttendance.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium">{record.courseName}</p>
                    <p className="text-sm text-gray-500">{record.courseCode} • {record.instructor}</p>
                  </div>
                </div>
                <div className="text-right flex items-center space-x-3">
                  <div>
                    <p className="text-sm font-medium">{new Date(record.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{record.time}</p>
                  </div>
                  {getStatusBadge(record.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceTracker;
