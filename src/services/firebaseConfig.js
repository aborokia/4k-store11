/**
 * إعدادات الاتصال بقاعدة بيانات Firebase (Google Authentication & Firestore)
 * 
 * لتفعيل الربط السحابي المباشر مع Google Cloud / Firebase:
 * 1. ادخل على https://console.firebase.google.com/
 * 2. أنشئ مشروعاً جديداً وسجل تطبيق ويب (Web App)
 * 3. فعّل تسجيل الدخول بحساب Google من قائمة Authentication -> Sign-in method -> Google
 * 4. ضع مفاتيح مشروعك في الأسفل:
 */

export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "four-k-store.firebaseapp.com",
  projectId: "four-k-store",
  storageBucket: "four-k-store.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

// فحص ما إذا كانت مفاتيح Firebase الحقيقية قد تم وضعها
export const isFirebaseConfigured = () => {
  return (
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" &&
    firebaseConfig.apiKey.length > 10
  );
};
