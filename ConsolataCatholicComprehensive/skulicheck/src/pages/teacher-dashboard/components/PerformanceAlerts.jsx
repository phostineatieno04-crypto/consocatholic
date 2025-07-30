import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceAlerts = () => {
  const [filter, setFilter] = useState('all');

  const alerts = [
    {
      id: 1,
      type: 'grade_drop',
      studentName: "Alex Thompson",
      grade: "Grade 10-A",
      subject: "Mathematics",
      description: "Grade dropped from A to C in last 2 assignments",
      severity: "high",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      previousGrade: "A",
      currentGrade: "C",
      trend: "declining",
      actionRequired: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      type: 'attendance',
      studentName: "Maria Garcia",
      grade: "Grade 11-B",
      subject: "Physics",
      description: "Absent for 3 consecutive classes",
      severity: "high",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      attendanceRate: "75%",
      missedClasses: 3,
      trend: "declining",
      actionRequired: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      type: 'improvement',
      studentName: "David Kim",
      grade: "Grade 9-C",
      subject: "Mathematics",
      description: "Significant improvement in test scores",
      severity: "positive",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      previousGrade: "D",
      currentGrade: "B+",
      trend: "improving",
      actionRequired: false,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      type: 'assignment',
      studentName: "Emma Wilson",
      grade: "Grade 12-A",
      subject: "Physics",
      description: "Multiple assignments submitted late",
      severity: "medium",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      lateSubmissions: 4,
      trend: "concerning",
      actionRequired: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      type: 'behavior',
      studentName: "James Rodriguez",
      grade: "Grade 10-A",
      subject: "Mathematics",
      description: "Disruptive behavior in class",
      severity: "medium",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      incidents: 2,
      trend: "stable",
      actionRequired: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'high') return alert.severity === 'high';
    if (filter === 'action') return alert.actionRequired;
    if (filter === 'positive') return alert.severity === 'positive';
    return true;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'positive':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'grade_drop':
        return 'TrendingDown';
      case 'attendance':
        return 'UserX';
      case 'improvement':
        return 'TrendingUp';
      case 'assignment':
        return 'Clock';
      case 'behavior':
        return 'AlertTriangle';
      default:
        return 'Bell';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving':
        return { icon: 'TrendingUp', color: 'text-accent' };
      case 'declining':
        return { icon: 'TrendingDown', color: 'text-error' };
      case 'concerning':
        return { icon: 'AlertTriangle', color: 'text-warning' };
      default:
        return { icon: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleTakeAction = (alert) => {
    console.log('Taking action for alert:', alert.id);
  };

  const handleContactParent = (alert) => {
    console.log('Contacting parent for:', alert.studentName);
  };

  const handleViewDetails = (alert) => {
    console.log('Viewing details for:', alert.studentName);
  };

  const highPriorityCount = alerts.filter(a => a.severity === 'high').length;
  const actionRequiredCount = alerts.filter(a => a.actionRequired).length;
  const positiveCount = alerts.filter(a => a.severity === 'positive').length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Performance Alerts</h3>
            <p className="text-sm text-muted-foreground">
              {actionRequiredCount} require attention
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('View all alerts')}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
            className="text-xs"
          >
            View All
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-6 bg-muted/10 p-1 rounded-lg">
        {[
          { key: 'all', label: 'All', count: alerts.length },
          { key: 'high', label: 'High Priority', count: highPriorityCount },
          { key: 'action', label: 'Action Required', count: actionRequiredCount },
          { key: 'positive', label: 'Positive', count: positiveCount }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              filter === tab.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                filter === tab.key
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-accent mx-auto mb-3" />
            <p className="text-muted-foreground">No alerts found</p>
            <p className="text-sm text-muted-foreground mt-1">All students are performing well!</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const trendInfo = getTrendIcon(alert.trend);
            
            return (
              <div
                key={alert.id}
                className="p-4 rounded-lg border border-border bg-surface hover:bg-muted/5 transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={alert.avatar}
                    alt={alert.studentName}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-foreground">{alert.studentName}</h4>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{alert.grade}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity === 'positive' ? 'Good News' : alert.severity}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name={trendInfo.icon} size={16} className={trendInfo.color} />
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(alert.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name={getAlertIcon(alert.type)} size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{alert.subject}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                    
                    {/* Additional Details */}
                    <div className="flex items-center space-x-4 mb-3 text-xs text-muted-foreground">
                      {alert.previousGrade && alert.currentGrade && (
                        <span className="flex items-center space-x-1">
                          <Icon name="BarChart3" size={12} />
                          <span>{alert.previousGrade} → {alert.currentGrade}</span>
                        </span>
                      )}
                      {alert.attendanceRate && (
                        <span className="flex items-center space-x-1">
                          <Icon name="Calendar" size={12} />
                          <span>Attendance: {alert.attendanceRate}</span>
                        </span>
                      )}
                      {alert.lateSubmissions && (
                        <span className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{alert.lateSubmissions} late submissions</span>
                        </span>
                      )}
                      {alert.incidents && (
                        <span className="flex items-center space-x-1">
                          <Icon name="AlertCircle" size={12} />
                          <span>{alert.incidents} incidents</span>
                        </span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(alert)}
                        iconName="Eye"
                        iconPosition="left"
                        iconSize={14}
                        className="text-xs"
                      >
                        Details
                      </Button>
                      
                      {alert.actionRequired && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleContactParent(alert)}
                            iconName="MessageSquare"
                            iconPosition="left"
                            iconSize={14}
                            className="text-xs"
                          >
                            Contact Parent
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleTakeAction(alert)}
                            iconName="CheckSquare"
                            iconPosition="left"
                            iconSize={14}
                            className="text-xs"
                          >
                            Take Action
                          </Button>
                        </>
                      )}
                      
                      {alert.severity === 'positive' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log('Send encouragement')}
                          iconName="Heart"
                          iconPosition="left"
                          iconSize={14}
                          className="text-xs text-accent border-accent hover:bg-accent/10"
                        >
                          Encourage
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-error">{highPriorityCount}</p>
            <p className="text-xs text-muted-foreground">High Priority</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-warning">{actionRequiredCount}</p>
            <p className="text-xs text-muted-foreground">Action Required</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-accent">{positiveCount}</p>
            <p className="text-xs text-muted-foreground">Positive News</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary">{alerts.length}</p>
            <p className="text-xs text-muted-foreground">Total Alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAlerts;