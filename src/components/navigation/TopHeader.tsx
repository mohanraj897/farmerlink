'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Globe, Volume2, Mic, Settings, Award, 
  Leaf, Building2, ShieldAlert, LogOut, ArrowRightLeft, Menu, Sun, Moon, X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES, UI_TRANSLATIONS } from '../../utils/translation';

interface TopHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ activeTab, setActiveTab, mobileMenuOpen, toggleMobileMenu }) => {
  const { 
    currentUser, users, login, currentLanguage, setCurrentLanguage, 
    searchQuery, setSearchQuery, logout
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'dark';
    const isDarkTheme = savedTheme === 'dark';
    setIsDark(isDarkTheme);
    
    // Apply theme immediately
    const html = document.documentElement;
    if (isDarkTheme) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Apply theme immediately
    const html = document.documentElement;
    if (newIsDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('app-theme', newIsDark ? 'dark' : 'light');
  };

  if (!currentUser) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;

  // Simulate Voice Search
  const startVoiceSearch = () => {
    setIsVoiceActive(true);
    // Simulate speech synthesis / speech recognition returning a value after 2 seconds
    setTimeout(() => {
      setIsVoiceActive(false);
      setSearchQuery('Tomato');
    }, 2000);
  };

  const handleRoleChange = (role: 'farmer' | 'company' | 'admin') => {
    let email = '';
    if (role === 'farmer') email = 'rajesh.patel@farmmail.com';
    else if (role === 'company') email = 'procurement@itcagri.com';
    else email = 'admin@farmerlink.org';
    
    login(email, role);
    setIsRoleOpen(false);
  };

  const handleMobileTab = (tab: string) => {
    setActiveTab(tab);
    toggleMobileMenu();
  };

  return (
    <header className="sticky top-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 h-16 flex items-center justify-between px-4 z-30 shadow-sm">
      {/* Mobile Menu Button / Logo */}
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 md:hidden">
          {currentUser.role === 'farmer' ? (
            <Leaf className="w-6 h-6 text-primary-green" />
          ) : currentUser.role === 'company' ? (
            <Building2 className="w-6 h-6 text-corporate-blue" />
          ) : (
            <Award className="w-6 h-6 text-golden-accent" />
          )}
          <span className="font-poppins font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            FarmerLink
          </span>
        </div>
        <h1 className="hidden md:block font-poppins font-semibold text-lg text-slate-800 dark:text-zinc-100 capitalize">
          {activeTab === 'feed' ? 'Main Network Feed' : activeTab === 'chat' ? 'Private Messages' : activeTab === 'dashboard' ? 'Business Dashboard' : 'My Account'}
        </h1>
      </div>

      {/* Global Search Bar (Only shown on feed / dashboard) */}
      {(activeTab === 'feed' || activeTab === 'dashboard') && (
        <div className="hidden sm:flex items-center flex-1 max-w-md mx-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="w-full bg-slate-100 dark:bg-zinc-900 border border-transparent focus:border-slate-200 dark:focus:border-zinc-800 rounded-full py-2 pl-10 pr-10 text-sm focus:outline-none transition-all duration-200"
          />
          <button
            onClick={startVoiceSearch}
            className={`absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors cursor-pointer ${
              isVoiceActive ? 'text-primary-green animate-pulse bg-emerald-50' : ''
            }`}
            title="Voice Search (Simulated)"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Actions (Language Switcher, Role Quick-Switch, Theme Toggle, Mobile logout) */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
          title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Language Selection Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-zinc-800 text-xs font-medium text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{currentLanguage}</span>
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl py-1 z-50">
              {LANGUAGES.map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setCurrentLanguage(lang);
                    setIsLangOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer ${
                    currentLanguage === lang ? 'text-primary-green bg-emerald-50/50 dark:bg-emerald-950/20' : 'text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Logout Button */}
        <button
          onClick={() => logout()}
          className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-semibold">Logout</span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-zinc-800 shadow-xl px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {currentUser.role === 'farmer' ? (
                <Leaf className="w-5 h-5 text-primary-green" />
              ) : currentUser.role === 'company' ? (
                <Building2 className="w-5 h-5 text-corporate-blue" />
              ) : (
                <Award className="w-5 h-5 text-golden-accent" />
              )}
              <span className="font-semibold text-sm text-slate-800 dark:text-zinc-100">FarmerLink Menu</span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg"
              aria-label="Close mobile menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid gap-3">
            <button
              onClick={() => handleMobileTab('feed')}
              className="w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-zinc-100 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800"
            >
              Feed
            </button>
            <button
              onClick={() => handleMobileTab('chat')}
              className="w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-zinc-100 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800"
            >
              Chat
            </button>
            <button
              onClick={() => handleMobileTab('dashboard')}
              className="w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-zinc-100 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleMobileTab('profile')}
              className="w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-zinc-100 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800"
            >
              Profile
            </button>
          </div>

          <button
            onClick={() => {
              logout();
              toggleMobileMenu();
            }}
            className="mt-4 w-full rounded-2xl bg-rose-600 text-white py-3 text-sm font-semibold hover:bg-rose-700"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};
