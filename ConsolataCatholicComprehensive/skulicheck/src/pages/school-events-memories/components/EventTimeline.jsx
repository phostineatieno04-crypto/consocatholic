import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import EventCard from './EventCard';

const EventTimeline = ({ events, onEventSelect, onShare }) => {
  const [expandedMonths, setExpandedMonths] = useState(new Set(['2024-01']));

  // Group events by month and year
  const groupEventsByMonth = (events) => {
    const grouped = {};
    events.forEach(event => {
      const date = new Date(event.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          month: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          events: []
        };
      }
      grouped[monthKey].events.push(event);
    });
    
    // Sort events within each month by date (newest first)
    Object.keys(grouped).forEach(monthKey => {
      grouped[monthKey].events.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    
    return grouped;
  };

  const groupedEvents = groupEventsByMonth(events);
  const sortedMonthKeys = Object.keys(groupedEvents).sort().reverse();

  const toggleMonth = (monthKey) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(monthKey)) {
      newExpanded.delete(monthKey);
    } else {
      newExpanded.add(monthKey);
    }
    setExpandedMonths(newExpanded);
  };

  const expandAll = () => {
    setExpandedMonths(new Set(sortedMonthKeys));
  };

  const collapseAll = () => {
    setExpandedMonths(new Set());
  };

  const getMonthStats = (monthEvents) => {
    const totalPhotos = monthEvents.reduce((sum, event) => sum + (event.mediaCount || 0), 0);
    const categories = [...new Set(monthEvents.map(event => event.category))];
    return { totalPhotos, categories: categories.length };
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Calendar" size={64} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Events Found</h3>
        <p className="text-muted-foreground mb-4">
          No events match your current filters. Try adjusting your search criteria.
        </p>
        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
          onClick={() => window.location.reload()}
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Event Timeline</h3>
          <span className="text-sm text-muted-foreground">
            ({events.length} events)
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={expandAll}
            iconName="ChevronDown"
            iconPosition="left"
            iconSize={14}
            className="text-xs"
          >
            Expand All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={collapseAll}
            iconName="ChevronUp"
            iconPosition="left"
            iconSize={14}
            className="text-xs"
          >
            Collapse All
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {sortedMonthKeys.map((monthKey, monthIndex) => {
            const monthData = groupedEvents[monthKey];
            const isExpanded = expandedMonths.has(monthKey);
            const stats = getMonthStats(monthData.events);

            return (
              <div key={monthKey} className="relative">
                {/* Month Header */}
                <div className="flex items-center space-x-4 mb-4">
                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-16 h-16 bg-primary rounded-full items-center justify-center flex-shrink-0 relative z-10">
                    <Icon name="Calendar" size={24} color="white" />
                  </div>

                  {/* Month Info */}
                  <div className="flex-1 bg-card border border-border rounded-lg p-4 card-elevation">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {monthData.month}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} />
                            <span>{monthData.events.length} events</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Images" size={14} />
                            <span>{stats.totalPhotos} photos</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Tag" size={14} />
                            <span>{stats.categories} categories</span>
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleMonth(monthKey)}
                        iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                        iconPosition="right"
                        iconSize={16}
                        className="text-sm"
                      >
                        {isExpanded ? 'Hide' : 'Show'} Events
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Month Events */}
                {isExpanded && (
                  <div className="ml-0 md:ml-20 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {monthData.events.map((event, eventIndex) => (
                        <div
                          key={event.id}
                          className="animate-fade-in"
                          style={{ animationDelay: `${eventIndex * 100}ms` }}
                        >
                          <EventCard
                            event={event}
                            onViewDetails={onEventSelect}
                            onShare={() => onShare(event)}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Month Summary */}
                    <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Month Summary:</span>
                          <span>{monthData.events.length} events documented</span>
                          <span>{stats.totalPhotos} memories captured</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Download"
                          iconPosition="left"
                          iconSize={14}
                          className="text-xs"
                          onClick={() => console.log('Download month archive')}
                        >
                          Download Archive
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Connection Line to Next Month */}
                {monthIndex < sortedMonthKeys.length - 1 && (
                  <div className="hidden md:block absolute left-8 -bottom-4 w-0.5 h-8 bg-border"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Timeline End */}
        <div className="hidden md:flex items-center justify-center mt-8">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Flag" size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button
          variant="outline"
          iconName="ChevronDown"
          iconPosition="right"
          iconSize={16}
          onClick={() => console.log('Load more events')}
        >
          Load Earlier Events
        </Button>
      </div>
    </div>
  );
};

export default EventTimeline;