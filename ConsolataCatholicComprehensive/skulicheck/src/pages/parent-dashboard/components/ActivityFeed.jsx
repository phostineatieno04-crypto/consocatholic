import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities, onViewAll }) => {
  const getActivityIcon = (type) => {
    const icons = {
      attendance: 'CheckSquare',
      grade: 'Award',
      assignment: 'FileText',
      event: 'Calendar',
      message: 'MessageSquare',
      fee: 'DollarSign',
      behavior: 'Star'
    };
    return icons[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      attendance: 'text-accent bg-accent/10',
      grade: 'text-primary bg-primary/10',
      assignment: 'text-secondary bg-secondary/10',
      event: 'text-warning bg-warning/10',
      message: 'text-primary bg-primary/10',
      fee: 'text-error bg-error/10',
      behavior: 'text-accent bg-accent/10'
    };
    return colors[type] || 'text-muted-foreground bg-muted/10';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg card-elevation">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Recent Activity</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
          className="text-xs"
        >
          View All
        </Button>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground mt-1">Check back later for updates</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-muted/5 transition-colors duration-200">
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                  <Icon name={getActivityIcon(activity.type)} size={16} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      
                      {/* Child Info */}
                      {activity.childName && (
                        <div className="flex items-center space-x-1 mt-2">
                          <Icon name="User" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{activity.childName}</span>
                        </div>
                      )}

                      {/* Additional Info */}
                      {activity.additionalInfo && (
                        <div className="mt-2 p-2 bg-muted/10 rounded text-xs text-muted-foreground">
                          {activity.additionalInfo}
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="flex flex-col items-end ml-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                      {activity.priority === 'high' && (
                        <div className="w-2 h-2 bg-error rounded-full mt-1 animate-pulse-scanner"></div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {activity.actions && activity.actions.length > 0 && (
                    <div className="flex space-x-2 mt-3">
                      {activity.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={action.onClick}
                          iconName={action.icon}
                          iconPosition="left"
                          iconSize={12}
                          className="text-xs"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;