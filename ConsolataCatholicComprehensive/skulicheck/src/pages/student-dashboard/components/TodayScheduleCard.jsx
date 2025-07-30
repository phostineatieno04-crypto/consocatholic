import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TodayScheduleCard = () => {
  const [currentTime] = useState(new Date());
  
  const todaySchedule = [
    {
      id: 1,
      subject: "Mathematics",
      teacher: "Mrs. Johnson",
      time: "08:00 - 08:45",
      room: "Room 101",
      status: "completed",
      assignment: "Algebra Quiz Due",
      color: "bg-blue-500"
    },
    {
      id: 2,
      subject: "English Literature",
      teacher: "Mr. Smith",
      time: "09:00 - 09:45",
      room: "Room 205",
      status: "current",
      assignment: "Essay Draft",
      color: "bg-green-500"
    },
    {
      id: 3,
      subject: "Science",
      teacher: "Dr. Wilson",
      time: "10:15 - 11:00",
      room: "Lab 3",
      status: "upcoming",
      assignment: "Lab Report",
      color: "bg-purple-500"
    },
    {
      id: 4,
      subject: "History",
      teacher: "Ms. Davis",
      time: "11:15 - 12:00",
      room: "Room 302",
      status: "upcoming",
      assignment: null,
      color: "bg-orange-500"
    },
    {
      id: 5,
      subject: "Physical Education",
      teacher: "Coach Brown",
      time: "13:00 - 13:45",
      room: "Gymnasium",
      status: "upcoming",
      assignment: null,
      color: "bg-red-500"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'current':
        return <Icon name="Play" size={16} className="text-primary animate-pulse" />;
      case 'upcoming':
        return <Icon name="Clock" size={16} className="text-muted-foreground" />;
      default:
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'current':
        return 'bg-primary/10 text-primary border-primary/20 animate-pulse-scanner';
      case 'upcoming':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Today's Schedule</h2>
            <p className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadge('current')}`}>
            In Progress
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {todaySchedule.map((class_, index) => (
          <div 
            key={class_.id} 
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
              class_.status === 'current' ?'bg-primary/5 border-primary/20' :'bg-surface border-border hover:bg-muted/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(class_.status)}
                  <div className={`w-3 h-3 rounded-full ${class_.color}`}></div>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{class_.subject}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Icon name="User" size={14} className="mr-1" />
                      {class_.teacher}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {class_.room}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{class_.time}</p>
                {class_.assignment && (
                  <p className="text-xs text-warning flex items-center mt-1">
                    <Icon name="AlertCircle" size={12} className="mr-1" />
                    {class_.assignment}
                  </p>
                )}
              </div>
            </div>

            {class_.status === 'current' && (
              <div className="mt-3 pt-3 border-t border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="text-sm text-foreground">Navigate to {class_.room}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-xs hover:bg-primary/90 transition-colors">
                      Join Class
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Quick Actions</p>
          <div className="flex space-x-2">
            <button className="p-2 bg-surface rounded-lg hover:bg-muted/10 transition-colors" title="View Full Schedule">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
            </button>
            <button className="p-2 bg-surface rounded-lg hover:bg-muted/10 transition-colors" title="Set Reminder">
              <Icon name="Bell" size={16} className="text-muted-foreground" />
            </button>
            <button className="p-2 bg-surface rounded-lg hover:bg-muted/10 transition-colors" title="Download Schedule">
              <Icon name="Download" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayScheduleCard;