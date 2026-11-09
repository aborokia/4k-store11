import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  MessageSquare,
  Tv,
  Gamepad2,
  Coins,
  Code2,
  Layers,
  ArrowLeft,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const iconMap = {
  MessageSquare: MessageSquare,
  Tv: Tv,
  Gamepad2: Gamepad2,
  Coins: Coins,
  Code2: Code2,
  Layers: Layers
};

export default function CategoriesSection() {
  const { categories, setSelectedCategory, products } = useStore();

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-16 md:py-24 relative bg-slate-900/40 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-800/60 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تنوع تقني رقمي متكامل</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            أقسام متجر{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              4K STORE
            </span>{' '}
            (نبذة شاملة)
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            تعرّف على كافة الأقسام والخدمات التقنية التي نوفرها لعملائنا في الشرق الأوسط مع تفاصيل كل قسم ومزاياه الحصرية.
          </p>
        </div>

        {/* Categories Grid with Briefs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || MessageSquare;
            const count = products.filter(p => p.category === cat.id).length;

            return (
              <div
                key={cat.id}
                className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between group border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${cat.color || 'from-cyan-500 to-blue-600'} p-0.5 shadow-md`}
                    >
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {count} منتجات
                      </span>
                      {cat.badge && (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-400 transition-colors">
                    {cat.name}
                  </h3>

                  {/* Brief (النبذة) */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/60">
                    {cat.brief}
                  </p>

                  {/* Features Bullets */}
                  {cat.features && (
                    <div className="space-y-2 mb-6">
                      {cat.features.map((feat, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action Button */}
                <button
                  onClick={() => handleSelectCategory(cat.id)}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-slate-300 hover:text-slate-950 font-bold text-xs sm:text-sm border border-slate-700/80 hover:border-transparent transition-all duration-200"
                >
                  <span>عرض منتجات قسم {cat.shortName || cat.name}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
