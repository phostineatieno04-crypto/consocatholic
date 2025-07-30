import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'user_added',
      title: 'New Teacher Added',
      description: 'Sarah Johnson joined as Mathematics teacher',
      time: '5 minutes ago',
      icon: 'UserPlus',
      color: 'accent',
      user: 'Admin'
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Attendance Marked',
      description: 'Class 10-A attendance completed by Mr. Smith',
      time: '15 minutes ago',
      icon: 'CheckSquare',
      color: 'primary',
      user: 'John Smith'
    },
    {
      id: 3,
      type: 'fee_payment',
      title: 'Fee Payment Received',
      description: 'Monthly fee paid by Emma Wilson (Grade 8)',
      time: '32 minutes ago',
      icon: 'DollarSign',
      color: 'accent',
      user: 'System'
    },
    {
      id: 4,
      type: 'announcement',
      title: 'School Announcement',
      description: 'Parent-Teacher meeting scheduled for next week',
      time: '1 hour ago',
      icon: 'Megaphone',
      color: 'warning',
      user: 'Principal'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Backup',
      description: 'Daily backup completed successfully',
      time: '2 hours ago',
      icon: 'Download',
      color: 'secondary',
      user: 'System'
    },
    {
      id: 6,
      type: 'grade_update',
      title: 'Grades Updated',
      description: 'Science test results published for Grade 9',
      time: '3 hours ago',
      icon: 'Award',
      color: 'primary',
      user: 'Dr. Martinez'
    }
  ];

  const getActivityColor = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      accent: 'bg-accent/10 text-accent',
      warning: 'bg-warning/10 text-warning',
      error: 'bg-error/10 text-error',
      secondary: 'bg-secondary/10 text-secondary'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Recent Activities</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-3 group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.color)}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.user}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {index < activities.length - 1 && (
              <div className="absolute left-7 mt-8 w-px h-4 bg-border" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center">
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1">
            <Icon name="RefreshCw" size={14} />
            <span>Refresh Activities</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;