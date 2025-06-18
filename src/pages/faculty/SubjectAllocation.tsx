
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { BookOpen, Users, Calendar, Clock, MapPin, Plus } from 'lucide-react';

interface Subject {
  id: string;
  code: string;
  name: string;
  semester: number;
  credits: number;
  type: 'theory' | 'lab' | 'project';
  studentsEnrolled: number;
  maxCapacity: number;
  schedule: {
    day: string;
    time: string;
    room: string;
  }[];
  status: 'active' | 'completed' | 'upcoming';
}

const SubjectAllocation: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>('current');

  const subjects: Subject[] = [
    {
      id: '1',
      code: 'CS601',
      name: 'Advanced Database Systems',
      semester: 6,
      credits: 4,
      type: 'theory',
      studentsEnrolled: 45,
      maxCapacity: 50,
      schedule: [
        { day: 'Monday', time: '9:00 AM - 10:30 AM', room: 'Main Block - Room 101' },
        { day: 'Wednesday', time: '9:00 AM - 10:30 AM', room: 'Main Block - Room 101' },
        { day: 'Friday', time: '9:00 AM - 10:30 AM', room: 'Main Block - Room 101' }
      ],
      status: 'active'
    },
    {
      id: '2',
      code: 'CS602L',
      name: 'Database Systems Lab',
      semester: 6,
      credits: 2,
      type: 'lab',
      studentsEnrolled: 45,
      maxCapacity: 50,
      schedule: [
        { day: 'Tuesday', time: '2:00 PM - 5:00 PM', room: 'CS Block - Lab 201' }
      ],
      status: 'active'
    },
    {
      id: '3',
      code: 'CS701',
      name: 'Advanced Machine Learning',
      semester: 7,
      credits: 4,
      type: 'theory',
      studentsEnrolled: 0,
      maxCapacity: 50,
      schedule: [
        { day: 'Monday', time: '11:00 AM - 12:30 PM', room: 'Main Block - Room 205' },
        { day: 'Thursday', time: '11:00 AM - 12:30 PM', room: 'Main Block - Room 205' }
      ],
      status: 'upcoming'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'upcoming': return 'outline';
      default: return 'secondary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'lab': return 'bg-green-50 border-green-200 text-green-700';
      case 'project': return 'bg-purple-50 border-purple-200 text-purple-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
  const activeSubjects = subjects.filter(s => s.status === 'active').length;
  const totalStudents = subjects.reduce((sum, subject) => sum + subject.studentsEnrolled, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subject Allocation</h1>
          <p className="text-gray-600">Manage your assigned subjects and schedules</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="current">Current Semester</option>
            <option value="next">Next Semester</option>
            <option value="all">All Semesters</option>
          </select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Request New Subject
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Active Subjects</p>
                <p className="text-xl font-bold">{activeSubjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-xl font-bold">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Total Credits</p>
                <p className="text-xl font-bold">{totalCredits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Weekly Hours</p>
                <p className="text-xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.id} className={`border-2 ${getTypeColor(subject.type)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                  <p className="text-sm text-gray-600">{subject.code}</p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={getStatusColor(subject.status)} className="capitalize">
                    {subject.status}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {subject.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Semester</p>
                  <p className="font-medium">{subject.semester}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Credits</p>
                  <p className="font-medium">{subject.credits}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrolled</p>
                  <p className="font-medium">{subject.studentsEnrolled}/{subject.maxCapacity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Capacity</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(subject.studentsEnrolled / subject.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-2">Schedule:</p>
                <div className="space-y-2">
                  {subject.schedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{schedule.day}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{schedule.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{schedule.room}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {subject.status === 'active' && (
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline">
                    Mark Attendance
                  </Button>
                  <Button size="sm" variant="outline">
                    Enter Marks
                  </Button>
                  <Button size="sm" variant="outline">
                    Upload Materials
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectAllocation;
