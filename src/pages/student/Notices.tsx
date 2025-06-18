
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Bell, Calendar, User, Pin, Filter, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  department: string;
  date: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'academic' | 'examination' | 'fee' | 'event' | 'general';
  isRead: boolean;
  isPinned: boolean;
  attachments?: string[];
  targetAudience: string[];
}

const Notices: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const notices: Notice[] = [
    {
      id: '1',
      title: 'Semester 7 Examination Schedule Released',
      content: 'The examination schedule for Semester 7 has been released. Students are advised to check their exam dates and venues. All examinations will be conducted as per the university guidelines. Please ensure you have your admit cards ready.',
      author: 'Dr. Academic Controller',
      department: 'Academic Office',
      date: '2024-06-18',
      priority: 'high',
      category: 'examination',
      isRead: false,
      isPinned: true,
      attachments: ['exam_schedule_sem7.pdf'],
      targetAudience: ['Final Year Students', 'All Students']
    },
    {
      id: '2',
      title: 'Fee Payment Deadline Extended',
      content: 'The deadline for Semester 7 fee payment has been extended to July 25, 2024. Students who have not paid their fees are requested to complete the payment at the earliest to avoid any inconvenience.',
      author: 'Finance Office',
      department: 'Administration',
      date: '2024-06-17',
      priority: 'urgent',
      category: 'fee',
      isRead: false,
      isPinned: true,
      targetAudience: ['All Students']
    },
    {
      id: '3',
      title: 'Guest Lecture on Machine Learning Applications',
      content: 'A guest lecture on "Recent Advances in Machine Learning Applications" will be conducted by Dr. Rajesh Kumar from IIT Delhi on June 25, 2024, at 2:00 PM in the Main Auditorium. All CS students are encouraged to attend.',
      author: 'Prof. CS Department',
      department: 'Computer Science',
      date: '2024-06-16',
      priority: 'medium',
      category: 'academic',
      isRead: true,
      isPinned: false,
      targetAudience: ['CS Students']
    },
    {
      id: '4',
      title: 'Library Timings Updated',
      content: 'The library will remain open from 8:00 AM to 10:00 PM on weekdays and 9:00 AM to 6:00 PM on weekends effective from June 20, 2024. Students can access digital resources 24/7 using their student portal.',
      author: 'Library Administration',
      department: 'Library',
      date: '2024-06-15',
      priority: 'low',
      category: 'general',
      isRead: true,
      isPinned: false,
      targetAudience: ['All Students', 'Faculty']
    },
    {
      id: '5',
      title: 'Annual Sports Meet 2024',
      content: 'The Annual Sports Meet will be held from July 1-3, 2024. Registration for various events is now open. Students interested in participating can register through the student portal. Prizes will be awarded to winners in each category.',
      author: 'Sports Committee',
      department: 'Student Affairs',
      date: '2024-06-14',
      priority: 'medium',
      category: 'event',
      isRead: false,
      isPinned: false,
      targetAudience: ['All Students']
    },
    {
      id: '6',
      title: 'Internship Opportunities - Summer 2024',
      content: 'Several companies have offered internship opportunities for our students. The placement cell has compiled a list of available positions. Eligible students can apply through the placement portal before June 30, 2024.',
      author: 'Placement Cell',
      department: 'Training & Placement',
      date: '2024-06-13',
      priority: 'high',
      category: 'general',
      isRead: true,
      isPinned: false,
      targetAudience: ['Pre-final Year', 'Final Year Students']
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'examination': return 'bg-red-100 text-red-800';
      case 'fee': return 'bg-orange-100 text-orange-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || notice.priority === selectedPriority;
    const matchesSearch = searchTerm === '' || 
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesPriority && matchesSearch;
  });

  const sortedNotices = filteredNotices.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const unreadCount = notices.filter(notice => !notice.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Bell className="h-6 w-6 text-blue-600" />
            <span>Notices & Announcements</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-gray-600">Stay updated with the latest announcements from Vemana Institute</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="academic">Academic</option>
                <option value="examination">Examination</option>
                <option value="fee">Fee</option>
                <option value="event">Event</option>
                <option value="general">General</option>
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Total Notices</p>
                <p className="text-xl font-bold">{notices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Pin className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-500">Pinned</p>
                <p className="text-xl font-bold">{notices.filter(n => n.isPinned).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">This Week</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Urgent</p>
                <p className="text-xl font-bold">{notices.filter(n => n.priority === 'urgent').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {sortedNotices.map((notice) => (
          <Card key={notice.id} className={`${!notice.isRead ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''} ${notice.isPinned ? 'border-orange-200 bg-orange-50/30' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {notice.isPinned && <Pin className="h-4 w-4 text-orange-600 mt-1" />}
                  {!notice.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
                  <div className="flex-1">
                    <CardTitle className="text-lg">{notice.title}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <User className="h-3 w-3" />
                        <span>{notice.author}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(notice.date).toLocaleDateString()}</span>
                      </div>
                      <span className="text-sm text-gray-500">{notice.department}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex space-x-2">
                    <Badge variant={getPriorityColor(notice.priority)} className="capitalize">
                      {notice.priority}
                    </Badge>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(notice.category)}`}>
                      {notice.category}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{notice.content}</p>
              
              {notice.targetAudience.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Target Audience:</p>
                  <div className="flex flex-wrap gap-1">
                    {notice.targetAudience.map((audience, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {audience}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {notice.attachments && notice.attachments.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                  <div className="space-y-1">
                    {notice.attachments.map((attachment, index) => (
                      <Button key={index} variant="outline" size="sm" className="text-xs">
                        📎 {attachment}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Published on {new Date(notice.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex space-x-2">
                  {!notice.isRead && (
                    <Button size="sm" variant="outline">
                      Mark as Read
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notices;
