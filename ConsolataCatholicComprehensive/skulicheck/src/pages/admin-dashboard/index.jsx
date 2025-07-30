import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import QuickActionPanel from '../../components/ui/QuickActionPanel';

import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import UpcomingEvents from './components/UpcomingEvents';
import AnalyticsChart from './components/AnalyticsChart';
import SystemStatus from './components/SystemStatus';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [isLoading, setIsLoading] = useState(true);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  // Mock data for metrics
  const metrics = [
    {
      title: 'Total Students',
      value: '1,284',
      change: '+5.2%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary',
      description: 'Active enrollments',
      trend: [65, 78, 82, 88, 95, 92, 98]
    },
    {
      title: 'Teaching Staff',
      value: '52',
      change: '+2',
      changeType: 'increase',
      icon: 'GraduationCap',
      color: 'accent',
      description: 'Active teachers',
      trend: [45, 47, 48, 50, 51, 52, 52]
    },
    {
      title: 'Attendance Rate',
      value: '94.8%',
      change: '-1.2%',
      changeType: 'decrease',
      icon: 'CheckSquare',
      color: 'warning',
      description: 'Today\'s attendance',
      trend: [96, 95, 94, 95, 96, 94, 95]
    },
    {
      title: 'Fee Collection',
      value: '$847K',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'secondary',
      description: 'This month',
      trend: [70, 75, 80, 85, 88, 90, 95]
    }
  ];

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'year', label: 'This Year' }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <RoleBasedHeader />
        <DashboardNavigation userRole="Admin" />
        <main className="lg:ml-64 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Dashboard - SkuliCheck</title>
        <meta name="description" content="Comprehensive school management dashboard with real-time analytics and institutional oversight tools" />
      </Helmet>

      <RoleBasedHeader />
      <DashboardNavigation userRole="Admin" />

      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Shield" size={24} className="text-primary" />
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Admin Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>{formatDate(currentTime)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>{formatTime(currentTime)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse-scanner" />
                  <span>Live Data</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                onClick={() => console.log('Export data')}
              >
                Export
              </Button>

              <Button
                variant="default"
                iconName="Megaphone"
                iconPosition="left"
                iconSize={16}
                onClick={() => console.log('Send announcement')}
              >
                Broadcast
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <MetricCard {...metric} />
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Analytics Chart */}
            <div className="xl:col-span-2 space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                <AnalyticsChart />
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                <ActivityFeed />
              </div>
            </div>

            {/* Right Column - Events and Status */}
            <div className="space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
                <UpcomingEvents />
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
                <SystemStatus />
              </div>
            </div>
          </div>

          {/* Bottom Section - Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
              <QuickActionPanel userRole="Admin" />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '900ms' }}>
              <div className="bg-card border border-border rounded-lg p-6 card-elevation">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={20} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Performance Summary</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    iconSize={14}
                    onClick={() => console.log('View detailed report')}
                  >
                    View Report
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
                        <Icon name="Award" size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Academic Performance</p>
                        <p className="text-xs text-muted-foreground">Overall grade average</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-accent">87.5%</p>
                      <p className="text-xs text-accent">+2.3%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                        <Icon name="Users" size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Student Satisfaction</p>
                        <p className="text-xs text-muted-foreground">Based on surveys</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">92%</p>
                      <p className="text-xs text-primary">+1.8%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                        <Icon name="Clock" size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">On-Time Completion</p>
                        <p className="text-xs text-muted-foreground">Assignments & projects</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-warning">89.2%</p>
                      <p className="text-xs text-warning">-0.5%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;