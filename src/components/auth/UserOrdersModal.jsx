import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Zap,
  Copy,
  Check,
  MessageSquare,
  Clock,
  PackageOpen
} from 'lucide-react';

export default function UserOrdersModal({ isOpen, onClose }) {
  const { currentUser, orders, settings } = useStore();
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen || !currentUser) return null;

  // Filter orders by current user's email or name
  const userOrders = orders.filter(
    (o) =>
      (o.email && o.email.toLowerCase() === currentUser.email.toLowerCase()) ||
      (o.customerName && o.customerName.toLowerCase() === currentUser.name.toLowerCase()) ||
      o.discordTag === currentUser.name
  );

  const copyKey = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(idx);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
          />
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <span>طلبات وأكواد {currentUser.name}</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800">
                حساب Google موثق
              </span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">{currentUser.email}</span>
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {userOrders.length > 0 ? (
            userOrders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-cyan-400">{order.id}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{order.createdAt}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.status === 'مكتمل'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-1 text-xs text-slate-300">
                  {order.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="font-medium text-white">{it.name}</span>
                      <span className="text-slate-400">×{it.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Delivered Keys */}
                {order.status === 'مكتمل' && order.deliveredKeys && order.deliveredKeys.length > 0 ? (
                  <div className="pt-2 border-t border-slate-800/60 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      أكواد التفعيل المعتمدة (تم إرسال نسخة إلى {order.email}):
                    </span>
                    {order.deliveredKeys.map((k, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 font-mono text-xs text-cyan-200"
                      >
                        <span className="select-all truncate">{k.key}</span>
                        <button
                          onClick={() => copyKey(k.key, `${order.id}-${idx}`)}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-white flex items-center gap-1 shrink-0 mr-2"
                        >
                          {copiedKey === `${order.id}-${idx}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>نسخ</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : order.status !== 'مكتمل' ? (
                  <div className="pt-2 border-t border-slate-800/60 p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>قيد مراجعة إيصال التحويل من فريق الدعم</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">
                      فور موافقة الدعم، سيصلك كود التفعيل فوراً على بريدك: <strong className="text-white font-mono">{order.email}</strong> وسيظهر هنا مباشرة.
                    </p>
                  </div>
                ) : null}

                <div className="flex items-center justify-between text-xs pt-1 text-slate-400">
                  <span>المبلغ المدفوع: <strong className="text-white">{order.totalAmount} {settings.currency}</strong></span>
                  <a
                    href={settings.discordLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ea1e1] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>تذكرة دعم بالديسكورد</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-3">
              <PackageOpen className="w-14 h-14 text-slate-600 mx-auto" />
              <h4 className="font-bold text-white text-base">لا توجد طلبات مسجلة بعد</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                عند إتمام أي عملية شراء بالمتجر، ستظهر فاتورتك وكود التسليم الفوري هنا تلقائياً.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
