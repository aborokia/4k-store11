import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowLeft, X, MessageSquare } from 'lucide-react';

export default function AnnouncementBanner() {
  const { settings } = useStore();
  const [closed, setClosed] = useState(false);

  if (!settings.announcementActive || closed) return null;

  return (
    <div className="relative bg-gradient-to-r from-cyan-600 via-indigo-600 to-cyan-700 text-white text-xs md:text-sm py-2 px-4 shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden mx-auto">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <Sparkles className="w-4 h-4 text-cyan-200 shrink-0" />
          <p className="font-medium truncate text-center">
            {settings.announcementText}
          </p>
          <a
            href={settings.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white font-bold px-2.5 py-0.5 rounded-full text-xs transition-colors shrink-0"
          >
            <MessageSquare className="w-3 h-3" />
            انضم للديسكورد
          </a>
        </div>
        <button
          onClick={() => setClosed(true)}
          className="text-white/80 hover:text-white p-1 transition-colors"
          title="إغلاق الإعلان"
          aria-label="إغلاق الإعلان"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
