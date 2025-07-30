import React, { useState, useEffect } from 'react';
import AuthenticationCard from './components/AuthenticationCard';
import BiometricModal from './components/BiometricModal';
import MFAModal from './components/MFAModal';
import SessionAlert from './components/SessionAlert';
import PasswordResetModal from './components/PasswordResetModal';
import SplashScreen from '../../components/SplashScreen';

const LoginAuthentication = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [biometricModal, setBiometricModal] = useState({ isOpen: false, type: 'fingerprint' });
  const [mfaModal, setMfaModal] = useState({ isOpen: false, userEmail: '' });
  const [sessionAlert, setSessionAlert] = useState({ isVisible: false, type: 'new-device' });
  const [passwordResetModal, setPasswordResetModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  // Demo: Show session alert after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setSessionAlert({ isVisible: true, type: 'new-device' });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleBiometricLogin = (type) => {
    setBiometricModal({ isOpen: true, type });
  };

  const handleMFARequired = (email) => {
    setMfaModal({ isOpen: true, userEmail: email });
  };

  const handlePasswordReset = () => {
    setPasswordResetModal(true);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Authentication Card */}
      <div className="relative z-10 w-full max-w-md">
        <AuthenticationCard 
          onBiometricLogin={handleBiometricLogin}
          onMFARequired={handleMFARequired}
          onPasswordReset={handlePasswordReset}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-accent rounded-full animate-pulse opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-primary rounded-full animate-pulse opacity-50"></div>

      {/* Modals */}
      <BiometricModal
        isOpen={biometricModal.isOpen}
        onClose={() => setBiometricModal({ isOpen: false, type: 'fingerprint' })}
        type={biometricModal.type}
        selectedRole={selectedRole}
      />

      <MFAModal
        isOpen={mfaModal.isOpen}
        onClose={() => setMfaModal({ isOpen: false, userEmail: '' })}
        selectedRole={selectedRole}
        userEmail={mfaModal.userEmail}
      />

      <PasswordResetModal
        isOpen={passwordResetModal}
        onClose={() => setPasswordResetModal(false)}
      />

      {/* Session Alert */}
      <SessionAlert
        isVisible={sessionAlert.isVisible}
        onClose={() => setSessionAlert({ isVisible: false, type: 'new-device' })}
        alertType={sessionAlert.type}
      />

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs text-muted-foreground">
          Secure Educational Management Platform
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
};

export default LoginAuthentication;