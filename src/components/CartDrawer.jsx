import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    grandTotal,
    appliedCoupon,
    couponError,
    applyCouponCode,
    removeCoupon,
    setIsCheckoutOpen,
    settings
  } = useStore();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyCouponCode(inputCode);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="absolute inset-0"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0">
        <div className="w-screen max-w-md bg-slate-950 border-r border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-white">سلة المشتريات</h3>
                <span className="text-xs text-slate-400">
                  {cart.length > 0 ? `${cart.length} منتجات في السلة` : 'السلة فارغة'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {item.name}
                    </h4>
                    <div className="text-xs text-cyan-400 font-extrabold mt-1">
                      {item.price} {settings.currency}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 px-1 py-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="إنقاص"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="زيادة"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-16 h-16 text-slate-700 mx-auto" />
                <h4 className="font-bold text-white text-base">سلتك فارغة حالياً</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  تصفح الأقسام واختر من أفضل العروض والاشتراكات الحصرية المتاحة بالمتجر.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer (Summary & Checkout) */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/90 space-y-4">
              
              {/* Coupon Form */}
              <div>
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="كود الخصم (مثال: 4K2026)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl pr-8 pl-3 py-2.5 uppercase focus:outline-none focus:border-cyan-500"
                      />
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3" />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold border border-slate-700"
                    >
                      تطبيق
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300">
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>كوبون {appliedCoupon.code} مفعّل (خصم {appliedCoupon.discountPercent}%)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-rose-400 text-xs underline"
                    >
                      إلغاء
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {couponError}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs pt-2">
                <div className="flex justify-between text-slate-400">
                  <span>المجموع الفرعي:</span>
                  <span className="font-semibold text-white">{subtotal.toFixed(2)} {settings.currency}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>قيمة الخصم ({appliedCoupon.discountPercent}%):</span>
                    <span className="font-bold">-{discountAmount.toFixed(2)} {settings.currency}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm sm:text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>المجموع النهائي:</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300 text-lg">
                    {grandTotal.toFixed(2)} {settings.currency}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <span>متابعة إتمام الطلب والدفع</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
