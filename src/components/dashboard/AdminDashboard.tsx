'use client';

import React from 'react';
import { 
  ShieldAlert, ShieldCheck, Users, MessageSquare, Trash2, CheckCircle, 
  XCircle, Award, BarChart3, HelpCircle, Activity, Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { 
    users, posts, deletePost, verifyUser, rejectUser, notifications 
  } = useApp();

  // Find unverified users
  const verificationRequests = users.filter(u => !u.verified && u.role !== 'admin');

  // Stats
  const totalUsers = users.length;
  const totalPosts = posts.length;
  const pendingRequests = verificationRequests.length;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Total Network Users</span>
            <h4 className="text-2xl font-poppins font-bold text-slate-800 dark:text-zinc-100">{totalUsers}</h4>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Active Posts</span>
            <h4 className="text-2xl font-poppins font-bold text-slate-800 dark:text-zinc-100">{totalPosts}</h4>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-2xl text-blue-600">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Pending Verifications</span>
            <h4 className="text-2xl font-poppins font-bold text-slate-800 dark:text-zinc-100">{pendingRequests}</h4>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl text-amber-600">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">System Health</span>
            <h4 className="text-lg font-poppins font-bold text-emerald-600">99.8% OK</h4>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-2xl text-purple-650">
            <Activity className="w-6 h-6" />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Verification Requests Queue */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-amber-500" />
            Verification Queue (Farmer & Company Audits)
          </h3>

          <div className="space-y-3.5">
            {verificationRequests.length === 0 ? (
              <div className="text-center py-8 text-slate-400 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
                <CheckCircle className="w-10 h-10 mx-auto mb-2 text-emerald-500" />
                <p className="text-xs">All user verifications are complete!</p>
              </div>
            ) : (
              verificationRequests.map((user) => (
                <div key={user.id} className="flex flex-col sm:flex-row justify-between sm:items-center bg-slate-50 dark:bg-zinc-950/40 p-4 border border-slate-100 dark:border-zinc-800 rounded-xl text-xs gap-3">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-200" alt="avatar" />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-zinc-200">{user.name}</h4>
                      <p className="text-[10px] text-slate-400 capitalize mt-0.5">
                        Role: {user.role} | Mandi: {user.location}
                      </p>
                      {user.role === 'farmer' ? (
                        <p className="text-[9px] text-emerald-600 font-semibold mt-1">Farm: {user.farmName} ({user.farmSize})</p>
                      ) : (
                        <p className="text-[9px] text-blue-600 font-semibold mt-1">Corp REG: {user.registrationNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => verifyUser(user.id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg text-[10px] cursor-pointer transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve Badge
                    </button>
                    <button
                      onClick={() => rejectUser(user.id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-[10px] cursor-pointer transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right column: Moderation Logs */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-2">
            <Trash2 className="w-4.5 h-4.5 text-rose-500" />
            Social Feed Moderation
          </h3>

          <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
            {posts.map((post) => (
              <div key={post.id} className="border border-slate-100 dark:border-zinc-850 rounded-xl p-3 bg-slate-50/50 dark:bg-zinc-950/20 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-700 dark:text-zinc-350">{post.userName}</span>
                    <span className="text-[9px] text-slate-400">({post.userRole})</span>
                  </div>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-1.5 hover:bg-rose-50 rounded text-rose-500 cursor-pointer"
                    title="Remove post from feed"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">{post.content}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
