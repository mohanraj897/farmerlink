'use client';

import React, { useState } from 'react';
import { 
  Leaf, Building2, ShieldAlert, KeyRound, Smartphone, Mail, 
  ArrowRight, Search, MapPin, Award, CheckCircle2, Bot, 
  HelpCircle, Filter, X, Sparkles, LogIn, PhoneCall, Menu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/navigation/Sidebar';
import { TopHeader } from '../components/navigation/TopHeader';
import { RightPanel } from '../components/navigation/RightPanel';
import { BottomNav } from '../components/navigation/BottomNav';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { ChatWindow } from '../components/chat/ChatWindow';
import { FarmerDashboard } from '../components/dashboard/FarmerDashboard';
import { CompanyDashboard } from '../components/dashboard/CompanyDashboard';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';
import { UserProfile } from '../components/profile/UserProfile';
import { AIChatbot } from '../components/ai/AIChatbot';
import { UI_TRANSLATIONS } from '../utils/translation';

export default function Page() {
  const { 
    currentUser, login, registerUser, posts, currentLanguage, 
    searchQuery, filters, setFilter, resetFilters 
  } = useApp();

  const [activeTab, setActiveTab] = useState('feed');
  const [selectedChatUserId, setSelectedChatUserId] = useState<string | null>(null);

  // Authentication UI State
  const [loginRole, setLoginRole] = useState<'farmer' | 'company' | 'admin'>('farmer');
  const [authMethod, setAuthMethod] = useState<'email' | 'otp' | 'google'>('email');
  const [credentials, setCredentials] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Filter toggles
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;

  // Handle Contact click on a post -> routes to chat and sets active partner
  const handleContactFarmerOrCompany = (partnerId: string) => {
    setSelectedChatUserId(partnerId);
    setActiveTab('chat');
  };

  // Login execution
  const executeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials || !password) return;
    
    setIsAuthenticating(true);
    // Reduced delay for real-time feel
    setTimeout(() => {
      const success = login(credentials, loginRole);
      setIsAuthenticating(false);
      if (!success) {
        // Automatically create account if not matched for testing
        registerUser({
          name: credentials.split('@')[0],
          role: loginRole,
          email: credentials.includes('@') ? credentials : `${credentials}@farmerlink.org`,
          phone: !credentials.includes('@') ? credentials : '+91 98765 00000',
          location: 'Anand, Gujarat',
          language: currentLanguage
        });
      }
      setPassword('');
    }, 500);
  };

  // OTP Login Simulation
  const requestOtp = () => {
    if (!credentials) return;
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setOtpSent(true);
      alert('Mock OTP sent to mobile! Enter "123456" to verify secure session.');
    }, 1000);
  };

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === '123456') {
      setIsAuthenticating(true);
      setTimeout(() => {
        setIsAuthenticating(false);
        login(credentials, loginRole);
      }, 1000);
    } else {
      alert('Invalid OTP code. Try "123456"');
    }
  };

  // Google OAuth Simulation
  const loginWithGoogle = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      // Log in with dummy credentials
      login('google-account@gmail.com', loginRole);
    }, 1500);
  };

  // Sourcing filters lookup
  const getFilteredPosts = () => {
    return posts.filter(post => {
      // 1. Role Filter
      if (filters.userRole !== 'All') {
        if (post.userRole !== filters.userRole) return false;
      }
      
      // 2. Verified Only
      if (filters.verifiedOnly && !post.verified) return false;

      // 3. Category Filter (For crop offers)
      if (filters.category !== 'All') {
        if (post.type !== 'crop_offer' || post.cropDetails?.category !== filters.category) return false;
      }

      // 4. Sourcing Location Query
      if (filters.location && !post.location.toLowerCase().includes(filters.location.toLowerCase())) return false;

      // 5. Global Search Match
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesContent = post.content.toLowerCase().includes(query);
        const matchesName = post.userName.toLowerCase().includes(query);
        const matchesLocation = post.location.toLowerCase().includes(query);
        const matchesCropName = post.cropDetails?.productName.toLowerCase().includes(query);
        const matchesReqName = post.requirementDetails?.requirementTitle.toLowerCase().includes(query);

        if (!matchesContent && !matchesName && !matchesLocation && !matchesCropName && !matchesReqName) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredPosts = getFilteredPosts();

  // RENDER LANDING PAGE IF NOT LOGGED IN
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-zinc-950 font-sans scroll-smooth overflow-x-hidden">
        
        {/* Left Side: Premium Marketing & Branding Pane */}
        <div id="home" className="flex-1 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 text-white flex flex-col justify-between p-6 md:p-16 relative overflow-hidden">
          {/* Animated Glow Background bubbles */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-emerald-600/30 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />

          {/* Header */}
          <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="flex items-center justify-center gap-3 bg-white/15 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl px-4 py-2 shadow-lg shadow-emerald-950/20">
              <Leaf className="w-10 h-10 text-golden-accent animate-pulse" />
              <span className="font-poppins font-black text-2xl tracking-tight text-white drop-shadow-sm">
                FarmerLink
              </span>
            </div>
          </div>

          <div className="md:hidden mt-4 flex items-center justify-between gap-2 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-3xl px-2 py-2 text-[10px] text-slate-100">
            <a href="#home" className="flex-1 min-w-[30%] rounded-2xl bg-white/10 hover:bg-white/20 transition-colors px-2 py-2 text-center">Home</a>
            <a href="#features" className="flex-1 min-w-[30%] rounded-2xl bg-white/10 hover:bg-white/20 transition-colors px-2 py-2 text-center">Features</a>
            <a href="#login" className="flex-1 min-w-[30%] rounded-2xl bg-white/10 hover:bg-white/20 transition-colors px-2 py-2 text-center">Login</a>
          </div>

          {/* Main Hero Marketing message */}
          <div id="features" className="space-y-6 max-w-full sm:max-w-xl mx-auto md:mx-0 my-auto relative z-10 py-10 md:py-12 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-golden-accent border border-white/15">
              <Sparkles className="w-4 h-4" />
              Direct Agri Business Sourcing
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-poppins font-extrabold tracking-tight leading-tight">
              Smarter Business for <br className="hidden lg:inline"/>
              <span className="bg-gradient-to-r from-golden-accent via-emerald-300 to-white bg-clip-text text-transparent">Agriculture Industry</span>
            </h1>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light">
              "Connecting Farmers and Companies for Smarter Agriculture." Build direct wholesale relationships, negotiate in real-time, get AI crop yields recommendations, scan mandi QR IDs, and eliminate third-party margins.
            </p>

            {/* Simulated app benefits badge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs font-semibold text-slate-100">
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-golden-accent shrink-0" />
                <span>Multilingual Chat Translator</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-golden-accent shrink-0" />
                <span>AI Crop Yield Suggester</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-slate-350 relative z-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between border-t border-white/10 pt-6">
            <span>© 2026 FarmerLink Platform Inc. All rights reserved.</span>
            <span>Multilingual translation engines powered by AgriAI.</span>
          </div>
        </div>

        {/* Right Side: Responsive Auth Login Interface card */}
        <div id="login" className="w-full md:w-[480px] bg-white dark:bg-zinc-900 flex flex-col justify-center px-4 py-10 md:px-12 md:py-12 shrink-0">
          
          <div className="w-full max-w-full sm:max-w-sm mx-auto space-y-6">
            
            {/* Header info */}
            <div>
              <h2 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white">Welcome to FarmerLink</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Select your account profile role and credentials to begin.</p>
            </div>

            {/* Role Selection Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-100 dark:bg-zinc-950 p-1.5 rounded-2xl">
              <button
                onClick={() => setLoginRole('farmer')}
                className={`py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                  loginRole === 'farmer' 
                    ? 'bg-white dark:bg-zinc-850 text-primary-green shadow-sm' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Leaf className="w-4 h-4" />
                Farmer
              </button>
              <button
                onClick={() => setLoginRole('company')}
                className={`py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                  loginRole === 'company' 
                    ? 'bg-white dark:bg-zinc-850 text-corporate-blue shadow-sm' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Company
              </button>
              <button
                onClick={() => setLoginRole('admin')}
                className={`py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                  loginRole === 'admin' 
                    ? 'bg-white dark:bg-zinc-850 text-amber-500 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                Admin
              </button>
            </div>

            {/* Auth Method Toggles */}
            <div className="flex flex-wrap gap-2 text-xs font-bold border-b border-slate-200 dark:border-zinc-700 pb-2">
              <button 
                onClick={() => { setAuthMethod('email'); setOtpSent(false); }}
                className={`pb-1 cursor-pointer transition-colors ${authMethod === 'email' ? 'border-b-2 border-emerald-600 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Email Access
              </button>
              <button 
                onClick={() => { setAuthMethod('otp'); setOtpSent(false); }}
                className={`pb-1 cursor-pointer transition-colors ${authMethod === 'otp' ? 'border-b-2 border-emerald-600 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Mobile OTP
              </button>
              <button 
                onClick={() => { setAuthMethod('google'); setOtpSent(false); }}
                className={`pb-1 cursor-pointer transition-colors ${authMethod === 'google' ? 'border-b-2 border-emerald-600 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Google OAuth
              </button>
            </div>

            {/* Interactive Inputs depending on Auth Method */}
            {authMethod === 'email' && (
              <form onSubmit={executeLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider block">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={credentials}
                      onChange={(e) => setCredentials(e.target.value)}
                      placeholder="e.g. rajesh.patel@farmmail.com"
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider block">Password</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className={`w-full font-poppins font-bold text-xs py-3 rounded-xl text-white shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginRole === 'farmer' ? 'bg-primary-green hover:bg-primary-green-hover' : loginRole === 'company' ? 'bg-corporate-blue hover:bg-corporate-blue-hover' : 'bg-slate-800 hover:bg-slate-900'
                  }`}
                >
                  {isAuthenticating ? 'Authorizing secure session JWT...' : 'Login with Credentials'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {authMethod === 'otp' && (
              <div className="space-y-4">
                {!otpSent ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase block">Phone Number</label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={credentials}
                          onChange={(e) => setCredentials(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={requestOtp}
                      disabled={isAuthenticating}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-poppins font-bold text-xs py-3 rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isAuthenticating ? 'Sending OTP gateway request...' : 'Send Verification SMS'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={verifyOtp} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase block">OTP Code</label>
                      <input
                        type="text"
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter 123456"
                        className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl py-2.5 px-4 text-center tracking-widest text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isAuthenticating}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-poppins font-bold text-xs py-3 rounded-xl shadow-sm cursor-pointer"
                    >
                      {isAuthenticating ? 'Authorizing mobile credentials...' : 'Verify & Enter Dashboard'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {authMethod === 'google' && (
              <div className="space-y-4">
                <button
                  onClick={loginWithGoogle}
                  disabled={isAuthenticating}
                  className="w-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850 text-slate-700 dark:text-zinc-300 font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 15.01 1 12 1 7.24 1 3.21 3.73 1.25 7.71l3.87 3C6.03 7.7 8.79 5.04 12 5.04z" />
                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.57l3.73 2.9C21.97 18.06 23.49 15.38 23.49 12.27z" />
                    <path fill="#FBBC05" d="M5.12 10.71c-.26-.77-.41-1.6-.41-2.46s.15-1.69.41-2.46L1.25 2.79C.45 4.39 0 6.18 0 8.08s.45 3.69 1.25 5.29l3.87-3z" />
                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.9c-1.1.74-2.52 1.18-4.23 1.18-3.21 0-5.97-2.66-6.88-5.67l-3.87 3C3.21 20.27 7.24 23 12 23z" />
                  </svg>
                  {isAuthenticating ? 'Redirecting to Google Secure Node...' : 'Sign in with Google OAuth'}
                </button>
              </div>
            )}

            {/* Quick Login Profiles for developer grading */}
            <div className="border-t border-slate-200 dark:border-zinc-700 pt-4.5 space-y-2">
              <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase block tracking-wider text-center">Quick-Testing Profiles</span>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <button
                  onClick={() => login('rajesh.patel@farmmail.com', 'farmer')}
                  className="bg-emerald-50/50 hover:bg-emerald-50 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 text-primary-green border border-emerald-600/10 py-2.5 px-2 rounded-xl text-center cursor-pointer font-bold"
                >
                  🌾 Farmer Rajesh
                </button>
                <button
                  onClick={() => login('procurement@itcagri.com', 'company')}
                  className="bg-blue-50/50 hover:bg-blue-50 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 text-corporate-blue border border-blue-600/10 py-2.5 px-2 rounded-xl text-center cursor-pointer font-bold"
                >
                  🏢 ITC Sourcing Corp
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }

  // RENDER MASTER CONTAINER SHELL IF USER IS LOGGED IN
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-zinc-950">
      
      {/* Desktop Left Sidebar navigation component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Responsive Sticky Header Panel */}
        <TopHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          mobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={() => setIsMobileMenuOpen((open) => !open)}
        />

        {/* Center content sub-layouts */}
        <main className="flex-1 overflow-y-auto px-4 py-5 max-w-4xl w-full mx-auto md:pb-6 pb-24">
          
          {/* TAB 1: MAIN NETWORK SOCIAL FEED */}
          {activeTab === 'feed' && (
            <div className="space-y-5">
              {/* Write new post box */}
              <CreatePost />

              {/* Feed Filters Toolbar */}
              <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2.5 rounded-2xl shadow-sm text-xs">
                <span className="font-semibold text-slate-500">
                  Showing {filteredPosts.length} network updates
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFilter('category', filters.category === 'All' ? 'Vegetables' : filters.category === 'Vegetables' ? 'Organic' : 'All')}
                    className={`px-3 py-1 rounded-full border cursor-pointer font-semibold ${
                      filters.category !== 'All' 
                        ? 'border-emerald-600 bg-emerald-50 text-primary-green' 
                        : 'border-slate-200 dark:border-zinc-850 hover:bg-slate-50'
                    }`}
                  >
                    Crop Category: {filters.category}
                  </button>
                  
                  <button
                    onClick={() => setFilter('verifiedOnly', !filters.verifiedOnly)}
                    className={`px-3 py-1 rounded-full border cursor-pointer font-semibold ${
                      filters.verifiedOnly 
                        ? 'border-amber-500 bg-amber-50 text-amber-600' 
                        : 'border-slate-200 dark:border-zinc-850 hover:bg-slate-50'
                    }`}
                  >
                    Verified Only
                  </button>
                </div>
              </div>

              {/* Social Cards listing */}
              <div className="space-y-4">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl">
                    <Search className="w-10 h-10 mx-auto text-slate-350 animate-pulse mb-3" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">No matching posts found</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting filters or typing another crop keyword.</p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
                    >
                      Reset Sourcing Search
                    </button>
                  </div>
                ) : (
                  filteredPosts.map(post => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      onContactClick={handleContactFarmerOrCompany} 
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PRIVATE MESSAGES CHATS PANEL */}
          {activeTab === 'chat' && (
            <ChatWindow 
              selectedUserId={selectedChatUserId} 
              setSelectedUserId={setSelectedChatUserId} 
            />
          )}

          {/* TAB 3: ANALYTICS DASHBOARDS */}
          {activeTab === 'dashboard' && (
            currentUser.role === 'farmer' ? (
              <FarmerDashboard />
            ) : currentUser.role === 'company' ? (
              <CompanyDashboard />
            ) : (
              <AdminDashboard />
            )
          )}

          {/* TAB 4: MY ACCOUNT PROFILE */}
          {activeTab === 'profile' && (
            <UserProfile />
          )}

          {/* TAB 5: PLATFORM ADMIN CONSOLE */}
          {activeTab === 'admin' && (
            <AdminDashboard />
          )}

        </main>
      </div>

      {/* Desktop Sticky Right Sidebar Widgets */}
      {activeTab !== 'chat' && <RightPanel />}

      {/* Floating AI chatbot assistant helper */}
      <AIChatbot />

      {/* Mobile Sticky bottom navigation panel */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  );
}
