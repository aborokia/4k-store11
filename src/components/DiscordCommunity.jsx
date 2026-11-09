import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  MessageSquare,
  Users,
  ShieldCheck,
  Gift,
  Ticket,
  Headphones,
  Check,
  Copy,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function DiscordCommunity() {
  const { settings } = useStore();
  const [copied, setCopied] = useState(false);

  const discordUrl = settings.discordLink || 'https://discord.gg/sg73KenQs4';

  const handleCopy = () => {
    navigator.clipboard.writeText(discordUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="discord" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Discord themed ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#5865F2]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Container */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#5865F2]/10 to-slate-950/90 border border-[#5865F2]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Decorative Corner Badge */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#5865F2]/20 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/40 text-[#8ea1e1] text-xs font-bold">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span>مجتمع وسيرفر الديسكورد الرسمي</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                انضم إلى أكبر مجتمع قيمنق وتقنية في الشرق الأوسط
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                سيرفر ستور متكامل لا يقتصر على البيع فقط! سيرفر ديسكورد{' '}
                <strong className="text-white">4K STORE</strong> هو بيتك ومجتمعك: مسابقات أسبوعية، قيف اوايز على نيترو واشتراكات مجانية، دعم فني بتذاكر فورية، وعروض فلاش ديسكونت حصرية للأعضاء.
              </p>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-[#5865F2]/20 flex items-center justify-center text-[#8ea1e1] shrink-0">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">نظام تذاكر ودعم فني</h5>
                    <p className="text-[11px] text-slate-400">رد فوري خلال أقل من دقيقة</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">قيف اواي وسحوبات دورية</h5>
                    <p className="text-[11px] text-slate-400">جوائز نيترو وحسابات أسبوعية</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">رومات صوتية ومجتمع متفاعل</h5>
                    <p className="text-[11px] text-slate-400">ألعاب وسوالف ورومات خاصة</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">إثباتات وضمانات مباشرة</h5>
                    <p className="text-[11px] text-slate-400">روم مخصص لآراء المشترين</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#5865F2]/30 hover:shadow-[#5865F2]/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>انضم للسيرفر الآن</span>
                  <ExternalLink className="w-4 h-4 mr-1 opacity-70" />
                </a>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-sm font-bold transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">تم نسخ الرابط!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>نسخ رابط السيرفر</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Right Interactive Mock Discord Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#2b2d31] rounded-2xl border border-slate-700/80 shadow-2xl p-6 text-white relative">
                
                {/* Header banner */}
                <div className="h-24 -mx-6 -mt-6 mb-4 rounded-t-2xl bg-gradient-to-r from-indigo-700 via-cyan-600 to-indigo-900 relative p-3 flex justify-end items-start">
                  <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified Server
                  </span>
                </div>

                {/* Avatar & Server Info */}
                <div className="relative -mt-12 mb-4 flex items-end justify-between">
                  <div className="w-20 h-20 rounded-2xl bg-slate-950 p-1.5 shadow-xl relative border-4 border-[#2b2d31] flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="4K STORE"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#2b2d31] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                  </div>

                  <a
                    href={discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    دخول السيرفر
                  </a>
                </div>

                <div>
                  <h4 className="text-xl font-black text-white flex items-center gap-2">
                    4K STORE | متجر 4K
                    <span className="text-[#5865F2]">
                      <Sparkles className="w-4 h-4 fill-current" />
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    المتجر التقني الرقمي الأول في الشرق الأوسط | نيترو، اشتراكات، حسابات، وبوتات
                  </p>
                </div>

                {/* Live Member Status */}
                <div className="flex items-center gap-4 py-3 my-3 border-y border-slate-700/60 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <strong className="text-white">4,380</strong> أونلاين
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                    <strong className="text-white">18,650</strong> إجمالي الأعضاء
                  </div>
                </div>

                {/* Channels Mock Preview */}
                <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/60 text-cyan-300 font-semibold">
                    <span className="text-slate-400">#</span>
                    <span>📢・العروض-والخصومات-الحصرية</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800/40 text-slate-400">
                    <span className="text-slate-500">#</span>
                    <span>🎟️・فتح-تذكرة-طلب-ودعم</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800/40 text-slate-400">
                    <span className="text-slate-500">#</span>
                    <span>⭐・آراء-وإثباتات-العملاء</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800/40 text-slate-400">
                    <span className="text-slate-500">#</span>
                    <span>🎁・سحوبات-قيف-اواي-مجانية</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
