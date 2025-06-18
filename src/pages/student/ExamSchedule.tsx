
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Calendar, Clock, MapPin, BookOpen, AlertCircle, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface ExamDetails {
  id: string;
  courseCode: string;
  courseName: string;
  examType: 'midterm' | 'final' | 'quiz' | 'assignment';
  date: string;
  time: string;
  duration: string;
  venue: string;
  instructor: string;
  syllabus: string[];
  totalMarks: number;
  status: 'upcoming' | 'today' | 'completed';
}

const ExamSchedule: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('current');

  const examSchedule: ExamDetails[] = [
    {
      id: '1',
      courseCode: 'CS601',
      courseName: 'Advanced Database Systems',
      examType: 'final',
      date: '2024-06-25',
      time: '09:00 AM',
      duration: '3 hours',
      venue: 'Main Block - Room 101',
      instructor: 'Dr. Sarah Johnson',
      syllabus: ['Database Design', 'Query Optimization', 'Transaction Management', 'NoSQL Databases'],
      totalMarks: 100,
      status: 'upcoming'
    },
    {
      id: '2',
      courseCode: 'CS602',
      courseName: 'Machine Learning',
      examType: 'midterm',
      date: '2024-06-22',
      time: '02:00 PM',
      duration: '2 hours',
      venue: 'CS Block - Lab 201',
      instructor: 'Prof. Michael Chen',
      syllabus: ['Supervised Learning', 'Neural Networks', 'Feature Engineering'],
      totalMarks: 50,
      status: 'today'
    },
    {
      id: '3',
      courseCode: 'CS603',
      courseName: 'Software Engineering Lab',
      examType: 'assignment',
      date: '2024-06-30',
      time: '11:00 AM',
      duration: '4 hours',
      venue: 'CS Block - Lab 301',
      instructor: 'Dr. Emily Rodriguez',
      syllabus: ['Project Development', 'Testing', 'Documentation'],
      totalMarks: 100,
      status: 'upcoming'
    },
    {
      id: '4',
      courseCode: 'CS604',
      courseName: 'Computer Networks',
      examType: 'quiz',
      date: '2024-06-20',
      time: '10:00 AM',
      duration: '1 hour',
      venue: 'Main Block - Room 205',
      instructor: 'Dr. James Wilson',
      syllabus: ['TCP/IP', 'Network Security'],
      totalMarks: 25,
      status: 'completed'
    },
    {
      id: '5',
      courseCode: 'CS605',
      courseName: 'Artificial Intelligence',
      examType: 'final',
      date: '2024-07-02',
      time: '01:00 PM',
      duration: '3 hours',
      venue: 'Main Block - Room 102',
      instructor: 'Dr. Lisa Anderson',
      syllabus: ['Search Algorithms', 'Knowledge Representation', 'Expert Systems', 'AI Ethics'],
      totalMarks: 100,
      status: 'upcoming'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'today': return 'bg-red-50 border-red-200 text-red-700';
      case 'upcoming': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'completed': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'final': return 'destructive';
      case 'midterm': return 'default';
      case 'quiz': return 'secondary';
      case 'assignment': return 'outline';
      default: return 'secondary';
    }
  };

  const filteredExams = examSchedule.filter(exam => {
    if (selectedFilter === 'all') return true;
    return exam.status === selectedFilter;
  });

  const upcomingExams = examSchedule.filter(exam => exam.status === 'upcoming' || exam.status === 'today').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Schedule</h1>
          <p className="text-gray-600">View your upcoming exams and prepare accordingly</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="current">Current Semester</option>
            <option value="previous">Previous Semester</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-500">Upcoming Exams</p>
                <p className="text-xl font-bold">{upcomingExams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">This Week</p>
                <p className="text-xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Total Hours</p>
                <p className="text-xl font-bold">13h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <span>Filter Exams</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            {['all', 'upcoming', 'today', 'completed'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="capitalize"
              >
                {filter}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <Card key={exam.id} className={`border-2 ${getStatusColor(exam.status)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{exam.courseName}</CardTitle>
                  <p className="text-sm text-gray-600">{exam.courseCode}</p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={getExamTypeColor(exam.examType)} className="capitalize">
                    {exam.examType}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {exam.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Exam Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{new Date(exam.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{exam.time} ({exam.duration})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{exam.venue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{exam.totalMarks} marks</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="text-sm">
                <span className="font-medium text-gray-700">Instructor: </span>
                <span className="text-gray-600">{exam.instructor}</span>
              </div>

              {/* Syllabus */}
              <div>
                <p className="font-medium text-gray-700 mb-2">Syllabus Coverage:</p>
                <div className="flex flex-wrap gap-1">
                  {exam.syllabus.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {exam.status !== 'completed' && (
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline">
                    View Syllabus
                  </Button>
                  <Button size="sm" variant="outline">
                    Set Reminder
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

export default ExamSchedule;
