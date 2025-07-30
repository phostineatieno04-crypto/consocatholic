import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingEvents = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: '2025-01-30',
      time: '09:00 AM',
      type: 'meeting',
      location: 'Main Auditorium',
      attendees: 45,
      status: 'confirmed',
      color: 'primary'
    },
    {
      id: 2,
      title: 'Science Fair Exhibition',
      date: '2025-02-02',
      time: '10:00 AM',
      type: 'event',
      location: 'Science Lab',
      attendees: 120,
      status: 'confirmed',
      color: 'accent'
    },
    {
      id: 3,
      title: 'Monthly Staff Meeting',
      date: '2025-02-05',
      time: '02:00 PM',
      type: 'meeting',
      location: 'Conference Room',
      attendees: 25,
      status: 'pending',
      color: 'warning'
    },
    {
      id: 4,
      title: 'Sports Day Preparation',
      date: '2025-02-08',
      time: '08:00 AM',
      type: 'preparation',
      location: 'Sports Ground',
      attendees: 80,
      status: 'confirmed',
      color: 'secondary'
    },
    {
      id: 5,
      title: 'Annual Day Rehearsal',
      date: '2025-02-12',
      time: '04:00 PM',
      type: 'rehearsal',
      location: 'Main Hall',
      attendees: 200,
      status: 'confirmed',
      color: 'primary'
    }
  ];

  const getEventIcon = (type) => {
    const icons = {
      meeting: 'Users',
      event: 'Calendar',
      preparation: 'Settings',
      rehearsal: 'Music'
    };
    return icons[type] || 'Calendar';
  };

  const getEventColor = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-l-primary',
      accent: 'bg-accent/10 text-accent border-l-accent',
      warning: 'bg-warning/10 text-warning border-l-warning',
      secondary: 'bg-secondary/10 text-secondary border-l-secondary'
    };
    return colors[color] || colors.primary;
  };

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: 'bg-accent/10 text-accent',
      pending: 'bg-warning/10 text-warning',
      cancelled: 'bg-error/10 text-error'
    };
    return badges[status] || badges.confirmed;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Upcoming Events</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Add Event
          </button>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View Calendar
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div 
            key={event.id} 
            className={`border-l-4 rounded-lg p-4 hover:shadow-md transition-all duration-200 ${getEventColor(event.color)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventColor(event.color).split(' ')[0]} ${getEventColor(event.color).split(' ')[1]}`}>
                  <Icon name={getEventIcon(event.type)} size={18} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={12} />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={12} />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Icon name="MoreHorizontal" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {events.length} events this month
          </span>
          <button className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-1">
            <Icon name="Plus" size={14} />
            <span>Schedule Event</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;