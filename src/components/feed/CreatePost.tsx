'use client';

import React, { useState } from 'react';
import { 
  Plus, Image as ImageIcon, Mic, X, Send, Leaf, 
  Building2, Sparkles, MapPin, Calendar, FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UI_TRANSLATIONS } from '../../utils/translation';

export const CreatePost: React.FC = () => {
  const { currentUser, createPost, currentLanguage } = useApp();
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'none'>('none');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  // Farmer specific details
  const [cropName, setCropName] = useState('');
  const [cropCategory, setCropCategory] = useState<'Vegetables' | 'Fruits' | 'Grains' | 'Pulses' | 'Organic' | 'Dairy'>('Vegetables');
  const [cropQuantity, setCropQuantity] = useState('');
  const [cropPrice, setCropPrice] = useState('');
  const [cropHarvest, setCropHarvest] = useState('');

  // Company specific details
  const [reqTitle, setReqTitle] = useState('');
  const [reqQuantity, setReqQuantity] = useState('');
  const [reqBudget, setReqBudget] = useState('');
  const [reqDeadline, setReqDeadline] = useState('');

  if (!currentUser) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;

  // Voice-to-Text Post Creation simulation
  const handleVoiceRecording = () => {
    setIsVoiceRecording(true);
    // Simulate recording for 2.5 seconds and outputting a realistic message
    setTimeout(() => {
      setIsVoiceRecording(false);
      if (currentUser.role === 'farmer') {
        setCropName('Fresh Wheat');
        setCropQuantity('10 Tons');
        setCropPrice('₹2,450 / Quintal');
        setCropHarvest('Next Monday');
        setContent('Harvesting high-quality organic Basmati wheat next week. Seeking wholesale contracts. Excellent moisture levels.');
      } else {
        setReqTitle('Organic Potatoes (5 Tons)');
        setReqQuantity('5 Tons');
        setReqBudget('₹18 / Kg');
        setReqDeadline('2026-07-15');
        setContent('Urgent requirement for chip-grade Atlantic variety potatoes. Delivery directly at our warehouse.');
      }
    }, 2500);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !cropName && !reqTitle) return;

    if (currentUser.role === 'farmer') {
      createPost({
        type: 'crop_offer',
        content,
        mediaType,
        mediaUrl: mediaType === 'image' ? (mediaUrl || 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600') : undefined,
        cropDetails: {
          productName: cropName || 'Mixed Crops',
          category: cropCategory,
          quantity: cropQuantity || 'Not Specified',
          price: cropPrice || 'Best Rate',
          harvestDate: cropHarvest || 'Immediate'
        }
      });

      // Reset
      setCropName('');
      setCropQuantity('');
      setCropPrice('');
      setCropHarvest('');
    } else if (currentUser.role === 'company') {
      createPost({
        type: 'corporate_requirement',
        content,
        mediaType,
        mediaUrl: undefined,
        requirementDetails: {
          requirementTitle: reqTitle || 'Crop Procurement Sourcing',
          quantityNeeded: reqQuantity || 'Bulk',
          budget: reqBudget || 'Negotiable',
          deadline: reqDeadline || 'Flexible'
        }
      });

      // Reset
      setReqTitle('');
      setReqQuantity('');
      setReqBudget('');
      setReqDeadline('');
    } else {
      createPost({
        type: 'general',
        content,
        mediaType,
        mediaUrl: mediaType === 'image' ? mediaUrl : undefined
      });
    }

    setContent('');
    setMediaType('none');
    setMediaUrl('');
  };

  const selectMockImage = (url: string) => {
    setMediaType('image');
    setMediaUrl(url);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
      <h3 className="text-sm font-poppins font-bold text-slate-800 dark:text-zinc-200 mb-3 flex items-center gap-2">
        {currentUser.role === 'farmer' ? (
          <>
            <Leaf className="w-4 h-4 text-primary-green" />
            {t.postCrop}
          </>
        ) : currentUser.role === 'company' ? (
          <>
            <Building2 className="w-4 h-4 text-corporate-blue" />
            {t.postRequirement}
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-golden-accent" />
            Write Community Update
          </>
        )}
      </h3>

      <form onSubmit={handlePostSubmit} className="space-y-4">
        
        {/* Farmer Crop Details Form */}
        {currentUser.role === 'farmer' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-emerald-50/20 dark:bg-emerald-950/5 p-3 rounded-xl border border-emerald-500/10">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Crop Name</label>
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="e.g. Basmati Rice, Banana"
                className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary-green mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Category</label>
              <select
                value={cropCategory}
                onChange={(e) => setCropCategory(e.target.value as any)}
                className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary-green mt-1 cursor-pointer"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Pulses">Pulses</option>
                <option value="Organic">Organic</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Quantity Available</label>
              <input
                type="text"
                value={cropQuantity}
                onChange={(e) => setCropQuantity(e.target.value)}
                placeholder="e.g. 5 Tons, 500 Kg"
                className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary-green mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Asking Price</label>
              <input
                type="text"
                value={cropPrice}
                onChange={(e) => setCropPrice(e.target.value)}
                placeholder="e.g. ₹22,000 / Ton"
                className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary-green mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Expected Harvest Date</label>
              <input
                type="text"
                value={cropHarvest}
                onChange={(e) => setCropHarvest(e.target.value)}
                placeholder="e.g. Immediate, 26th June"
                className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary-green mt-1"
              />
            </div>
          </div>
        )}

        {/* Company Sourcing Requirement Form */}
        {currentUser.role === 'company' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-blue-50/20 dark:bg-blue-950/5 p-3 rounded-xl border border-blue-500/10">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Requirement Title</label>
              <input
                type="text"
                value={reqTitle}
                onChange={(e) => setReqTitle(e.target.value)}
                placeholder="e.g. Sourcing Wheat for Flour Mill"
                className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-corporate-blue mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Quantity Needed</label>
              <input
                type="text"
                value={reqQuantity}
                onChange={(e) => setReqQuantity(e.target.value)}
                placeholder="e.g. 100 Tons"
                className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-corporate-blue mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Target Sourcing Budget</label>
              <input
                type="text"
                value={reqBudget}
                onChange={(e) => setReqBudget(e.target.value)}
                placeholder="e.g. ₹2,600 / Quintal"
                className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-corporate-blue mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Deadline</label>
              <input
                type="text"
                value={reqDeadline}
                onChange={(e) => setReqDeadline(e.target.value)}
                placeholder="e.g. 5th July 2026"
                className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-corporate-blue mt-1"
              />
            </div>
          </div>
        )}

        {/* Post Description */}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            placeholder={
              currentUser.role === 'farmer' 
                ? 'Describe crop condition, organic status, certification, delivery Mandi...'
                : currentUser.role === 'company'
                  ? 'Specify delivery location, quality standards, moisture criteria, contract terms...'
                  : 'Share general agri update with the community...'
            }
            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-3 text-sm focus:outline-none focus:border-slate-300 dark:focus:border-zinc-700 resize-none"
          />

          {/* Voice to Text recording loader */}
          {isVoiceRecording && (
            <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-950/20 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-emerald-500/30 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">Listening to voice...</span>
              </div>
            </div>
          )}
        </div>

        {/* Media Preview if attached */}
        {mediaType === 'image' && mediaUrl && (
          <div className="relative inline-block mt-1">
            <img src={mediaUrl} className="w-28 h-20 object-cover rounded-xl border border-slate-200 dark:border-zinc-800" alt="Preview" />
            <button
              onClick={() => {
                setMediaType('none');
                setMediaUrl('');
              }}
              className="absolute -top-1.5 -right-1.5 p-1 bg-rose-600 text-white rounded-full cursor-pointer hover:bg-rose-700 shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Actions panel */}
        <div className="flex justify-between items-center pt-2">
          
          {/* Quick attach toolbar */}
          <div className="flex gap-2">
            
            {/* Mock crop image attachments (Simulates gallery uploads) */}
            {currentUser.role === 'farmer' && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => selectMockImage('https://images.unsplash.com/photo-1595855759920-86582396756a?w=600')}
                  className="p-2 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl text-slate-400 hover:text-emerald-600 cursor-pointer transition-colors"
                  title="Attach tomato photo"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => selectMockImage('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600')}
                  className="p-2 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl text-slate-400 hover:text-emerald-600 cursor-pointer transition-colors"
                  title="Attach wheat farm photo"
                >
                  <Leaf className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* General Attachments */}
            {currentUser.role !== 'farmer' && (
              <button
                type="button"
                onClick={() => selectMockImage('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600')}
                className="p-2 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            )}

            {/* Voice-to-Text Post Creator */}
            <button
              type="button"
              onClick={handleVoiceRecording}
              className={`p-2 border rounded-xl cursor-pointer transition-colors flex items-center gap-1 text-slate-400 ${
                isVoiceRecording
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                  : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-rose-600'
              }`}
              title="Voice-to-Text Post Creation"
            >
              <Mic className="w-4 h-4" />
              <span className="text-[10px] font-bold hidden sm:inline">Voice Post</span>
            </button>

          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-bold text-white shadow cursor-pointer transition-all duration-200 ${
              currentUser.role === 'farmer' 
                ? 'bg-primary-green hover:bg-primary-green-hover ring-pulse-green' 
                : currentUser.role === 'company' 
                  ? 'bg-corporate-blue hover:bg-corporate-blue-hover ring-pulse-blue' 
                  : 'bg-slate-800 hover:bg-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Post</span>
          </button>

        </div>

      </form>
    </div>
  );
};
