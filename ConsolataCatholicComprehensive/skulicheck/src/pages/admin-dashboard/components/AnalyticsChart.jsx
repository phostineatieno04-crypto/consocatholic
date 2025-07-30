import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsChart = () => {
  const [activeChart, setActiveChart] = useState('enrollment');

  const enrollmentData = [
    { month: 'Jan', students: 1200, teachers: 45, staff: 25 },
    { month: 'Feb', students: 1250, teachers: 47, staff: 26 },
    { month: 'Mar', students: 1180, teachers: 46, staff: 25 },
    { month: 'Apr', students: 1320, teachers: 48, staff: 27 },
    { month: 'May', students: 1280, teachers: 49, staff: 28 },
    { month: 'Jun', students: 1350, teachers: 50, staff: 29 }
  ];

  const attendanceData = [
    { day: 'Mon', rate: 95 },
    { day: 'Tue', rate: 92 },
    { day: 'Wed', rate: 88 },
    { day: 'Thu', rate: 94 },
    { day: 'Fri', rate: 89 },
    { day: 'Sat', rate: 85 }
  ];

  const financialData = [
    { name: 'Tuition Fees', value: 450000, color: '#3B82F6' },
    { name: 'Activity Fees', value: 85000, color: '#10B981' },
    { name: 'Transport Fees', value: 120000, color: '#8B5CF6' },
    { name: 'Other Fees', value: 45000, color: '#F59E0B' }
  ];

  const chartTypes = [
    { id: 'enrollment', label: 'Enrollment Trends', icon: 'TrendingUp' },
    { id: 'attendance', label: 'Attendance Rates', icon: 'Users' },
    { id: 'financial', label: 'Fee Collection', icon: 'DollarSign' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'enrollment':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Bar dataKey="students" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="teachers" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'attendance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                domain={[80, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="var(--color-accent)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: 'var(--color-accent)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'financial':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={financialData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {financialData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const getChartSummary = () => {
    switch (activeChart) {
      case 'enrollment':
        return {
          title: 'Total Enrollment Growth',
          value: '+8.5%',
          description: 'Compared to last semester'
        };
      case 'attendance':
        return {
          title: 'Average Attendance Rate',
          value: '90.5%',
          description: 'This week performance'
        };
      case 'financial':
        return {
          title: 'Total Fee Collection',
          value: '$700K',
          description: 'Current academic year'
        };
      default:
        return { title: '', value: '', description: '' };
    }
  };

  const summary = getChartSummary();

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Analytics Overview</h3>
        </div>
        <div className="flex items-center space-x-1">
          {chartTypes.map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeChart === chart.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
              }`}
            >
              <Icon name={chart.icon} size={16} />
              <span className="hidden sm:inline">{chart.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-foreground">{summary.title}</h4>
            <p className="text-2xl font-bold text-primary mt-1">{summary.value}</p>
            <p className="text-sm text-muted-foreground">{summary.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Download" size={16} />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Share" size={16} />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="MoreHorizontal" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        {renderChart()}
      </div>

      {activeChart === 'financial' && (
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {financialData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <p className="text-xs text-muted-foreground">{item.name}</p>
                <p className="text-sm font-medium text-foreground">
                  ${item.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;