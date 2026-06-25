'use client';

import React, { useState } from 'react';
import { 
  User as UserIcon, MapPin, Phone, Mail, Award, Leaf, 
  Building2, Save, FileCheck, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UI_TRANSLATIONS } from '../../utils/translation';

export const UserProfile: React.FC = () => {
  const { currentUser, registerUser, currentLanguage, verifyUser } = useApp();

  // Profile forms
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  
  // Farmer specific
  const [farmName, setFarmName] = useState(currentUser?.farmName || '');
  const [farmSize, setFarmSize] = useState(currentUser?.farmSize || '');
  
  // Company specific
  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [businessType, setBusinessType] = useState(currentUser?.businessType || '');
  const [procurementGoal, setProcurementGoal] = useState(currentUser?.procurementGoal || '');
  const [regNum, setRegNum] = useState(currentUser?.registrationNumber || '');

  // Verification request state
  const [verificationRequested, setVerificationRequested] = useState(false);

  if (!currentUser) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({
      ...currentUser,
      name,
      email,
      phone,
      location,
      farmName,
      farmSize,
      companyName,
      businessType,
      procurementGoal,
      registrationNumber: regNum
    });
    alert('Profile saved successfully!');
  };

  const handleRequestVerification = () => {
    setVerificationRequested(true);
    // Notify admin - we trigger simulated admin notification
    alert('Verification request sent to Administrator! You can switch roles to "Platform Admin" to approve your badge.');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6 pb-20">
      
      {/* Profile Header banner */}
      <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-slate-100 dark:border-zinc-800/80 pb-5">
        <div className="relative">
          <img src={currentUser.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-4 border-slate-100 dark:border-zinc-800" />
          {currentUser.verified && (
            <span className="absolute bottom-0 right-0 bg-white dark:bg-zinc-900 rounded-full p-1 shadow">
              <Award className="w-5 h-5 text-golden-accent fill-golden-accent animate-bounce" />
            </span>
          )}
        </div>
        
        <div className="text-center sm:text-left min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 justify-center sm:justify-start">
            <h2 className="font-poppins font-bold text-lg text-slate-800 dark:text-zinc-100">{currentUser.name}</h2>
            {currentUser.verified ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full mx-auto sm:mx-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.verified}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full mx-auto sm:mx-0">
                <ShieldAlert className="w-3.5 h-3.5" />
                Unverified
              </span>
            )}
          </div>
          <p className="text-xs text-slate-450 mt-1 capitalize font-semibold">
            {currentUser.role === 'farmer' ? t.farmerRole : currentUser.role === 'company' ? t.companyRole : 'Platform Administrator'}
          </p>
        </div>

        {/* Verification Request Action Button */}
        {!currentUser.verified && currentUser.role !== 'admin' && (
          <button
            onClick={handleRequestVerification}
            disabled={verificationRequested}
            className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm cursor-pointer hover:shadow transition-colors ${
              verificationRequested 
                ? 'bg-slate-350 cursor-not-allowed'
                : currentUser.role === 'farmer'
                  ? 'bg-primary-green hover:bg-primary-green-hover ring-pulse-green'
                  : 'bg-corporate-blue hover:bg-corporate-blue-hover ring-pulse-blue'
            }`}
          >
            {verificationRequested ? 'Audit Pending' : 'Request Gold Verification'}
          </button>
        )}
      </div>

      <form onSubmit={handleProfileSave} className="space-y-5 text-xs">
        
        {/* Contact fields */}
        <div className="space-y-3.5">
          <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-200">Contact Credentials</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-500 uppercase block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-500 uppercase block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-500 uppercase block mb-1">Mobile Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-500 uppercase block mb-1">Mandi Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Farmer Specific inputs */}
        {currentUser.role === 'farmer' && (
          <div className="space-y-3.5 pt-3 border-t border-slate-100 dark:border-zinc-850">
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-primary-green" />
              Agricultural Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-500 uppercase block mb-1">Farm Name</label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="e.g. Patel Organic Orchard"
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-green"
                />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase block mb-1">Cultivated Land Area (Acres)</label>
                <input
                  type="text"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  placeholder="e.g. 5 Acres"
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-green"
                />
              </div>
            </div>
          </div>
        )}

        {/* Corporate specific inputs */}
        {currentUser.role === 'company' && (
          <div className="space-y-3.5 pt-3 border-t border-slate-100 dark:border-zinc-850">
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-corporate-blue" />
              Corporate Identity Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-500 uppercase block mb-1">Company Registered Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-corporate-blue"
                />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase block mb-1">Company CIN / Registration Number</label>
                <input
                  type="text"
                  value={regNum}
                  onChange={(e) => setRegNum(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-corporate-blue"
                />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase block mb-1">Business Sourcing Sector</label>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-corporate-blue"
                />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase block mb-1">Procurement Mandate Goals</label>
                <input
                  type="text"
                  value={procurementGoal}
                  onChange={(e) => setProcurementGoal(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-corporate-blue"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-white shadow hover:shadow-md cursor-pointer transition-all duration-200 ${
              currentUser.role === 'farmer'
                ? 'bg-primary-green hover:bg-primary-green-hover ring-pulse-green'
                : currentUser.role === 'company'
                  ? 'bg-corporate-blue hover:bg-corporate-blue-hover ring-pulse-blue'
                  : 'bg-slate-800 hover:bg-slate-900'
            }`}
          >
            <Save className="w-4 h-4" />
            Save Profile Credentials
          </button>
        </div>

      </form>

    </div>
  );
};
