import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChildProfileCard = ({ child, onMessageTeacher, onViewDetails }) => {
  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-accent';
    if (percentage >= 75) return 'text-warning';
    return 'text-error';
  };

  const getGradeTrend = (trend) => {
    const trends = {
      up: { icon: 'TrendingUp', color: 'text-accent' },
      down: { icon: 'TrendingDown', color: 'text-error' },
      stable: { icon: 'Minus', color: 'text-muted-foreground' }
    };
    return trends[trend] || trends.stable;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={child.avatar}
              alt={child.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
              child.isPresent ? 'bg-accent' : 'bg-muted'
            }`}></div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{child.name}</h3>
            <p className="text-sm text-muted-foreground">{child.class} • {child.section}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewDetails(child.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="MoreVertical" size={16} />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Attendance */}
        <div className="text-center">
          <div className={`text-2xl font-bold ${getAttendanceColor(child.attendance.percentage)}`}>
            {child.attendance.percentage}%
          </div>
          <p className="text-xs text-muted-foreground">Attendance</p>
          <p className="text-xs text-muted-foreground mt-1">
            {child.attendance.present}/{child.attendance.total} days
          </p>
        </div>

        {/* Recent Grade */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-2xl font-bold text-foreground">{child.recentGrade.score}</span>
            <Icon 
              name={getGradeTrend(child.recentGrade.trend).icon} 
              size={16} 
              className={getGradeTrend(child.recentGrade.trend).color}
            />
          </div>
          <p className="text-xs text-muted-foreground">{child.recentGrade.subject}</p>
          <p className="text-xs text-muted-foreground mt-1">{child.recentGrade.date}</p>
        </div>
      </div>

      {/* Quick Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${child.isPresent ? 'bg-accent' : 'bg-error'}`}></div>
          <span className="text-sm text-muted-foreground">
            {child.isPresent ? 'Present Today' : 'Absent Today'}
          </span>
        </div>
        {child.hasNewUpdates && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-scanner"></div>
            <span className="text-xs text-primary">New Updates</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMessageTeacher(child.id)}
          iconName="MessageSquare"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Message Teacher
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(child.id)}
          iconName="Eye"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ChildProfileCard;