
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Users, Search, Plus, Edit, Trash2, Download, Upload, Phone, Mail } from 'lucide-react';

interface Faculty {
  id: string;
  facultyId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  qualification: string;
  experience: string;
  subjectsCount: number;
  studentsCount: number;
  status: 'active' | 'inactive' | 'on-leave';
  joiningDate: string;
  salary: number;
}

const FacultyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const faculty: Faculty[] = [
    {
      id: '1',
      facultyId: 'FAC2019001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@vemana.edu',
      phone: '+1-555-0201',
      department: 'Computer Science',
      designation: 'Associate Professor',
      qualification: 'Ph.D. in Computer Science',
      experience: '12 years',
      subjectsCount: 3,
      studentsCount: 150,
      status: 'active',
      joiningDate: '2019-08-15',
      salary: 85000
    },
    {
      id: '2',
      facultyId: 'FAC2020002',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@vemana.edu',
      phone: '+1-555-0202',
      department: 'Computer Science',
      designation: 'Professor',
      qualification: 'Ph.D. in Machine Learning',
      experience: '15 years',
      subjectsCount: 2,
      studentsCount: 100,
      status: 'active',
      joiningDate: '2020-01-10',
      salary: 95000
    },
    {
      id: '3',
      facultyId: 'FAC2021003',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@vemana.edu',
      phone: '+1-555-0203',
      department: 'Electronics',
      designation: 'Assistant Professor',
      qualification: 'Ph.D. in Electronics',
      experience: '8 years',
      subjectsCount: 4,
      studentsCount: 120,
      status: 'on-leave',
      joiningDate: '2021-07-01',
      salary: 65000
    },
    {
      id: '4',
      facultyId: 'FAC2018004',
      name: 'Dr. James Wilson',
      email: 'james.wilson@vemana.edu',
      phone: '+1-555-0204',
      department: 'Mechanical',
      designation: 'Professor',
      qualification: 'Ph.D. in Mechanical Engineering',
      experience: '20 years',
      subjectsCount: 3,
      studentsCount: 90,
      status: 'active',
      joiningDate: '2018-06-15',
      salary: 100000
    }
  ];

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil'];
  
  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.facultyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'on-leave': return 'outline';
      default: return 'secondary';
    }
  };

  const getDesignationColor = (designation: string) => {
    switch (designation) {
      case 'Professor': return 'text-purple-600 font-bold';
      case 'Associate Professor': return 'text-blue-600 font-medium';
      case 'Assistant Professor': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const totalFaculty = faculty.length;
  const activeFaculty = faculty.filter(f => f.status === 'active').length;
  const onLeaveFaculty = faculty.filter(f => f.status === 'on-leave').length;
  const totalStudents = faculty.reduce((sum, f) => sum + f.studentsCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Management</h1>
          <p className="text-gray-600">Manage faculty records and assignments</p>
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Total Faculty</p>
                <p className="text-xl font-bold">{totalFaculty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Active Faculty</p>
                <p className="text-xl font-bold">{activeFaculty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">On Leave</p>
                <p className="text-xl font-bold">{onLeaveFaculty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Students Taught</p>
                <p className="text-xl font-bold">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Faculty Records</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search faculty..."
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
                <option value="on-leave">On Leave</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredFaculty.map((member) => (
              <Card key={member.id} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{member.name}</h3>
                      <p className={`text-sm ${getDesignationColor(member.designation)}`}>
                        {member.designation}
                      </p>
                      <p className="text-sm text-gray-600">{member.facultyId}</p>
                    </div>
                    <Badge variant={getStatusColor(member.status)} className="capitalize">
                      {member.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{member.phone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Department</p>
                      <p className="font-medium">{member.department}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Experience</p>
                      <p className="font-medium">{member.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Subjects</p>
                      <p className="font-medium">{member.subjectsCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Students</p>
                      <p className="font-medium">{member.studentsCount}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-500 text-sm">Qualification</p>
                    <p className="font-medium text-sm">{member.qualification}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="text-gray-500">Joining Date</p>
                      <p className="font-medium">{new Date(member.joiningDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyManagement;
