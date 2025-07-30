import React from 'react';
import Icon from '../../../components/AppIcon';

const AcademicOverviewCard = () => {
  const academicData = {
    currentGPA: 3.8,
    totalCredits: 24,
    completedAssignments: 45,
    pendingAssignments: 8,
    attendanceRate: 92,
    currentSemester: "Fall 2024",
    subjects: [
      { name: "Mathematics", grade: "A-", progress: 85, color: "bg-blue-500" },
      { name: "English Literature", grade: "B+", progress: 78, color: "bg-green-500" },
      { name: "Science", grade: "A", progress: 92, color: "bg-purple-500" },
      { name: "History", grade: "B", progress: 75, color: "bg-orange-500" },
      { name: "Physical Education", grade: "A+", progress: 95, color: "bg-red-500" }
    ]
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'text-green-400';
    if (grade.includes('B')) return 'text-blue-400';
    if (grade.includes('C')) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="BookOpen" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Academic Overview</h2>
            <p className="text-sm text-muted-foreground">{academicData.currentSemester}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{academicData.currentGPA}</p>
          <p className="text-xs text-muted-foreground">Current GPA</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface rounded-lg p-4 text-center">
          <Icon name="Award" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-lg font-semibold text-foreground">{academicData.totalCredits}</p>
          <p className="text-xs text-muted-foreground">Total Credits</p>
        </div>
        <div className="bg-surface rounded-lg p-4 text-center">
          <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
          <p className="text-lg font-semibold text-foreground">{academicData.completedAssignments}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        <div className="bg-surface rounded-lg p-4 text-center">
          <Icon name="Clock" size={24} className="text-warning mx-auto mb-2" />
          <p className="text-lg font-semibold text-foreground">{academicData.pendingAssignments}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
        <div className="bg-surface rounded-lg p-4 text-center">
          <Icon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
          <p className="text-lg font-semibold text-foreground">{academicData.attendanceRate}%</p>
          <p className="text-xs text-muted-foreground">Attendance</p>
        </div>
      </div>

      {/* Subject Progress */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="TrendingUp" size={18} className="mr-2 text-primary" />
          Subject Progress
        </h3>
        <div className="space-y-4">
          {academicData.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-muted/5 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                <div>
                  <p className="font-medium text-foreground">{subject.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${subject.color}`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{subject.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${getGradeColor(subject.grade)}`}>{subject.grade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicOverviewCard;