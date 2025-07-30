import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const systemMetrics = [
    {
      id: 1,
      name: 'Server Status',
      status: 'online',
      value: '99.9%',
      description: 'Uptime',
      icon: 'Server',
      color: 'accent'
    },
    {
      id: 2,
      name: 'Database',
      status: 'online',
      value: '2.3ms',
      description: 'Response Time',
      icon: 'Database',
      color: 'primary'
    },
    {
      id: 3,
      name: 'Backup System',
      status: 'warning',
      value: '6 hours',
      description: 'Last Backup',
      icon: 'HardDrive',
      color: 'warning'
    },
    {
      id: 4,
      name: 'Security',
      status: 'online',
      value: 'Active',
      description: 'Firewall Status',
      icon: 'Shield',
      color: 'accent'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'system',
      title: 'System Update Available',
      message: 'New security patches ready for installation',
      priority: 'medium',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'backup',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully',
      priority: 'low',
      time: '6 hours ago'
    },
    {
      id: 3,
      type: 'security',
      title: 'Login Attempt Alert',
      message: '3 failed login attempts detected',
      priority: 'high',
      time: '1 day ago'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      online: 'text-accent',
      warning: 'text-warning',
      error: 'text-error',
      offline: 'text-muted-foreground'
    };
    return colors[status] || colors.online;
  };

  const getStatusIcon = (status) => {
    const icons = {
      online: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle',
      offline: 'Circle'
    };
    return icons[status] || icons.online;
  };

  const getMetricColor = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      accent: 'bg-accent/10 text-accent',
      warning: 'bg-warning/10 text-warning',
      error: 'bg-error/10 text-error'
    };
    return colors[color] || colors.primary;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-muted-foreground'
    };
    return colors[priority] || colors.low;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Monitor" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">System Status</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse-scanner" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Settings
          </button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="space-y-4 mb-6">
        {systemMetrics.map((metric) => (
          <div key={metric.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getMetricColor(metric.color)}`}>
                <Icon name={metric.icon} size={16} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{metric.name}</h4>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{metric.value}</p>
              </div>
              <Icon 
                name={getStatusIcon(metric.status)} 
                size={16} 
                className={getStatusColor(metric.status)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* System Notifications */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Bell" size={16} className="mr-2" />
          System Alerts
        </h4>
        
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/5 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(notification.priority) === 'text-error' ? 'bg-error' : getPriorityColor(notification.priority) === 'text-warning' ? 'bg-warning' : 'bg-muted'}`} />
              
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-foreground">{notification.title}</h5>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                  <span className={`text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                    {notification.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border pt-4 mt-4">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-2 p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-lg transition-colors">
            <Icon name="RefreshCw" size={14} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-lg transition-colors">
            <Icon name="Download" size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;