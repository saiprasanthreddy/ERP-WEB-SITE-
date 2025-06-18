
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Users, Search, Plus, Edit, Trash2, Download, Upload, Filter } from 'lucide-react';

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  semester: number;
  batch: string;
  cgpa: number;
  status: 'active' | 'inactive' | 'graduated' | 'dropped';
  admissionDate: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
}

const StudentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const students: Student[] = [
    {
      id: '1',
      rollNumber: 'CS21001',
      name: 'John Smith',
      email: 'john.smith@vemana.edu',
      phone: '+1-555-0101',
      department: 'Computer Science',
      semester: 6,
      batch: '2021-2025',
      cgpa: 8.75,
      status: 'active',
      admissionDate: '2021-08-15',
      feeStatus: 'paid'
    },
    {
      id: '2',
      rollNumber: 'CS21002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@vemana.edu',
      phone: '+1-555-0102',
      department: 'Computer Science',
      semester: 6,
      batch: '2021-2025',
      cgpa: 9.25,
      status: 'active',
      admissionDate: '2021-08-15',
      feeStatus: 'pending'
    },
    {
      id: '3',
      rollNumber: 'EC21001',
      name: 'Mike Wilson',
      email: 'mike.wilson@vemana.edu',
      phone: '+1-555-0103',
      department: 'Electronics',
      semester: 6,
      batch: '2021-2025',
      cgpa: 7.85,
      status: 'active',
      admissionDate: '2021-08-15',
      feeStatus: 'overdue'
    },
    {
      id: '4',
      rollNumber: 'ME21001',
      name: 'Emily Davis',
      email: 'emily.davis@vemana.edu',
      phone: '+1-555-0104',
      department: 'Mechanical',
      semester: 8,
      batch: '2020-2024',
      cgpa: 8.95,
      status: 'graduated',
      admissionDate: '2020-08-15',
      feeStatus: 'paid'
    }
  ];

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil'];
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || student.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'graduated': return 'outline';
      case 'dropped': return 'destructive';
      default: return 'secondary';
    }
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const graduatedStudents = students.filter(s => s.status === 'graduated').length;
  const averageCGPA = (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Manage student records and information</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
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
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Active Students</p>
                <p className="text-xl font-bold">{activeStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Graduated</p>
                <p className="text-xl font-bold">{graduatedStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Average CGPA</p>
                <p className="text-xl font-bold">{averageCGPA}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student Records</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
                <option value="dropped">Dropped</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Roll Number</th>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Department</th>
                  <th className="text-left p-3 font-medium">Semester</th>
                  <th className="text-left p-3 font-medium">CGPA</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Fee Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-bold">{student.rollNumber}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </td>
                    <td className="p-3">{student.department}</td>
                    <td className="p-3">{student.semester}</td>
                    <td className="p-3">
                      <span className={`font-bold ${student.cgpa >= 8 ? 'text-green-600' : student.cgpa >= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {student.cgpa}
                      </span>
                    </td>
                    <td className="p-3">
                      <Badge variant={getStatusColor(student.status)} className="capitalize">
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className={`font-medium capitalize ${getFeeStatusColor(student.feeStatus)}`}>
                        {student.feeStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default StudentManagement;
