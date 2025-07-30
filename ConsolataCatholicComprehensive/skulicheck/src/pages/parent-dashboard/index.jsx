import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import ChildProfileCard from './components/ChildProfileCard';
import ActivityFeed from './components/ActivityFeed';
import FeeManagementCard from './components/FeeManagementCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import NotificationCenter from './components/NotificationCenter';
import AcademicTimeline from './components/AcademicTimeline';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for children
  const children = [
    {
      id: 'child1',
      name: 'Emma Johnson',
      class: 'Grade 8',
      section: 'A',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      isPresent: true,
      hasNewUpdates: true,
      attendance: {
        percentage: 92,
        present: 165,
        total: 180
      },
      recentGrade: {
        score: 'A-',
        subject: 'Mathematics',
        date: 'Jan 25, 2025',
        trend: 'up'
      }
    },
    {
      id: 'child2',
      name: 'Liam Johnson',
      class: 'Grade 5',
      section: 'B',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      isPresent: false,
      hasNewUpdates: false,
      attendance: {
        percentage: 88,
        present: 158,
        total: 180
      },
      recentGrade: {
        score: 'B+',
        subject: 'Science',
        date: 'Jan 24, 2025',
        trend: 'stable'
      }
    }
  ];

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'attendance',
      title: 'Attendance Alert',
      description: 'Liam Johnson marked absent today',
      childName: 'Liam Johnson',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      priority: 'high',
      additionalInfo: 'Please contact the school office if this is an error.',
      actions: [
        {
          label: 'Contact School',
          icon: 'Phone',
          onClick: () => console.log('Contact school')
        },
        {
          label: 'Verify Absence',
          icon: 'Check',
          onClick: () => console.log('Verify absence')
        }
      ]
    },
    {
      id: 2,
      type: 'grade',
      title: 'New Grade Posted',
      description: 'Mathematics test results are now available',
      childName: 'Emma Johnson',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'medium',
      additionalInfo: 'Score: A- (88/100) - Excellent work on algebraic equations!'
    },
    {
      id: 3,
      type: 'event',
      title: 'Parent-Teacher Meeting',
      description: 'Scheduled meeting with Ms. Sarah Wilson',
      childName: 'Emma Johnson',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: 'medium',
      actions: [
        {
          label: 'Join Meeting',
          icon: 'Video',
          onClick: () => console.log('Join meeting')
        }
      ]
    },
    {
      id: 4,
      type: 'message',
      title: 'Message from Teacher',
      description: 'New message from Mr. David Brown regarding homework',
      childName: 'Liam Johnson',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      priority: 'low',
      actions: [
        {
          label: 'Read Message',
          icon: 'MessageSquare',
          onClick: () => console.log('Read message')
        },
        {
          label: 'Reply',
          icon: 'Reply',
          onClick: () => console.log('Reply')
        }
      ]
    }
  ];

  // Mock fee data
  const feeData = {
    currentBalance: 1250.00,
    totalPaid: 8750.00,
    totalFees: 10000.00,
    dueDate: '2025-02-15',
    recentTransactions: [
      {
        id: 'txn1',
        description: 'Monthly Tuition Fee',
        amount: 500.00,
        date: '2025-01-15',
        status: 'paid',
        method: 'Credit Card',
        receiptId: 'RCP001'
      },
      {
        id: 'txn2',
        description: 'Activity Fee',
        amount: 150.00,
        date: '2025-01-10',
        status: 'paid',
        method: 'Bank Transfer',
        receiptId: 'RCP002'
      },
      {
        id: 'txn3',
        description: 'Library Fee',
        amount: 75.00,
        date: '2025-01-05',
        status: 'pending',
        method: 'Mobile Payment'
      }
    ]
  };

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      category: 'attendance',
      title: 'Attendance Verification Required',
      message: 'Please verify Liam\'s absence from school today',
      childName: 'Liam Johnson',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      priority: 'high',
      actions: [
        {
          label: 'Verify',
          icon: 'Check',
          onClick: () => console.log('Verify attendance')
        }
      ]
    },
    {
      id: 2,
      category: 'grades',
      title: 'Grade Update',
      message: 'New mathematics test score available for Emma',
      childName: 'Emma Johnson',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      category: 'events',
      title: 'School Event Reminder',
      message: 'Science Fair tomorrow at 10:00 AM',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      category: 'fees',
      title: 'Fee Payment Due',
      message: 'Monthly fee payment due in 3 days',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false,
      priority: 'high',
      actions: [
        {
          label: 'Pay Now',
          icon: 'CreditCard',
          onClick: () => console.log('Pay fees')
        }
      ]
    }
  ]);

  // Mock timeline data
  const timelineData = [
    {
      id: 1,
      type: 'grade',
      title: 'Mathematics Test Result',
      description: 'Scored A- (88/100) in Algebra test',
      childId: 'child1',
      childName: 'Emma Johnson',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'positive',
      details: 'Excellent understanding of quadratic equations. Keep up the good work!'
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Absent from School',
      description: 'Marked absent for the full day',
      childId: 'child2',
      childName: 'Liam Johnson',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'negative',
      details: 'Reason: Sick leave (fever)',
      actions: [
        {
          label: 'Submit Medical Certificate',
          icon: 'Upload',
          onClick: () => console.log('Upload certificate')
        }
      ]
    },
    {
      id: 3,
      type: 'assignment',
      title: 'Science Project Submitted',
      description: 'Solar System model project submitted on time',
      childId: 'child2',
      childName: 'Liam Johnson',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'positive',
      details: 'Creative presentation with detailed explanations'
    },
    {
      id: 4,
      type: 'behavior',
      title: 'Positive Behavior Note',
      description: 'Helped classmate with mathematics problem',
      childId: 'child1',
      childName: 'Emma Johnson',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'positive',
      details: 'Showed excellent leadership and teamwork skills'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleMessageTeacher = (childId) => {
    console.log('Message teacher for child:', childId);
    // Navigate to messaging interface
  };

  const handleViewChildDetails = (childId) => {
    console.log('View details for child:', childId);
    // Navigate to detailed child profile
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    switch (actionId) {
      case 'attendance-verify':
        console.log('Verify attendance');
        break;
      case 'pay-fees': console.log('Pay fees');
        break;
      case 'message-teacher': console.log('Message teacher');
        break;
      case 'view-progress': console.log('View progress');
        break;
      default:
        break;
    }
  };

  const handlePayNow = (amount) => {
    console.log('Pay now:', amount);
    // Navigate to payment interface
  };

  const handleViewFeeHistory = () => {
    console.log('View fee history');
    // Navigate to fee history
  };

  const handleDownloadReceipt = (receiptId) => {
    console.log('Download receipt:', receiptId);
    // Download receipt logic
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleViewDetails = (section) => {
    console.log('View details for:', section);
    // Navigate to detailed view
  };

  const handleViewAllActivities = () => {
    console.log('View all activities');
    // Navigate to activities page
  };

  // Geofenced attendance simulation
  useEffect(() => {
    const checkGeofence = () => {
      // Simulate geofenced attendance notification
      const shouldShowNotification = Math.random() > 0.95;
      if (shouldShowNotification) {
        const newNotification = {
          id: Date.now(),
          category: 'attendance',
          title: 'Geofenced Attendance',
          message: 'Emma has arrived at school',
          childName: 'Emma Johnson',
          timestamp: new Date(),
          read: false,
          priority: 'medium'
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    };

    const interval = setInterval(checkGeofence, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader />
      <DashboardNavigation userRole="Parent" />
      
      {/* Main Content */}
      <main className="lg:ml-64 pt-16 pb-20 lg:pb-6">
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Parent Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your children today.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={refreshing}
                className={refreshing ? 'animate-spin' : ''}
              >
                <Icon name="RefreshCw" size={20} />
              </Button>
              <Button
                variant="outline"
                iconName="Filter"
                iconPosition="left"
                iconSize={16}
                className="hidden sm:flex"
              >
                Filter
              </Button>
            </div>
          </div>

          {/* Children Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {children.map((child) => (
              <ChildProfileCard
                key={child.id}
                child={child}
                onMessageTeacher={handleMessageTeacher}
                onViewDetails={handleViewChildDetails}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Activity Feed */}
              <ActivityFeed
                activities={activities}
                onViewAll={handleViewAllActivities}
              />

              {/* Academic Timeline */}
              <AcademicTimeline
                timelineData={timelineData}
                onViewDetails={handleViewDetails}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActionsPanel onAction={handleQuickAction} />

              {/* Fee Management */}
              <FeeManagementCard
                feeData={feeData}
                onPayNow={handlePayNow}
                onViewHistory={handleViewFeeHistory}
                onDownloadReceipt={handleDownloadReceipt}
              />

              {/* Notifications */}
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDeleteNotification={handleDeleteNotification}
              />
            </div>
          </div>

          {/* Mobile Quick Stats */}
          <div className="lg:hidden mt-6 grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">92%</div>
              <p className="text-xs text-muted-foreground">Avg Attendance</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">A-</div>
              <p className="text-xs text-muted-foreground">Avg Grade</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;