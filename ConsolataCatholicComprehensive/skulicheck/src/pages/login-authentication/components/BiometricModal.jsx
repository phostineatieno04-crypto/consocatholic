import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BiometricModal = ({ isOpen, onClose, type = 'fingerprint', selectedRole }) => {
  const navigate = useNavigate();
  const [scanningState, setScanningState] = useState('idle'); // idle, scanning, success, error
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Auto-start scanning when modal opens
      const startTimer = setTimeout(() => {
        setScanningState('scanning');
        setProgress(0);
      }, 500);

      return () => clearTimeout(startTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && scanningState === 'scanning') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setScanningState('success');
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isOpen, scanningState]);

  const handleStartScan = () => {
    setScanningState('scanning');
    setProgress(0);
  };

  const handleSuccess = () => {
    if (selectedRole) {
      const dashboardRoutes = {
        Admin: '/admin-dashboard',
        Teacher: '/teacher-dashboard',
        Parent: '/parent-dashboard',
        Student: '/student-dashboard'
      };
      navigate(dashboardRoutes[selectedRole]);
    }
    onClose();
  };

  const handleRetry = () => {
    setScanningState('idle');
    setProgress(0);
  };

  useEffect(() => {
    if (scanningState === 'success') {
      setTimeout(handleSuccess, 1500);
    }
  }, [scanningState]);

  if (!isOpen) return null;

  const getModalContent = () => {
    switch (type) {
      case 'fingerprint':
        return {
          title: 'Fingerprint Authentication',
          icon: 'Fingerprint',
          instruction: 'Place your finger on the sensor',
          scanningText: 'Scanning fingerprint...',
          successText: 'Fingerprint verified successfully!'
        };
      case 'face':
        return {
          title: 'Face Recognition',
          icon: 'ScanFace',
          instruction: 'Position your face in the camera frame',
          scanningText: 'Analyzing facial features...',
          successText: 'Face recognition successful!'
        };
      default:
        return {
          title: 'Biometric Authentication',
          icon: 'Shield',
          instruction: 'Follow the on-screen instructions',
          scanningText: 'Processing...',
          successText: 'Authentication successful!'
        };
    }
  };

  const content = getModalContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-modal animate-fade-in">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 modal-elevation animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">{content.title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Biometric Scanner */}
        <div className="text-center mb-6">
          <div className={`w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center mb-4 transition-all duration-300 ${
            scanningState === 'idle' ? 'border-muted bg-muted/10' :
            scanningState === 'scanning' ? 'border-primary bg-primary/10 animate-pulse-scanner' :
            scanningState === 'success'? 'border-success bg-success/10' : 'border-error bg-error/10'
          }`}>
            <Icon 
              name={scanningState === 'success' ? 'CheckCircle' : scanningState === 'error' ? 'XCircle' : content.icon} 
              size={48} 
              className={
                scanningState === 'idle' ? 'text-muted' :
                scanningState === 'scanning' ? 'text-primary' :
                scanningState === 'success'? 'text-success' : 'text-error'
              }
            />
          </div>

          {/* Progress Bar */}
          {scanningState === 'scanning' && (
            <div className="w-full bg-muted/20 rounded-full h-2 mb-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Status Text */}
          <div className="space-y-2">
            <p className="text-foreground font-medium">
              {scanningState === 'scanning' && content.scanningText}
              {scanningState === 'success' && content.successText}
              {scanningState === 'error' && 'Authentication failed. Please try again.'}
            </p>
            
            {scanningState === 'scanning' && (
              <p className="text-sm text-muted-foreground">
                {progress < 30 ? 'Initializing biometric scanner...' : 
                 progress < 70 ? 'Capturing and analyzing data...': 
                 progress < 95 ? 'Verifying identity...' : 'Authentication complete!'}
              </p>
            )}
          </div>
        </div>

        {/* Camera Preview for Face Recognition */}
        {type === 'face' && scanningState !== 'idle' && (
          <div className="mb-6 bg-muted/10 rounded-lg p-4 border-2 border-dashed border-muted">
            <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icon name="Camera" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Camera Preview</p>
                <div className="w-24 h-32 border-2 border-primary rounded-lg mx-auto mt-2 relative">
                  <div className="absolute inset-2 border border-primary/50 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {scanningState === 'scanning' && (
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Cancel Scan
            </Button>
          )}

          {scanningState === 'error' && (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                variant="default"
                onClick={handleRetry}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                Try Again
              </Button>
            </>
          )}

          {scanningState === 'success' && (
            <Button
              variant="success"
              onClick={handleSuccess}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={16}
              className="w-full"
            >
              Continue to Dashboard
            </Button>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-muted/10 rounded-lg">
          <p className="text-xs text-muted-foreground text-center flex items-center justify-center">
            <Icon name="Shield" size={14} className="mr-2" />
            Your biometric data is processed locally and never stored
          </p>
        </div>
      </div>
    </div>
  );
};

export default BiometricModal;