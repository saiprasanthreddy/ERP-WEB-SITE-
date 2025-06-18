
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { 
  BookOpen, 
  Clock, 
  User as UserIcon, 
  MapPin,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  schedule: string;
  room: string;
  capacity: number;
  enrolled: number;
  prerequisites: string[];
  type: 'core' | 'elective' | 'lab';
  semester: number;
  isRegistered: boolean;
}

const CourseRegistration: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const availableCourses: Course[] = [
    {
      id: '1',
      code: 'CS601',
      name: 'Advanced Database Systems',
      credits: 4,
      instructor: 'Dr. Sarah Johnson',
      schedule: 'Mon, Wed, Fri 9:00-10:00 AM',
      room: 'CS-201',
      capacity: 40,
      enrolled: 32,
      prerequisites: ['CS301', 'CS302'],
      type: 'core',
      semester: 6,
      isRegistered: false
    },
    {
      id: '2',
      code: 'CS602',
      name: 'Machine Learning',
      credits: 3,
      instructor: 'Prof. Michael Chen',
      schedule: 'Tue, Thu 2:00-3:30 PM',
      room: 'CS-103',
      capacity: 35,
      enrolled: 28,
      prerequisites: ['CS401', 'MATH301'],
      type: 'elective',
      semester: 6,
      isRegistered: true
    },
    {
      id: '3',
      code: 'CS603',
      name: 'Software Engineering Lab',
      credits: 2,
      instructor: 'Dr. Emily Rodriguez',
      schedule: 'Wed 3:00-6:00 PM',
      room: 'Lab-A',
      capacity: 25,
      enrolled: 20,
      prerequisites: ['CS501'],
      type: 'lab',
      semester: 6,
      isRegistered: false
    },
    {
      id: '4',
      code: 'CS604',
      name: 'Computer Networks',
      credits: 4,
      instructor: 'Dr. James Wilson',
      schedule: 'Mon, Wed, Fri 11:00-12:00 PM',
      room: 'CS-205',
      capacity: 45,
      enrolled: 38,
      prerequisites: ['CS401'],
      type: 'core',
      semester: 6,
      isRegistered: false
    },
    {
      id: '5',
      code: 'CS605',
      name: 'Artificial Intelligence',
      credits: 3,
      instructor: 'Dr. Lisa Anderson',
      schedule: 'Tue, Thu 10:00-11:30 AM',
      room: 'CS-301',
      capacity: 30,
      enrolled: 25,
      prerequisites: ['CS401', 'CS402'],
      type: 'elective',
      semester: 6,
      isRegistered: false
    }
  ];

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || course.type === selectedType;
    return matchesSearch && matchesType;
  });

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleRegister = () => {
    // Registration logic here
    console.log('Registering for courses:', selectedCourses);
  };

  const getTotalCredits = () => {
    return selectedCourses.reduce((total, courseId) => {
      const course = availableCourses.find(c => c.id === courseId);
      return total + (course?.credits || 0);
    }, 0);
  };

  const getRegisteredCredits = () => {
    return availableCourses
      .filter(course => course.isRegistered)
      .reduce((total, course) => total + course.credits, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Registration</h1>
          <p className="text-gray-600">Register for Semester 6 - Academic Year 2023-24</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Registration Deadline</p>
          <p className="font-semibold text-red-600">July 15, 2024</p>
        </div>
      </div>

      {/* Registration Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Registered Courses</p>
                <p className="text-xl font-bold">{availableCourses.filter(c => c.isRegistered).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Credits Registered</p>
                <p className="text-xl font-bold">{getRegisteredCredits()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Selected Credits</p>
                <p className="text-xl font-bold">{getTotalCredits()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Min Credits Required</p>
                <p className="text-xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Courses</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by course name, code, or instructor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter">Course Type</Label>
              <select
                id="filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="core">Core</option>
                <option value="elective">Elective</option>
                <option value="lab">Lab</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className={`transition-all ${course.isRegistered ? 'bg-green-50 border-green-200' : selectedCourses.includes(course.id) ? 'bg-blue-50 border-blue-200' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      {!course.isRegistered && (
                        <Checkbox
                          checked={selectedCourses.includes(course.id)}
                          onCheckedChange={() => toggleCourseSelection(course.id)}
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.code}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant={course.type === 'core' ? 'default' : course.type === 'elective' ? 'secondary' : 'outline'}>
                        {course.type.toUpperCase()}
                      </Badge>
                      {course.isRegistered && (
                        <Badge variant="default" className="bg-green-600">
                          Registered
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4 text-gray-500" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{course.room}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span>{course.credits} Credits</span>
                    </div>
                  </div>

                  {course.prerequisites.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">
                        <strong>Prerequisites:</strong> {course.prerequisites.join(', ')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="font-semibold">
                    {course.enrolled}/{course.capacity}
                  </p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registration Actions */}
      {selectedCourses.length > 0 && (
        <Card className="sticky bottom-6 bg-white border-2 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {selectedCourses.length} course(s) selected • {getTotalCredits()} credits
                </p>
                <p className="text-sm text-gray-600">
                  {getTotalCredits() < 18 ? `Need ${18 - getTotalCredits()} more credits` : 'Minimum requirement met'}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setSelectedCourses([])}>
                  Clear Selection
                </Button>
                <Button onClick={handleRegister} disabled={getTotalCredits() < 18}>
                  Register for Selected Courses
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseRegistration;
