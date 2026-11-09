import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, KeyRound, X, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminAuthModal({ isOpen, onClose, onSuccess }) {
  const { loginAdmin, settings } = useStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginAdmin(pin.trim())) {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
          <Lock className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-black text-white mb-1">لوحة تحكم إدارة 4K STORE</h3>
        <p className="text-xs text-slate-400 mb-6">
          أدخل الرمز السري للأدمن للوصول إلى إدارة المنتجات والطلبات والإحصائيات.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              autoFocus
              placeholder="الرمز السري (الافتراضي: 4000)"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center text-sm font-mono tracking-widest text-white focus:outline-none focus:border-amber-500"
            />
            <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>

          {error && (
            <p className="text-xs text-rose-400 flex items-center justify-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>الرمز السري غير صحيح، جرب 4000</span>
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all"
          >
            تسجيل الدخول
          </button>

          <div className="pt-2">
            <span className="text-[11px] text-slate-500">
              الرمز السري كأرقام: <strong className="text-amber-400 font-mono">4000</strong> (أو admin4k)
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
