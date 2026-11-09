import React from 'react';
import { useStore } from '../context/StoreContext';
import { Star, ShieldCheck, MessageSquare, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const { reviews, settings } = useStore();

  return (
    <section id="reviews" className="py-16 md:py-24 relative bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-cyan-400" />
            <span>آراء وتجارب المشترين</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            ماذا يقول عملاؤنا عن{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              4K STORE
            </span>
            ؟
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            تقييمات حقيقية وموثقة من أعضاء سيرفر الديسكورد ومشتري خدماتنا في الشرق الأوسط.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 relative group"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-11 h-11 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                      {rev.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" title="مشتري موثق" />
                      )}
                    </div>
                    <span className="text-[11px] text-[#8ea1e1] font-mono flex items-center gap-1">
                      <MessageSquare className="w-2.5 h-2.5" />
                      {rev.discordTag}
                    </span>
                  </div>
                </div>

                {/* Stars & Product Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{rev.date}</span>
                </div>

                {/* Product Name */}
                <div className="text-[11px] font-semibold text-cyan-300/80 bg-cyan-950/40 px-2 py-0.5 rounded-md inline-block mb-3 border border-cyan-900/40">
                  {rev.product}
                </div>

                {/* Review comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom Quote decoration */}
              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>تقييم موثق بالسيرفر</span>
                <Quote className="w-4 h-4 text-slate-700 group-hover:text-cyan-500/40 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Discord Link to view more reviews */}
        <div className="text-center mt-12">
          <a
            href={settings.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors bg-slate-900 px-5 py-2.5 rounded-full border border-slate-800 hover:border-[#5865F2]"
          >
            <span>شاهد أكثر من +5,000 إثبات وتقييم مباشر في روم #⭐・آراء-المشترين</span>
            <MessageSquare className="w-4 h-4 text-[#5865F2]" />
          </a>
        </div>

      </div>
    </section>
  );
}
