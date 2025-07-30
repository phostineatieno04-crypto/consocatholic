import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BiometricAttendancePanel = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState('facial'); // 'facial', 'fingerprint', 'qr'
  const [attendanceData, setAttendanceData] = useState({
    totalScanned: 0,
    successfulScans: 0,
    failedScans: 0,
    lastScanTime: null
  });

  const scanModes = [
    {
      id: 'facial',
      name: 'Facial Recognition',
      icon: 'Camera',
      description: 'AI-powered face detection',
      status: 'active',
      accuracy: '98.5%'
    },
    {
      id: 'fingerprint',
      name: 'Fingerprint Scanner',
      icon: 'Fingerprint',
      description: 'Biometric fingerprint verification',
      status: 'active',
      accuracy: '99.2%'
    },
    {
      id: 'qr',
      name: 'QR Code Scanner',
      icon: 'QrCode',
      description: 'Student ID QR code scanning',
      status: 'active',
      accuracy: '100%'
    }
  ];

  const recentScans = [
    {
      id: 1,
      studentName: "Emma Johnson",
      studentId: "STU001",
      grade: "Grade 10-A",
      scanTime: new Date(Date.now() - 2 * 60 * 1000),
      method: 'facial',
      status: 'success',
      confidence: 98.7,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      studentName: "David Chen",
      studentId: "STU002",
      grade: "Grade 11-B",
      scanTime: new Date(Date.now() - 5 * 60 * 1000),
      method: 'fingerprint',
      status: 'success',
      confidence: 99.1,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      studentName: "Sofia Rodriguez",
      studentId: "STU003",
      grade: "Grade 9-C",
      scanTime: new Date(Date.now() - 8 * 60 * 1000),
      method: 'qr',
      status: 'success',
      confidence: 100,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      studentName: "Unknown Student",
      studentId: "N/A",
      grade: "N/A",
      scanTime: new Date(Date.now() - 12 * 60 * 1000),
      method: 'facial',
      status: 'failed',
      confidence: 45.2,
      avatar: null
    }
  ];

  const handleStartScanning = () => {
    setIsScanning(true);
    console.log(`Starting ${scanMode} scanning...`);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setAttendanceData(prev => ({
        ...prev,
        totalScanned: prev.totalScanned + 1,
        successfulScans: prev.successfulScans + 1,
        lastScanTime: new Date()
      }));
    }, 3000);
  };

  const handleStopScanning = () => {
    setIsScanning(false);
    console.log('Stopping scan...');
  };

  const handleConfigureCamera = () => {
    console.log('Opening camera configuration...');
  };

  const handleExportData = () => {
    console.log('Exporting attendance data...');
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'facial':
        return 'Camera';
      case 'fingerprint':
        return 'Fingerprint';
      case 'qr':
        return 'QrCode';
      default:
        return 'Scan';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-accent bg-accent/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatScanTime = (time) => {
    const now = new Date();
    const diff = now - time;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const currentMode = scanModes.find(mode => mode.id === scanMode);

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Scan" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Biometric Attendance</h3>
            <p className="text-sm text-muted-foreground">Real-time attendance tracking</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleConfigureCamera}
          iconName="Settings"
          iconPosition="left"
          iconSize={16}
          className="text-xs"
        >
          Configure
        </Button>
      </div>

      {/* Scan Mode Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Scanning Method</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {scanModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setScanMode(mode.id)}
              disabled={isScanning}
              className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                scanMode === mode.id
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : 'border-border bg-surface hover:bg-muted/5'
              } ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={mode.icon} 
                  size={18} 
                  className={scanMode === mode.id ? 'text-primary' : 'text-muted-foreground'} 
                />
                <span className={`text-sm font-medium ${
                  scanMode === mode.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {mode.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{mode.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-accent font-medium">{mode.accuracy}</span>
                <span className={`w-2 h-2 rounded-full ${
                  mode.status === 'active' ? 'bg-accent' : 'bg-muted'
                }`}></span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scanning Interface */}
      <div className="mb-6 p-4 bg-muted/5 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isScanning ? 'bg-primary animate-pulse-scanner' : 'bg-muted'
            }`}>
              <Icon 
                name={currentMode?.icon || 'Scan'} 
                size={24} 
                color={isScanning ? 'white' : 'currentColor'} 
              />
            </div>
            <div>
              <h4 className="font-medium text-foreground">
                {isScanning ? 'Scanning...' : `${currentMode?.name} Ready`}
              </h4>
              <p className="text-sm text-muted-foreground">
                {isScanning ? 'Please wait for scan to complete' : 'Click start to begin scanning'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isScanning ? (
              <Button
                variant="default"
                onClick={handleStartScanning}
                iconName="Play"
                iconPosition="left"
                iconSize={16}
              >
                Start Scan
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={handleStopScanning}
                iconName="Square"
                iconPosition="left"
                iconSize={16}
              >
                Stop Scan
              </Button>
            )}
          </div>
        </div>

        {/* Scanning Animation */}
        {isScanning && (
          <div className="relative h-32 bg-background rounded-lg border border-border overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Camera" size={16} />
                <span>Analyzing biometric data...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Scans */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-foreground">Recent Scans</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportData}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
            className="text-xs"
          >
            Export
          </Button>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {recentScans.map((scan) => (
            <div
              key={scan.id}
              className="flex items-center space-x-3 p-3 rounded-lg bg-surface border border-border"
            >
              <div className="relative">
                {scan.avatar ? (
                  <img
                    src={scan.avatar}
                    alt={scan.studentName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                  </div>
                )}
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                  scan.status === 'success' ? 'bg-accent' : 'bg-error'
                }`}>
                  <Icon 
                    name={scan.status === 'success' ? 'Check' : 'X'} 
                    size={10} 
                    color="white" 
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-foreground truncate">
                      {scan.studentName}
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {scan.grade} • {scan.studentId}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Icon name={getMethodIcon(scan.method)} size={14} className="text-muted-foreground" />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(scan.status)}`}>
                        {scan.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatScanTime(scan.scanTime)}
                    </p>
                  </div>
                </div>
                
                {scan.confidence && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Confidence</span>
                      <span>{scan.confidence}%</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${
                          scan.confidence >= 90 ? 'bg-accent' : 
                          scan.confidence >= 70 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${scan.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted/5 rounded-lg">
          <p className="text-xl font-bold text-primary">{attendanceData.totalScanned}</p>
          <p className="text-xs text-muted-foreground">Total Scans</p>
        </div>
        <div className="text-center p-3 bg-muted/5 rounded-lg">
          <p className="text-xl font-bold text-accent">{attendanceData.successfulScans}</p>
          <p className="text-xs text-muted-foreground">Successful</p>
        </div>
        <div className="text-center p-3 bg-muted/5 rounded-lg">
          <p className="text-xl font-bold text-error">{attendanceData.failedScans}</p>
          <p className="text-xs text-muted-foreground">Failed</p>
        </div>
      </div>
    </div>
  );
};

export default BiometricAttendancePanel;