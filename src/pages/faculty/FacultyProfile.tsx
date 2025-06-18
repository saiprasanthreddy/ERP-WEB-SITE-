
import React, { useState } from 'react';
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
  X,
  Award,
  GraduationCap
} from 'lucide-react';

const FacultyProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@vemana.edu',
    phone: '+1 (555) 123-4567',
    address: '123 Faculty Lane, City, State 12345',
    dateOfBirth: '1985-03-20',
    emergencyContact: '+1 (555) 987-6543',
    qualification: 'Ph.D. in Computer Science',
    experience: '12 years',
    specialization: 'Database Systems, Machine Learning'
  });

  const academicInfo = {
    facultyId: 'FAC2019001',
    department: 'Computer Science',
    designation: 'Associate Professor',
    joiningDate: '2019-08-15',
    subjects: ['Advanced Database Systems', 'Data Structures', 'Database Management'],
    currentLoad: '18 hours/week',
    officeHours: 'Mon-Fri: 2:00 PM - 4:00 PM'
  };

  const achievements = [
    { title: 'Best Faculty Award 2023', year: '2023' },
    { title: 'Research Excellence Award', year: '2022' },
    { title: 'Outstanding Teaching Award', year: '2021' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Faculty Profile</h1>
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
              {academicInfo.facultyId}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">{academicInfo.department}</p>
                  <p className="text-xs text-gray-500">{academicInfo.designation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">{academicInfo.currentLoad}</p>
                  <p className="text-xs text-gray-500">Teaching Load</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <Label htmlFor="qualification">Qualification</Label>
                  {isEditing ? (
                    <Input
                      id="qualification"
                      value={formData.qualification}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <Award className="h-4 w-4 text-gray-500" />
                      <span>{formData.qualification}</span>
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
                  <Label htmlFor="experience">Experience</Label>
                  {isEditing ? (
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                  ) : (
                    <span className="block mt-1">{formData.experience}</span>
                  )}
                </div>

                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  {isEditing ? (
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                    />
                  ) : (
                    <span className="block mt-1">{formData.specialization}</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Faculty ID</Label>
                  <p className="font-medium">{academicInfo.facultyId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Department</Label>
                  <p className="font-medium">{academicInfo.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Designation</Label>
                  <p className="font-medium">{academicInfo.designation}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Joining Date</Label>
                  <p className="font-medium">{new Date(academicInfo.joiningDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Office Hours</Label>
                <p className="font-medium">{academicInfo.officeHours}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500 mb-2 block">Subjects Teaching</Label>
                <div className="flex flex-wrap gap-2">
                  {academicInfo.subjects.map((subject, index) => (
                    <Badge key={index} variant="outline">{subject}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements & Awards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">{achievement.title}</span>
                  </div>
                  <Badge variant="secondary">{achievement.year}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyProfile;
