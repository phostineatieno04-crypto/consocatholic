
import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationStage, setAnimationStage] = useState('entering');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationStage('pulsing');
    }, 500);

    const timer2 = setTimeout(() => {
      setAnimationStage('exiting');
    }, 2500);

    const timer3 = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Logo Container */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${
        animationStage === 'entering' ? 'scale-0 opacity-0' :
        animationStage === 'pulsing' ? 'scale-100 opacity-100' :
        'scale-110 opacity-0'
      }`}>
        {/* Logo Icon */}
        <div className={`w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transition-all duration-1000 ${
          animationStage === 'pulsing' ? 'animate-bounce-gentle' : ''
        }`}>
          <Icon name="GraduationCap" size={48} className="text-primary" />
        </div>

        {/* School Name */}
        <div className={`transition-all duration-1000 delay-300 ${
          animationStage === 'entering' ? 'translate-y-8 opacity-0' :
          animationStage === 'pulsing' ? 'translate-y-0 opacity-100' :
          'translate-y-0 opacity-0'
        }`}>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Consolata Catholic
          </h1>
          <h2 className="text-3xl font-bold text-white/90 mb-4">
            Comprehensive School
          </h2>
          <p className="text-white/70 text-lg font-medium">
            Educational Management System
          </p>
        </div>

        {/* Loading Indicator */}
        <div className={`mt-8 transition-all duration-1000 delay-500 ${
          animationStage === 'entering' ? 'opacity-0' :
          animationStage === 'pulsing' ? 'opacity-100' :
          'opacity-0'
        }`}>
          <div className="w-16 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-white rounded-full animate-slide-in"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse"></div>
    </div>
  );
};

export default SplashScreen;
