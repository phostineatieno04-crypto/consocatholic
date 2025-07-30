import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, color, description, trend }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      accent: 'bg-accent/10 text-accent border-accent/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      error: 'bg-error/10 text-error border-error/20',
      secondary: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors[colorType] || colors.primary;
  };

  const getChangeColor = (type) => {
    return type === 'increase' ? 'text-accent' : type === 'decrease' ? 'text-error' : 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
              <Icon name={icon} size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {change && (
                <>
                  <Icon 
                    name={changeType === 'increase' ? 'TrendingUp' : changeType === 'decrease' ? 'TrendingDown' : 'Minus'} 
                    size={16} 
                    className={getChangeColor(changeType)}
                  />
                  <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
                    {change}
                  </span>
                </>
              )}
            </div>
            {trend && (
              <div className="w-16 h-8 flex items-end space-x-1">
                {trend.map((point, index) => (
                  <div
                    key={index}
                    className={`w-2 rounded-t ${getColorClasses(color).split(' ')[0]} opacity-60`}
                    style={{ height: `${point}%` }}
                  />
                ))}
              </div>
            )}
          </div>
          
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;