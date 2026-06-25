'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, BarChart3, QrCode, Leaf, AlertCircle, Sparkles, 
  MapPin, Calendar, Trash2, IndianRupee, MessageSquare, Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UI_TRANSLATIONS } from '../../utils/translation';

export const FarmerDashboard: React.FC = () => {
  const { 
    currentUser, posts, deletePost, currentLanguage, 
    createPost, triggerSimulatedIncomingMessage 
  } = useApp();

  const [showQR, setShowQR] = useState(false);
  const [selectedCropRecommendation, setSelectedCropRecommendation] = useState<string | null>(null);

  if (!currentUser) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;

  // Filter posts published by this farmer
  const farmerPosts = posts.filter(p => p.userId === currentUser.id && p.type === 'crop_offer');

  // Simulated metrics
  const totalQuantityAvailable = farmerPosts.length * 5; // simplified mock calc
  const earningsSum = 86500; // simulated cumulative rupee revenue
  const pendingDealsCount = 3;

  // AI recommendations data
  const aiRecommendationsList = [
    {
      crop: 'Organic Turmeric',
      yieldPotential: 'High (8-10 tons/acre)',
      marketTrend: '+12.1% price increase in nearby Mandis',
      recommendedReason: 'Turmeric crop requires medium rainfall. ITC Agri Business has active bulk procurement requests in your state.'
    },
    {
      crop: 'Basmati Rice',
      yieldPotential: 'Medium (6 tons/acre)',
      marketTrend: '+1.5% stable pricing',
      recommendedReason: 'Favorable monsoon soil humidity. High search volume from corporate retailers.'
    }
  ];

  const adoptAIRecommendation = (cropName: string) => {
    // Automatically create a crop offer post for the user
    createPost({
      type: 'crop_offer',
      content: `Listing recommended ${cropName} crop based on FarmerLink AI yield analytics and active corporate demand in our region. Ready for contracts.`,
      cropDetails: {
        productName: cropName,
        category: 'Organic',
        quantity: '5 Tons',
        price: cropName.includes('Turmeric') ? '₹9,200 / Quintal' : '₹8,500 / Quintal',
        harvestDate: 'Next 30 Days'
      }
    });

    // Simulate Corporate Buyer expressing interest shortly after
    setTimeout(() => {
      triggerSimulatedIncomingMessage(
        'u4', // ITC Agri Business
        `Hello Rajesh, we noticed you listed ${cropName} crop on the AI recommendation recommendation board. We are interested in contracting. Can you send quality specs?`
      );
      alert(`AI recommendation adopted! Sourcing post created. A buyer (ITC Agri) has automatically responded in your inbox.`);
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Earnings */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Total Revenue</span>
            <h4 className="text-2xl font-poppins font-bold text-slate-800 dark:text-zinc-100 flex items-center">
              <IndianRupee className="w-5 h-5 text-emerald-600" />
              {earningsSum.toLocaleString()}
            </h4>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              +14% this month
            </span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-600">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        {/* Listings Active */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Active Listings</span>
            <h4 className="text-2xl font-poppins font-bold text-slate-800 dark:text-zinc-100">{farmerPosts.length} Crop Offers</h4>
            <span className="text-[10px] text-slate-500 font-medium">{totalQuantityAvailable} Tons listed online</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-2xl text-blue-600">
            <Leaf className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Leads */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Active Leads</span>
            <h4 className="text-2xl font-poppins font-bold text-slate-800 dark:text-zinc-100">{pendingDealsCount} Sourcing Bids</h4>
            <span className="text-[10px] text-emerald-600 font-bold">Verification Badge active</span>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl text-amber-600">
            <Award className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Grid: Crop Listings + AI / QR Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Active Crop Listings */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-2">
              <Leaf className="w-4.5 h-4.5 text-primary-green" />
              My Crop Listings
            </h3>
            <span className="text-[10px] text-slate-400">Manage digital catalog</span>
          </div>

          <div className="space-y-3.5">
            {farmerPosts.length === 0 ? (
              <div className="text-center py-8 text-slate-400 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
                <Leaf className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="text-xs">You have not posted any crop listings yet.</p>
              </div>
            ) : (
              farmerPosts.map((post) => (
                <div key={post.id} className="flex justify-between items-center bg-slate-50 dark:bg-zinc-950/40 p-3 border border-slate-100 dark:border-zinc-800 rounded-xl text-xs gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 dark:text-zinc-200 text-sm">
                        {post.cropDetails?.productName}
                      </span>
                      <span className="bg-emerald-50 text-primary-green dark:bg-emerald-950/40 text-[9px] px-1.5 py-0.5 rounded font-bold">
                        {post.cropDetails?.category}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mt-1.5 text-[10px] text-slate-500">
                      <span>Qty: {post.cropDetails?.quantity}</span>
                      <span>Rate: {post.cropDetails?.price}</span>
                      <span>Harvest: {post.cropDetails?.harvestDate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/20 rounded-xl cursor-pointer"
                    title="Delete listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: AI Suggestions + Digital QR ID Card */}
        <div className="space-y-6">
          
          {/* AI Crop Recommendation Panel */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-2xl p-4 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-poppins font-bold text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-golden-accent" />
                AI Smart Suggestion
              </h3>
              <span className="bg-white/20 text-[9px] px-2 py-0.5 rounded-full font-bold">RE-COMMEND</span>
            </div>

            <div className="space-y-3.5">
              {aiRecommendationsList.map((rec, idx) => (
                <div key={idx} className="bg-white/10 rounded-xl p-3 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-golden-accent">{rec.crop}</span>
                    <span className="text-[9px] bg-emerald-900/50 px-1.5 py-0.5 rounded text-emerald-100">{rec.yieldPotential}</span>
                  </div>
                  <p className="text-[10px] text-emerald-50 leading-relaxed">
                    {rec.recommendedReason}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-[9px] text-emerald-200 italic">{rec.marketTrend}</span>
                    <button
                      onClick={() => adoptAIRecommendation(rec.crop)}
                      className="bg-white text-emerald-800 hover:bg-emerald-50 px-2 py-1 rounded font-bold text-[9px] cursor-pointer transition-colors shadow-sm"
                    >
                      Post Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QR Identity Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-3.5 text-center">
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-2 justify-center">
              <QrCode className="w-4.5 h-4.5 text-slate-700 dark:text-zinc-300" />
              Digital QR Identity
            </h3>

            <div className="flex flex-col items-center justify-center p-3 border border-slate-100 dark:border-zinc-800 rounded-xl bg-slate-50/50 dark:bg-zinc-950/40">
              {showQR ? (
                <div className="space-y-3">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    {/* Simulated SVG/CSS QR Code */}
                    <div className="w-32 h-32 bg-slate-900 flex flex-wrap p-1 rounded-sm gap-[2px]">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className={`w-[14px] h-[14px] ${
                          (i % 3 === 0 || i % 7 === 0 || i < 8 || i > 56) ? 'bg-white' : 'bg-transparent'
                        }`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono">
                    {currentUser.qrCode}
                  </span>
                </div>
              ) : (
                <div className="py-6 text-slate-400 space-y-2">
                  <QrCode className="w-12 h-12 mx-auto text-slate-300 animate-pulse" />
                  <p className="text-[11px]">Generate farmer identity card QR code for MANDI scans.</p>
                </div>
              )}

              <button
                onClick={() => setShowQR(!showQR)}
                className="mt-3.5 w-full bg-slate-800 hover:bg-slate-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-bold py-2 rounded-xl text-xs cursor-pointer transition-colors"
              >
                {showQR ? 'Hide Digital Card' : 'Generate QR Code'}
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
