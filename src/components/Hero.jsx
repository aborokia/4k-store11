import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Zap,
  Tag,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Users,
  CheckCircle2,
  Clock,
  Star
} from 'lucide-react';

export default function Hero() {
  const { settings } = useStore();

  return (
    <section id="hero" className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Decorative Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-950/40 backdrop-blur-md animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>المنصة التقنية الأسرع نمواً في الشرق الأوسط 🚀</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15]">
            سيرفر ستور{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 text-glow">
              4K STORE
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-300 mt-2 block">
              نطمح لنكون الأفضل والوجهة الأولى بلا منازع
            </span>
          </h1>

          {/* Core Pillars Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-3xl mx-auto">
            متجر رقمي تقني متكامل مبني على ثلاث ركائز أساسية:{' '}
            <strong className="text-cyan-300 font-bold">الـثـقـة</strong> والأمان المطلق،{' '}
            <strong className="text-sky-300 font-bold">الـسـرعـة</strong> والتسليم الآلي الفوري،{' '}
            و<strong className="text-indigo-300 font-bold">مـنـتـجـات بـأفـضـل أسـعـار الـسـوق</strong> مع ضمان ذهبي شامل.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>تصفح المنتجات والاشتراكات</span>
              <ArrowLeft className="w-5 h-5" />
            </a>

            <a
              href={settings.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-[#5865F2] text-slate-200 hover:text-white border border-slate-700 hover:border-[#5865F2] font-bold text-base transition-all duration-200 group shadow-md"
            >
              <svg className="w-5 h-5 fill-current text-[#5865F2] group-hover:text-white transition-colors" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span>انضم لسيرفر الديسكورد</span>
              <span className="bg-[#5865F2]/20 group-hover:bg-white/20 text-xs px-2 py-0.5 rounded-full text-indigo-300 group-hover:text-white">
                تكتات ودعم
              </span>
            </a>
          </div>

          {/* Trust Guarantees Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-white">{settings.stats.happyClients}</span>
              <span className="text-xs text-slate-400 font-medium">عميل موثق وسعيد</span>
            </div>

            <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-white">{settings.stats.completedOrders}</span>
              <span className="text-xs text-slate-400 font-medium">طلب تم تسليمه بنجاح</span>
            </div>

            <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-white">{settings.stats.positiveRating}</span>
              <span className="text-xs text-slate-400 font-medium">نسبة التقييم الإيجابي</span>
            </div>

            <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-lg sm:text-xl font-black text-white">{settings.stats.avgDeliveryTime}</span>
              <span className="text-xs text-slate-400 font-medium">متوسط سرعة التسليم</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
