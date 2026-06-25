'use client';

import React from 'react';
import { Home, MessageSquare, LayoutDashboard, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { currentUser, messages } = useApp();

  if (!currentUser) return null;

  const unreadMessagesCount = messages.filter(
    m => m.receiverId === currentUser.id && !m.read
  ).length;

  const getActiveTabColor = (tab: string) => {
    if (activeTab !== tab) return 'text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300';
    
    if (currentUser.role === 'farmer') return 'text-primary-green scale-105';
    if (currentUser.role === 'company') return 'text-corporate-blue scale-105';
    return 'text-golden-accent scale-105';
  };

  const navItems = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'chat', icon: MessageSquare, label: 'Chat', badge: unreadMessagesCount },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md flex items-center justify-around px-4 z-40 shadow-lg">
      {navItems.map(item => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-12 h-12 transition-all duration-200 cursor-pointer relative ${getActiveTabColor(item.id)}`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            {item.badge && item.badge > 0 ? (
              <span className={`absolute top-1 right-1 px-1.5 py-0.5 text-[9px] font-bold text-white rounded-full leading-none transform translate-x-1 -translate-y-1 ${
                currentUser.role === 'farmer' ? 'bg-primary-green' : 'bg-corporate-blue'
              }`}>
                {item.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
};
