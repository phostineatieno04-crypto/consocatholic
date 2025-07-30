import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onViewDetails, onShare }) => {
  const [isLiked, setIsLiked] = useState(event.isLiked || false);
  const [likeCount, setLikeCount] = useState(event.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'bg-primary text-primary-foreground',
      'Sports': 'bg-accent text-accent-foreground',
      'Cultural': 'bg-secondary text-secondary-foreground',
      'Field Trip': 'bg-warning text-warning-foreground',
      'Graduation': 'bg-error text-error-foreground'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden card-elevation hover:shadow-lg transition-all duration-300 animate-fade-in">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
        </div>

        {/* Media Count */}
        {event.mediaCount > 1 && (
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            <Icon name="Images" size={12} />
            <span>{event.mediaCount}</span>
          </div>
        )}

        {/* Video Indicator */}
        {event.hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Icon name="Play" size={24} className="text-primary ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-4">
        {/* Event Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-lg line-clamp-2 flex-1">
            {event.title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onShare}
            className="ml-2 flex-shrink-0"
          >
            <Icon name="Share2" size={16} />
          </Button>
        </div>

        {/* Event Description */}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {event.description}
        </p>

        {/* Event Meta */}
        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{event.participants} participants</span>
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{event.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? 'text-error' : 'text-muted-foreground'}`}
            >
              <Icon name={isLiked ? "Heart" : "Heart"} size={16} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-xs">{likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-muted-foreground"
            >
              <Icon name="MessageCircle" size={16} />
              <span className="text-xs">{event.comments || 0}</span>
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(event)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;