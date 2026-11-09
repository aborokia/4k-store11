import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  CreditCard,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  MessageSquare,
  ExternalLink,
  Lock,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  Clock,
  AlertCircle,
  Mail,
  Link as LinkIcon
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    grandTotal,
    discountAmount,
    appliedCoupon,
    placeOrder,
    latestOrderResult,
    setLatestOrderResult,
    settings,
    currentUser
  } = useStore();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [discordTag, setDiscordTag] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [serverLink, setServerLink] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('فودافون كاش');
  const [receiptImage, setReceiptImage] = useState(null);
  const [receiptError, setReceiptError] = useState('');
  const [copiedText, setCopiedText] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if any product in cart is a Discord Boost or requires a store/server link
  const hasBoostProduct = cart.some(
    (item) =>
      item.id === 'prod-2' ||
      item.name.includes('بوست') ||
      item.name.toLowerCase().includes('boost') ||
      (item.category === 'discord' && item.name.includes('سيرفر'))
  );

  // Sync with currentUser if they log in
  useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.name || '');
      if (!email) setEmail(currentUser.email || '');
      if (!discordTag && currentUser.username) setDiscordTag(currentUser.username);
    }
  }, [currentUser]);

  if (!isCheckoutOpen && !latestOrderResult) return null;

  // Handle Receipt Upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setReceiptError('يرجى اختيار ملف صورة صالح (PNG, JPG, JPEG)');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setReceiptError('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 8 ميجابايت');
      return;
    }

    setReceiptError('');
    const reader = new FileReader();
    reader.onload = () => {
      setReceiptImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();

    if (!customerName.trim() || !discordTag.trim()) {
      alert('يرجى كتابة الاسم ويوزر الديسكورد للتواصل');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      alert('يرجى كتابة بريد إلكتروني صحيح لاستلام كود الطلب بعد اعتماد التحويل');
      return;
    }

    if (hasBoostProduct && !serverLink.trim()) {
      alert('يرجى إدخال رابط سيرفر الديسكورد أو الاستور المطلوب ترقيته وتفعيل البوست له');
      return;
    }

    if (!receiptImage) {
      setReceiptError('يرجى رفع صورة إيصال التحويل (Screenshot) لتأكيد الطلب مع فريق الدعم');
      alert('يرجى رفع صورة إيصال التحويل لإتمام إرسال الطلب');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        customerName,
        discordTag,
        phone: phone || 'غير محدد',
        email,
        paymentMethod,
        receiptImage,
        serverLink: hasBoostProduct ? serverLink : null
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setLatestOrderResult(null);
    setReceiptImage(null);
    setReceiptError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {latestOrderResult ? 'متابعة الطلب والتحقق من التحويل' : 'إتمام الطلب وإرسال التحويل للدعم'}
              </h3>
              <span className="text-[11px] text-slate-400">متجر 4K STORE - أمان 100% وضمان ذهبي</span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {latestOrderResult ? (
            /* SUCCESS & PENDING REVIEW SCREEN */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40 animate-pulse">
                <Clock className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                  {latestOrderResult.status || 'قيد مراجعة التحويل'}
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  تم إرسال طلبك لفريق الدعم بنجاح!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  رقم طلبك: <strong className="text-cyan-400 font-mono text-sm">{latestOrderResult.id}</strong>
                </p>
              </div>

              {/* Notice Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-right space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>تم استلام صورة التحويل والبيانات بنجاح</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  يقوم فريق الدعم الفني بمراجعة إيصال التحويل والتأكد منه الآن.
                  <br />
                  <strong className="text-cyan-300">
                    فور موافقة الدعم واعتماد التحويل، سيتم إرسال كود التفعيل والبيانات تلقائياً إلى بريدك:
                  </strong>
                </p>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 flex items-center justify-between">
                  <span>{latestOrderResult.email}</span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">البريد المعتمد</span>
                </div>

                {latestOrderResult.serverLink && (
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <span className="text-slate-400 block text-[11px]">رابط السيرفر المطلوب ترقيته بالبوست:</span>
                    <span className="font-mono text-cyan-400 break-all">{latestOrderResult.serverLink}</span>
                  </div>
                )}

                {/* Uploaded receipt preview */}
                {latestOrderResult.receiptImage && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block mb-2">إيصال التحويل المرفق:</span>
                    <img
                      src={latestOrderResult.receiptImage}
                      alt="Receipt"
                      className="max-h-36 rounded-xl border border-slate-700 object-contain mx-auto"
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`${settings.discordLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>متابعة الطلب في تذكرة الديسكورد</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleClose}
                  className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold transition-colors"
                >
                  تم، العودة للمتجر
                </button>
              </div>
            </div>
          ) : (
            /* ORDER FORM */
            <form onSubmit={handleCompleteOrder} className="space-y-5">
              
              {/* Google/Discord Account info badge if logged in */}
              {currentUser && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-300">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-cyan-400"
                  />
                  <span>
                    تم ربط الطلب بحسابك المسجل: <strong className="text-white font-mono">{currentUser.email}</strong>
                  </span>
                </div>
              )}

              {/* Boost Server Link Mandatory Field */}
              {hasBoostProduct && (
                <div className="p-3.5 rounded-2xl bg-indigo-950/50 border border-indigo-700/60 space-y-1.5 animate-pulse">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                    <LinkIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>رابط سيرفر الديسكورد / الاستور (مطلوب لتفعيل البوست) *</span>
                  </div>
                  <input
                    type="url"
                    required
                    placeholder="https://discord.gg/your-server أو رابط السيرفر"
                    value={serverLink}
                    onChange={(e) => setServerLink(e.target.value)}
                    className="w-full bg-slate-950 border border-indigo-600/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-[11px] text-slate-400 block">
                    مطلوب لإرسال الـ 14 بوست وترقية سيرفرك للمستوى الثالث (Level 3) فور موافقة الدعم.
                  </span>
                </div>
              )}

              {/* Customer Inputs */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      الاسم الكامل / المستعار <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: أحمد الشمري"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      يوزر الديسكورد (Discord Tag) <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: Ahmed#1234 أو @ahmed"
                      value={discordTag}
                      onChange={(e) => setDiscordTag(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                      <span>البريد الإلكتروني لاستلام الكود <span className="text-cyan-400">*</span></span>
                      <span className="text-[10px] text-emerald-400">هام جداً</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      رقم الجوال أو الواتساب (اختياري)
                    </label>
                    <input
                      type="tel"
                      placeholder="05XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector (Vodafone Cash & Al Rajhi featured) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  اختر طريقة التحويل والدفع:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'فودافون كاش',
                    'مصرف الراجحي',
                    'مدى / Apple Pay',
                    'بطاقة فيزا / ماستر',
                    'تذكرة ديسكورد'
                  ].map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        paymentMethod === m
                          ? 'bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border-amber-400 text-amber-300 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Payment Details Box */}
              {paymentMethod === 'فودافون كاش' && (
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-300">بيانات تحويل فودافون كاش (Vodafone Cash):</span>
                    <span className="text-[10px] bg-rose-900/60 px-2 py-0.5 rounded text-white font-bold">كاش فوري</span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-sm text-white">
                    <span className="font-bold tracking-wider">{settings.vodafoneCashNumber || '01023456789'}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(settings.vodafoneCashNumber || '01023456789', 'voda')}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1"
                    >
                      {copiedText === 'voda' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الرقم</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    💡 حول المبلغ المطلوب (<strong className="text-white">{grandTotal.toFixed(2)} {settings.currency}</strong> أو ما يعادلها بالجنيه) إلى رقم الكاش أعلاه، ثم ارفع لقطة الشاشة (إيصال التحويل) بالأسفل.
                  </p>
                </div>
              )}

              {paymentMethod === 'مصرف الراجحي' && (
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/60 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-300">بيانات تحويل مصرف الراجحي (Al Rajhi Bank):</span>
                    <span className="text-[10px] bg-blue-900/60 px-2 py-0.5 rounded text-white font-bold">تحويل مباشر</span>
                  </div>

                  {/* Account */}
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-white">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">رقم الحساب:</span>
                      <span>{settings.alRajhiAccount || '456608010123456'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(settings.alRajhiAccount || '456608010123456', 'rajhi_acc')}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1"
                    >
                      {copiedText === 'rajhi_acc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>نسخ الحساب</span>
                    </button>
                  </div>

                  {/* IBAN */}
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-white">
                    <div className="truncate mr-2">
                      <span className="text-[10px] text-slate-400 block font-sans">رقم الآيبان (IBAN):</span>
                      <span className="text-[11px]">{settings.alRajhiIban || 'SA1280000456608010123456'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(settings.alRajhiIban || 'SA1280000456608010123456', 'rajhi_iban')}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1 shrink-0"
                    >
                      {copiedText === 'rajhi_iban' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>نسخ الآيبان</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    المستفيد: <strong className="text-white">{settings.alRajhiName || 'متجر 4K STORE'}</strong>. حول عبر تطبيق الراجحي، ثم التقط إشعار الحوالة وارفعه بالأسفل.
                  </p>
                </div>
              )}

              {/* Screenshot / Receipt Upload (MANDATORY) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    <span>رفع صورة إيصال التحويل (Screenshot) <span className="text-rose-400">* (إجباري)</span></span>
                  </span>
                  <span className="text-[11px] text-slate-400">للتأكيد قبل تسليم الكود</span>
                </label>

                {!receiptImage ? (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-2xl bg-slate-950/70 cursor-pointer transition-colors group">
                    <Upload className="w-8 h-8 text-slate-500 group-hover:text-amber-400 transition-colors mb-2" />
                    <span className="text-xs font-bold text-slate-300 group-hover:text-white">
                      اضغط هنا لرفع صورة إيصال التحويل
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">
                      يدعم صور PNG, JPG, JPEG (سكرين شوت من الجوال)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={receiptImage}
                        alt="إيصال التحويل"
                        className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          تم إرفاق إيصال التحويل بنجاح
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate">جاهز للمراجعة</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setReceiptImage(null)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-bold transition-colors"
                    >
                      تغيير الصورة
                    </button>
                  </div>
                )}

                {receiptError && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{receiptError}</span>
                  </p>
                )}
              </div>

              {/* Order Summary box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>عدد المنتجات:</span>
                  <span className="font-bold text-white">{cart.length}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>الخصم المطبق ({appliedCoupon.code}):</span>
                    <span>-{discountAmount.toFixed(2)} {settings.currency}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>المبلغ المطلوب تحويله:</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400 text-lg">
                    {grandTotal.toFixed(2)} {settings.currency}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-cyan-500 to-blue-600 hover:from-amber-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>جاري إرسال الطلب وإيصال التحويل...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>إرسال الطلب وإيصال التحويل لفريق الدعم</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>بعد مراجعة الإيصال وموافقة الدعم سيتم إرسال الكود فوراً إلى بريدك</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
