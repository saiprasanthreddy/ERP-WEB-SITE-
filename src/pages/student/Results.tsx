
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { TrendingUp, Award, FileText, Download, Filter, BarChart3 } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface ResultRecord {
  id: string;
  courseCode: string;
  courseName: string;
  examType: 'midterm' | 'final' | 'quiz' | 'assignment';
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  gpa: number;
  date: string;
  semester: string;
  status: 'published' | 'pending' | 'under_review';
}

interface SemesterSummary {
  semester: string;
  totalCredits: number;
  earnedCredits: number;
  sgpa: number;
  status: 'completed' | 'ongoing';
}

const Results: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>('current');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const results: ResultRecord[] = [
    {
      id: '1',
      courseCode: 'CS601',
      courseName: 'Advanced Database Systems',
      examType: 'final',
      marksObtained: 85,
      totalMarks: 100,
      percentage: 85,
      grade: 'A',
      gpa: 8.5,
      date: '2024-06-15',
      semester: 'Semester 6',
      status: 'published'
    },
    {
      id: '2',
      courseCode: 'CS602',
      courseName: 'Machine Learning',
      examType: 'midterm',
      marksObtained: 92,
      totalMarks: 100,
      percentage: 92,
      grade: 'A+',
      gpa: 9.2,
      date: '2024-06-10',
      semester: 'Semester 6',
      status: 'published'
    },
    {
      id: '3',
      courseCode: 'CS603',
      courseName: 'Software Engineering Lab',
      examType: 'assignment',
      marksObtained: 78,
      totalMarks: 100,
      percentage: 78,
      grade: 'B+',
      gpa: 7.8,
      date: '2024-06-05',
      semester: 'Semester 6',
      status: 'published'
    },
    {
      id: '4',
      courseCode: 'CS604',
      courseName: 'Computer Networks',
      examType: 'quiz',
      marksObtained: 0,
      totalMarks: 25,
      percentage: 0,
      grade: 'Pending',
      gpa: 0,
      date: '2024-06-20',
      semester: 'Semester 6',
      status: 'pending'
    },
    {
      id: '5',
      courseCode: 'CS605',
      courseName: 'Artificial Intelligence',
      examType: 'final',
      marksObtained: 88,
      totalMarks: 100,
      percentage: 88,
      grade: 'A',
      gpa: 8.8,
      date: '2024-05-25',
      semester: 'Semester 5',
      status: 'published'
    }
  ];

  const semesterSummary: SemesterSummary[] = [
    {
      semester: 'Semester 6',
      totalCredits: 24,
      earnedCredits: 18,
      sgpa: 8.5,
      status: 'ongoing'
    },
    {
      semester: 'Semester 5',
      totalCredits: 24,
      earnedCredits: 24,
      sgpa: 8.2,
      status: 'completed'
    },
    {
      semester: 'Semester 4',
      totalCredits: 24,
      earnedCredits: 24,
      sgpa: 7.8,
      status: 'completed'
    }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800 border-green-200';
      case 'A': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B+': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'B': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'pending': return 'secondary';
      case 'under_review': return 'outline';
      default: return 'secondary';
    }
  };

  const filteredResults = results.filter(result => {
    if (selectedFilter === 'all') return true;
    return result.status === selectedFilter;
  });

  const currentSemesterResults = results.filter(r => r.semester === 'Semester 6' && r.status === 'published');
  const currentSGPA = currentSemesterResults.length > 0 
    ? currentSemesterResults.reduce((sum, r) => sum + r.gpa, 0) / currentSemesterResults.length 
    : 0;

  const overallCGPA = semesterSummary.reduce((sum, s) => sum + s.sgpa, 0) / semesterSummary.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Results</h1>
          <p className="text-gray-600">Track your academic performance and progress</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Transcript
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Current SGPA</p>
                <p className="text-2xl font-bold text-blue-800">{currentSGPA.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Overall CGPA</p>
                <p className="text-2xl font-bold text-green-800">{overallCGPA.toFixed(2)}</p>
              </div>
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Credits Earned</p>
                <p className="text-2xl font-bold text-purple-800">114/120</p>
              </div>
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Class Rank</p>
                <p className="text-2xl font-bold text-orange-800">12/120</p>
              </div>
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Semester Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Semester-wise Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {semesterSummary.map((semester, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold">S{semester.semester.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{semester.semester}</h3>
                    <p className="text-sm text-gray-600">
                      {semester.earnedCredits}/{semester.totalCredits} credits
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{semester.sgpa.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">SGPA</p>
                </div>
                <Badge variant={semester.status === 'completed' ? 'default' : 'secondary'}>
                  {semester.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <span>Filter Results</span>
            </CardTitle>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="current">Current Semester</option>
              <option value="all">All Semesters</option>
              <option value="semester-5">Semester 5</option>
              <option value="semester-4">Semester 4</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            {['all', 'published', 'pending', 'under_review'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="capitalize"
              >
                {filter.replace('_', ' ')}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Detailed Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Course</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Exam Type</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Marks</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Percentage</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Grade</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">GPA</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => (
                  <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-sm">{result.courseName}</p>
                        <p className="text-xs text-gray-500">{result.courseCode}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="capitalize text-xs">
                        {result.examType}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <p className="font-medium">{result.marksObtained}/{result.totalMarks}</p>
                        <Progress value={result.percentage} className="h-1 w-16" />
                      </div>
                    </td>
                    <td className="p-3 font-medium">{result.percentage}%</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="p-3 font-medium">{result.gpa.toFixed(1)}</td>
                    <td className="p-3">
                      <Badge variant={getStatusColor(result.status)} className="capitalize">
                        {result.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-gray-500">
                      {new Date(result.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
