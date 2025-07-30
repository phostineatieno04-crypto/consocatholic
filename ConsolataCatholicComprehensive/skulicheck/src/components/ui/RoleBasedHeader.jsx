import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);
  const profileRef = useRef(null);

  // Mock user data - in real app, this would come from auth context
  const user = {
    name: 'John Smith',
    role: 'Admin',
    avatar: '/assets/images/avatar.jpg',
    email: 'john.smith@skulicheck.edu'
  };

  // Primary navigation items (max 4-5 items)
  const primaryNavItems = [
    { 
      label: 'Dashboard', 
      path: '/admin-dashboard', 
      icon: 'LayoutDashboard',
      roles: ['Admin', 'Teacher', 'Parent', 'Student']
    },
    { 
      label: 'School Events', 
      path: '/school-events-memories', 
      icon: 'Calendar',
      roles: ['Admin', 'Teacher', 'Parent', 'Student']
    }
  ];

  // Secondary items for overflow menu
  const secondaryNavItems = [
    { label: 'Settings', icon: 'Settings', action: () => console.log('Settings') },
    { label: 'Help & Support', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: 'Documentation', icon: 'FileText', action: () => console.log('Docs') }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login-authentication');
    setIsProfileOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-foreground">SkuliCheck</h1>
              <p className="text-xs text-muted-foreground">Educational Management</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems.map((item) => (
            <Button
              key={item.path}
              variant={isActivePath(item.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item.path)}
              iconName={item.icon}
              iconPosition="left"
              iconSize={18}
              className="px-4 py-2"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => console.log('Notifications')}
            >
              <Icon name="Bell" size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-scanner">
                  {notifications}
                </span>
              )}
            </Button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 px-3 py-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
              <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </Button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg modal-elevation animate-fade-in">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <span className="inline-block px-2 py-1 text-xs bg-accent text-accent-foreground rounded-full mt-1">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  {secondaryNavItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={item.action}
                      iconName={item.icon}
                      iconPosition="left"
                      iconSize={16}
                      className="w-full justify-start px-3 py-2 text-sm"
                    >
                      {item.label}
                    </Button>
                  ))}

                  <div className="border-t border-border my-2"></div>

                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start px-3 py-2 text-sm text-error hover:text-error hover:bg-error/10"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border animate-fade-in">
          <nav className="p-4 space-y-2">
            {primaryNavItems.map((item) => (
              <Button
                key={item.path}
                variant={isActivePath(item.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item.path)}
                iconName={item.icon}
                iconPosition="left"
                iconSize={18}
                className="w-full justify-start px-4 py-3"
              >
                {item.label}
              </Button>
            ))}

            <div className="border-t border-border my-3"></div>

            {secondaryNavItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={item.action}
                iconName={item.icon}
                iconPosition="left"
                iconSize={16}
                className="w-full justify-start px-4 py-3 text-muted-foreground"
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default RoleBasedHeader;