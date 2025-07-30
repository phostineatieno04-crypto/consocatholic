import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionPanel = ({ userRole = 'Admin', className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Role-based quick actions
  const getQuickActions = (role) => {
    const actions = {
      Admin: [
        {
          id: 'add-user',
          label: 'Add User',
          description: 'Create new user account',
          icon: 'UserPlus',
          color: 'primary',
          action: () => console.log('Add user'),
          shortcut: 'Ctrl+N'
        },
        {
          id: 'generate-report',
          label: 'Generate Report',
          description: 'Create system reports',
          icon: 'FileText',
          color: 'secondary',
          action: () => console.log('Generate report'),
          shortcut: 'Ctrl+R'
        },
        {
          id: 'send-announcement',
          label: 'Send Announcement',
          description: 'Broadcast to all users',
          icon: 'Megaphone',
          color: 'accent',
          action: () => console.log('Send announcement'),
          shortcut: 'Ctrl+A'
        },
        {
          id: 'backup-data',
          label: 'Backup Data',
          description: 'Create system backup',
          icon: 'Download',
          color: 'warning',
          action: () => console.log('Backup data'),
          shortcut: 'Ctrl+B'
        }
      ],
      Teacher: [
        {
          id: 'mark-attendance',
          label: 'Mark Attendance',
          description: 'Take class attendance',
          icon: 'CheckSquare',
          color: 'primary',
          action: () => console.log('Mark attendance'),
          shortcut: 'Ctrl+A'
        },
        {
          id: 'create-assignment',
          label: 'Create Assignment',
          description: 'New homework assignment',
          icon: 'PlusCircle',
          color: 'accent',
          action: () => console.log('Create assignment'),
          shortcut: 'Ctrl+N'
        },
        {
          id: 'grade-papers',
          label: 'Grade Papers',
          description: 'Review and grade submissions',
          icon: 'Award',
          color: 'secondary',
          action: () => console.log('Grade papers'),
          shortcut: 'Ctrl+G'
        },
        {
          id: 'message-parents',
          label: 'Message Parents',
          description: 'Send parent communication',
          icon: 'MessageSquare',
          color: 'warning',
          action: () => console.log('Message parents'),
          shortcut: 'Ctrl+M'
        }
      ],
      Parent: [
        {
          id: 'view-progress',
          label: 'View Progress',
          description: 'Check child\'s academic progress',
          icon: 'TrendingUp',
          color: 'primary',
          action: () => console.log('View progress'),
          shortcut: 'Ctrl+P'
        },
        {
          id: 'pay-fees',
          label: 'Pay Fees',
          description: 'Make fee payment',
          icon: 'CreditCard',
          color: 'accent',
          action: () => console.log('Pay fees'),
          shortcut: 'Ctrl+F'
        },
        {
          id: 'schedule-meeting',
          label: 'Schedule Meeting',
          description: 'Book parent-teacher meeting',
          icon: 'Calendar',
          color: 'secondary',
          action: () => console.log('Schedule meeting'),
          shortcut: 'Ctrl+S'
        },
        {
          id: 'contact-teacher',
          label: 'Contact Teacher',
          description: 'Send message to teacher',
          icon: 'Mail',
          color: 'warning',
          action: () => console.log('Contact teacher'),
          shortcut: 'Ctrl+T'
        }
      ],
      Student: [
        {
          id: 'submit-assignment',
          label: 'Submit Assignment',
          description: 'Upload homework submission',
          icon: 'Upload',
          color: 'primary',
          action: () => console.log('Submit assignment'),
          shortcut: 'Ctrl+U'
        },
        {
          id: 'view-grades',
          label: 'View Grades',
          description: 'Check latest grades',
          icon: 'Award',
          color: 'accent',
          action: () => console.log('View grades'),
          shortcut: 'Ctrl+G'
        },
        {
          id: 'join-class',
          label: 'Join Class',
          description: 'Enter virtual classroom',
          icon: 'Video',
          color: 'secondary',
          action: () => console.log('Join class'),
          shortcut: 'Ctrl+J'
        },
        {
          id: 'ask-question',
          label: 'Ask Question',
          description: 'Send question to teacher',
          icon: 'HelpCircle',
          color: 'warning',
          action: () => console.log('Ask question'),
          shortcut: 'Ctrl+Q'
        }
      ]
    };

    return actions[role] || actions.Admin;
  };

  const quickActions = getQuickActions(userRole);
  const displayActions = isExpanded ? quickActions : quickActions.slice(0, 2);

  const getActionColor = (color) => {
    const colors = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
      error: 'bg-error text-error-foreground hover:bg-error/90'
    };
    return colors[color] || colors.primary;
  };

  const handleActionClick = (action) => {
    action.action();
    // Add bounce animation feedback
    const element = document.getElementById(`action-${action.id}`);
    if (element) {
      element.classList.add('animate-bounce-gentle');
      setTimeout(() => {
        element.classList.remove('animate-bounce-gentle');
      }, 200);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 card-elevation ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Quick Actions</h3>
        </div>
        {quickActions.length > 2 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
            className="text-xs"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </div>

      {/* Desktop Actions Grid */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        {displayActions.map((action) => (
          <div
            key={action.id}
            id={`action-${action.id}`}
            className="group relative"
          >
            <Button
              variant="outline"
              onClick={() => handleActionClick(action)}
              className="w-full h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all duration-200 focus-glow"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActionColor(action.color)}`}>
                <Icon name={action.icon} size={20} />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
              </div>
            </Button>
            
            {/* Keyboard Shortcut Tooltip */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded font-mono">
                {action.shortcut}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Actions List */}
      <div className="md:hidden space-y-2">
        {displayActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            onClick={() => handleActionClick(action)}
            iconName={action.icon}
            iconPosition="left"
            iconSize={18}
            className="w-full justify-start p-4 h-auto focus-glow"
          >
            <div className="flex flex-col items-start ml-3">
              <span className="font-medium text-sm">{action.label}</span>
              <span className="text-xs text-muted-foreground">{action.description}</span>
            </div>
          </Button>
        ))}
      </div>

      {/* Recent Actions */}
      {isExpanded && (
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
            <Icon name="Clock" size={16} className="mr-2" />
            Recent Actions
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last attendance marked</span>
              <span className="text-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Report generated</span>
              <span className="text-foreground">Yesterday</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Announcement sent</span>
              <span className="text-foreground">3 days ago</span>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      {isExpanded && (
        <div className="mt-4 p-3 bg-muted/10 rounded-lg">
          <p className="text-xs text-muted-foreground flex items-center">
            <Icon name="Keyboard" size={14} className="mr-2" />
            Tip: Use keyboard shortcuts for faster access
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickActionPanel;