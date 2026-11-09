import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  MessageSquare,
  ShieldCheck,
  Zap,
  Coins,
  Lock,
  ArrowUp,
  Heart
} from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const { settings, categories } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Pillars Banner in Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">الـثـقـة والأمان</h5>
              <p className="text-xs text-slate-400">تفعيل رسمي وضمان كامل طوال المدة</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">الـسـرعـة الفائقة</h5>
              <p className="text-xs text-slate-400">تسليم آلي فوري خلال ثوانٍ معدودة</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">أفـضـل أسـعـار الـسـوق</h5>
              <p className="text-xs text-slate-400">توفير حقيقي لا يقبل المقارنة في الشرق الأوسط</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-md">
                <img
                  src="/logo.png"
                  alt="4K STORE"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-white">{settings.storeName}</span>
                <span className="text-[11px] text-slate-400">{settings.storeTagline}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              سيرفر ستور تقني متكامل يهدف لتقديم أرقى وأسرع تجربة تسوق رقمية في الشرق الأوسط لاشتراكات الديسكورد، الحسابات، الألعاب، وشحن العملات.
            </p>

            {/* Discord Link button */}
            <div className="pt-2">
              <a
                href={settings.discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>سيرفر الديسكورد الرسمي: discord.gg/sg73KenQs4</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm">روابط سريعة</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">الرئيسية</a></li>
              <li><a href="#categories" className="hover:text-cyan-400 transition-colors">الأقسام بنبذة</a></li>
              <li><a href="#products" className="hover:text-cyan-400 transition-colors">كتالوج المنتجات</a></li>
              <li><a href="#why-us" className="hover:text-cyan-400 transition-colors">لماذا 4K STORE؟</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm">أقسام المتجر</h5>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <a href="#products" className="hover:text-cyan-400 transition-colors">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guarantees & Admin */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm">الإدارة والدعم</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={settings.discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#5865F2]" />
                  <span>تذاكر الدعم الفني</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-500"
                >
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>لوحة تحكم الأدمن</span>
                </button>
              </li>
              <li className="text-slate-500">سياسة الضمان والاسترجاع الذهبي</li>
              <li className="text-slate-500">تسليم آلي فوري 24/7</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمتجر <strong className="text-slate-300">4K STORE</strong> - الخيار الأول في الشرق الأوسط.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center gap-1"
              title="العودة لأعلى الصفحة"
            >
              <ArrowUp className="w-4 h-4" />
              <span>للأعلى</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
