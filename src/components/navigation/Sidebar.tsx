'use client';

import React from 'react';
import { 
  Home, MessageSquare, LayoutDashboard, User as UserIcon, 
  ShieldAlert, Settings, LogOut, Award, Leaf, Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UI_TRANSLATIONS } from '../../utils/translation';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentUser, logout, currentLanguage, messages } = useApp();

  if (!currentUser) return null;

  const unreadMessagesCount = messages.filter(
    m => m.receiverId === currentUser.id && !m.read
  ).length;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;

  // Custom styling depending on the user role
  const getThemeColor = () => {
    if (currentUser.role === 'farmer') return 'text-primary-green hover:bg-emerald-50 dark:hover:bg-emerald-950/30';
    if (currentUser.role === 'company') return 'text-corporate-blue hover:bg-blue-50 dark:hover:bg-blue-950/30';
    return 'text-golden-accent hover:bg-amber-50 dark:hover:bg-amber-950/30';
  };

  const getActiveBackground = (tab: string) => {
    if (activeTab !== tab) return 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60';
    
    if (currentUser.role === 'farmer') return 'bg-emerald-50 dark:bg-emerald-950/40 text-primary-green font-semibold';
    if (currentUser.role === 'company') return 'bg-blue-50 dark:bg-blue-950/40 text-corporate-blue font-semibold';
    return 'bg-amber-50 dark:bg-amber-950/40 text-golden-accent font-semibold';
  };

  const getBorderColor = () => {
    if (currentUser.role === 'farmer') return 'border-emerald-600';
    if (currentUser.role === 'company') return 'border-blue-600';
    return 'border-amber-500';
  };

  const navItems = [
    { id: 'feed', label: t.home, icon: Home },
    { id: 'chat', label: t.messages, icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'profile', label: t.profile, icon: UserIcon }
  ];

  // Add Admin Console to navigation if admin
  if (currentUser.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin Console', icon: ShieldAlert });
  }

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 py-6 justify-between shrink-0">
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2">
          {currentUser.role === 'farmer' ? (
            <Leaf className="w-8 h-8 text-primary-green" />
          ) : currentUser.role === 'company' ? (
            <Building2 className="w-8 h-8 text-corporate-blue" />
          ) : (
            <Award className="w-8 h-8 text-golden-accent" />
          )}
          <span className="font-poppins font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-emerald-700 to-blue-600 bg-clip-text text-transparent">
            FarmerLink
          </span>
        </div>

        {/* User Card */}
        <div className={`flex items-center gap-3 p-3 rounded-2xl border bg-white dark:bg-zinc-900 shadow-sm border-slate-100 dark:border-zinc-800`}>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className={`w-11 h-11 rounded-full object-cover border-2 ${getBorderColor()}`}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <h4 className="font-semibold text-sm truncate text-slate-800 dark:text-zinc-100">
                {currentUser.name}
              </h4>
              {currentUser.verified && (
                <Award className="w-4 h-4 text-golden-accent fill-golden-accent shrink-0" />
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 capitalize flex items-center gap-1 mt-0.5">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                currentUser.role === 'farmer' ? 'bg-primary-green' : currentUser.role === 'company' ? 'bg-corporate-blue' : 'bg-golden-accent'
              }`} />
              {currentUser.role === 'farmer' ? t.farmerRole : currentUser.role === 'company' ? t.companyRole : 'Administrator'}
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${getActiveBackground(item.id)}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className={`px-2 py-0.5 text-xs font-semibold text-white rounded-full ${
                    currentUser.role === 'farmer' ? 'bg-primary-green ring-pulse-green' : 'bg-corporate-blue ring-pulse-blue'
                  }`}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Settings & Logout */}
      <div className="space-y-1">
        <button
          onClick={() => setActiveTab('profile')}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-pointer"
        >
          <Settings className="w-5 h-5" />
          <span className="text-left">Settings</span>
        </button>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-left">Logout</span>
        </button>
      </div>
    </aside>
  );
};
