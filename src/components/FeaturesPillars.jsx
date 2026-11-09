import React from 'react';
import { ShieldCheck, Zap, Coins, Check, ArrowRight } from 'lucide-react';

export default function FeaturesPillars() {
  const pillars = [
    {
      id: 'trust',
      title: 'الـثـقـة والـضـمـان',
      subtitle: 'أمان رقمي 100% بدون أي قلق',
      icon: ShieldCheck,
      color: 'from-cyan-500 to-blue-600',
      glow: 'shadow-cyan-500/20',
      badge: 'الضمان الذهبي',
      description:
        'في 4K STORE، رضاك وأمان حسابك هو أولويتنا القصوى. جميع خدماتنا واشتراكاتنا مفعلة بطرق رسمية وقانونية وبضمان كامل طوال مدة الاشتراك مع سياسة تعويض أو استرجاع فورية.',
      perks: [
        'تفعيل رسمي وقانوني بدون ريسك أو باند',
        'ضمان كامل يغطي كامل مدة الخدمة',
        'دعم فني متخصص على مدار 24 ساعة عبر الديسكورد',
        'تعويض فوري أو استرجاع عند أي مشكلة'
      ]
    },
    {
      id: 'speed',
      title: 'الـسـرعـة الـفـائـقـة',
      subtitle: 'تسليم آلي فوري في ثوانٍ معدودة',
      icon: Zap,
      color: 'from-amber-400 to-orange-500',
      glow: 'shadow-amber-500/20',
      badge: 'تسليم ذكي 24/7',
      description:
        'وداعاً للانتظار الطويل ومراسلة البائعين! نظام المتجر مرتبط ببوتات تسليم ذكية تسلمك كود تفعيل المنتج، بيانات الحساب، أو رابط التفعيل فوراً بعد إتمام الدفع مباشرة.',
      perks: [
        'تسليم فوري وتلقائي بمجرد نجاح الدفع',
        'ظهور كود المنتج على الشاشة وفي فاتورتك الإلكترونية',
        'ربط تلقائي مع سيرفر الديسكورد للتسليم الآلي',
        'يعمل على مدار الساعة طوال أيام الأسبوع'
      ]
    },
    {
      id: 'prices',
      title: 'بـأفـضـل أسـعـار الـسـوق',
      subtitle: 'توفير يصل حتى 70% مقارنة بالأسعار الرسمية',
      icon: Coins,
      color: 'from-emerald-400 to-teal-600',
      glow: 'shadow-emerald-500/20',
      badge: 'أقوى توفير',
      description:
        'نطمح لأن نكون الأفضل في الشرق الأوسط، ولذلك نقدم لك أقل تكلفة في السوق مع أعلى جودة ممكنة، بالإضافة إلى عروض دورية وكوبونات خصم حصرية لأعضاء الديسكورد.',
      perks: [
        'أرخص أسعار لاشتراكات النيترو والبوستات والمنصات',
        'أسعار خاصة ومخفضة لطلبات الجملة وسيرفرات الديسكورد',
        'كوبونات خصم متجددة ومسابقات مستمرة بالسيرفر',
        'بدون أي رسوم خفية أو إضافات غير مبررة'
      ]
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <span>ركائز متجر 4K STORE الأساسية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            سيرفر ستور يتميز بـ:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              الثقة - السرعة - أفضل الأسعار
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            التزامنا الثابت الذي يجعل أكثر من 15 ألف عميل في كافة دول الشرق الأوسط يختارون متجرنا كوجهة موثوقة أولى دائماً.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="relative rounded-3xl p-7 lg:p-8 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 group hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              >
                {/* Accent top glow */}
                <div
                  className={`absolute -top-px left-10 right-10 h-0.5 bg-gradient-to-r ${pillar.color} opacity-60 group-hover:opacity-100 transition-opacity`}
                ></div>

                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} p-0.5 shadow-lg ${pillar.glow}`}
                    >
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800/80 text-slate-300 border border-slate-700">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-300/80 mb-4">
                    {pillar.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Perks List */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-6">
                    {pillar.perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>استكشف عروض هذا القسم</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
