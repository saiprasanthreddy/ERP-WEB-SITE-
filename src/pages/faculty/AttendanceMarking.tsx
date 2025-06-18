
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Calendar, Users, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import { Input } from '../../components/ui/input';

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  currentAttendance: number;
  isPresent?: boolean;
}

interface AttendanceSession {
  id: string;
  subject: string;
  subjectCode: string;
  date: string;
  time: string;
  type: 'lecture' | 'lab' | 'tutorial';
  totalStudents: number;
  markedStudents: number;
  status: 'pending' | 'completed';
}

const AttendanceMarking: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('CS601');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([
    { id: '1', rollNumber: 'CS21001', name: 'John Smith', email: 'john@vemana.edu', currentAttendance: 85, isPresent: true },
    { id: '2', rollNumber: 'CS21002', name: 'Sarah Johnson', email: 'sarah@vemana.edu', currentAttendance: 92, isPresent: true },
    { id: '3', rollNumber: 'CS21003', name: 'Mike Wilson', email: 'mike@vemana.edu', currentAttendance: 78, isPresent: false },
    { id: '4', rollNumber: 'CS21004', name: 'Emily Davis', email: 'emily@vemana.edu', currentAttendance: 88, isPresent: true },
    { id: '5', rollNumber: 'CS21005', name: 'David Brown', email: 'david@vemana.edu', currentAttendance: 73, isPresent: false }
  ]);

  const sessions: AttendanceSession[] = [
    {
      id: '1',
      subject: 'Advanced Database Systems',
      subjectCode: 'CS601',
      date: '2024-06-18',
      time: '9:00 AM',
      type: 'lecture',
      totalStudents: 45,
      markedStudents: 0,
      status: 'pending'
    },
    {
      id: '2',
      subject: 'Database Systems Lab',
      subjectCode: 'CS602L',
      date: '2024-06-18',
      time: '2:00 PM',
      type: 'lab',
      totalStudents: 45,
      markedStudents: 45,
      status: 'completed'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentAttendance = (studentId: string, isPresent: boolean) => {
    setStudents(prev => prev.map(student =>
      student.id === studentId ? { ...student, isPresent } : student
    ));
  };

  const handleMarkAll = (present: boolean) => {
    setStudents(prev => prev.map(student => ({ ...student, isPresent: present })));
  };

  const handleSubmitAttendance = () => {
    const presentCount = students.filter(s => s.isPresent).length;
    console.log(`Attendance submitted: ${presentCount}/${students.length} present`);
  };

  const presentCount = students.filter(s => s.isPresent).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Marking</h1>
          <p className="text-gray-600">Mark student attendance for your classes</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="CS601">CS601 - Advanced Database Systems</option>
            <option value="CS602L">CS602L - Database Systems Lab</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-xl font-bold">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Present</p>
                <p className="text-xl font-bold text-green-600">{presentCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-500">Absent</p>
                <p className="text-xl font-bold text-red-600">{students.length - presentCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Attendance Rate</p>
                <p className="text-xl font-bold">{((presentCount / students.length) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mark Attendance - Today</CardTitle>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleMarkAll(true)}>
                  Mark All Present
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleMarkAll(false)}>
                  Mark All Absent
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search students by name or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={student.isPres ent || false}
                        onCheckedChange={(checked) => handleStudentAttendance(student.id, checked as boolean)}
                      />
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.rollNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={student.currentAttendance >= 75 ? "default" : "destructive"}>
                        {student.currentAttendance}%
                      </Badge>
                      <p className="text-xs text-gray-500">Current Attendance</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  {presentCount} of {students.length} students marked present
                </p>
                <Button onClick={handleSubmitAttendance}>
                  Submit Attendance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{session.subject}</p>
                    <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>
                      {session.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3" />
                      <span>{session.markedStudents}/{session.totalStudents} marked</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceMarking;
