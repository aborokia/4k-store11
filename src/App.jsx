import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Preloader from './components/Preloader';
import AnnouncementBanner from './components/AnnouncementBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesPillars from './components/FeaturesPillars';
import CategoriesSection from './components/CategoriesSection';
import ProductGrid from './components/ProductGrid';
import DiscordCommunity from './components/DiscordCommunity';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductModal from './components/ProductModal';
import AdminAuthModal from './components/admin/AdminAuthModal';
import AdminDashboard from './components/admin/AdminDashboard';
import GoogleAuthModal from './components/auth/GoogleAuthModal';
import UserOrdersModal from './components/auth/UserOrdersModal';

function MainApp() {
  const {
    isAdmin,
    isGoogleModalOpen,
    setIsGoogleModalOpen,
    isUserOrdersOpen,
    setIsUserOrdersOpen
  } = useStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Intro Preloader Loading Screen with 4K STORE Logo */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Top Announcement Marquee */}
      <AnnouncementBanner />

      {/* Main Header / Navigation */}
      <Navbar onOpenAdmin={handleOpenAdmin} />

      {/* Hero Section */}
      <Hero />

      {/* 3 Pillars Spotlight: الثقة - السرعة - أفضل أسعار السوق */}
      <FeaturesPillars />

      {/* الأقسام بنبذة (Categories with Rich Overview) */}
      <CategoriesSection />

      {/* Products Catalog with Filters */}
      <ProductGrid />

      {/* Discord Server Spotlight (discord.gg/sg73KenQs4) */}
      <DiscordCommunity />

      {/* Why 4K STORE? Comparison */}
      <WhyChooseUs />

      {/* 3-Step Purchase Process */}
      <HowItWorks />

      {/* Customer Testimonials & Reviews */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Modern Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Shopping Cart Drawer */}
      <CartDrawer />

      {/* Instant Checkout & Delivery Modal */}
      <CheckoutModal />

      {/* Product Quick View Modal */}
      <ProductModal />

      {/* Google Sign-In & Database Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
      />

      {/* User Registered Orders & Keys Modal */}
      <UserOrdersModal
        isOpen={isUserOrdersOpen}
        onClose={() => setIsUserOrdersOpen(false)}
      />

      {/* Admin Authentication PIN Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={() => {
          setIsAdminAuthOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* Admin Control Panel Dashboard */}
      {isAdminDashboardOpen && (
        <AdminDashboard onClose={() => setIsAdminDashboardOpen(false)} />
      )}

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
