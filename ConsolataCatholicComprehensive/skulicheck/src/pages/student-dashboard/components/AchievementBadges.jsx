import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = () => {
  const [selectedCategory, setSelectedCategory] = useState('recent');

  const achievements = {
    recent: [
      {
        id: 1,
        title: "Perfect Attendance",
        description: "Attended all classes this week",
        icon: "Calendar",
        color: "bg-green-500",
        earned: true,
        earnedDate: "2024-07-28",
        points: 50,
        rarity: "common"
      },
      {
        id: 2,
        title: "Math Wizard",
        description: "Scored 95+ on 3 consecutive math tests",
        icon: "Calculator",
        color: "bg-blue-500",
        earned: true,
        earnedDate: "2024-07-25",
        points: 100,
        rarity: "rare"
      },
      {
        id: 3,
        title: "Team Player",
        description: "Excellent collaboration in group projects",
        icon: "Users",
        color: "bg-purple-500",
        earned: true,
        earnedDate: "2024-07-22",
        points: 75,
        rarity: "uncommon"
      }
    ],
    academic: [
      {
        id: 4,
        title: "Honor Roll",
        description: "Maintained GPA above 3.5 for semester",
        icon: "Award",
        color: "bg-yellow-500",
        earned: true,
        earnedDate: "2024-07-20",
        points: 200,
        rarity: "epic"
      },
      {
        id: 5,
        title: "Science Star",
        description: "Outstanding performance in science lab",
        icon: "Microscope",
        color: "bg-cyan-500",
        earned: true,
        earnedDate: "2024-07-18",
        points: 80,
        rarity: "uncommon"
      },
      {
        id: 6,
        title: "Reading Champion",
        description: "Read 10 books this semester",
        icon: "BookOpen",
        color: "bg-indigo-500",
        earned: false,
        progress: 7,
        total: 10,
        points: 150,
        rarity: "rare"
      }
    ],
    behavior: [
      {
        id: 7,
        title: "Helpful Hand",
        description: "Helped classmates 20+ times",
        icon: "Heart",
        color: "bg-pink-500",
        earned: true,
        earnedDate: "2024-07-15",
        points: 60,
        rarity: "common"
      },
      {
        id: 8,
        title: "Leadership",
        description: "Led a successful class project",
        icon: "Crown",
        color: "bg-orange-500",
        earned: true,
        earnedDate: "2024-07-10",
        points: 120,
        rarity: "rare"
      }
    ]
  };

  const categories = [
    { key: 'recent', label: 'Recent', icon: 'Clock' },
    { key: 'academic', label: 'Academic', icon: 'BookOpen' },
    { key: 'behavior', label: 'Behavior', icon: 'Heart' }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-400 border-gray-400/20';
      case 'uncommon':
        return 'text-green-400 border-green-400/20';
      case 'rare':
        return 'text-blue-400 border-blue-400/20';
      case 'epic':
        return 'text-purple-400 border-purple-400/20';
      case 'legendary':
        return 'text-yellow-400 border-yellow-400/20';
      default:
        return 'text-gray-400 border-gray-400/20';
    }
  };

  const totalPoints = Object.values(achievements)
    .flat()
    .filter(achievement => achievement.earned)
    .reduce((sum, achievement) => sum + achievement.points, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="Trophy" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
            <p className="text-sm text-muted-foreground">{totalPoints} total points earned</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-lg font-bold text-secondary">{totalPoints}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
            }`}
          >
            <Icon name={category.icon} size={16} />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements[selectedCategory].map((achievement) => (
          <div
            key={achievement.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
              achievement.earned
                ? `${getRarityColor(achievement.rarity)} bg-gradient-to-br from-transparent to-muted/5`
                : 'border-muted/20 bg-muted/5 opacity-60'
            }`}
          >
            {/* Rarity Indicator */}
            <div className="absolute top-2 right-2">
              <span className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(achievement.rarity)} bg-background/80`}>
                {achievement.rarity}
              </span>
            </div>

            {/* Achievement Icon */}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
              achievement.earned ? achievement.color : 'bg-muted'
            }`}>
              <Icon 
                name={achievement.icon} 
                size={24} 
                color={achievement.earned ? "white" : "var(--color-muted-foreground)"} 
              />
            </div>

            {/* Achievement Info */}
            <div>
              <h3 className={`font-semibold mb-1 ${
                achievement.earned ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {achievement.description}
              </p>

              {/* Progress or Earned Date */}
              {achievement.earned ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                  </span>
                  <span className="text-sm font-medium text-secondary">
                    +{achievement.points} pts
                  </span>
                </div>
              ) : achievement.progress !== undefined ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs text-muted-foreground">
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Icon name="Lock" size={20} className="text-muted-foreground mx-auto" />
                  <p className="text-xs text-muted-foreground mt-1">Locked</p>
                </div>
              )}
            </div>

            {/* Celebration Animation for Recent Achievements */}
            {achievement.earned && selectedCategory === 'recent' && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Achievement Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">
              {Object.values(achievements).flat().filter(a => a.earned).length}
            </p>
            <p className="text-xs text-muted-foreground">Earned</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              {Object.values(achievements).flat().length}
            </p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              {Math.round((Object.values(achievements).flat().filter(a => a.earned).length / Object.values(achievements).flat().length) * 100)}%
            </p>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;