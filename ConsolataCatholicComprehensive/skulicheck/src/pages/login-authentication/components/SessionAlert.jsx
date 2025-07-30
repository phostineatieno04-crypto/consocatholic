import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionAlert = ({ isVisible, onClose, alertType = 'new-device' }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getAlertContent = () => {
    switch (alertType) {
      case 'new-device':
        return {
          icon: 'Smartphone',
          iconColor: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          title: 'New Device Login',
          message: 'We detected a login from a new device. If this wasn\'t you, please secure your account.',
          actionText: 'Review Activity',
          timestamp: new Date().toLocaleString()
        };
      case 'session-expired':
        return {
          icon: 'Clock',
          iconColor: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          title: 'Session Expired',
          message: 'Your session has expired for security reasons. Please log in again.',
          actionText: 'Login Again',
          timestamp: new Date().toLocaleString()
        };
      case 'security-alert':
        return {
          icon: 'Shield',
          iconColor: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          title: 'Security Alert',
          message: 'Unusual activity detected on your account. Please verify your recent actions.',
          actionText: 'Check Security',
          timestamp: new Date().toLocaleString()
        };
      case 'password-changed':
        return {
          icon: 'Key',
          iconColor: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          title: 'Password Changed',
          message: 'Your password was successfully changed. All other sessions have been logged out.',
          actionText: 'Got it',
          timestamp: new Date().toLocaleString()
        };
      default:
        return {
          icon: 'Info',
          iconColor: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          title: 'Account Notification',
          message: 'There\'s an update regarding your account security.',
          actionText: 'View Details',
          timestamp: new Date().toLocaleString()
        };
    }
  };

  if (!isVisible) return null;

  const content = getAlertContent();

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ${
      isAnimating ? 'animate-slide-in' : 'translate-x-full opacity-0'
    }`}>
      <div className={`${content.bgColor} ${content.borderColor} border rounded-lg p-4 shadow-lg backdrop-blur-sm`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full bg-card flex items-center justify-center`}>
              <Icon name={content.icon} size={18} className={content.iconColor} />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">{content.title}</h4>
              <p className="text-xs text-muted-foreground">{content.timestamp}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="w-6 h-6 -mt-1 -mr-1"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>

        {/* Message */}
        <p className="text-sm text-foreground mb-4 leading-relaxed">
          {content.message}
        </p>

        {/* Device/Location Info for new device alerts */}
        {alertType === 'new-device' && (
          <div className="mb-4 p-3 bg-card/50 rounded-lg">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Device:</span>
                <span className="text-foreground">Chrome on Windows</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="text-foreground">New York, US</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IP Address:</span>
                <span className="text-foreground font-mono">192.168.1.100</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
            className="flex-1 text-xs"
          >
            Dismiss
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              console.log(`Action: ${content.actionText}`);
              handleClose();
            }}
            className="flex-1 text-xs"
          >
            {content.actionText}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full bg-muted/20 rounded-full h-1">
          <div 
            className="bg-primary h-1 rounded-full transition-all duration-8000 ease-linear"
            style={{ 
              width: isAnimating ? '0%' : '100%',
              transition: isAnimating ? 'width 8s linear' : 'none'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SessionAlert;