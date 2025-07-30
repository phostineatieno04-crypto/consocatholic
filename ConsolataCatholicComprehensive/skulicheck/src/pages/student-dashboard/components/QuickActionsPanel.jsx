import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('pending'); // pending, checked-in, checked-out

  const quickActions = [
    {
      id: 'submit-homework',
      title: 'Submit Homework',
      description: 'Upload completed assignments',
      icon: 'Upload',
      color: 'bg-blue-500',
      shortcut: 'Ctrl+U',
      action: () => console.log('Submit homework'),
      badge: '3 pending'
    },
    {
      id: 'attendance-checkin',
      title: 'Check Attendance',
      description: 'Scan QR code or manual check-in',
      icon: 'QrCode',
      color: 'bg-green-500',
      shortcut: 'Ctrl+A',
      action: () => setIsQRScannerOpen(true),
      badge: attendanceStatus === 'pending' ? 'Required' : 'Done'
    },
    {
      id: 'class-chat',
      title: 'Class Chat',
      description: 'Message classmates and teachers',
      icon: 'MessageSquare',
      color: 'bg-purple-500',
      shortcut: 'Ctrl+M',
      action: () => console.log('Open class chat'),
      badge: '2 new'
    },
    {
      id: 'view-grades',
      title: 'View Grades',
      description: 'Check latest test results',
      icon: 'Award',
      color: 'bg-yellow-500',
      shortcut: 'Ctrl+G',
      action: () => console.log('View grades'),
      badge: '1 new'
    },
    {
      id: 'join-class',
      title: 'Join Virtual Class',
      description: 'Enter online classroom',
      icon: 'Video',
      color: 'bg-red-500',
      shortcut: 'Ctrl+J',
      action: () => console.log('Join class'),
      badge: 'Live now'
    },
    {
      id: 'ask-help',
      title: 'Ask for Help',
      description: 'Get assistance from teachers',
      icon: 'HelpCircle',
      color: 'bg-cyan-500',
      shortcut: 'Ctrl+H',
      action: () => console.log('Ask for help'),
      badge: null
    }
  ];

  const recentActions = [
    { action: 'Submitted Math Assignment', time: '2 hours ago', icon: 'CheckCircle', color: 'text-green-400' },
    { action: 'Checked in for PE class', time: '4 hours ago', icon: 'Calendar', color: 'text-blue-400' },
    { action: 'Joined Science virtual lab', time: 'Yesterday', icon: 'Video', color: 'text-purple-400' },
    { action: 'Asked question in English chat', time: '2 days ago', icon: 'MessageSquare', color: 'text-cyan-400' }
  ];

  const handleQRScan = () => {
    // Simulate QR code scanning
    setTimeout(() => {
      setAttendanceStatus('checked-in');
      setIsQRScannerOpen(false);
      // Show success notification
    }, 2000);
  };

  const handleManualCheckIn = () => {
    setAttendanceStatus('checked-in');
    setIsQRScannerOpen(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Fast access to common tasks</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          iconPosition="left"
          iconSize={16}
          className="text-xs"
        >
          Customize
        </Button>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className="group relative bg-surface rounded-lg p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border border-border hover:border-primary/20"
            onClick={action.action}
          >
            {/* Badge */}
            {action.badge && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full animate-bounce-gentle">
                {action.badge}
              </div>
            )}

            {/* Icon */}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color} group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={action.icon} size={24} color="white" />
            </div>

            {/* Content */}
            <div>
              <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                {action.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                {action.description}
              </p>
              
              {/* Keyboard Shortcut */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono bg-muted/20 px-2 py-1 rounded">
                  {action.shortcut}
                </span>
                <Icon name="ArrowRight" size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
          </div>
        ))}
      </div>

      {/* QR Scanner Modal */}
      {isQRScannerOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md animate-modal-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Attendance Check-in</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsQRScannerOpen(false)}
                className="w-6 h-6"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            {/* QR Scanner Simulation */}
            <div className="bg-surface rounded-lg p-8 text-center mb-4">
              <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
                <Icon name="QrCode" size={48} className="text-primary animate-pulse" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Position the QR code within the frame to scan
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleQRScan}
                  iconName="Scan"
                  iconPosition="left"
                  iconSize={16}
                  className="flex-1"
                >
                  Simulate Scan
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleManualCheckIn}
                  iconName="MapPin"
                  iconPosition="left"
                  iconSize={16}
                  className="flex-1"
                >
                  Manual Check-in
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Having trouble? Use manual check-in or contact your teacher
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Actions */}
      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Clock" size={16} className="mr-2 text-muted-foreground" />
          Recent Actions
        </h3>
        <div className="space-y-2">
          {recentActions.map((recent, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/5 transition-colors">
              <div className="flex items-center space-x-3">
                <Icon name={recent.icon} size={16} className={recent.color} />
                <span className="text-sm text-foreground">{recent.action}</span>
              </div>
              <span className="text-xs text-muted-foreground">{recent.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gamification Elements */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-yellow-400" />
            <span className="text-sm text-foreground">Daily Streak</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((day) => (
                <div
                  key={day}
                  className={`w-2 h-2 rounded-full ${
                    day <= 3 ? 'bg-yellow-400' : 'bg-muted'
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">3 days</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Complete 2 more actions today to maintain your streak!
        </p>
      </div>
    </div>
  );
};

export default QuickActionsPanel;