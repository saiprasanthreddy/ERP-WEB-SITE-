
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import StatCard from '../../components/common/StatCard';
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  BookOpen,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const enrollmentData = [
    { month: 'Jan', students: 450 },
    { month: 'Feb', students: 465 },
    { month: 'Mar', students: 480 },
    { month: 'Apr', students: 492 },
    { month: 'May', students: 505 },
    { month: 'Jun', students: 518 },
  ];

  const departmentData = [
    { department: 'Computer Science', students: 180, faculty: 25, completion: 92 },
    { department: 'Electrical Eng.', students: 165, faculty: 22, completion: 88 },
    { department: 'Mechanical Eng.', students: 140, faculty: 20, completion: 90 },
    { department: 'Mathematics', students: 95, faculty: 15, completion: 95 },
  ];

  const recentActivities = [
    { activity: 'New student registration completed', time: '2 hours ago', type: 'success' },
    { activity: 'Fee payment reminder sent', time: '4 hours ago', type: 'info' },
    { activity: 'Exam schedule published', time: '6 hours ago', type: 'success' },
    { activity: 'System maintenance scheduled', time: '1 day ago', type: 'warning' },
  ];

  const feeCollectionData = [
    { month: 'Jan', collected: 85000, pending: 15000 },
    { month: 'Feb', collected: 92000, pending: 12000 },
    { month: 'Mar', collected: 88000, pending: 18000 },
    { month: 'Apr', collected: 95000, pending: 10000 },
    { month: 'May', collected: 90000, pending: 14000 },
    { month: 'Jun', collected: 98000, pending: 8000 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Admin Dashboard 🎯
        </h1>
        <p className="text-purple-100">
          Complete overview of your institution's performance and metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value="1,248"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Faculty Members"
          value="94"
          icon={GraduationCap}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Monthly Revenue"
          value="$125,000"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Active Courses"
          value="45"
          icon={BookOpen}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Enrollment Trend */}
        <Card className="bg-white/80 backdrop-blur-lg border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Student Enrollment Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Collection */}
        <Card className="bg-white/80 backdrop-blur-lg border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Fee Collection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={feeCollectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="collected" fill="#10b981" />
                <Bar dataKey="pending" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Overview */}
        <Card className="bg-white/80 backdrop-blur-lg border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-purple-600" />
              <span>Department Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="p-4 bg-gray-50/50 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{dept.department}</h4>
                  <Badge variant="outline">{dept.completion}% complete</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Students: </span>
                    <span className="font-medium">{dept.students}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Faculty: </span>
                    <span className="font-medium">{dept.faculty}</span>
                  </div>
                </div>
                <Progress value={dept.completion} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-white/80 backdrop-blur-lg border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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

export default AdminDashboard;
