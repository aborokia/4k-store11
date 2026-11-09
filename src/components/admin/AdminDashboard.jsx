import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  Tag,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Search,
  X,
  Check,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Database,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminDashboard({ onClose }) {
  const {
    settings,
    setSettings,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    approveOrder,
    rejectOrder,
    categories,
    addCategory,
    deleteCategory,
    coupons,
    addCoupon,
    deleteCoupon,
    registeredUsers,
    deleteDatabaseUser,
    logoutAdmin,
    resetToFactoryDefaults
  } = useStore();

  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders, users, categories, coupons, settings
  const [previewReceiptImage, setPreviewReceiptImage] = useState(null);
  const [emailAlert, setEmailAlert] = useState(null);

  // Form states
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'discord',
    price: 50,
    originalPrice: 80,
    badge: 'جديد',
    image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=700&q=80',
    description: '',
    deliveryType: 'آلي فوري',
    instantDeliveryKey: '',
    stockCount: 20,
    features: ['تفعيل فوري وآمن', 'ضمان ذهبي']
  });

  // Category form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatBrief, setNewCatBrief] = useState('');
  const [newCatBadge, setNewCatBadge] = useState('');

  // Coupon form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // Calculation helpers
  const totalRevenue = orders
    .filter(o => o.status === 'مكتمل')
    .reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  const pendingOrdersCount = orders.filter(
    o => o.status === 'قيد مراجعة التحويل' || o.status === 'قيد المراجعة'
  ).length;

  const openAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[0]?.id || 'discord',
      price: 49,
      originalPrice: 85,
      badge: 'جديد',
      image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=700&q=80',
      description: 'وصف المنتج والخدمة التقنية...',
      deliveryType: 'آلي فوري',
      instantDeliveryKey: '4K-KEY-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      stockCount: 25,
      features: ['تفعيل فوري', 'ضمان ذهبي شامل']
    });
    setProductFormOpen(true);
  };

  const openEditProduct = (prod) => {
    setEditingProduct(prod);
    setFormData({ ...prod, features: prod.features || [] });
    setProductFormOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({ ...formData, id: editingProduct.id });
    } else {
      addProduct({ ...formData, inStock: formData.stockCount > 0 });
    }
    setProductFormOpen(false);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const id = 'cat-' + Date.now();
    addCategory({
      id,
      name: newCatName.trim(),
      shortName: newCatName.trim().split(' ')[0],
      icon: 'Layers',
      brief: newCatBrief.trim() || 'خدمات رقمية مميزة بأفضل أسعار السوق.',
      badge: newCatBadge.trim() || 'قسم جديد'
    });
    setNewCatName('');
    setNewCatBrief('');
    setNewCatBadge('');
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount) || 10,
      active: true
    });
    setNewCouponCode('');
    setNewCouponDiscount(15);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettings(settingsForm);
    alert('تم حفظ إعدادات المتجر وبيانات التحويل بنجاح!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Admin Navbar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-slate-950 border border-slate-700/80 shadow-md">
            <img src="/logo.png" alt="4K STORE" className="h-8 w-auto object-contain" />
          </div>
          <div>
            <h1 className="font-black text-white text-base flex items-center gap-2">
              لوحة تحكم إدارة {settings.storeName}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                أدمن رئيسي
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>عرض واجهة المتجر</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              onClose();
            }}
            className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تسجيل خروج</span>
          </button>
        </div>
      </header>

      {/* Main Admin Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-56 sm:w-64 bg-slate-900/60 border-l border-slate-800 flex flex-col justify-between p-4 shrink-0">
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'نظرة عامة وإحصائيات', icon: LayoutDashboard },
              { id: 'products', label: 'إدارة المنتجات', icon: Package, badge: products.length },
              { id: 'orders', label: 'الطلبات والتحويلات', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} قيد المراجعة` : orders.length },
              { id: 'users', label: 'قاعدة بيانات المستخدمين', icon: Users, badge: registeredUsers.length },
              { id: 'categories', label: 'الأقسام بنبذة', icon: Layers, badge: categories.length },
              { id: 'coupons', label: 'كوبونات الخصم', icon: Tag, badge: coupons.length },
              { id: 'settings', label: 'إعدادات المتجر والدفع', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${tab.id === 'orders' && pendingOrdersCount > 0 ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-slate-800 text-slate-300'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-[11px] space-y-1.5 text-slate-400">
            <span className="text-amber-400 font-bold block">سيرفر الديسكورد المرتبط:</span>
            <a
              href={settings.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8ea1e1] hover:underline flex items-center gap-1 font-mono truncate"
            >
              <MessageSquare className="w-3 h-3 shrink-0" />
              <span>{settings.discordLink}</span>
            </a>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-950">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-2xl font-black text-white">لوحة الإحصائيات العامة</h2>
                <p className="text-xs sm:text-sm text-slate-400">نظرة سريعة على أداء متجر 4K STORE والمبيعات والطلبات الحالية.</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">إجمالي المبيعات المكتملة</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {totalRevenue.toFixed(2)} <span className="text-xs font-bold text-slate-400">{settings.currency}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">الطلبات قيد المراجعة</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-400">{pendingOrdersCount} طلب</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">المنتجات المعروضة</span>
                    <Package className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{products.length} منتج</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">مستخدمي Google & Discord</span>
                    <Users className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{registeredUsers.length} عضو</div>
                </div>
              </div>

              {/* Recent Orders table */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">أحدث طلبات المشترين وإيصالات التحويل</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-cyan-400 hover:underline"
                  >
                    عرض كل الطلبات ({orders.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 font-semibold">رقم الطلب</th>
                        <th className="pb-3 font-semibold">العميل</th>
                        <th className="pb-3 font-semibold">البريد</th>
                        <th className="pb-3 font-semibold">طريقة التحويل</th>
                        <th className="pb-3 font-semibold">المبلغ</th>
                        <th className="pb-3 font-semibold">الحالة</th>
                        <th className="pb-3 font-semibold">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="text-slate-300">
                          <td className="py-3 font-mono font-bold text-cyan-400">{o.id}</td>
                          <td className="py-3 text-white font-medium">{o.customerName}</td>
                          <td className="py-3 font-mono text-amber-300">{o.email || '—'}</td>
                          <td className="py-3 text-slate-400">{o.paymentMethod}</td>
                          <td className="py-3 font-bold text-white">{o.totalAmount} {settings.currency}</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                o.status === 'مكتمل'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-amber-950 text-amber-400 border border-amber-800'
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-500">{o.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">إدارة المنتجات والخدمات</h2>
                  <p className="text-xs sm:text-sm text-slate-400">إضافة وتعديل وحذف المنتجات وأكواد التسليم الفوري.</p>
                </div>
                <button
                  onClick={openAddProduct}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة منتج جديد</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="p-4 font-semibold">المنتج</th>
                        <th className="p-4 font-semibold">القسم</th>
                        <th className="p-4 font-semibold">السعر</th>
                        <th className="p-4 font-semibold">كود التسليم الآلي</th>
                        <th className="p-4 font-semibold">المخزون</th>
                        <th className="p-4 font-semibold text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {products.map((p) => {
                        const cat = categories.find((c) => c.id === p.category);
                        return (
                          <tr key={p.id} className="hover:bg-slate-800/40">
                            <td className="p-4 flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                              <div>
                                <span className="font-bold text-white text-xs block line-clamp-1">{p.name}</span>
                                {p.badge && (
                                  <span className="text-[10px] text-cyan-400 font-semibold">{p.badge}</span>
                                )}
                              </div>
                            </td>
                            <td className="p-4 text-slate-300">{cat?.name || p.category}</td>
                            <td className="p-4 font-black text-white">
                              {p.price} {settings.currency}
                            </td>
                            <td className="p-4 font-mono text-cyan-300 text-[11px]">
                              {p.instantDeliveryKey || 'غير محدد'}
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-bold">
                                {p.stockCount || 0} متوفر
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => openEditProduct(p)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                                  title="تعديل المنتج"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`هل أنت متأكد من حذف المنتج: ${p.name}؟`)) {
                                      deleteProduct(p.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                                  title="حذف المنتج"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS & RECEIPT REVIEWS */}
          {activeTab === 'orders' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-white">إدارة ومراجعة طلبات التحويل</h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    مراجعة صور إيصالات التحويل (فودافون كاش ومصرف الراجحي)، واعتماد تسليم الأكواد لبريد العميل.
                  </p>
                </div>
              </div>

              {/* Email Sent Toast Alert */}
              {emailAlert && (
                <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs sm:text-sm flex items-center justify-between animate-fade-in shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{emailAlert}</span>
                  </div>
                  <button onClick={() => setEmailAlert(null)} className="p-1 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="p-4 font-semibold">رقم الطلب</th>
                        <th className="p-4 font-semibold">العميل والتواصل</th>
                        <th className="p-4 font-semibold">المنتجات ورابط الاستور</th>
                        <th className="p-4 font-semibold">المبلغ والتحويل</th>
                        <th className="p-4 font-semibold text-center">إيصال التحويل</th>
                        <th className="p-4 font-semibold">الحالة</th>
                        <th className="p-4 font-semibold text-center">اعتماد وتسليم الكود</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-mono font-bold text-cyan-400">{o.id}</td>
                          <td className="p-4 space-y-0.5">
                            <span className="font-bold text-white block">{o.customerName}</span>
                            <span className="font-mono text-[11px] text-amber-300 block">{o.email || 'بدون إيميل'}</span>
                            <span className="font-mono text-[10px] text-[#8ea1e1] block">{o.discordTag}</span>
                          </td>
                          <td className="p-4 text-slate-300 max-w-xs space-y-1">
                            {o.items?.map((it, i) => (
                              <div key={i} className="truncate font-medium text-white">
                                {it.name} <span className="text-slate-500">×{it.quantity}</span>
                              </div>
                            ))}
                            {o.serverLink && (
                              <div className="text-[10px] bg-indigo-950/80 border border-indigo-700/60 p-1.5 rounded-lg text-cyan-300 font-mono truncate">
                                🔗 سيرفر البوست: {o.serverLink}
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="font-black text-white text-sm block">
                              {o.totalAmount} {settings.currency}
                            </span>
                            <span className="text-[10px] text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 inline-block mt-1 font-semibold">
                              {o.paymentMethod}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {o.receiptImage ? (
                              <div className="inline-flex flex-col items-center gap-1">
                                <img
                                  src={o.receiptImage}
                                  alt="إيصال"
                                  onClick={() => setPreviewReceiptImage(o.receiptImage)}
                                  className="w-12 h-12 rounded-lg object-cover border border-slate-700 cursor-pointer hover:border-amber-400 hover:scale-105 transition-all shadow-md"
                                />
                                <button
                                  onClick={() => setPreviewReceiptImage(o.receiptImage)}
                                  className="text-[10px] text-cyan-400 hover:underline font-bold"
                                >
                                  تكبير الإيصال
                                </button>
                              </div>
                            ) : (
                              <span className="text-slate-600 text-[10px]">بدون إيصال</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                                o.status === 'مكتمل'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : o.status === 'ملغي'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse'
                              }`}
                            >
                              {o.status}
                            </span>
                            {o.emailSent && (
                              <span className="text-[9px] text-emerald-400 block mt-1">
                                ✓ تم الإرسال للبريد
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {o.status !== 'مكتمل' ? (
                              <div className="flex flex-col gap-1.5 items-center">
                                <button
                                  onClick={() => {
                                    approveOrder(o.id);
                                    setEmailAlert(`تم اعتماد التحويل للطلب ${o.id} بنجاح! تم تسليم الأكواد وإرسال نسخة تلقائية إلى بريد العميل: ${o.email}`);
                                    setTimeout(() => setEmailAlert(null), 7000);
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-600/20 transition-all"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>موافقة وإرسال الكود</span>
                                </button>

                                <button
                                  onClick={() => {
                                    if (confirm(`هل أنت متأكد من رفض الطلب ${o.id}؟`)) {
                                      rejectOrder(o.id);
                                    }
                                  }}
                                  className="text-[10px] text-rose-400 hover:text-rose-300 hover:underline"
                                >
                                  رفض التحويل
                                </button>
                              </div>
                            ) : (
                              <div className="text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>تم الاعتماد والتسليم</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: USERS DATABASE */}
          {activeTab === 'users' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-2">
                    <span>قاعدة بيانات مستخدمي Google & Discord</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                      {registeredUsers.length} مستخدم مسجل
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    قائمة الحسابات الحقيقية المسجلة عبر تسجيل الدخول، تاريخ انضمامهم، مشترياتهم وتفاصيلهم.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-300 flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>متوافق مع OAuth 2.0 & Firebase</span>
                </div>
              </div>

              {/* Users Table */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="p-4 font-semibold">المستخدم</th>
                        <th className="p-4 font-semibold">طريقة الدخول</th>
                        <th className="p-4 font-semibold">البريد الإلكتروني</th>
                        <th className="p-4 font-semibold">تاريخ التسجيل</th>
                        <th className="p-4 font-semibold">عدد الطلبات</th>
                        <th className="p-4 font-semibold">إجمالي المشتريات</th>
                        <th className="p-4 font-semibold">الرتبة</th>
                        <th className="p-4 font-semibold text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {registeredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-800/40">
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-9 h-9 rounded-full object-cover border border-slate-700"
                            />
                            <div>
                              <span className="font-bold text-white text-xs block">{u.name}</span>
                              <span className="text-[10px] text-slate-500 font-mono">{u.id}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.provider === 'discord' ? 'bg-[#5865F2]/20 text-[#8ea1e1] border border-[#5865F2]/40' : 'bg-red-950/40 text-red-300 border border-red-800/40'}`}>
                              {u.provider === 'discord' ? 'ديسكورد' : 'Google'}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-cyan-300 font-semibold">{u.email}</td>
                          <td className="p-4 text-slate-400">{u.joinedAt || '2026-11-01'}</td>
                          <td className="p-4 font-bold text-white">{u.ordersCount || 0} طلب</td>
                          <td className="p-4 font-black text-emerald-400">
                            {u.totalSpent || 0} {settings.currency}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                u.role === 'admin'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {u.role === 'admin' ? 'مدير (Admin)' : 'عميل موثق'}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {u.role !== 'admin' && (
                              <button
                                onClick={() => {
                                  if (confirm(`هل أنت متأكد من حذف المستخدم ${u.name} من قاعدة البيانات؟`)) {
                                    deleteDatabaseUser(u.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                                title="حذف من قاعدة البيانات"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="text-2xl font-black text-white">إدارة الأقسام (بنَبذة)</h2>
                <p className="text-xs sm:text-sm text-slate-400">إضافة أقسام جديدة وتحديد نبذة كل قسم ومميزاته التي تظهر للمشترين.</p>
              </div>

              {/* Add category box */}
              <form onSubmit={handleAddCategory} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm">إضافة قسم جديد</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">اسم القسم</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: حسابات فالورانت وشحن نقاط"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">شارة القسم (Badge)</label>
                    <input
                      type="text"
                      placeholder="مثال: جديد / حصري"
                      value={newCatBadge}
                      onChange={(e) => setNewCatBadge(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">نبذة عن القسم (Overview)</label>
                  <textarea
                    rows={2}
                    placeholder="اكتب نبذة توضيحية عن الخدمات المتوفرة في هذا القسم..."
                    value={newCatBrief}
                    onChange={(e) => setNewCatBrief(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  إضافة القسم
                </button>
              </form>

              {/* Categories List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{cat.name}</span>
                        {cat.badge && (
                          <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`حذف قسم: ${cat.name}؟`)) {
                            deleteCategory(cat.id);
                          }
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl">
                      {cat.brief}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-white">كوبونات الخصم والترويج</h2>
                <p className="text-xs sm:text-sm text-slate-400">إنشاء أكواد خصم ترويجية لمجتمع الديسكورد والعملاء الجدد.</p>
              </div>

              {/* Add Coupon Form */}
              <form onSubmit={handleAddCoupon} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">كود الخصم (Promo Code)</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: DISCOUNT20"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs uppercase text-white font-mono"
                  />
                </div>

                <div className="w-36">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">نسبة الخصم (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  إنشاء الكود
                </button>
              </form>

              {/* Coupons List */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-4 font-semibold">كود الخصم</th>
                      <th className="p-4 font-semibold">نسبة الخصم</th>
                      <th className="p-4 font-semibold">مرات الاستخدام</th>
                      <th className="p-4 font-semibold">الحالة</th>
                      <th className="p-4 font-semibold text-center">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {coupons.map((c) => (
                      <tr key={c.code} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-black text-cyan-400 text-sm">{c.code}</td>
                        <td className="p-4 font-bold text-emerald-400">خصم {c.discountPercent}%</td>
                        <td className="p-4 text-slate-300">{c.usageCount || 0} مرة</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                            مفعّل
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => deleteCoupon(c.code)}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                            title="حذف الكوبون"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & PAYMENT CONFIG */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-white">إعدادات متجر 4K STORE وبيانات الدفع</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  تعديل اسم المتجر، رقم محفظة فودافون كاش، حساب الراجحي، ورابط الديسكورد.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المتجر</label>
                    <input
                      type="text"
                      value={settingsForm.storeName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">شعار المتجر (Tagline)</label>
                    <input
                      type="text"
                      value={settingsForm.storeTagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, storeTagline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    رابط سيرفر الديسكورد الرسمي (Discord Invite URL)
                  </label>
                  <input
                    type="url"
                    value={settingsForm.discordLink}
                    onChange={(e) => setSettingsForm({ ...settingsForm, discordLink: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    نص الشريط الإعلاني العلوي
                  </label>
                  <input
                    type="text"
                    value={settingsForm.announcementText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      الرمز السري لدخول الأدمن (PIN)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.adminPin}
                      onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">العملة</label>
                    <input
                      type="text"
                      value={settingsForm.currency}
                      onChange={(e) => setSettingsForm({ ...settingsForm, currency: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Payment Configuration (Vodafone Cash & Al Rajhi) */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 pt-3">
                  <h4 className="font-bold text-white text-xs text-amber-400">
                    بيانات التحويل للمشترين (فودافون كاش ومصرف الراجحي):
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">رقم محفظة فودافون كاش</label>
                      <input
                        type="text"
                        value={settingsForm.vodafoneCashNumber || '01023456789'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, vodafoneCashNumber: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">رقم حساب مصرف الراجحي</label>
                      <input
                        type="text"
                        value={settingsForm.alRajhiAccount || '456608010123456'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, alRajhiAccount: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">آيبان الراجحي (IBAN)</label>
                      <input
                        type="text"
                        value={settingsForm.alRajhiIban || 'SA1280000456608010123456'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, alRajhiIban: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm"
                  >
                    حفظ التغييرات
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('هل أنت متأكد من استعادة البيانات الافتراضية للمتجر بالكامل؟')) {
                        resetToFactoryDefaults();
                        alert('تمت استعادة البيانات الافتراضية بنجاح!');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950 text-rose-400 text-xs font-bold border border-slate-700 transition-colors"
                  >
                    استعادة البيانات الأصلية
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* PRODUCT FORM MODAL (Add / Edit) */}
      {productFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div
            className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingProduct ? 'تعديل منتج' : 'إضافة منتج جديد'}
              </h3>
              <button
                onClick={() => setProductFormOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المنتج</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">القسم</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">الشارة (Badge)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">السعر الحالي</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">السعر الأصلي</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">المخزون المتوفر</label>
                  <input
                    type="number"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">رابط صورة المنتج (URL)</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  كود / مفتاح التسليم الآلي الفوري
                </label>
                <input
                  type="text"
                  placeholder="الكود الذي سيظهر للعميل فور إتمام الشراء"
                  value={formData.instantDeliveryKey}
                  onChange={(e) => setFormData({ ...formData, instantDeliveryKey: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">وصف المنتج</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setProductFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
                >
                  {editingProduct ? 'حفظ التعديل' : 'إضافة المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECEIPT IMAGE ZOOM MODAL */}
      {previewReceiptImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewReceiptImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-4 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">معاينة صورة إيصال التحويل</span>
                <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800 font-semibold">
                  تحقق الدعم الفني
                </span>
              </div>
              <button
                onClick={() => setPreviewReceiptImage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center bg-slate-950 rounded-2xl p-2 max-h-[70vh] overflow-auto">
              <img
                src={previewReceiptImage}
                alt="Receipt Full Preview"
                className="max-h-[65vh] w-auto rounded-xl object-contain shadow-md"
              />
            </div>
            <div className="pt-3 text-center">
              <button
                onClick={() => setPreviewReceiptImage(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
              >
                إغلاق المعاينة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
