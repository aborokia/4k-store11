import React from 'react';
import { MousePointerClick, CreditCard, Rocket, ArrowLeft } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'اختر منتجك والكمية',
      desc: 'تصفح تشكيلة واسعة من اشتراكات النيترو، الحسابات، الألعاب والبرامج، واطلع على المواصفات والأسعار بوضوح.',
      icon: MousePointerClick,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      num: '02',
      title: 'أكّد الطلب وادفع بأمان',
      desc: 'اختر وسيلة الدفع المفضلة لديك (مدى، Apple Pay، STC Pay، فيزا، أو تذكرة ديسكورد) مع استخدام كوبون الخصم.',
      icon: CreditCard,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      num: '03',
      title: 'استلم كودك وحسابك فوراً',
      desc: 'يظهر كود التفعيل أو بيانات الحساب تلقائياً على شاشتك في ثوانٍ، مع دعم فني متاح على الديسكورد 24 ساعة.',
      icon: Rocket,
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative bg-slate-900/30 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <span>خطوات سريعة وسهلة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            كيف تتم عملية الشراء والتسليم؟
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            3 خطوات بسيطة ومؤتمتة بالكامل تضمن لك تجربة تسوق رقمية استثنائية وبدون أي تعقيد.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-3xl p-8 bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 group shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 shadow-md`}
                    >
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <span className="text-3xl font-black text-slate-700 group-hover:text-cyan-400/30 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/60 mt-6 flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span>الخطوة {step.num} من 3</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
