import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'attendance',
      title: 'Attendance Alert',
      message: 'Student John Doe marked absent today',
      time: '2 minutes ago',
      read: false,
      priority: 'high',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grade Updated',
      message: 'Mathematics test results have been published',
      time: '15 minutes ago',
      read: false,
      priority: 'medium',
      icon: 'BookOpen',
      color: 'primary'
    },
    {
      id: 3,
      type: 'event',
      title: 'School Event Reminder',
      message: 'Parent-Teacher meeting scheduled for tomorrow',
      time: '1 hour ago',
      read: true,
      priority: 'medium',
      icon: 'Calendar',
      color: 'accent'
    },
    {
      id: 4,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 11 PM to 2 AM',
      time: '3 hours ago',
      read: true,
      priority: 'low',
      icon: 'Settings',
      color: 'secondary'
    },
    {
      id: 5,
      type: 'fee',
      title: 'Fee Payment Due',
      message: 'Monthly fee payment due in 3 days',
      time: '1 day ago',
      read: false,
      priority: 'high',
      icon: 'DollarSign',
      color: 'error'
    }
  ]);

  const notificationRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationColor = (color) => {
    const colors = {
      primary: 'text-primary bg-primary/10',
      secondary: 'text-secondary bg-secondary/10',
      accent: 'text-accent bg-accent/10',
      warning: 'text-warning bg-warning/10',
      error: 'text-error bg-error/10'
    };
    return colors[color] || colors.primary;
  };

  const getPriorityBorder = (priority) => {
    const borders = {
      high: 'border-l-error',
      medium: 'border-l-warning',
      low: 'border-l-muted'
    };
    return borders[priority] || borders.medium;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="relative focus-glow"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-scanner font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-popover border border-border rounded-lg shadow-lg modal-elevation animate-fade-in z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="w-6 h-6"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No notifications</p>
                <p className="text-sm text-muted-foreground mt-1">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/5 transition-colors duration-200 border-l-4 ${getPriorityBorder(notification.priority)} ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.color)}`}>
                        <Icon name={notification.icon} size={16} />
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
                            <p className="text-xs text-muted-foreground mt-2 flex items-center">
                              <Icon name="Clock" size={12} className="mr-1" />
                              {notification.time}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                                className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Mark as read"
                              >
                                <Icon name="Check" size={12} />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification(notification.id)}
                              className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error"
                              title="Delete notification"
                            >
                              <Icon name="Trash2" size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions for specific notification types */}
                    {notification.type === 'attendance' && !notification.read && (
                      <div className="mt-3 flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Eye"
                          iconPosition="left"
                          iconSize={14}
                          className="text-xs"
                          onClick={() => console.log('View attendance')}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="MessageSquare"
                          iconPosition="left"
                          iconSize={14}
                          className="text-xs"
                          onClick={() => console.log('Contact parent')}
                        >
                          Contact Parent
                        </Button>
                      </div>
                    )}

                    {notification.type === 'fee' && !notification.read && (
                      <div className="mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="CreditCard"
                          iconPosition="left"
                          iconSize={14}
                          className="text-xs"
                          onClick={() => console.log('Pay now')}
                        >
                          Pay Now
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-border bg-muted/5">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Archive"
                  iconPosition="left"
                  iconSize={14}
                  onClick={clearAll}
                  className="text-xs text-muted-foreground"
                >
                  Clear All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  iconSize={14}
                  onClick={() => console.log('View all notifications')}
                  className="text-xs"
                >
                  View All
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;