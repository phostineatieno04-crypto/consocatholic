import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationFeed = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Posted',
      message: 'Mrs. Johnson posted a new math assignment due Friday',
      timestamp: '2024-07-29T06:30:00Z',
      read: false,
      priority: 'medium',
      icon: 'BookOpen',
      color: 'bg-blue-500',
      actionLabel: 'View Assignment',
      sender: 'Mrs. Johnson'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grade Updated',
      message: 'Your science lab report has been graded: A-',
      timestamp: '2024-07-29T05:45:00Z',
      read: false,
      priority: 'high',
      icon: 'Award',
      color: 'bg-green-500',
      actionLabel: 'View Grade',
      sender: 'Dr. Wilson'
    },
    {
      id: 3,
      type: 'schedule',
      title: 'Schedule Change',
      message: 'Tomorrow\'s PE class moved to 2:00 PM due to weather',
      timestamp: '2024-07-29T04:15:00Z',
      read: true,
      priority: 'medium',
      icon: 'Calendar',
      color: 'bg-orange-500',
      actionLabel: 'Update Calendar',
      sender: 'Coach Brown'
    },
    {
      id: 4,
      type: 'event',
      title: 'School Event Reminder',
      message: 'Science Fair registration closes in 2 days',
      timestamp: '2024-07-29T03:00:00Z',
      read: true,
      priority: 'low',
      icon: 'Star',
      color: 'bg-purple-500',
      actionLabel: 'Register Now',
      sender: 'School Administration'
    },
    {
      id: 5,
      type: 'message',
      title: 'Message from Teacher',
      message: 'Great job on your history presentation! Keep up the excellent work.',
      timestamp: '2024-07-28T16:30:00Z',
      read: true,
      priority: 'low',
      icon: 'MessageSquare',
      color: 'bg-cyan-500',
      actionLabel: 'Reply',
      sender: 'Ms. Davis'
    },
    {
      id: 6,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You earned the "Perfect Attendance" badge for this week!',
      timestamp: '2024-07-28T15:00:00Z',
      read: false,
      priority: 'high',
      icon: 'Trophy',
      color: 'bg-yellow-500',
      actionLabel: 'View Badge',
      sender: 'SkuliCheck System'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All', icon: 'Bell' },
    { key: 'unread', label: 'Unread', icon: 'AlertCircle' },
    { key: 'assignment', label: 'Assignments', icon: 'BookOpen' },
    { key: 'grade', label: 'Grades', icon: 'Award' },
    { key: 'event', label: 'Events', icon: 'Calendar' }
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

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

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center relative">
            <Icon name="Bell" size={20} color="white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-scanner">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up!'}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            iconName="CheckCheck"
            iconPosition="left"
            iconSize={16}
            className="text-xs"
          >
            Mark all read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === filterOption.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-muted-foreground hover:text-foreground hover:bg-muted/10'
            }`}
          >
            <Icon name={filterOption.icon} size={16} />
            <span>{filterOption.label}</span>
            {filterOption.key === 'unread' && unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No notifications</p>
            <p className="text-sm text-muted-foreground mt-1">You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`group p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md ${
                getPriorityColor(notification.priority)
              } ${
                !notification.read 
                  ? 'bg-primary/5 border-r border-t border-b border-primary/20' :'bg-surface border-r border-t border-b border-border hover:bg-muted/5'
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Notification Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                  <Icon name={notification.icon} size={18} color="white" />
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium text-sm ${
                        !notification.read ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block"></span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Icon name="User" size={12} className="mr-1" />
                          {notification.sender}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Icon name="Clock" size={12} className="mr-1" />
                          {getTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => markAsRead(notification.id)}
                          className="w-6 h-6"
                          title="Mark as read"
                        >
                          <Icon name="Check" size={12} />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNotification(notification.id)}
                        className="w-6 h-6 text-error hover:text-error"
                        title="Delete notification"
                      >
                        <Icon name="Trash2" size={12} />
                      </Button>
                    </div>
                  </div>

                  {/* Action Button */}
                  {notification.actionLabel && (
                    <div className="mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="right"
                        iconSize={14}
                        className="text-xs"
                        onClick={() => console.log(`Action: ${notification.actionLabel}`)}
                      >
                        {notification.actionLabel}
                      </Button>
                    </div>
                  )}

                  {/* Special Achievement Animation */}
                  {notification.type === 'achievement' && !notification.read && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {filteredNotifications.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Quick Actions</p>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                iconSize={14}
                className="text-xs"
              >
                Notification Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Archive"
                iconPosition="left"
                iconSize={14}
                className="text-xs"
              >
                View Archive
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationFeed;