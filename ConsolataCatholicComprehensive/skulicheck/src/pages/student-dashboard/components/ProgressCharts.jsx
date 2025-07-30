import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressCharts = () => {
  const [selectedChart, setSelectedChart] = useState('grades');

  // Mock data for different charts
  const gradeData = [
    { month: 'Sep', math: 85, english: 78, science: 92, history: 75 },
    { month: 'Oct', math: 88, english: 82, science: 89, history: 78 },
    { month: 'Nov', math: 90, english: 85, science: 94, history: 82 },
    { month: 'Dec', math: 87, english: 88, science: 91, history: 85 },
    { month: 'Jan', math: 92, english: 90, science: 96, history: 88 },
    { month: 'Feb', math: 89, english: 87, science: 93, history: 86 },
    { month: 'Mar', math: 94, english: 92, science: 98, history: 90 }
  ];

  const attendanceData = [
    { week: 'Week 1', attendance: 100 },
    { week: 'Week 2', attendance: 95 },
    { week: 'Week 3', attendance: 100 },
    { week: 'Week 4', attendance: 90 },
    { week: 'Week 5', attendance: 100 },
    { week: 'Week 6', attendance: 85 },
    { week: 'Week 7', attendance: 95 },
    { week: 'Week 8', attendance: 100 }
  ];

  const assignmentData = [
    { subject: 'Mathematics', completed: 18, total: 20 },
    { subject: 'English', completed: 15, total: 16 },
    { subject: 'Science', completed: 22, total: 24 },
    { subject: 'History', completed: 12, total: 14 },
    { subject: 'PE', completed: 10, total: 10 }
  ];

  const skillsData = [
    { name: 'Problem Solving', value: 85, color: '#3B82F6' },
    { name: 'Communication', value: 78, color: '#10B981' },
    { name: 'Creativity', value: 92, color: '#8B5CF6' },
    { name: 'Teamwork', value: 88, color: '#F59E0B' },
    { name: 'Leadership', value: 75, color: '#EF4444' }
  ];

  const chartOptions = [
    { key: 'grades', label: 'Grade Trends', icon: 'TrendingUp', description: 'Track your academic progress' },
    { key: 'attendance', label: 'Attendance', icon: 'Calendar', description: 'Weekly attendance rates' },
    { key: 'assignments', label: 'Assignments', icon: 'FileText', description: 'Completion status by subject' },
    { key: 'skills', label: 'Skills', icon: 'Target', description: 'Personal skill development' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
              {selectedChart === 'grades' && '%'}
              {selectedChart === 'attendance' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'grades':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="math" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="english" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="science" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="history" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'attendance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="attendance" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'assignments':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assignmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="subject" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completed" fill="#3B82F6" />
              <Bar dataKey="total" fill="#E5E7EB" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'skills':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillsData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {skillsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getChartStats = () => {
    switch (selectedChart) {
      case 'grades':
        const latestGrades = gradeData[gradeData.length - 1];
        const avgGrade = Math.round((latestGrades.math + latestGrades.english + latestGrades.science + latestGrades.history) / 4);
        return [
          { label: 'Average Grade', value: `${avgGrade}%`, icon: 'Award', color: 'text-primary' },
          { label: 'Best Subject', value: 'Science', icon: 'TrendingUp', color: 'text-success' },
          { label: 'Improvement', value: '+5%', icon: 'ArrowUp', color: 'text-accent' }
        ];

      case 'attendance':
        const avgAttendance = Math.round(attendanceData.reduce((sum, item) => sum + item.attendance, 0) / attendanceData.length);
        return [
          { label: 'Average', value: `${avgAttendance}%`, icon: 'Calendar', color: 'text-primary' },
          { label: 'Perfect Days', value: '5', icon: 'CheckCircle', color: 'text-success' },
          { label: 'This Week', value: '100%', icon: 'Clock', color: 'text-accent' }
        ];

      case 'assignments':
        const totalCompleted = assignmentData.reduce((sum, item) => sum + item.completed, 0);
        const totalAssignments = assignmentData.reduce((sum, item) => sum + item.total, 0);
        const completionRate = Math.round((totalCompleted / totalAssignments) * 100);
        return [
          { label: 'Completion Rate', value: `${completionRate}%`, icon: 'FileText', color: 'text-primary' },
          { label: 'Completed', value: totalCompleted, icon: 'CheckCircle', color: 'text-success' },
          { label: 'Pending', value: totalAssignments - totalCompleted, icon: 'Clock', color: 'text-warning' }
        ];

      case 'skills':
        const avgSkill = Math.round(skillsData.reduce((sum, skill) => sum + skill.value, 0) / skillsData.length);
        const topSkill = skillsData.reduce((prev, current) => (prev.value > current.value) ? prev : current);
        return [
          { label: 'Average Score', value: `${avgSkill}%`, icon: 'Target', color: 'text-primary' },
          { label: 'Top Skill', value: topSkill.name, icon: 'Star', color: 'text-success' },
          { label: 'Growth', value: '+8%', icon: 'TrendingUp', color: 'text-accent' }
        ];

      default:
        return [];
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Progress Analytics</h2>
            <p className="text-sm text-muted-foreground">Track your academic journey</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="Download"
          iconPosition="left"
          iconSize={16}
          className="text-xs"
        >
          Export Data
        </Button>
      </div>

      {/* Chart Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => setSelectedChart(option.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedChart === option.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-muted-foreground hover:text-foreground hover:bg-muted/10'
            }`}
          >
            <Icon name={option.icon} size={16} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Chart Description */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {chartOptions.find(option => option.key === selectedChart)?.description}
        </p>
      </div>

      {/* Chart Container */}
      <div className="mb-6">
        {renderChart()}
      </div>

      {/* Chart Statistics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        {getChartStats().map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Legend for Grade Chart */}
      {selectedChart === 'grades' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">Mathematics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">English</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">Science</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">History</span>
            </div>
          </div>
        </div>
      )}

      {/* Goal Setting */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Academic Goals</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
            className="text-xs"
          >
            Set Goal
          </Button>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between p-2 bg-surface rounded-lg">
            <span className="text-sm text-foreground">Maintain 90%+ in Science</span>
            <span className="text-xs text-success">On Track</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-surface rounded-lg">
            <span className="text-sm text-foreground">Improve Math grade to A</span>
            <span className="text-xs text-warning">In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;