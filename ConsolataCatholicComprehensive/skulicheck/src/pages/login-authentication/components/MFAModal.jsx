import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MFAModal = ({ isOpen, onClose, selectedRole, userEmail }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: method selection, 2: verification
  const [selectedMethod, setSelectedMethod] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const mfaMethods = [
    {
      id: 'sms',
      title: 'SMS Verification',
      description: 'Send code to your registered phone',
      icon: 'MessageSquare',
      color: 'primary'
    },
    {
      id: 'email',
      title: 'Email Verification',
      description: 'Send code to your email address',
      icon: 'Mail',
      color: 'secondary'
    },
    {
      id: 'authenticator',
      title: 'Authenticator App',
      description: 'Use your authenticator app',
      icon: 'Smartphone',
      color: 'accent'
    }
  ];

  // Timer for resend functionality
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [step, timeLeft]);

  const handleMethodSelect = async (method) => {
    setSelectedMethod(method);
    setIsLoading(true);
    
    // Simulate sending verification code
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setStep(2);
    setTimeLeft(30);
    setCanResend(false);
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerifyCode(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async (code = verificationCode.join('')) => {
    setIsLoading(true);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock verification - accept '123456' as valid code
    if (code === '123456') {
      const dashboardRoutes = {
        Admin: '/admin-dashboard',
        Teacher: '/teacher-dashboard',
        Parent: '/parent-dashboard',
        Student: '/student-dashboard'
      };
      navigate(dashboardRoutes[selectedRole]);
      onClose();
    } else {
      setError('Invalid verification code. Use 123456 for demo.');
      setVerificationCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
    
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setCanResend(false);
    setTimeLeft(30);
    
    // Simulate resending code
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setVerificationCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const getMethodIcon = (method) => {
    const methodData = mfaMethods.find(m => m.id === method);
    return methodData ? methodData.icon : 'Shield';
  };

  const getMethodTitle = (method) => {
    const methodData = mfaMethods.find(m => m.id === method);
    return methodData ? methodData.title : 'Verification';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-modal animate-fade-in">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 modal-elevation animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {step === 1 ? 'Two-Factor Authentication' : 'Enter Verification Code'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {step === 1 ? 'Choose verification method' : `Code sent via ${getMethodTitle(selectedMethod)}`}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Step 1: Method Selection */}
        {step === 1 && (
          <div className="space-y-3">
            {mfaMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                disabled={isLoading}
                className="w-full p-4 border border-border rounded-lg hover:bg-muted/5 transition-all duration-200 text-left group focus-glow disabled:opacity-50"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${method.color}/10`}>
                    <Icon name={method.icon} size={24} className={`text-${method.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Code Verification */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Method Info */}
            <div className="text-center p-4 bg-muted/5 rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name={getMethodIcon(selectedMethod)} size={32} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedMethod === 'sms' && 'Verification code sent to your phone'}
                {selectedMethod === 'email' && `Verification code sent to ${userEmail}`}
                {selectedMethod === 'authenticator' && 'Enter the code from your authenticator app'}
              </p>
            </div>

            {/* Code Input */}
            <div className="space-y-4">
              <div className="flex justify-center space-x-3">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                    disabled={isLoading}
                  />
                ))}
              </div>

              {error && (
                <div className="text-center">
                  <p className="text-error text-sm flex items-center justify-center">
                    <Icon name="AlertCircle" size={16} className="mr-2" />
                    {error}
                  </p>
                </div>
              )}

              {/* Demo Instructions */}
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <p className="text-accent text-sm font-medium">Demo Mode</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use verification code: <span className="font-mono font-semibold">123456</span>
                </p>
              </div>
            </div>

            {/* Resend Code */}
            <div className="text-center">
              {!canResend ? (
                <p className="text-sm text-muted-foreground">
                  Resend code in {timeLeft}s
                </p>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  iconName="RotateCcw"
                  iconPosition="left"
                  iconSize={16}
                  className="text-sm"
                >
                  Resend Code
                </Button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                disabled={isLoading}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="default"
                onClick={() => handleVerifyCode()}
                disabled={isLoading || verificationCode.some(digit => digit === '')}
                loading={isLoading}
                className="flex-1"
              >
                Verify
              </Button>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-muted/10 rounded-lg">
          <p className="text-xs text-muted-foreground text-center flex items-center justify-center">
            <Icon name="Lock" size={14} className="mr-2" />
            Your account security is protected by two-factor authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default MFAModal;