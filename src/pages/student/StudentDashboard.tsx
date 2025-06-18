
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import StatCard from '../../components/common/StatCard';
import { 
  Book, 
  Calendar, 
  FileText, 
  CreditCard, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const attendanceData = [
    { subject: 'Data Structures', percentage: 92, status: 'excellent' },
    { subject: 'Database Systems', percentage: 78, status: 'good' },
    { subject: 'Computer Networks', percentage: 65, status: 'warning' },
    { subject: 'Software Engineering', percentage: 88, status: 'excellent' },
  ];

  const upcomingExams = [
    { subject: 'Data Structures', date: '2024-06-25', type: 'Midterm' },
    { subject: 'Database Systems', date: '2024-06-30', type: 'Final' },
    { subject: 'Computer Networks', date: '2024-07-02', type: 'Quiz' },
  ];

  const recentResults = [
    { subject: 'Algorithm Analysis', marks: '85/100', grade: 'A', date: '2024-06-15' },
    { subject: 'Web Development', marks: '92/100', grade: 'A+', date: '2024-06-10' },
    { subject: 'Machine Learning', marks: '78/100', grade: 'B+', date: '2024-06-05' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your academics today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Enrolled Courses"
          value="6"
          icon={Book}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Overall Attendance"
          value="85%"
          icon={Calendar}
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Pending Assignments"
          value="3"
          icon={FileText}
          trend={{ value: 15, isPositive: false }}
        />
        <StatCard
          title="Fee Status"
          value="Paid"
          icon={CreditCard}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Overview */}
        <Card className="bg-white/80 backdrop-blur-lg border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Attendance Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.subject}</span>
                  <Badge 
                    variant={item.status === 'excellent' ? 'default' : item.status === 'good' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {item.percentage}%
                  </Badge>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card className="bg-white/80 backdrop-blur-lg border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span>Upcoming Exams</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      exam.type === 'Final' ? 'bg-red-500' : 
                      exam.type === 'Midterm' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-sm">{exam.subject}</p>
                      <p className="text-xs text-gray-500">{exam.type}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{exam.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Results */}
      <Card className="bg-white/80 backdrop-blur-lg border-gray-200/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Recent Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/50">
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Subject</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Marks</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Grade</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentResults.map((result, index) => (
                  <tr key={index} className="border-b border-gray-100/50">
                    <td className="p-3 text-sm">{result.subject}</td>
                    <td className="p-3 text-sm font-medium">{result.marks}</td>
                    <td className="p-3">
                      <Badge 
                        variant={result.grade.includes('A') ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {result.grade}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-gray-500">{result.date}</td>
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

export default StudentDashboard;
