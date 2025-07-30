import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ParentMessageCenter = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState('all');

  const messages = [
    {
      id: 1,
      parentName: "Sarah Johnson",
      studentName: "Emma Johnson",
      grade: "Grade 10-A",
      subject: "Regarding Emma\'s Math Performance",
      message: `Hello Ms. Smith,\n\nI wanted to discuss Emma's recent performance in mathematics. She seems to be struggling with quadratic equations and I was wondering if you could provide some additional resources or suggest extra practice materials.\n\nThank you for your time.`,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "unread",
      priority: "medium",
      hasAttachment: false,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      parentName: "Michael Chen",
      studentName: "David Chen",
      grade: "Grade 11-B",
      subject: "Physics Lab Safety Concern",
      message: `Dear Teacher,\n\nI have some concerns about the safety protocols in the physics lab. David mentioned that some equipment seemed faulty during yesterday's experiment. Could we schedule a meeting to discuss this?\n\nBest regards,\nMichael Chen`,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: "unread",
      priority: "high",
      hasAttachment: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      parentName: "Lisa Rodriguez",
      studentName: "Sofia Rodriguez",
      grade: "Grade 9-C",
      subject: "Thank you for extra help",
      message: `Hi Ms. Smith,\n\nI just wanted to thank you for the extra time you spent helping Sofia with her algebra homework. Her confidence has improved significantly, and her grades are showing it too!\n\nWith gratitude,\nLisa Rodriguez`,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: "read",
      priority: "low",
      hasAttachment: false,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      parentName: "Robert Wilson",
      studentName: "James Wilson",
      grade: "Grade 12-A",
      subject: "College Recommendation Letter",
      message: `Dear Ms. Smith,\n\nJames is applying for early admission to MIT and would be honored if you could write a recommendation letter for him. He has really enjoyed your physics classes and speaks highly of your teaching methods.\n\nPlease let me know if you need any additional information.\n\nThank you,\nRobert Wilson`,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: "read",
      priority: "medium",
      hasAttachment: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    if (filter === 'unread') return message.status === 'unread';
    if (filter === 'high') return message.priority === 'high';
    return true;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;
  const highPriorityCount = messages.filter(m => m.priority === 'high').length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    // Mark as read
    if (message.status === 'unread') {
      message.status = 'read';
    }
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log('Sending reply:', replyText);
      setReplyText('');
      setSelectedMessage(null);
    }
  };

  const handleComposeNew = () => {
    console.log('Composing new message');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Parent Messages</h3>
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread messages
            </p>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={handleComposeNew}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Compose
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-6 bg-muted/10 p-1 rounded-lg">
        {[
          { key: 'all', label: 'All', count: messages.length },
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'high', label: 'Priority', count: highPriorityCount }
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

      {/* Message List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No messages found</p>
            <p className="text-sm text-muted-foreground mt-1">All caught up!</p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                message.status === 'unread' ?'border-primary bg-primary/5 hover:bg-primary/10' :'border-border bg-surface hover:bg-muted/5'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={message.avatar}
                    alt={message.parentName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {message.status === 'unread' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-scanner"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-medium truncate ${
                        message.status === 'unread' ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {message.parentName}
                      </h4>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {message.hasAttachment && (
                        <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-1">
                    Re: {message.studentName} ({message.grade})
                  </p>
                  
                  <h5 className={`text-sm font-medium mb-2 truncate ${
                    message.status === 'unread' ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {message.subject}
                  </h5>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.message.split('\n')[0]}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-modal flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg modal-elevation w-full max-w-2xl max-h-[80vh] overflow-hidden animate-modal-in">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedMessage.avatar}
                  alt={selectedMessage.parentName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{selectedMessage.parentName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Parent of {selectedMessage.studentName} ({selectedMessage.grade})
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMessage(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <h4 className="font-medium text-foreground mb-4">{selectedMessage.subject}</h4>
              <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                {selectedMessage.message}
              </div>
              {selectedMessage.hasAttachment && (
                <div className="mt-4 p-3 bg-muted/10 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">attachment_document.pdf</span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-border">
              <div className="space-y-4">
                <Input
                  label="Reply"
                  type="text"
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full"
                />
                <div className="flex items-center justify-end space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedMessage(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleSendReply}
                    iconName="Send"
                    iconPosition="left"
                    iconSize={16}
                    disabled={!replyText.trim()}
                  >
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentMessageCenter;