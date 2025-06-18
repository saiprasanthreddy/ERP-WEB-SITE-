
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BookOpen,
  Edit3,
  Save,
  X
} from 'lucide-react';

const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Smith',
    email: 'john.smith@college.edu',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    dateOfBirth: '1999-05-15',
    bloodGroup: 'O+',
    emergencyContact: '+1 (555) 987-6543',
    guardianName: 'Robert Smith',
    guardianPhone: '+1 (555) 456-7890'
  });

  const academicInfo = {
    studentId: 'CS2021001',
    department: 'Computer Science',
    semester: '6th Semester',
    batch: '2021-2025',
    admissionDate: '2021-08-15',
    cgpa: '8.75',
    status: 'Active'
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className="flex items-center space-x-2"
        >
          {isEditing ? (
            <>
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {formData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{formData.name}</CardTitle>
            <Badge variant="secondary" className="w-fit mx-auto">
              {academicInfo.studentId}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">{academicInfo.department}</p>
                  <p className="text-xs text-gray-500">{academicInfo.semester}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Batch {academicInfo.batch}</p>
                  <p className="text-xs text-gray-500">CGPA: {academicInfo.cgpa}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            {isEditing && (
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{formData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{formData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{formData.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  {isEditing ? (
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(formData.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{formData.address}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  {isEditing ? (
                    <Input
                      id="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                    />
                  ) : (
                    <span className="block mt-1">{formData.bloodGroup}</span>
                  )}
                </div>

                <div>
                  <Label htmlFor="guardianName">Guardian Name</Label>
                  {isEditing ? (
                    <Input
                      id="guardianName"
                      value={formData.guardianName}
                      onChange={(e) => handleInputChange('guardianName', e.target.value)}
                    />
                  ) : (
                    <span className="block mt-1">{formData.guardianName}</span>
                  )}
                </div>

                <div>
                  <Label htmlFor="guardianPhone">Guardian Phone</Label>
                  {isEditing ? (
                    <Input
                      id="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                    />
                  ) : (
                    <span className="block mt-1">{formData.guardianPhone}</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-500">Student ID</Label>
              <p className="font-medium">{academicInfo.studentId}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Department</Label>
              <p className="font-medium">{academicInfo.department}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Current Semester</Label>
              <p className="font-medium">{academicInfo.semester}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Batch</Label>
              <p className="font-medium">{academicInfo.batch}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Admission Date</Label>
              <p className="font-medium">{new Date(academicInfo.admissionDate).toLocaleDateString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">CGPA</Label>
              <p className="font-medium text-green-600">{academicInfo.cgpa}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Status</Label>
              <Badge variant="default">{academicInfo.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
