import React from 'react';
import { Check, X, Shield, Zap, Sparkles, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const comparisons = [
    {
      feature: 'سرعة التسليم',
      us: 'آلي وفوري خلال ثوانٍ معدودة 24/7',
      others: 'انتظار يدوي لساعات أو أيام',
      better: true
    },
    {
      feature: 'الضمان والتعويض',
      us: 'ضمان ذهبي كامل طوال المدة + تعويض فوري',
      others: 'ضمان محدود أو بدون أي ضمان',
      better: true
    },
    {
      feature: 'أمان الحسابات وتفعيل النيترو',
      us: 'رسمي 100% بدون أي ريسك أو طلب باسوورد',
      others: 'طرق غير رسمية قد تسبب إغلاق حسابك',
      better: true
    },
    {
      feature: 'الأسعار والتوفير',
      us: 'أفضل أسعار بالسوق مع كود خصم متجدد',
      others: 'أسعار مرتفعة مع رسوم خفية إضافية',
      better: true
    },
    {
      feature: 'الدعم الفني والخدمة',
      us: 'سيرفر ديسكورد نشط وتذاكر مباشرة 24/7',
      others: 'رد بطيء وتجاهل بعد إتمام الدفع',
      better: true
    }
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>المقارنة التي تثبت الفرق</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            لماذا يختار الجميع{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              4K STORE
            </span>
            ؟
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            نحن لا نبيع منتجات رقمية فقط، بل نمنحك تجربة شراء راقية وسريعة ومحمية بأعلى معايير الأمان.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl backdrop-blur-md">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-900/90 border-b border-slate-800 p-4 sm:p-6 text-sm font-black">
            <div className="col-span-4 sm:col-span-4 text-slate-300">الميزة أو الخدمة</div>
            <div className="col-span-5 sm:col-span-5 text-cyan-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span>متجر 4K STORE</span>
            </div>
            <div className="col-span-3 sm:col-span-3 text-slate-500 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
              <span>المتاجر الأخرى</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-800/80">
            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm items-center hover:bg-slate-800/30 transition-colors"
              >
                {/* Feature Name */}
                <div className="col-span-4 sm:col-span-4 font-bold text-white flex items-center gap-2">
                  <span>{row.feature}</span>
                </div>

                {/* 4K Store Cell */}
                <div className="col-span-5 sm:col-span-5 text-slate-200 font-semibold flex items-center gap-2 pr-1">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-emerald-300 text-xs sm:text-sm">{row.us}</span>
                </div>

                {/* Others Cell */}
                <div className="col-span-3 sm:col-span-3 text-slate-400 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-400">{row.others}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
