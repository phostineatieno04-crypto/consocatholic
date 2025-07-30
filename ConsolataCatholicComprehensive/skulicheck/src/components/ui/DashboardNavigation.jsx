import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const DashboardNavigation = ({ userRole = 'Admin' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Role-based navigation items
  const getNavigationItems = (role) => {
    const baseItems = [
      { 
        label: 'Dashboard', 
        path: `/${role.toLowerCase()}-dashboard`, 
        icon: 'LayoutDashboard',
        description: 'Overview and analytics'
      },
      { 
        label: 'School Events', 
        path: '/school-events-memories', 
        icon: 'Calendar',
        description: 'Events and memories'
      }
    ];

    const roleSpecificItems = {
      Admin: [
        { label: 'User Management', path: '/admin/users', icon: 'Users', description: 'Manage users and roles' },
        { label: 'Academic Management', path: '/admin/academics', icon: 'BookOpen', description: 'Courses and curriculum' },
        { label: 'Financial Reports', path: '/admin/finance', icon: 'DollarSign', description: 'Financial overview' },
        { label: 'System Settings', path: '/admin/settings', icon: 'Settings', description: 'System configuration' }
      ],
      Teacher: [
        { label: 'My Classes', path: '/teacher/classes', icon: 'Users', description: 'Class management' },
        { label: 'Attendance', path: '/teacher/attendance', icon: 'CheckSquare', description: 'Mark attendance' },
        { label: 'Gradebook', path: '/teacher/grades', icon: 'BookOpen', description: 'Student grades' },
        { label: 'Assignments', path: '/teacher/assignments', icon: 'FileText', description: 'Create assignments' }
      ],
      Parent: [
        { label: 'My Children', path: '/parent/children', icon: 'Heart', description: 'Children overview' },
        { label: 'Academic Progress', path: '/parent/progress', icon: 'TrendingUp', description: 'Academic performance' },
        { label: 'Attendance', path: '/parent/attendance', icon: 'Calendar', description: 'Attendance records' },
        { label: 'Communications', path: '/parent/messages', icon: 'MessageSquare', description: 'School messages' }
      ],
      Student: [
        { label: 'My Courses', path: '/student/courses', icon: 'BookOpen', description: 'Course materials' },
        { label: 'Assignments', path: '/student/assignments', icon: 'FileText', description: 'View assignments' },
        { label: 'Grades', path: '/student/grades', icon: 'Award', description: 'Academic results' },
        { label: 'Schedule', path: '/student/schedule', icon: 'Clock', description: 'Class schedule' }
      ]
    };

    return [...baseItems, ...(roleSpecificItems[role] || [])];
  };

  const navigationItems = getNavigationItems(userRole);

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Mobile bottom navigation for Parent/Student roles
  const isMobileRole = ['Parent', 'Student'].includes(userRole);

  if (isMobileRole) {
    return (
      <>
        {/* Desktop Sidebar for Parent/Student */}
        <aside className={`hidden lg:block fixed left-0 top-16 bottom-0 z-40 bg-surface border-r border-border transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}>
          <div className="flex flex-col h-full">
            {/* Collapse Toggle */}
            <div className="p-4 border-b border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full"
              >
                <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? "default" : "ghost"}
                  onClick={() => handleNavigation(item.path)}
                  iconName={item.icon}
                  iconPosition="left"
                  iconSize={18}
                  className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'} py-3`}
                  title={isCollapsed ? item.label : undefined}
                >
                  {!isCollapsed && (
                    <div className="flex flex-col items-start ml-2">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  )}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border">
          <div className="flex items-center justify-around py-2">
            {navigationItems.slice(0, 4).map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 min-w-0 ${
                  isActivePath(item.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={isActivePath(item.path) ? 'var(--color-primary)' : 'currentColor'} 
                />
                <span className="text-xs truncate max-w-16">{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>
      </>
    );
  }

  // Desktop sidebar for Admin/Teacher roles
  return (
    <aside className={`hidden lg:block fixed left-0 top-16 bottom-0 z-40 bg-surface border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
          </Button>
        </div>

        {/* Role Badge */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name={userRole === 'Admin' ? 'Shield' : 'GraduationCap'} size={20} color="white" />
              </div>
              <div>
                <p className="font-medium text-foreground">{userRole} Portal</p>
                <p className="text-xs text-muted-foreground">SkuliCheck System</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={isActivePath(item.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item.path)}
              iconName={item.icon}
              iconPosition="left"
              iconSize={18}
              className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'} py-3`}
              title={isCollapsed ? item.label : undefined}
            >
              {!isCollapsed && (
                <div className="flex flex-col items-start ml-2">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              )}
            </Button>
          ))}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                className="w-full justify-start"
                onClick={() => console.log('Quick action')}
              >
                Quick Action
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="HelpCircle"
                iconPosition="left"
                iconSize={16}
                className="w-full justify-start text-muted-foreground"
                onClick={() => console.log('Help')}
              >
                Need Help?
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardNavigation;