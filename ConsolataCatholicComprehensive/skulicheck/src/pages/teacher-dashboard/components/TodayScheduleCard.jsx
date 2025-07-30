import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodayScheduleCard = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const todayClasses = [
    {
      id: 1,
      subject: "Mathematics",
      grade: "Grade 10-A",
      time: "09:00 - 09:45",
      room: "Room 201",
      studentCount: 32,
      attendanceStatus: "pending",
      attendanceCount: 0,
      isActive: true
    },
    {
      id: 2,
      subject: "Physics",
      grade: "Grade 11-B",
      time: "10:00 - 10:45",
      room: "Lab 1",
      studentCount: 28,
      attendanceStatus: "completed",
      attendanceCount: 26,
      isActive: false
    },
    {
      id: 3,
      subject: "Mathematics",
      grade: "Grade 9-C",
      time: "11:30 - 12:15",
      room: "Room 201",
      studentCount: 30,
      attendanceStatus: "pending",
      attendanceCount: 0,
      isActive: false
    },
    {
      id: 4,
      subject: "Advanced Physics",
      grade: "Grade 12-A",
      time: "14:00 - 14:45",
      room: "Lab 2",
      studentCount: 24,
      attendanceStatus: "pending",
      attendanceCount: 0,
      isActive: false
    }
  ];

  const handleTakeAttendance = (classItem) => {
    setSelectedClass(classItem);
    console.log('Taking attendance for:', classItem.subject, classItem.grade);
  };

  const handleQRAttendance = (classItem) => {
    console.log('Opening QR attendance for:', classItem.subject, classItem.grade);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-accent bg-accent/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'in-progress':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Today's Schedule</h3>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{getCurrentTime()}</p>
            <p className="text-xs text-muted-foreground">Current Time</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.reload()}
            title="Refresh schedule"
          >
            <Icon name="RefreshCw" size={18} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {todayClasses.map((classItem) => (
          <div
            key={classItem.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              classItem.isActive 
                ? 'border-primary bg-primary/5 shadow-md' 
                : 'border-border bg-surface hover:bg-muted/5'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  classItem.isActive ? 'bg-primary animate-pulse-scanner' : 'bg-muted'
                }`}></div>
                <div>
                  <h4 className="font-medium text-foreground">{classItem.subject}</h4>
                  <p className="text-sm text-muted-foreground">{classItem.grade}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem.attendanceStatus)}`}>
                {classItem.attendanceStatus === 'completed' ? 'Completed' : 
                 classItem.attendanceStatus === 'pending' ? 'Pending' : 'In Progress'}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{classItem.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{classItem.room}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{classItem.studentCount} students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckSquare" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {classItem.attendanceCount}/{classItem.studentCount} present
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {classItem.attendanceStatus === 'completed' && (
                  <div className="flex items-center space-x-1 text-accent">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-sm font-medium">Attendance Complete</span>
                  </div>
                )}
                {classItem.isActive && (
                  <div className="flex items-center space-x-1 text-primary">
                    <Icon name="Play" size={16} />
                    <span className="text-sm font-medium">Class in Session</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {classItem.attendanceStatus !== 'completed' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQRAttendance(classItem)}
                      iconName="QrCode"
                      iconPosition="left"
                      iconSize={16}
                      className="text-xs"
                    >
                      QR Code
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleTakeAttendance(classItem)}
                      iconName="CheckSquare"
                      iconPosition="left"
                      iconSize={16}
                      className="text-xs"
                    >
                      Take Attendance
                    </Button>
                  </>
                )}
                {classItem.attendanceStatus === 'completed' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => console.log('View attendance details')}
                    iconName="Eye"
                    iconPosition="left"
                    iconSize={16}
                    className="text-xs"
                  >
                    View Details
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{todayClasses.length}</p>
            <p className="text-xs text-muted-foreground">Total Classes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">
              {todayClasses.filter(c => c.attendanceStatus === 'completed').length}
            </p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">
              {todayClasses.filter(c => c.attendanceStatus === 'pending').length}
            </p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayScheduleCard;