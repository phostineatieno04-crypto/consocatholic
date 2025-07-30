import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onAction }) => {
  const quickActions = [
    {
      id: 'attendance-verify',
      label: 'Verify Attendance',
      description: 'Check today\'s attendance',
      icon: 'CheckSquare',
      color: 'primary',
      shortcut: 'Ctrl+A'
    },
    {
      id: 'pay-fees',
      label: 'Pay Fees',
      description: 'Make fee payment',
      icon: 'CreditCard',
      color: 'accent',
      shortcut: 'Ctrl+P'
    },
    {
      id: 'message-teacher',
      label: 'Message Teacher',
      description: 'Send message to teacher',
      icon: 'MessageSquare',
      color: 'secondary',
      shortcut: 'Ctrl+M'
    },
    {
      id: 'view-progress',
      label: 'View Progress',
      description: 'Academic progress report',
      icon: 'TrendingUp',
      color: 'warning',
      shortcut: 'Ctrl+R'
    }
  ];

  const getActionColor = (color) => {
    const colors = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/90'
    };
    return colors[color] || colors.primary;
  };

  const handleActionClick = (action) => {
    onAction(action.id);
    
    // Add bounce animation feedback
    const element = document.getElementById(`quick-action-${action.id}`);
    if (element) {
      element.classList.add('animate-bounce-gentle');
      setTimeout(() => {
        element.classList.remove('animate-bounce-gentle');
      }, 200);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="font-semibold text-foreground">Quick Actions</h3>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <div
            key={action.id}
            id={`quick-action-${action.id}`}
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

      {/* Mobile List */}
      <div className="md:hidden space-y-2">
        {quickActions.map((action) => (
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

      {/* Help Text */}
      <div className="mt-4 p-3 bg-muted/10 rounded-lg">
        <p className="text-xs text-muted-foreground flex items-center">
          <Icon name="Info" size={14} className="mr-2" />
          Tip: Use keyboard shortcuts for faster access to common actions
        </p>
      </div>
    </div>
  );
};

export default QuickActionsPanel;