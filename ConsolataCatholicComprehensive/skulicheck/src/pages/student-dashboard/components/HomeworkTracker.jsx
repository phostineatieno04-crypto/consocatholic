import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HomeworkTracker = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Algebra Problem Set 5",
      subject: "Mathematics",
      dueDate: "2024-07-30",
      status: "pending",
      priority: "high",
      description: "Complete problems 1-20 from Chapter 5",
      estimatedTime: "2 hours",
      submissionType: "file",
      teacherName: "Mrs. Johnson",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Essay: Climate Change Impact",
      subject: "English Literature",
      dueDate: "2024-08-02",
      status: "in-progress",
      priority: "medium",
      description: "Write a 500-word essay on climate change effects",
      estimatedTime: "3 hours",
      submissionType: "text",
      teacherName: "Mr. Smith",
      color: "bg-green-500",
      progress: 60
    },
    {
      id: 3,
      title: "Lab Report: Chemical Reactions",
      subject: "Science",
      dueDate: "2024-08-05",
      status: "pending",
      priority: "medium",
      description: "Document findings from today\'s chemistry experiment",
      estimatedTime: "1.5 hours",
      submissionType: "file",
      teacherName: "Dr. Wilson",
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "History Timeline Project",
      subject: "History",
      dueDate: "2024-08-01",
      status: "submitted",
      priority: "low",
      description: "Create a timeline of World War II events",
      estimatedTime: "4 hours",
      submissionType: "presentation",
      teacherName: "Ms. Davis",
      color: "bg-orange-500",
      submittedDate: "2024-07-28",
      grade: "A-"
    },
    {
      id: 5,
      title: "Math Quiz Preparation",
      subject: "Mathematics",
      dueDate: "2024-07-31",
      status: "overdue",
      priority: "high",
      description: "Review chapters 4-6 for upcoming quiz",
      estimatedTime: "1 hour",
      submissionType: "quiz",
      teacherName: "Mrs. Johnson",
      color: "bg-blue-500"
    }
  ]);

  const filters = [
    { key: 'all', label: 'All', count: assignments.length },
    { key: 'pending', label: 'Pending', count: assignments.filter(a => a.status === 'pending').length },
    { key: 'in-progress', label: 'In Progress', count: assignments.filter(a => a.status === 'in-progress').length },
    { key: 'overdue', label: 'Overdue', count: assignments.filter(a => a.status === 'overdue').length },
    { key: 'submitted', label: 'Submitted', count: assignments.filter(a => a.status === 'submitted').length }
  ];

  const filteredAssignments = selectedFilter === 'all' 
    ? assignments 
    : assignments.filter(assignment => assignment.status === selectedFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'submitted':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'overdue':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSubmissionIcon = (type) => {
    switch (type) {
      case 'file':
        return 'FileText';
      case 'text':
        return 'Type';
      case 'presentation':
        return 'Presentation';
      case 'quiz':
        return 'HelpCircle';
      default:
        return 'FileText';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmitAssignment = (assignmentId) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, status: 'submitted', submittedDate: new Date().toISOString().split('T')[0] }
          : assignment
      )
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
            <Icon name="BookOpen" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Homework Tracker</h2>
            <p className="text-sm text-muted-foreground">
              {assignments.filter(a => a.status === 'pending' || a.status === 'in-progress').length} assignments pending
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          className="text-sm"
        >
          Add Assignment
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedFilter(filter.key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedFilter === filter.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-muted-foreground hover:text-foreground hover:bg-muted/10'
            }`}
          >
            {filter.label}
            {filter.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === filter.key
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No assignments in this category</p>
            <p className="text-sm text-muted-foreground mt-1">Great job staying on top of your work!</p>
          </div>
        ) : (
          filteredAssignments.map((assignment) => {
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);
            
            return (
              <div
                key={assignment.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  assignment.status === 'overdue' ?'bg-red-500/5 border-red-500/20' 
                    : assignment.status === 'submitted' ?'bg-green-500/5 border-green-500/20' :'bg-surface border-border hover:bg-muted/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-3 h-3 rounded-full mt-2 ${assignment.color}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-foreground">{assignment.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(assignment.status)}`}>
                          {assignment.status.replace('-', ' ')}
                        </span>
                        <Icon 
                          name="Flag" 
                          size={14} 
                          className={getPriorityColor(assignment.priority)} 
                        />
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center">
                          <Icon name="BookOpen" size={14} className="mr-1" />
                          {assignment.subject}
                        </span>
                        <span className="flex items-center">
                          <Icon name="User" size={14} className="mr-1" />
                          {assignment.teacherName}
                        </span>
                        <span className="flex items-center">
                          <Icon name="Clock" size={14} className="mr-1" />
                          {assignment.estimatedTime}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {assignment.description}
                      </p>

                      {/* Progress Bar for In-Progress Assignments */}
                      {assignment.status === 'in-progress' && assignment.progress && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs text-muted-foreground">{assignment.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${assignment.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Due Date and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className={`text-sm flex items-center ${
                            daysUntilDue < 0 ? 'text-red-400' : 
                            daysUntilDue <= 1 ? 'text-yellow-400': 'text-muted-foreground'
                          }`}>
                            <Icon name="Calendar" size={14} className="mr-1" />
                            Due {new Date(assignment.dueDate).toLocaleDateString()}
                            {daysUntilDue < 0 && ' (Overdue)'}
                            {daysUntilDue === 0 && ' (Today)'}
                            {daysUntilDue === 1 && ' (Tomorrow)'}
                            {daysUntilDue > 1 && ` (${daysUntilDue} days)`}
                          </span>
                          
                          {assignment.submittedDate && (
                            <span className="text-sm text-green-400 flex items-center">
                              <Icon name="CheckCircle" size={14} className="mr-1" />
                              Submitted {new Date(assignment.submittedDate).toLocaleDateString()}
                            </span>
                          )}
                          
                          {assignment.grade && (
                            <span className="text-sm text-accent flex items-center">
                              <Icon name="Award" size={14} className="mr-1" />
                              Grade: {assignment.grade}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {assignment.status !== 'submitted' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                iconName={getSubmissionIcon(assignment.submissionType)}
                                iconPosition="left"
                                iconSize={14}
                                className="text-xs"
                              >
                                Work on it
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                iconName="Upload"
                                iconPosition="left"
                                iconSize={14}
                                className="text-xs"
                                onClick={() => handleSubmitAssignment(assignment.id)}
                              >
                                Submit
                              </Button>
                            </>
                          )}
                          
                          {assignment.status === 'submitted' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Eye"
                              iconPosition="left"
                              iconSize={14}
                              className="text-xs"
                            >
                              View Submission
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
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
            <p className="text-lg font-bold text-warning">
              {assignments.filter(a => a.status === 'pending').length}
            </p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">
              {assignments.filter(a => a.status === 'in-progress').length}
            </p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-success">
              {assignments.filter(a => a.status === 'submitted').length}
            </p>
            <p className="text-xs text-muted-foreground">Submitted</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-error">
              {assignments.filter(a => a.status === 'overdue').length}
            </p>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkTracker;