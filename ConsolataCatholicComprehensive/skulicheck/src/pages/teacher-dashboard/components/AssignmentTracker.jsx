import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentTracker = () => {
  const [filter, setFilter] = useState('all');

  const assignments = [
    {
      id: 1,
      title: "Quadratic Equations Worksheet",
      subject: "Mathematics",
      grade: "Grade 10-A",
      dueDate: "2025-07-30",
      submittedCount: 28,
      totalStudents: 32,
      status: "active",
      priority: "high",
      createdDate: "2025-07-25"
    },
    {
      id: 2,
      title: "Newton\'s Laws Lab Report",
      subject: "Physics",
      grade: "Grade 11-B",
      dueDate: "2025-08-02",
      submittedCount: 15,
      totalStudents: 28,
      status: "active",
      priority: "medium",
      createdDate: "2025-07-20"
    },
    {
      id: 3,
      title: "Algebra Practice Problems",
      subject: "Mathematics",
      grade: "Grade 9-C",
      dueDate: "2025-07-29",
      submittedCount: 30,
      totalStudents: 30,
      status: "completed",
      priority: "low",
      createdDate: "2025-07-22"
    },
    {
      id: 4,
      title: "Thermodynamics Chapter Review",
      subject: "Physics",
      grade: "Grade 12-A",
      dueDate: "2025-08-05",
      submittedCount: 8,
      totalStudents: 24,
      status: "active",
      priority: "medium",
      createdDate: "2025-07-28"
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    if (filter === 'pending') return assignment.status === 'active';
    if (filter === 'completed') return assignment.status === 'completed';
    if (filter === 'overdue') {
      const today = new Date();
      const dueDate = new Date(assignment.dueDate);
      return dueDate < today && assignment.status === 'active';
    }
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getSubmissionProgress = (submitted, total) => {
    return Math.round((submitted / total) * 100);
  };

  const isOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCreateAssignment = () => {
    console.log('Creating new assignment');
  };

  const handleViewSubmissions = (assignment) => {
    console.log('Viewing submissions for:', assignment.title);
  };

  const handleGradeAssignment = (assignment) => {
    console.log('Grading assignment:', assignment.title);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Assignment Tracker</h3>
            <p className="text-sm text-muted-foreground">Manage homework and submissions</p>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={handleCreateAssignment}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          New Assignment
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-6 bg-muted/10 p-1 rounded-lg">
        {[
          { key: 'all', label: 'All', count: assignments.length },
          { key: 'pending', label: 'Active', count: assignments.filter(a => a.status === 'active').length },
          { key: 'completed', label: 'Completed', count: assignments.filter(a => a.status === 'completed').length },
          { key: 'overdue', label: 'Overdue', count: assignments.filter(a => isOverdue(a.dueDate) && a.status === 'active').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              filter === tab.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                filter === tab.key
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No assignments found</p>
            <p className="text-sm text-muted-foreground mt-1">Create your first assignment to get started</p>
          </div>
        ) : (
          filteredAssignments.map((assignment) => {
            const progress = getSubmissionProgress(assignment.submittedCount, assignment.totalStudents);
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);
            const overdue = isOverdue(assignment.dueDate);

            return (
              <div
                key={assignment.id}
                className="p-4 rounded-lg border border-border bg-surface hover:bg-muted/5 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-foreground">{assignment.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="BookOpen" size={14} />
                        <span>{assignment.subject}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{assignment.grade}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewSubmissions(assignment)}
                      iconName="Eye"
                      iconPosition="left"
                      iconSize={14}
                      className="text-xs"
                    >
                      View
                    </Button>
                    {assignment.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGradeAssignment(assignment)}
                        iconName="Award"
                        iconPosition="left"
                        iconSize={14}
                        className="text-xs"
                      >
                        Grade
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Submissions</span>
                    <span className="text-foreground font-medium">
                      {assignment.submittedCount}/{assignment.totalStudents} ({progress}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        progress === 100 ? 'bg-accent' : progress >= 70 ? 'bg-primary' : 'bg-warning'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status and Due Date Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {assignment.status === 'completed' && (
                      <div className="flex items-center space-x-1 text-accent">
                        <Icon name="CheckCircle" size={16} />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                    {overdue && assignment.status === 'active' && (
                      <div className="flex items-center space-x-1 text-error">
                        <Icon name="AlertTriangle" size={16} />
                        <span className="text-sm font-medium">Overdue</span>
                      </div>
                    )}
                    {!overdue && assignment.status === 'active' && (
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Icon name="Clock" size={16} />
                        <span className="text-sm">
                          {daysUntilDue === 0 ? 'Due today' : 
                           daysUntilDue === 1 ? 'Due tomorrow' : 
                           `${daysUntilDue} days left`}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(assignment.createdDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-primary">{assignments.length}</p>
            <p className="text-xs text-muted-foreground">Total Assignments</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-warning">
              {assignments.filter(a => a.status === 'active').length}
            </p>
            <p className="text-xs text-muted-foreground">Active</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-error">
              {assignments.filter(a => isOverdue(a.dueDate) && a.status === 'active').length}
            </p>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-accent">
              {Math.round(assignments.reduce((acc, a) => acc + getSubmissionProgress(a.submittedCount, a.totalStudents), 0) / assignments.length) || 0}%
            </p>
            <p className="text-xs text-muted-foreground">Avg. Completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentTracker;