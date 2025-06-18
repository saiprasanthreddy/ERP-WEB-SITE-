
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { BookOpen, Users, Save, Search, Filter } from 'lucide-react';

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  marks: {
    internal1?: number;
    internal2?: number;
    assignment?: number;
    project?: number;
    final?: number;
    total: number;
    grade: string;
  };
}

interface Assessment {
  id: string;
  name: string;
  type: 'internal' | 'assignment' | 'project' | 'final';
  maxMarks: number;
  date: string;
  status: 'upcoming' | 'active' | 'completed';
}

const MarkEntry: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('CS601');
  const [selectedAssessment, setSelectedAssessment] = useState<string>('internal1');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      rollNumber: 'CS21001',
      name: 'John Smith',
      marks: { internal1: 35, internal2: 38, assignment: 18, total: 91, grade: 'A' }
    },
    {
      id: '2',
      rollNumber: 'CS21002',
      name: 'Sarah Johnson',
      marks: { internal1: 42, internal2: 40, assignment: 20, total: 102, grade: 'A+' }
    },
    {
      id: '3',
      rollNumber: 'CS21003',
      name: 'Mike Wilson',
      marks: { internal1: 28, internal2: 32, assignment: 15, total: 75, grade: 'B' }
    },
    {
      id: '4',
      rollNumber: 'CS21004',
      name: 'Emily Davis',
      marks: { internal1: 38, internal2: 35, assignment: 19, total: 92, grade: 'A' }
    }
  ]);

  const assessments: Assessment[] = [
    { id: 'internal1', name: 'Internal Exam 1', type: 'internal', maxMarks: 50, date: '2024-04-15', status: 'completed' },
    { id: 'internal2', name: 'Internal Exam 2', type: 'internal', maxMarks: 50, date: '2024-05-15', status: 'completed' },
    { id: 'assignment', name: 'Assignment', type: 'assignment', maxMarks: 20, date: '2024-05-30', status: 'completed' },
    { id: 'project', name: 'Project Work', type: 'project', maxMarks: 30, date: '2024-06-20', status: 'active' },
    { id: 'final', name: 'Final Exam', type: 'final', maxMarks: 100, date: '2024-07-10', status: 'upcoming' }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkChange = (studentId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const updatedMarks = { ...student.marks, [selectedAssessment]: numValue };
        const total = (updatedMarks.internal1 || 0) + (updatedMarks.internal2 || 0) + 
                     (updatedMarks.assignment || 0) + (updatedMarks.project || 0);
        const grade = total >= 90 ? 'A+' : total >= 80 ? 'A' : total >= 70 ? 'B+' : 
                     total >= 60 ? 'B' : total >= 50 ? 'C' : 'F';
        
        return { ...student, marks: { ...updatedMarks, total, grade } };
      }
      return student;
    }));
  };

  const handleSaveMarks = () => {
    console.log('Marks saved for:', selectedAssessment);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800 border-green-200';
      case 'A': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B+': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'B': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'F': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentAssessment = assessments.find(a => a.id === selectedAssessment);
  const averageMarks = students.reduce((sum, student) => {
    const mark = (student.marks as any)[selectedAssessment] || 0;
    return sum + mark;
  }, 0) / students.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mark Entry</h1>
          <p className="text-gray-600">Enter and manage student marks for assessments</p>
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
              <BookOpen className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-xl font-bold">{averageMarks.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Pass Rate</p>
                <p className="text-xl font-bold">
                  {((students.filter(s => s.marks.grade !== 'F').length / students.length) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Save className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Max Marks</p>
                <p className="text-xl font-bold">{currentAssessment?.maxMarks || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {assessments.map((assessment) => (
                <button
                  key={assessment.id}
                  onClick={() => setSelectedAssessment(assessment.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedAssessment === assessment.id
                      ? 'bg-blue-50 border-blue-200 text-blue-800'
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{assessment.name}</p>
                    <Badge variant={assessment.status === 'completed' ? 'default' : 'secondary'}>
                      {assessment.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Max: {assessment.maxMarks} | {new Date(assessment.date).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {currentAssessment?.name} - Mark Entry
              </CardTitle>
              <Button onClick={handleSaveMarks}>
                <Save className="h-4 w-4 mr-2" />
                Save All Marks
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Roll Number</th>
                      <th className="text-left p-3 font-medium">Student Name</th>
                      <th className="text-left p-3 font-medium">
                        {currentAssessment?.name} (/{currentAssessment?.maxMarks})
                      </th>
                      <th className="text-left p-3 font-medium">Total</th>
                      <th className="text-left p-3 font-medium">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{student.rollNumber}</td>
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">
                          <Input
                            type="number"
                            min="0"
                            max={currentAssessment?.maxMarks}
                            value={(student.marks as any)[selectedAssessment] || ''}
                            onChange={(e) => handleMarkChange(student.id, e.target.value)}
                            className="w-20"
                            disabled={currentAssessment?.status === 'upcoming'}
                          />
                        </td>
                        <td className="p-3 font-bold">{student.marks.total}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getGradeColor(student.marks.grade)}`}>
                            {student.marks.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarkEntry;
