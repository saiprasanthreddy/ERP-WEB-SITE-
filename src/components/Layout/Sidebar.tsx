
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Calendar,
  Book,
  FileText,
  CreditCard,
  Bell,
  BarChart3,
  Users,
  Settings,
  BookOpen,
  ClipboardList,
  Upload
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const navigationItems: NavItem[] = [
  // Student Navigation
  { title: 'Dashboard', href: '/student/dashboard', icon: BarChart3, roles: ['student'] },
  { title: 'Profile', href: '/student/profile', icon: User, roles: ['student'] },
  { title: 'Courses', href: '/student/courses', icon: Book, roles: ['student'] },
  { title: 'Attendance', href: '/student/attendance', icon: Calendar, roles: ['student'] },
  { title: 'Exams', href: '/student/exams', icon: FileText, roles: ['student'] },
  { title: 'Results', href: '/student/results', icon: ClipboardList, roles: ['student'] },
  { title: 'Fees', href: '/student/fees', icon: CreditCard, roles: ['student'] },
  { title: 'Notices', href: '/student/notices', icon: Bell, roles: ['student'] },

  // Faculty Navigation
  { title: 'Dashboard', href: '/faculty/dashboard', icon: BarChart3, roles: ['faculty'] },
  { title: 'Profile', href: '/faculty/profile', icon: User, roles: ['faculty'] },
  { title: 'Subjects', href: '/faculty/subjects', icon: BookOpen, roles: ['faculty'] },
  { title: 'Attendance', href: '/faculty/attendance', icon: Calendar, roles: ['faculty'] },
  { title: 'Mark Entry', href: '/faculty/marks', icon: ClipboardList, roles: ['faculty'] },
  { title: 'Materials', href: '/faculty/materials', icon: Upload, roles: ['faculty'] },

  // Admin Navigation
  { title: 'Dashboard', href: '/admin/dashboard', icon: BarChart3, roles: ['admin'] },
  { title: 'Students', href: '/admin/students', icon: Users, roles: ['admin'] },
  { title: 'Faculty', href: '/admin/faculty', icon: Users, roles: ['admin'] },
  { title: 'Courses', href: '/admin/courses', icon: Book, roles: ['admin'] },
  { title: 'Exams', href: '/admin/exams', icon: FileText, roles: ['admin'] },
  { title: 'Fees', href: '/admin/fees', icon: CreditCard, roles: ['admin'] },
  { title: 'Notices', href: '/admin/notices', icon: Bell, roles: ['admin'] },
  { title: 'Settings', href: '/admin/settings', icon: Settings, roles: ['admin'] },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const userNavItems = navigationItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200/50 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="p-6">
        <div className="space-y-1">
          {userNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 border border-blue-200/50'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    className={cn(
                      'h-5 w-5 transition-colors',
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    )} 
                  />
                  <span>{item.title}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
