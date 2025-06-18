
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import StatCard from '../../components/common/StatCard';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  ClipboardList,
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';

const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();

  const classData = [
    { subject: 'Data Structures', students: 45, attendance: 88, avgMarks: 82 },
    { subject: 'Algorithms', students: 52, attendance: 92, avgMarks: 78 },
    { subject: 'Database Systems', students: 38, attendance: 85, avgMarks: 85 },
  ];

  const pendingTasks = [
    { task: 'Grade Midterm Exams - Data Structures', dueDate: '2024-06-20', priority: 'high' },
    { task: 'Submit Attendance Report', dueDate: '2024-06-22', priority: 'medium' },
    { task: 'Prepare Quiz - Algorithms', dueDate: '2024-06-25', priority: 'low' },
  ];

  const upcomingClasses = [
    { subject: 'Data Structures', time: '10:00 AM', room: 'CS-101', students: 45 },
    { subject: 'Algorithms', time: '2:00 PM', room: 'CS-102', students: 52 },
    { subject: 'Database Systems', time: '4:00 PM', room: 'CS-103', students: 38 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Good day, {user?.name?.split(' ')[1]} 📚
        </h1>
        <p className="text-green-100">
          Your teaching schedule and student progress overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value="135"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Subjects Teaching"
          value="3"
          icon={BookOpen}
        />
        <StatCard
          title="Avg Attendance"
          value="88%"
          icon={Calendar}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Pending Evaluations"
          value="12"
          icon={ClipboardList}
          trend={{ value: 20, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance */}
        <Card className="bg-white/80 backdrop-blur-lg border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Class Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {classData.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50/50 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{item.subject}</h4>
                  <Badge variant="outline">{item.students} students</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance</span>
                    <span>{item.attendance}%</span>
                  </div>
                  <Progress value={item.attendance} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Marks</span>
                    <span>{item.avgMarks}%</span>
                  </div>
                  <Progress value={item.avgMarks} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Classes */}
        <Card className="bg-white/80 backdrop-blur-lg border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span>Today's Classes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((class_item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">{class_item.subject}</p>
                      <p className="text-xs text-gray-500">{class_item.room} • {class_item.students} students</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-blue-600">{class_item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks */}
      <Card className="bg-white/80 backdrop-blur-lg border-gray-200/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <span>Pending Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' : 
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-sm">{task.task}</p>
                    <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                  </div>
                </div>
                <Badge 
                  variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
