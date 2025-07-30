import React from 'react';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import AcademicOverviewCard from './components/AcademicOverviewCard';
import TodayScheduleCard from './components/TodayScheduleCard';
import AchievementBadges from './components/AchievementBadges';
import HomeworkTracker from './components/HomeworkTracker';
import NotificationFeed from './components/NotificationFeed';
import QuickActionsPanel from './components/QuickActionsPanel';
import ProgressCharts from './components/ProgressCharts';

const StudentDashboard = () => {
  const currentUser = {
    name: 'Alex Johnson',
    role: 'Student',
    grade: '10th Grade',
    studentId: 'STU2024001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleBasedHeader />
      
      {/* Navigation */}
      <DashboardNavigation userRole="Student" />
      
      {/* Main Content */}
      <main className="lg:ml-64 pt-16 pb-20 lg:pb-6">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Welcome back, {currentUser.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-muted-foreground">
                  {currentUser.grade} • Student ID: {currentUser.studentId}
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">3.8</p>
                <p className="text-sm text-muted-foreground">Current GPA</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-success">92%</p>
                <p className="text-sm text-muted-foreground">Attendance</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-warning">8</p>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-accent">15</p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Academic Overview */}
              <AcademicOverviewCard />
              
              {/* Today's Schedule */}
              <TodayScheduleCard />
              
              {/* Homework Tracker */}
              <HomeworkTracker />
              
              {/* Progress Charts */}
              <ProgressCharts />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Actions */}
              <QuickActionsPanel />
              
              {/* Notifications */}
              <NotificationFeed />
              
              {/* Achievements */}
              <AchievementBadges />
            </div>
          </div>

          {/* Mobile-Specific Sections */}
          <div className="lg:hidden mt-8 space-y-6">
            {/* Mobile Quick Access */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-4">Quick Access</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-surface rounded-lg text-center hover:bg-muted/10 transition-colors">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-sm">📚</span>
                  </div>
                  <p className="text-xs text-foreground">Study Materials</p>
                </button>
                <button className="p-3 bg-surface rounded-lg text-center hover:bg-muted/10 transition-colors">
                  <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-sm">📝</span>
                  </div>
                  <p className="text-xs text-foreground">Submit Work</p>
                </button>
                <button className="p-3 bg-surface rounded-lg text-center hover:bg-muted/10 transition-colors">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-sm">💬</span>
                  </div>
                  <p className="text-xs text-foreground">Class Chat</p>
                </button>
                <button className="p-3 bg-surface rounded-lg text-center hover:bg-muted/10 transition-colors">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-sm">🎯</span>
                  </div>
                  <p className="text-xs text-foreground">Goals</p>
                </button>
              </div>
            </div>

            {/* Motivational Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Keep Going!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You're doing great this semester. Stay focused and reach your goals!
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="text-center">
                  <p className="font-bold text-primary">7</p>
                  <p className="text-muted-foreground">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-accent">85%</p>
                  <p className="text-muted-foreground">Goal Progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;