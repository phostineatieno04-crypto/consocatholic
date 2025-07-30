
import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationStage, setAnimationStage] = useState('entering');
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Preload animation trigger
    const preloadTimer = setTimeout(() => {
      setLogoLoaded(true);
    }, 100);

    const timer1 = setTimeout(() => {
      setAnimationStage('pulsing');
    }, 800);

    const timer2 = setTimeout(() => {
      setAnimationStage('exiting');
    }, 3500);

    const timer3 = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(preloadTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center transition-all duration-1000 ${
      animationStage === 'exiting' ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
    }`}>
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-all duration-2000 ${
          logoLoaded ? 'animate-float opacity-100' : 'opacity-0 scale-50'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-all duration-2000 delay-300 ${
          logoLoaded ? 'animate-float-delayed opacity-100' : 'opacity-0 scale-50'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl transition-all duration-2000 delay-500 ${
          logoLoaded ? 'animate-pulse opacity-100' : 'opacity-0 scale-75'
        }`}></div>
        
        {/* Additional floating particles */}
        <div className={`absolute top-16 left-16 w-4 h-4 bg-white/20 rounded-full transition-all duration-1500 delay-700 ${
          logoLoaded ? 'animate-float opacity-100' : 'opacity-0'
        }`}></div>
        <div className={`absolute top-32 right-32 w-2 h-2 bg-white/30 rounded-full transition-all duration-1500 delay-900 ${
          logoLoaded ? 'animate-float-delayed opacity-100' : 'opacity-0'
        }`}></div>
        <div className={`absolute bottom-32 left-32 w-6 h-6 bg-white/15 rounded-full transition-all duration-1500 delay-1100 ${
          logoLoaded ? 'animate-float opacity-100' : 'opacity-0'
        }`}></div>
      </div>

      {/* Logo Container */}
      <div className={`relative z-10 text-center transition-all duration-1200 ease-out ${
        animationStage === 'entering' ? 'scale-0 opacity-0 translate-y-10' :
        animationStage === 'pulsing' ? 'scale-100 opacity-100 translate-y-0' :
        'scale-105 opacity-0 translate-y-0'
      }`}>
        {/* Logo Icon */}
        <div className={`w-28 h-28 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transition-all duration-1200 ease-out ${
          animationStage === 'entering' ? 'scale-0 rotate-180' :
          animationStage === 'pulsing' ? 'scale-100 rotate-0 animate-bounce-gentle' :
          'scale-100 rotate-0'
        }`}>
          <Icon name="GraduationCap" size={52} className="text-primary" />
        </div>

        {/* School Name with staggered animation */}
        <div className={`transition-all duration-1000 delay-400 ease-out ${
          animationStage === 'entering' ? 'translate-y-12 opacity-0' :
          animationStage === 'pulsing' ? 'translate-y-0 opacity-100' :
          'translate-y-0 opacity-0'
        }`}>
          <h1 className={`text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight transition-all duration-800 delay-600 ${
            animationStage === 'entering' ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'
          }`}>
            Consolata Catholic
          </h1>
          <h2 className={`text-3xl lg:text-4xl font-bold text-white/90 mb-5 transition-all duration-800 delay-800 ${
            animationStage === 'entering' ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'
          }`}>
            Comprehensive School
          </h2>
          <p className={`text-white/70 text-lg lg:text-xl font-medium transition-all duration-800 delay-1000 ${
            animationStage === 'entering' ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
          }`}>
            Educational Management System
          </p>
        </div>

        {/* Enhanced Loading Indicator */}
        <div className={`mt-10 transition-all duration-1000 delay-1200 ${
          animationStage === 'entering' ? 'opacity-0 scale-75' :
          animationStage === 'pulsing' ? 'opacity-100 scale-100' :
          'opacity-0 scale-100'
        }`}>
          <div className="w-20 h-1.5 bg-white/30 rounded-full mx-auto overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-r from-white via-white/80 to-white rounded-full animate-slide-in"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>
          <p className="text-white/60 text-sm mt-3 animate-pulse">Loading your dashboard...</p>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className={`absolute top-10 left-10 w-3 h-3 bg-white/40 rounded-full transition-all duration-2000 delay-1400 ${
        logoLoaded ? 'animate-pulse opacity-100' : 'opacity-0'
      }`}></div>
      <div className={`absolute top-20 right-20 w-2 h-2 bg-white/60 rounded-full transition-all duration-2000 delay-1600 ${
        logoLoaded ? 'animate-pulse opacity-100' : 'opacity-0'
      }`}></div>
      <div className={`absolute bottom-20 left-20 w-4 h-4 bg-white/30 rounded-full transition-all duration-2000 delay-1800 ${
        logoLoaded ? 'animate-pulse opacity-100' : 'opacity-0'
      }`}></div>
      <div className={`absolute bottom-10 right-10 w-2.5 h-2.5 bg-white/50 rounded-full transition-all duration-2000 delay-2000 ${
        logoLoaded ? 'animate-pulse opacity-100' : 'opacity-0'
      }`}></div>
      
      {/* Additional decorative elements */}
      <div className={`absolute top-1/3 right-1/4 w-1 h-8 bg-white/20 rounded-full transition-all duration-1500 delay-2200 ${
        logoLoaded ? 'opacity-100 animate-float' : 'opacity-0'
      }`}></div>
      <div className={`absolute bottom-1/3 left-1/4 w-1 h-6 bg-white/25 rounded-full transition-all duration-1500 delay-2400 ${
        logoLoaded ? 'opacity-100 animate-float-delayed' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default SplashScreen;
