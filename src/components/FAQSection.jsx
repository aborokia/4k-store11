import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export default function FAQSection() {
  const { faqs, settings } = useStore();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 relative bg-slate-900/20 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>إجابات واضحة ومباشرة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            الأسئلة الشائعة
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            كل ما تحتاج لمعرفته حول طريقة الشراء، الأمان، الضمان الذهبي، وخدمة العملاء.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 text-white hover:text-cyan-400 transition-colors"
                >
                  <span className="font-bold text-base sm:text-lg">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Discord Contact Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <h4 className="font-bold text-white text-base">لديك سؤال آخر أو استفسار خاص؟</h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              فريق الدعم الفني متواجد على سيرفر الديسكورد للرد عليك خلال أقل من دقيقة.
            </p>
          </div>
          <a
            href={settings.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            فتح تذكرة بالديسكورد
          </a>
        </div>

      </div>
    </section>
  );
}
