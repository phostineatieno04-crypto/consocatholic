import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PasswordResetModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: email, 2: verification, 3: new password, 4: success
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendResetEmail = async () => {
    if (!validateEmail()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(2);
  };

  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      setErrors({ verificationCode: 'Verification code is required' });
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock verification - accept '123456' as valid
    if (formData.verificationCode === '123456') {
      setIsLoading(false);
      setStep(3);
    } else {
      setErrors({ verificationCode: 'Invalid code. Use 123456 for demo.' });
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validatePassword()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(4);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      email: '',
      verificationCode: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    onClose();
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return {
          title: 'Reset Password',
          subtitle: 'Enter your email to receive reset instructions',
          icon: 'Mail'
        };
      case 2:
        return {
          title: 'Check Your Email',
          subtitle: 'Enter the verification code sent to your email',
          icon: 'ShieldCheck'
        };
      case 3:
        return {
          title: 'Create New Password',
          subtitle: 'Choose a strong password for your account',
          icon: 'Key'
        };
      case 4:
        return {
          title: 'Password Reset Complete',
          subtitle: 'Your password has been successfully updated',
          icon: 'CheckCircle'
        };
      default:
        return {
          title: 'Reset Password',
          subtitle: 'Follow the steps to reset your password',
          icon: 'Lock'
        };
    }
  };

  if (!isOpen) return null;

  const stepContent = getStepContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-modal animate-fade-in">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 modal-elevation animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === 4 ? 'bg-success/10' : 'bg-primary/10'
            }`}>
              <Icon 
                name={stepContent.icon} 
                size={20} 
                className={step === 4 ? 'text-success' : 'text-primary'} 
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{stepContent.title}</h2>
              <p className="text-sm text-muted-foreground">{stepContent.subtitle}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                stepNumber <= step 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {stepNumber < step ? (
                  <Icon name="Check" size={16} />
                ) : (
                  stepNumber
                )}
              </div>
              {stepNumber < 4 && (
                <div className={`w-8 h-1 mx-2 transition-all duration-300 ${
                  stepNumber < step ? 'bg-primary' : 'bg-muted'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {/* Step 1: Email Input */}
          {step === 1 && (
            <>
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your registered email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
                className="focus-glow"
              />
              
              <Button
                variant="default"
                onClick={handleSendResetEmail}
                disabled={isLoading}
                loading={isLoading}
                iconName="Send"
                iconPosition="right"
                iconSize={16}
                className="w-full"
              >
                Send Reset Email
              </Button>
            </>
          )}

          {/* Step 2: Verification Code */}
          {step === 2 && (
            <>
              <div className="text-center p-4 bg-muted/5 rounded-lg">
                <Icon name="Mail" size={32} className="text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  We've sent a verification code to
                </p>
                <p className="font-medium text-foreground">{formData.email}</p>
              </div>

              <Input
                label="Verification Code"
                type="text"
                placeholder="Enter 6-digit code"
                value={formData.verificationCode}
                onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                error={errors.verificationCode}
                required
                className="focus-glow text-center font-mono text-lg"
                maxLength={6}
              />

              {/* Demo Instructions */}
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <p className="text-accent text-sm font-medium">Demo Mode</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use verification code: <span className="font-mono font-semibold">123456</span>
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  variant="default"
                  onClick={handleVerifyCode}
                  disabled={isLoading}
                  loading={isLoading}
                  className="flex-1"
                >
                  Verify Code
                </Button>
              </div>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <>
              <div className="relative">
                <Input
                  label="New Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  error={errors.newPassword}
                  description="Must be at least 8 characters long"
                  required
                  className="focus-glow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  required
                  className="focus-glow"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Password Strength:</p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        formData.newPassword.length >= level * 2
                          ? level <= 2 ? 'bg-error' : level === 3 ? 'bg-warning' : 'bg-success' :'bg-muted'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  variant="default"
                  onClick={handleResetPassword}
                  disabled={isLoading}
                  loading={isLoading}
                  className="flex-1"
                >
                  Reset Password
                </Button>
              </div>
            </>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <>
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Password Reset Successful!
                </h3>
                <p className="text-muted-foreground">
                  Your password has been updated. You can now sign in with your new password.
                </p>
              </div>

              <Button
                variant="default"
                onClick={handleClose}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
                className="w-full"
              >
                Continue to Login
              </Button>
            </>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-muted/10 rounded-lg">
          <p className="text-xs text-muted-foreground text-center flex items-center justify-center">
            <Icon name="Shield" size={14} className="mr-2" />
            All password reset activities are logged for security
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetModal;