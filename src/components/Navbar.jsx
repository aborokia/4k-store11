import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  MessageSquare,
  Lock,
  User,
  LogOut,
  Package,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const {
    settings,
    totalCartCount,
    setIsCartOpen,
    isAdmin,
    searchQuery,
    setSearchQuery,
    currentUser,
    logoutUser,
    setIsGoogleModalOpen,
    setIsUserOrdersOpen
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'الأقسام والمميزات', href: '#categories' },
    { name: 'المنتجات والعروض', href: '#products' },
    { name: 'لماذا 4K STORE؟', href: '#why-us' },
    { name: 'سيرفر الديسكورد', href: '#discord' },
    { name: 'آراء العملاء', href: '#reviews' },
    { name: 'الأسئلة الشائعة', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40'
          : 'bg-slate-950/70 backdrop-blur-sm border-b border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo with the user's uploaded 4K STORE image */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center p-1 rounded-2xl bg-slate-900/80 border border-slate-700/80 group-hover:border-amber-500/50 shadow-lg shadow-amber-500/10 transition-all duration-300">
                <img
                  src="/logo.png"
                  alt="4K STORE"
                  className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    {settings.storeName}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60">
                    PRO
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
                  الأول في الشرق الأوسط
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Quick Search */}
            <div className="relative hidden md:block w-40 lg:w-48">
              <input
                type="text"
                placeholder="ابحث بالمتجر..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs rounded-xl pr-8 pl-3 py-2 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Google Sign-In / User Profile Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/60 text-slate-200 transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover border border-cyan-500"
                  />
                  <span className="text-xs font-bold hidden sm:inline max-w-[100px] truncate text-white">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-white block">{currentUser.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono block truncate">{currentUser.email}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full inline-block mt-1 font-semibold">
                        حساب Google مسجل
                      </span>
                    </div>

                    <button
                      onClick={() => setIsUserOrdersOpen(true)}
                      className="w-full px-4 py-2 text-right text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4 text-cyan-400" />
                      <span>طلباتي وأكواد التفعيل</span>
                    </button>

                    <button
                      onClick={logoutUser}
                      className="w-full px-4 py-2 text-right text-xs text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 border-t border-slate-800/80 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsGoogleModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold px-3 py-2 rounded-xl text-xs transition-all shadow-sm group"
                title="تسجيل الدخول باستخدام Google"
              >
                {/* Official Google Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="hidden sm:inline">دخول Google</span>
              </button>
            )}

            {/* Discord CTA Button */}
            <a
              href={settings.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#5865F2]/20 hover:bg-[#5865F2]/30 text-[#8ea1e1] hover:text-white border border-[#5865F2]/40 font-semibold px-3 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-sm"
              title="سيرفر الديسكورد الرسمي"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="hidden md:inline">ديسكورد</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/60 text-slate-200 hover:text-cyan-400 transition-all flex items-center gap-2 group"
              aria-label="سلة المشتريات"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Admin Panel Button */}
            <button
              onClick={onOpenAdmin}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isAdmin
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
              title={isAdmin ? "لوحة تحكم الأدمن (مفعل)" : "تسجيل دخول الأدمن"}
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span className="hidden lg:inline">{isAdmin ? 'لوحة الأدمن' : 'الإدارة'}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 lg:hidden rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 shadow-2xl">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن منتج أو خدمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-xl pr-10 pl-4 py-2.5 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsUserOrdersOpen(true);
                }}
                className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 text-cyan-300 py-2.5 rounded-xl text-sm font-bold"
              >
                <Package className="w-4 h-4" />
                <span>طلباتي وأكوادي ({currentUser.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsGoogleModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 bg-white text-slate-950 font-black py-2.5 rounded-xl text-sm"
              >
                <span>تسجيل الدخول بحساب Google</span>
              </button>
            )}

            <a
              href={settings.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold py-2.5 rounded-xl text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              انضم لسيرفر الديسكورد الرسمي
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
