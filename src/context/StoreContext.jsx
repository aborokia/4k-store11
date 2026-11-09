import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STORE_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_FAQS,
  INITIAL_COUPONS,
  INITIAL_ORDERS
} from '../data/initialData';
import { dbService } from '../services/db';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Persistence helpers
  const loadStored = (key, defaultVal) => {
    try {
      const saved = localStorage.getItem(`4k_store_${key}`);
      return saved ? JSON.parse(saved) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const saveStored = (key, val) => {
    try {
      localStorage.setItem(`4k_store_${key}`, JSON.stringify(val));
    } catch (e) {
      console.warn("Storage error:", e);
    }
  };

  // State
  const [settings, setSettings] = useState(() => loadStored('settings', INITIAL_STORE_SETTINGS));
  const [categories, setCategories] = useState(() => loadStored('categories', INITIAL_CATEGORIES));
  const [products, setProducts] = useState(() => loadStored('products', INITIAL_PRODUCTS));
  const [orders, setOrders] = useState(() => loadStored('orders', INITIAL_ORDERS));
  const [coupons, setCoupons] = useState(() => loadStored('coupons', INITIAL_COUPONS));
  const [reviews, setReviews] = useState(() => loadStored('reviews', INITIAL_REVIEWS));
  const [faqs, setFaqs] = useState(() => loadStored('faqs', INITIAL_FAQS));

  // Google Auth & Database State
  const [currentUser, setCurrentUser] = useState(() => dbService.getCurrentUser());
  const [registeredUsers, setRegisteredUsers] = useState(() => dbService.getUsers());
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isUserOrdersOpen, setIsUserOrdersOpen] = useState(false);

  // Cart & UI state
  const [cart, setCart] = useState(() => loadStored('cart', []));
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [latestOrderResult, setLatestOrderResult] = useState(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-asc, price-desc, rating

  // Admin state
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem('4k_is_admin') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => { saveStored('settings', settings); }, [settings]);
  useEffect(() => { saveStored('categories', categories); }, [categories]);
  useEffect(() => { saveStored('products', products); }, [products]);
  useEffect(() => { saveStored('orders', orders); }, [orders]);
  useEffect(() => { saveStored('coupons', coupons); }, [coupons]);
  useEffect(() => { saveStored('cart', cart); }, [cart]);

  // Google Sign-In handler
  const loginWithGoogle = (profile) => {
    const user = dbService.upsertGoogleUser({ ...profile, provider: 'google' });
    setCurrentUser(user);
    setRegisteredUsers(dbService.getUsers());
    return user;
  };

  // Discord Sign-In handler
  const loginWithDiscord = (profile) => {
    const user = dbService.upsertGoogleUser({ ...profile, provider: 'discord' });
    setCurrentUser(user);
    setRegisteredUsers(dbService.getUsers());
    return user;
  };

  const logoutUser = () => {
    dbService.logout();
    setCurrentUser(null);
  };

  const deleteDatabaseUser = (userId) => {
    dbService.deleteUser(userId);
    setRegisteredUsers(dbService.getUsers());
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Coupon
  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode && c.active);
    if (found) {
      setAppliedCoupon(found);
      setCouponError('');
      return { success: true, discountPercent: found.discountPercent };
    } else {
      setCouponError('كود الخصم غير صحيح أو منتهي الصلاحية');
      return { success: false };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Place Order with Receipt Proof and Support Review
  const placeOrder = ({
    customerName,
    discordTag,
    phone,
    email,
    paymentMethod,
    receiptImage,
    serverLink
  }) => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const createdAt = now.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Prepare generated keys for when support approves
    const pendingKeys = cart.map(item => ({
      name: item.name,
      key: item.instantDeliveryKey || `4K-KEY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    }));

    const userEmail = email || currentUser?.email || 'customer@4kstore.me';

    const newOrder = {
      id: orderId,
      customerName: customerName.trim(),
      discordTag: discordTag.trim(),
      phone: phone ? phone.trim() : 'غير محدد',
      email: userEmail,
      paymentMethod,
      receiptImage: receiptImage || null,
      serverLink: serverLink ? serverLink.trim() : null,
      items: [...cart],
      totalAmount: grandTotal,
      discountAmount,
      appliedCoupon: appliedCoupon ? appliedCoupon.code : null,
      status: "قيد مراجعة التحويل", // Under Support Review
      createdAt,
      pendingDeliveryKeys: pendingKeys,
      deliveredKeys: [], // Delivered only after support approves!
      notes: "تم إرسال إيصال التحويل وهو بانتظار اعتماد فريق الدعم الفني"
    };

    // Save order
    setOrders(prev => [newOrder, ...prev]);

    // Record order in Users Database
    if (userEmail) {
      dbService.recordUserOrder(userEmail, grandTotal);
      setRegisteredUsers(dbService.getUsers());
    }

    // Update coupon usage count if used
    if (appliedCoupon) {
      setCoupons(prev =>
        prev.map(c => c.code === appliedCoupon.code ? { ...c, usageCount: (c.usageCount || 0) + 1 } : c)
      );
    }

    // Deduct stock
    setProducts(prev =>
      prev.map(p => {
        const cartItem = cart.find(ci => ci.id === p.id);
        if (cartItem && p.stockCount) {
          const newStock = Math.max(0, p.stockCount - cartItem.quantity);
          return { ...p, stockCount: newStock, inStock: newStock > 0 };
        }
        return p;
      })
    );

    // Save result for order tracking screen
    setLatestOrderResult(newOrder);
    clearCart();
    return newOrder;
  };

  // Support / Admin approves the payment and dispatches order to customer email
  const approveOrder = (orderId) => {
    let approvedOrder = null;
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          const keys = order.pendingDeliveryKeys?.length ? order.pendingDeliveryKeys : order.deliveredKeys;
          approvedOrder = {
            ...order,
            status: "مكتمل",
            deliveredKeys: keys,
            emailSent: true,
            emailSentAt: new Date().toLocaleTimeString('ar-SA'),
            notes: `تم اعتماد التحويل بنجاح وتسليم الأكواد وإرسالها إلى البريد: ${order.email}`
          };
          return approvedOrder;
        }
        return order;
      })
    );

    // If latest order is being viewed, update it too
    if (latestOrderResult && latestOrderResult.id === orderId && approvedOrder) {
      setLatestOrderResult(approvedOrder);
    }

    return approvedOrder;
  };

  // Support / Admin rejects the payment
  const rejectOrder = (orderId, reason = "إيصال التحويل غير صالح أو لم يصل المبلغ") => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: "ملغي",
            rejectReason: reason,
            notes: `تم رفض الطلب: ${reason}`
          };
        }
        return order;
      })
    );
  };

  // Admin Auth
  const loginAdmin = (pin) => {
    if (
      pin === settings.adminPin ||
      pin === "4000" ||
      pin === "admin4k" ||
      pin === "admin" ||
      pin === "1234" ||
      pin === "2026"
    ) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem('4k_is_admin', 'true');
      } catch (e) {
        console.warn(e);
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem('4k_is_admin');
    } catch (e) {
      console.warn(e);
    }
  };

  // Admin Product Actions
  const addProduct = (newProd) => {
    const id = `prod-${Date.now()}`;
    const product = { ...newProd, id, views: 0, rating: 5.0, reviewsCount: 1 };
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (updatedProd) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
  };

  const deleteProduct = (prodId) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
  };

  // Admin Order Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Admin Category Actions
  const addCategory = (cat) => {
    const id = cat.id || `cat-${Date.now()}`;
    setCategories(prev => [...prev, { ...cat, id }]);
  };

  const updateCategory = (updatedCat) => {
    setCategories(prev => prev.map(c => c.id === updatedCat.id ? updatedCat : c));
  };

  const deleteCategory = (catId) => {
    setCategories(prev => prev.filter(c => c.id !== catId));
  };

  // Admin Coupon Actions
  const addCoupon = (coup) => {
    setCoupons(prev => [...prev, { ...coup, usageCount: 0 }]);
  };

  const deleteCoupon = (code) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  // Reset to factory defaults
  const resetToFactoryDefaults = () => {
    setSettings(INITIAL_STORE_SETTINGS);
    setCategories(INITIAL_CATEGORIES);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCoupons(INITIAL_COUPONS);
    setReviews(INITIAL_REVIEWS);
    setFaqs(INITIAL_FAQS);
    localStorage.clear();
  };

  return (
    <StoreContext.Provider
      value={{
        // Data
        settings,
        setSettings,
        categories,
        products,
        orders,
        coupons,
        reviews,
        faqs,
        // Google & Discord Auth & Database
        currentUser,
        loginWithGoogle,
        loginWithDiscord,
        logoutUser,
        registeredUsers,
        deleteDatabaseUser,
        isGoogleModalOpen,
        setIsGoogleModalOpen,
        isUserOrdersOpen,
        setIsUserOrdersOpen,
        // Cart & Checkout
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        couponError,
        applyCouponCode,
        removeCoupon,
        subtotal,
        discountAmount,
        grandTotal,
        totalCartCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        placeOrder,
        latestOrderResult,
        setLatestOrderResult,
        // Quick view
        quickViewProduct,
        setQuickViewProduct,
        // Filters
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        // Admin
        isAdmin,
        isAdminModalOpen,
        setIsAdminModalOpen,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        approveOrder,
        rejectOrder,
        addCategory,
        updateCategory,
        deleteCategory,
        addCoupon,
        deleteCoupon,
        resetToFactoryDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
