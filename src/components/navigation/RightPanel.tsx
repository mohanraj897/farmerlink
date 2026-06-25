'use client';

import React from 'react';
import { 
  TrendingUp, CloudSun, Award, HelpCircle, ArrowRight,
  ExternalLink, Sparkles, MapPin, CheckCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getWeatherData } from '../../utils/mockData';
import { UI_TRANSLATIONS } from '../../utils/translation';

export const RightPanel: React.FC = () => {
  const { 
    currentUser, marketPrices, govSchemes, currentLanguage, 
    aiMatchSuggestions, runAIMatching 
  } = useApp();

  if (!currentUser) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;
  const weather = getWeatherData(currentUser.location);

  // Trigger matches if empty initially
  React.useEffect(() => {
    if (aiMatchSuggestions.length === 0) {
      runAIMatching();
    }
  }, [aiMatchSuggestions.length]);

  return (
    <aside className="hidden lg:flex flex-col w-80 h-screen sticky top-0 overflow-y-auto border-l border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 p-4 space-y-6">
      
      {/* Weather Info widget */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 dark:from-emerald-950/20 dark:to-teal-950/10 rounded-2xl p-4 border border-emerald-500/20 shadow-sm relative overflow-hidden">
        <div className="absolute right-2 top-2 opacity-10">
          <CloudSun className="w-24 h-24 text-emerald-600" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
            <CloudSun className="w-4 h-4" />
            <span>{t.weatherReport}</span>
          </div>
          <span className="text-[10px] text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            {currentUser.location.split(',')[0]}
          </span>
        </div>
        
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-poppins font-bold text-slate-800 dark:text-zinc-100">{weather.temp}°C</span>
          <span className="text-sm font-medium text-slate-600 dark:text-zinc-300">{weather.condition}</span>
        </div>

        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-zinc-400">
          <span>Humidity: {weather.humidity}%</span>
          <span>Wind: {weather.windSpeed} km/h</span>
        </div>

        {/* 3 Day Forecast */}
        <div className="mt-4 border-t border-slate-200/50 dark:border-zinc-800/50 pt-3 grid grid-cols-3 text-center gap-1">
          {weather.forecast.map((f, i) => (
            <div key={i} className="text-xs">
              <p className="text-slate-400 font-medium text-[10px] uppercase">{f.day}</p>
              <p className="font-semibold text-slate-700 dark:text-zinc-200 mt-0.5">{f.temp}°C</p>
              <p className="text-[9px] text-slate-500">{f.condition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Matchmaking widget */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            AI Sourcing Matches
          </h3>
          <span className="bg-emerald-100 dark:bg-emerald-950 text-primary-green text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Live
          </span>
        </div>

        <div className="space-y-3">
          {aiMatchSuggestions.slice(0, 2).map((match, i) => (
            <div key={i} className="border border-slate-100 dark:border-zinc-800/80 rounded-xl p-3 bg-slate-50/55 dark:bg-zinc-950/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {match.crop}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                  {match.matchScore}% Match
                </span>
              </div>
              <div className="text-xs text-slate-600 dark:text-zinc-300">
                <span className="font-semibold text-slate-800 dark:text-zinc-100">
                  {currentUser.role === 'farmer' ? match.company.name : match.farmer.name}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 leading-normal">
                  {match.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live mandis / Price Tracker */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-3.5">
        <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
          {t.marketPrices}
        </h3>

        <div className="space-y-2.5 divide-y divide-slate-100 dark:divide-zinc-800">
          {marketPrices.slice(0, 4).map((price) => (
            <div key={price.id} className="flex justify-between items-center pt-2.5 first:pt-0">
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate">{price.cropName}</p>
                <p className="text-[10px] text-slate-400 truncate">{price.market}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-zinc-100">₹{price.pricePerQuintal}/Qtl</p>
                <span className={`text-[9px] font-bold ${
                  price.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {price.change >= 0 ? '+' : ''}{price.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Govt Schemes */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-3">
        <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          {t.governmentSchemes}
        </h3>

        <div className="space-y-3">
          {govSchemes.slice(0, 2).map((scheme) => (
            <div key={scheme.id} className="text-xs border-l-2 border-emerald-500 pl-2.5 py-0.5">
              <h4 className="font-semibold text-slate-800 dark:text-zinc-200">{scheme.title}</h4>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5 line-clamp-2">{scheme.description}</p>
              <a 
                href={scheme.link} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 hover:underline cursor-pointer"
              >
                <span>Apply Link</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};
