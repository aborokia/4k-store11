import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  ShieldCheck,
  Zap,
  ShoppingBag,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function ProductModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    settings,
    categories
  } = useStore();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const categoryObj = categories.find((c) => c.id === product.category);

  const handleInstantBuy = () => {
    addToCart(product, 1);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Header Image & Badges */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900/90 text-cyan-300 border border-slate-700">
                {categoryObj?.name || 'قسم تقني'}
              </span>
              {product.badge && (
                <span className="text-xs font-black px-3 py-1 rounded-full bg-cyan-500 text-slate-950">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Title & Ratings */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="text-sm font-bold text-white">{product.rating || '5.0'}</span>
              <span className="text-xs text-slate-400">({product.reviewsCount || 10} تقييم حقيقي)</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                تسليم آلي فوري
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {product.name}
            </h3>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-1">السعر الحالي بالمتجر:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                  {product.price}
                </span>
                <span className="text-sm font-bold text-slate-400">{settings.currency}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through mr-2">
                    {product.originalPrice} {settings.currency}
                  </span>
                )}
              </div>
            </div>

            {discountPercent > 0 && (
              <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black">
                وفر {discountPercent}%
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 mb-2">وصف الخدمة والمنتج:</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
              {product.description}
            </p>
          </div>

          {/* Features List */}
          {product.features && product.features.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-200 mb-3">مميزات هذا المنتج:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 bg-slate-950/30 p-2.5 rounded-xl border border-slate-800/50">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust & Guarantee Callout */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-cyan-300 block">ضمان ذهبي 100% من متجر 4K STORE</span>
              <span className="text-slate-400">
                المنتج مفعل رسمياً، مع تعويض فوري واستبدال مباشر في حال واجهت أي خلل.
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 grid grid-cols-2 gap-3">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>إضافة للسلة</span>
          </button>

          <button
            onClick={handleInstantBuy}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/25 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>شراء فوري وتسليم آلي</span>
          </button>
        </div>

      </div>
    </div>
  );
}
