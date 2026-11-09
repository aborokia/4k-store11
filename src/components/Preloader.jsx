import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('تهيئة سيرفرات 4K STORE الفائقة...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const capped = next > 100 ? 100 : next;

        if (capped < 30) {
          setStatusText('تهيئة السيرفرات السريعة والآمنة...');
        } else if (capped < 60) {
          setStatusText('تحميل اشتراكات الديسكورد والمنصات والألعاب...');
        } else if (capped < 85) {
          setStatusText('التحقق من أفضل أسعار السوق وأنظمة التسليم الفوري...');
        } else {
          setStatusText('مرحباً بك في عالم 4K STORE الرقمي!');
        }

        return capped;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(onComplete, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 px-4 transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/15 via-cyan-500/15 to-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center space-y-7">
        
        {/* Animated Brand Logo Container */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 via-cyan-500 to-indigo-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
          
          <div className="relative bg-slate-900/90 border border-slate-700/80 p-5 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col items-center">
            <img
              src="/logo.png"
              alt="4K STORE Logo"
              className="h-24 sm:h-28 w-auto object-contain drop-shadow-[0_10px_20px_rgba(245,158,11,0.25)] hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Store Title & Slogan */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>المتجر التقني الرقمي الأول في الشرق الأوسط</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            4K STORE <span className="text-amber-400">|</span> سيرفر ستور
          </h2>
          <p className="text-xs text-slate-400">
            الثقة • السرعة • أفضل أسعار السوق
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold px-1">
            <span className="text-cyan-400 animate-pulse flex items-center gap-1.5 font-medium">
              <Zap className="w-3.5 h-3.5" />
              {statusText}
            </span>
            <span className="text-amber-400 font-mono text-sm">{progress}%</span>
          </div>

          {/* Progress bar track */}
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-cyan-400 to-blue-500 rounded-full transition-all duration-150 ease-out shadow-lg shadow-cyan-500/50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-4 py-2 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <span>تخطي والبدء فوراً</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
