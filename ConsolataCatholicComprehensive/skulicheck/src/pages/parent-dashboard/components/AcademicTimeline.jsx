import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AcademicTimeline = ({ timelineData, onViewDetails }) => {
  const [selectedChild, setSelectedChild] = useState('all');
  const [dateRange, setDateRange] = useState('week');

  const dateRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const getEventIcon = (type) => {
    const icons = {
      grade: 'Award',
      assignment: 'FileText',
      attendance: 'CheckSquare',
      behavior: 'Star',
      event: 'Calendar',
      milestone: 'Trophy',
      meeting: 'Users'
    };
    return icons[type] || 'Circle';
  };

  const getEventColor = (type, status) => {
    if (status === 'negative') return 'text-error bg-error/10 border-error/20';
    if (status === 'positive') return 'text-accent bg-accent/10 border-accent/20';
    
    const colors = {
      grade: 'text-primary bg-primary/10 border-primary/20',
      assignment: 'text-secondary bg-secondary/10 border-secondary/20',
      attendance: 'text-accent bg-accent/10 border-accent/20',
      behavior: 'text-warning bg-warning/10 border-warning/20',
      event: 'text-primary bg-primary/10 border-primary/20',
      milestone: 'text-accent bg-accent/10 border-accent/20',
      meeting: 'text-secondary bg-secondary/10 border-secondary/20'
    };
    return colors[type] || 'text-muted-foreground bg-muted/10 border-muted/20';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTimeline = timelineData.filter(item => 
    selectedChild === 'all' || item.childId === selectedChild
  );

  const groupedTimeline = filteredTimeline.reduce((groups, item) => {
    const date = new Date(item.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  return (
    <div className="bg-card border border-border rounded-lg card-elevation">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Academic Timeline</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails('timeline')}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
            className="text-xs"
          >
            View All
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Child Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-muted-foreground">Child:</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="bg-input border border-border rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Children</option>
              <option value="child1">Emma Johnson</option>
              <option value="child2">Liam Johnson</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-muted-foreground">Period:</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-input border border-border rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-h-96 overflow-y-auto">
        {Object.keys(groupedTimeline).length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No timeline data</p>
            <p className="text-sm text-muted-foreground mt-1">Check back later for updates</p>
          </div>
        ) : (
          <div className="p-6">
            {Object.entries(groupedTimeline).map(([date, events]) => (
              <div key={date} className="mb-6">
                {/* Date Header */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <h4 className="font-medium text-foreground">
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h4>
                </div>

                {/* Events */}
                <div className="space-y-3 ml-4">
                  {events.map((event) => (
                    <div key={event.id} className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-4"></div>
                      
                      {/* Event */}
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${getEventColor(event.type, event.status)}`}>
                          <Icon name={getEventIcon(event.type)} size={14} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="text-sm font-medium text-foreground">{event.title}</h5>
                              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                              
                              {/* Child Info */}
                              {event.childName && selectedChild === 'all' && (
                                <div className="flex items-center space-x-1 mt-2">
                                  <Icon name="User" size={12} className="text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">{event.childName}</span>
                                </div>
                              )}

                              {/* Additional Details */}
                              {event.details && (
                                <div className="mt-2 p-2 bg-muted/10 rounded text-xs text-muted-foreground">
                                  {event.details}
                                </div>
                              )}
                            </div>

                            {/* Timestamp */}
                            <span className="text-xs text-muted-foreground ml-2">
                              {formatDate(event.timestamp)}
                            </span>
                          </div>

                          {/* Actions */}
                          {event.actions && event.actions.length > 0 && (
                            <div className="flex space-x-2 mt-3">
                              {event.actions.map((action, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={action.onClick}
                                  iconName={action.icon}
                                  iconPosition="left"
                                  iconSize={12}
                                  className="text-xs"
                                >
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicTimeline;