import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: '',
    grade: '',
    tags: '',
    privacy: 'school-only',
    allowComments: true,
    allowDownload: false,
    notifyParents: true
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const categoryOptions = [
    { value: 'Academic', label: 'Academic Events' },
    { value: 'Sports', label: 'Sports & Athletics' },
    { value: 'Cultural', label: 'Cultural Programs' },
    { value: 'Field Trip', label: 'Field Trips' },
    { value: 'Graduation', label: 'Graduation & Ceremonies' },
    { value: 'Workshop', label: 'Workshops & Training' },
    { value: 'Competition', label: 'Competitions' }
  ];

  const gradeOptions = [
    { value: 'all', label: 'All Grades' },
    { value: 'kindergarten', label: 'Kindergarten' },
    { value: 'grade-1', label: 'Grade 1' },
    { value: 'grade-2', label: 'Grade 2' },
    { value: 'grade-3', label: 'Grade 3' },
    { value: 'grade-4', label: 'Grade 4' },
    { value: 'grade-5', label: 'Grade 5' },
    { value: 'middle-school', label: 'Middle School' },
    { value: 'high-school', label: 'High School' }
  ];

  const privacyOptions = [
    { value: 'public', label: 'Public - Visible to everyone' },
    { value: 'school-only', label: 'School Only - Visible to school community' },
    { value: 'class-only', label: 'Class Only - Visible to specific class' },
    { value: 'private', label: 'Private - Visible to admin only' }
  ];

  const handleInputChange = (field, value) => {
    setUploadData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit
      return isValidType && isValidSize;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!uploadData.title || !uploadData.category || selectedFiles.length === 0) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const uploadResult = {
        id: Date.now(),
        ...uploadData,
        files: selectedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file)
        })),
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Current User'
      };

      setUploadProgress(100);
      setTimeout(() => {
        onUpload(uploadResult);
        onClose();
        resetForm();
      }, 500);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      clearInterval(progressInterval);
    }
  };

  const resetForm = () => {
    setUploadData({
      title: '',
      description: '',
      category: '',
      grade: '',
      tags: '',
      privacy: 'school-only',
      allowComments: true,
      allowDownload: false,
      notifyParents: true
    });
    setSelectedFiles([]);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-modal flex items-center justify-center p-4">
      <div className="bg-popover border border-border rounded-lg shadow-lg modal-elevation w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Upload" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Upload Event Media</h2>
              <p className="text-sm text-muted-foreground">Share photos and videos from school events</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isUploading}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Support for images and videos up to 50MB each
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              iconName="FolderOpen"
              iconPosition="left"
              iconSize={16}
              disabled={isUploading}
            >
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Selected Files ({selectedFiles.length})</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={file.type.startsWith('video/') ? "Video" : "Image"} 
                        size={16} 
                        className="text-primary" 
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      disabled={isUploading}
                      className="text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Details Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Event Title"
                type="text"
                placeholder="Enter event title"
                value={uploadData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
                disabled={isUploading}
              />
            </div>

            <Select
              label="Category"
              options={categoryOptions}
              value={uploadData.category}
              onChange={(value) => handleInputChange('category', value)}
              placeholder="Select category"
              required
              disabled={isUploading}
            />

            <Select
              label="Grade Level"
              options={gradeOptions}
              value={uploadData.grade}
              onChange={(value) => handleInputChange('grade', value)}
              placeholder="Select grade"
              disabled={isUploading}
            />

            <div className="md:col-span-2">
              <Input
                label="Description"
                type="text"
                placeholder="Describe the event and what happened"
                value={uploadData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                disabled={isUploading}
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Tags"
                type="text"
                placeholder="Add tags separated by commas (e.g., sports, competition, basketball)"
                value={uploadData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                disabled={isUploading}
              />
            </div>

            <div className="md:col-span-2">
              <Select
                label="Privacy Setting"
                options={privacyOptions}
                value={uploadData.privacy}
                onChange={(value) => handleInputChange('privacy', value)}
                disabled={isUploading}
              />
            </div>
          </div>

          {/* Upload Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Upload Options</h4>
            <div className="space-y-2">
              <Checkbox
                label="Allow comments on this event"
                checked={uploadData.allowComments}
                onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                disabled={isUploading}
              />
              <Checkbox
                label="Allow downloads of media files"
                checked={uploadData.allowDownload}
                onChange={(e) => handleInputChange('allowDownload', e.target.checked)}
                disabled={isUploading}
              />
              <Checkbox
                label="Send notification to parents"
                checked={uploadData.notifyParents}
                onChange={(e) => handleInputChange('notifyParents', e.target.checked)}
                disabled={isUploading}
              />
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Uploading...</span>
                <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleUpload}
              disabled={!uploadData.title || !uploadData.category || selectedFiles.length === 0 || isUploading}
              loading={isUploading}
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
            >
              {isUploading ? 'Uploading...' : 'Upload Event'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;