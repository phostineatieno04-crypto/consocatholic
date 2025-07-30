import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead, onDeleteNotification }) => {
  const [filter, setFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All', icon: 'Bell' },
    { value: 'attendance', label: 'Attendance', icon: 'CheckSquare' },
    { value: 'grades', label: 'Grades', icon: 'Award' },
    { value: 'events', label: 'Events', icon: 'Calendar' },
    { value: 'messages', label: 'Messages', icon: 'MessageSquare' }
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === filter);

  const unreadCount = filteredNotifications.filter(n => !n.read).length;

  const getNotificationIcon = (category) => {
    const icons = {
      attendance: 'CheckSquare',
      grades: 'Award',
      events: 'Calendar',
      messages: 'MessageSquare',
      fees: 'DollarSign',
      general: 'Bell'
    };
    return icons[category] || 'Bell';
  };

  const getNotificationColor = (category, priority) => {
    if (priority === 'high') return 'text-error bg-error/10';
    
    const colors = {
      attendance: 'text-accent bg-accent/10',
      grades: 'text-primary bg-primary/10',
      events: 'text-warning bg-warning/10',
      messages: 'text-secondary bg-secondary/10',
      fees: 'text-error bg-error/10',
      general: 'text-muted-foreground bg-muted/10'
    };
    return colors[category] || colors.general;
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
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              iconSize={14}
              className="text-xs"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 overflow-x-auto">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(option.value)}
              iconName={option.icon}
              iconPosition="left"
              iconSize={14}
              className="text-xs whitespace-nowrap"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className={`divide-y divide-border ${isExpanded ? 'max-h-96' : 'max-h-64'} overflow-y-auto`}>
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No notifications</p>
            <p className="text-sm text-muted-foreground mt-1">
              {filter === 'all' ? 'You\'re all caught up!' : `No ${filter} notifications`}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-muted/5 transition-colors duration-200 ${
                !notification.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.category, notification.priority)}`}>
                  <Icon name={getNotificationIcon(notification.category)} size={16} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      
                      {/* Child Info */}
                      {notification.childName && (
                        <div className="flex items-center space-x-1 mt-2">
                          <Icon name="User" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{notification.childName}</span>
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground mt-2 flex items-center">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {formatTimeAgo(notification.timestamp)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onMarkAsRead(notification.id)}
                          className="w-6 h-6"
                          title="Mark as read"
                        >
                          <Icon name="Check" size={12} />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteNotification(notification.id)}
                        className="w-6 h-6 text-error hover:text-error"
                        title="Delete notification"
                      >
                        <Icon name="Trash2" size={12} />
                      </Button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  {notification.actions && notification.actions.length > 0 && (
                    <div className="mt-3 flex space-x-2">
                      {notification.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          iconName={action.icon}
                          iconPosition="left"
                          iconSize={12}
                          onClick={action.onClick}
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

export default NotificationCenter;