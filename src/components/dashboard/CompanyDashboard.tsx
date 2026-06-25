'use client';

import React from 'react';
import { 
  Building2, Plus, Sparkles, BarChart3, TrendingUp, UserCheck, 
  MapPin, MessageSquare, AlertCircle, Trash2, Calendar, FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UI_TRANSLATIONS } from '../../utils/translation';

export const CompanyDashboard: React.FC = () => {
  const { 
    currentUser, posts, deletePost, currentLanguage, 
    aiMatchSuggestions, runAIMatching 
  } = useApp();

  if (!currentUser) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;

  // Filter requirements posted by this company
  const companyRequirements = posts.filter(
    p => p.userId === currentUser.id && p.type === 'corporate_requirement'
  );

  // Trigger matches simulation if not loaded
  React.useEffect(() => {
    runAIMatching();
  }, []);

  // Simulated metrics
  const sourcingFulfillment = 76; // percentage
  const totalVolumeTarget = '250 Tons';
  const matchedSuppliersCount = aiMatchSuggestions.length;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Fulfillment Rate */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Procurement Fulfillment</span>
            <h4 className="text-2xl font-poppins font-bold text-slate-800 dark:text-zinc-100">{sourcingFulfillment}%</h4>
            <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${sourcingFulfillment}%` }}
              />
            </div>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-2xl text-blue-600">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        {/* Volume Procurement Target */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Procurement Targets</span>
            <h4 className="text-2xl font-poppins font-bold text-slate-800 dark:text-zinc-100">{totalVolumeTarget}</h4>
            <span className="text-[10px] text-slate-500 font-medium">Active target for Q2 2026</span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Matching Farmers */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">AI Matchmaking Leads</span>
            <h4 className="text-2xl font-poppins font-bold text-slate-800 dark:text-zinc-100">{matchedSuppliersCount} Leads</h4>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <UserCheck className="w-3 h-3" />
              Verified supplier status OK
            </span>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl text-amber-600">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Sourcing Requests + AI Matching Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Posted Requirements */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-2">
              <Building2 className="w-4.5 h-4.5 text-corporate-blue" />
              Active Procurement Sourcing Requirements
            </h3>
            <span className="text-[10px] text-slate-400">Manage bulk targets</span>
          </div>

          <div className="space-y-3.5">
            {companyRequirements.length === 0 ? (
              <div className="text-center py-8 text-slate-400 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
                <Building2 className="w-10 h-10 mx-auto mb-2 text-slate-300 animate-pulse" />
                <p className="text-xs">No active requirements listed. Post from the feed tab to solicit farmer offers.</p>
              </div>
            ) : (
              companyRequirements.map((post) => (
                <div key={post.id} className="flex justify-between items-center bg-slate-50 dark:bg-zinc-950/40 p-3.5 border border-slate-100 dark:border-zinc-800 rounded-xl text-xs gap-4">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-850 dark:text-zinc-200 text-sm">
                      {post.requirementDetails?.requirementTitle}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 text-[10px] text-slate-500">
                      <span>Volume: {post.requirementDetails?.quantityNeeded}</span>
                      <span>Budget Limit: {post.requirementDetails?.budget}</span>
                      <span>Closing: {post.requirementDetails?.deadline}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 text-rose-600 rounded-xl cursor-pointer"
                    title="Delete Sourcing Request"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Columns: AI Sourcing Match Leads */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              AI Matchmaker Report
            </h3>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              Matched
            </span>
          </div>

          <div className="space-y-3.5">
            {aiMatchSuggestions.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-4">Generating live farmer matches...</p>
            ) : (
              aiMatchSuggestions.map((match, idx) => (
                <div key={idx} className="border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-3.5 bg-slate-50/50 dark:bg-zinc-950/30 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={match.farmer.avatar} 
                      className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                      alt="farmer avatar" 
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-0.5">
                        <span className="font-bold text-xs truncate text-slate-800 dark:text-zinc-200">
                          {match.farmer.name}
                        </span>
                        {match.farmer.verified && (
                          <UserCheck className="w-3.5 h-3.5 text-golden-accent" />
                        )}
                      </div>
                      <p className="text-[9px] text-slate-400 truncate">{match.farmer.farmName}</p>
                    </div>
                    <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] px-1.5 py-0.5 rounded shrink-0">
                      {match.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-normal bg-white dark:bg-zinc-950 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800/80">
                    {match.reason}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-slate-100/40 dark:bg-zinc-950/80 p-1.5 rounded text-center">
                      <span className="text-slate-450 block">Mandi Zone</span>
                      <span className="font-bold text-slate-700 dark:text-zinc-300 truncate block mt-0.5">{match.farmer.location.split(',')[0]}</span>
                    </div>
                    <div className="bg-slate-100/40 dark:bg-zinc-950/80 p-1.5 rounded text-center">
                      <span className="text-slate-450 block">Rating score</span>
                      <span className="font-bold text-amber-500 block mt-0.5">★ {match.farmer.rating}</span>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
