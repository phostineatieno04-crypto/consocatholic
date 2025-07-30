import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import NotificationCenter from '../../components/ui/NotificationCenter';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import TodayScheduleCard from './components/TodayScheduleCard';
import AssignmentTracker from './components/AssignmentTracker';
import ParentMessageCenter from './components/ParentMessageCenter';
import PerformanceAlerts from './components/PerformanceAlerts';
import BiometricAttendancePanel from './components/BiometricAttendancePanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeacherDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 114,
    classesToday: 4,
    pendingGrades: 23,
    unreadMessages: 7,
    attendanceRate: 92.5,
    assignmentsDue: 12
  });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleQuickAttendance = () => {
    console.log('Opening quick attendance modal');
  };

  const handleGenerateReport = () => {
    console.log('Generating teacher report');
  };

  const handleViewAllClasses = () => {
    console.log('Navigating to all classes view');
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <>
      <Helmet>
        <title>Teacher Dashboard - SkuliCheck</title>
        <meta name="description" content="Comprehensive teacher dashboard for classroom management, attendance tracking, and student performance monitoring." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <RoleBasedHeader />
        <DashboardNavigation userRole="Teacher" />
        
        {/* Main Content */}
        <main className="lg:ml-64 pt-16 pb-20 lg:pb-8">
          <div className="p-4 lg:p-6 space-y-6">
            
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {getGreeting()}, Ms. Smith! 👋
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    Ready to inspire minds today? You have {dashboardStats.classesToday} classes scheduled.
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-primary" />
                      <span className="text-foreground">
                        {currentTime.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span className="text-foreground">
                        {currentTime.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex items-center space-x-3">
                  <Button
                    variant="default"
                    onClick={handleQuickAttendance}
                    iconName="CheckSquare"
                    iconPosition="left"
                    iconSize={18}
                  >
                    Quick Attendance
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGenerateReport}
                    iconName="FileText"
                    iconPosition="left"
                    iconSize={18}
                  >
                    Generate Report
                  </Button>
                  <NotificationCenter />
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 card-elevation">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.totalStudents}</p>
                    <p className="text-xs text-muted-foreground">Total Students</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4 card-elevation">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.classesToday}</p>
                    <p className="text-xs text-muted-foreground">Classes Today</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4 card-elevation">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Award" size={20} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.pendingGrades}</p>
                    <p className="text-xs text-muted-foreground">Pending Grades</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4 card-elevation">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="MessageSquare" size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.unreadMessages}</p>
                    <p className="text-xs text-muted-foreground">New Messages</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4 card-elevation">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.attendanceRate}%</p>
                    <p className="text-xs text-muted-foreground">Attendance Rate</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4 card-elevation">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-error" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{dashboardStats.assignmentsDue}</p>
                    <p className="text-xs text-muted-foreground">Assignments Due</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div className="space-y-6">
                <TodayScheduleCard />
                <AssignmentTracker />
                <BiometricAttendancePanel />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <ParentMessageCenter />
                <PerformanceAlerts />
                <QuickActionPanel userRole="Teacher" />
              </div>
            </div>

            {/* Additional Actions Section */}
            <div className="bg-card border border-border rounded-lg p-6 card-elevation">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Quick Actions</h3>
                  <p className="text-sm text-muted-foreground">Frequently used teacher tools</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleViewAllClasses}
                  iconName="ExternalLink"
                  iconPosition="right"
                  iconSize={14}
                  className="text-xs"
                >
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  onClick={() => console.log('Opening gradebook')}
                  iconName="BookOpen"
                  iconPosition="left"
                  iconSize={18}
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <span className="text-sm font-medium">Gradebook</span>
                  <span className="text-xs text-muted-foreground">Manage grades</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => console.log('Opening lesson planner')}
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={18}
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <span className="text-sm font-medium">Lesson Plans</span>
                  <span className="text-xs text-muted-foreground">Plan lessons</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => console.log('Opening student profiles')}
                  iconName="Users"
                  iconPosition="left"
                  iconSize={18}
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <span className="text-sm font-medium">Student Profiles</span>
                  <span className="text-xs text-muted-foreground">View students</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => console.log('Opening resources')}
                  iconName="FolderOpen"
                  iconPosition="left"
                  iconSize={18}
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <span className="text-sm font-medium">Resources</span>
                  <span className="text-xs text-muted-foreground">Teaching materials</span>
                </Button>
              </div>
            </div>

            {/* Mobile Quick Actions */}
            <div className="lg:hidden fixed bottom-20 right-4 flex flex-col space-y-3">
              <Button
                variant="default"
                size="icon"
                onClick={handleQuickAttendance}
                className="w-14 h-14 rounded-full shadow-lg"
                title="Quick Attendance"
              >
                <Icon name="CheckSquare" size={24} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => console.log('Quick message')}
                className="w-12 h-12 rounded-full shadow-lg"
                title="Quick Message"
              >
                <Icon name="MessageSquare" size={20} />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TeacherDashboard;