import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Zap,
  Star,
  Eye,
  Check,
  ShieldCheck,
  Layers
} from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    setQuickViewProduct,
    settings,
    categories
  } = useStore();

  const categoryObj = categories.find((c) => c.id === product.category);

  const handleInstantBuy = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="glass-card rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative shadow-lg hover:shadow-cyan-500/10"
    >
      {/* Top Image & Floating Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Floating Top Left / Right Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-black bg-cyan-500 text-slate-950 shadow-md">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/90 text-white shadow-sm">
              خصم {discountPercent}%
            </span>
          )}
        </div>

        {/* Category Pill on Image Bottom */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/90 text-cyan-300 border border-slate-700/80 backdrop-blur-md">
            {categoryObj?.shortName || categoryObj?.name || 'قسم تقني'}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-800/60 backdrop-blur-md flex items-center gap-1">
            <Zap className="w-2.5 h-2.5" />
            {product.deliveryType || 'تسليم فوري'}
          </span>
        </div>

        {/* Quick view button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          title="تفاصيل سريعة"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-white">{product.rating || '5.0'}</span>
            <span className="text-[11px] text-slate-500">({product.reviewsCount || 10} تقييم)</span>
          </div>

          {/* Product Title */}
          <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h4>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                {product.price}
              </span>
              <span className="text-xs font-bold text-slate-400">{settings.currency}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through mr-1 font-medium">
                  {product.originalPrice} {settings.currency}
                </span>
              )}
            </div>

            <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              ضمان ذهبي
            </span>
          </div>

          {/* Buttons: Add to cart & Instant Buy */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold border border-slate-700/80 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
              <span>إضافة للسلة</span>
            </button>

            <button
              onClick={handleInstantBuy}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>شراء فوري</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
