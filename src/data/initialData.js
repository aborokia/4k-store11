export const INITIAL_STORE_SETTINGS = {
  storeName: "4K STORE",
  storeTagline: "المتجر التقني الرقمي الأول في الشرق الأوسط",
  storeDescription: "سيرفر ستور متكامل يتميز بالثقة، السرعة الفائقة، ومنتجات رقمية بأفضل أسعار السوق مع ضمان ذهبي وتسليم آلي فوري.",
  discordLink: "https://discord.gg/sg73KenQs4",
  whatsappNumber: "+966500000000",
  currency: "ر.س",
  vodafoneCashNumber: "01023456789",
  alRajhiIban: "SA1280000456608010123456",
  alRajhiAccount: "456608010123456",
  alRajhiName: "متجر 4K STORE للخدمات الرقمية",
  announcementText: "⚡ عرض حصري: استخدم كود الخصم (4K2026) واحصل على خصم 15% على جميع الاشتراكات وسيرفرات الديسكورد!",
  announcementActive: true,
  adminPin: "4000", // Default admin password (numbers)
  stats: {
    happyClients: "15,800+",
    completedOrders: "29,400+",
    positiveRating: "99.9%",
    avgDeliveryTime: "أقل من 30 ثانية"
  }
};

export const INITIAL_CATEGORIES = [
  {
    id: "discord",
    name: "خدمات واشتراكات ديسكورد",
    shortName: "ديسكورد",
    icon: "MessageSquare",
    color: "from-indigo-500 to-cyan-500",
    badge: "الأكثر طلباً",
    brief: "شحن وتفعيل نيترو قيمنق وكلاسيك رسمي 100% بدون باند، بوستات سيرفر لترقية سيرفرك إلى لفل 3 بأقل تكلفة مع ضمان كامل طوال فترة الاشتراك.",
    features: ["تفعيل رسمي وآمن 100%", "سيرفر بوست لفل 3 فوري", "نيترو قيمنق شهري وسنوي", "ضمان كامل للمدة"]
  },
  {
    id: "streaming",
    name: "اشتراكات البث والترفيه",
    shortName: "ترفيه وبث",
    icon: "Tv",
    color: "from-rose-500 to-pink-500",
    badge: "عروض حصرية",
    brief: "اشتراكات أصلية ومضمونة لأقوى منصات البث (نتفلكس 4K Ultra HD، يوتيوب بريميوم بدون إعلانات، شاهد VIP، وسبوتيفاي) بأقل من نصف سعر المنصة.",
    features: ["جودة 4K أصلية", "بدون انقطاع", "حسابات خاصة ومشتركة", "تسليم بيانات الحساب فوراً"]
  },
  {
    id: "gaming",
    name: "حسابات ومفاتيح الألعاب",
    shortName: "ألعاب وستيم",
    icon: "Gamepad2",
    color: "from-amber-500 to-orange-500",
    badge: "ضمان دائم",
    brief: "مفاتيح تفعيل ألعاب أصلية على ستيم وإيبيك قيمز، حسابات فورتنايت نادرة ومربوطة، حسابات قراند 5 مودد بكاش كامل، وألعاب البلايستيشن والإكسبوكس.",
    features: ["مفاتيح أصلية عالمية", "حسابات مع إيميل أساسي", "جاهزة للربط الفوري", "تعويض فوري عند أي خلل"]
  },
  {
    id: "currencies",
    name: "شحن العملات والألعاب",
    shortName: "شحن عملات",
    icon: "Coins",
    color: "from-emerald-500 to-teal-500",
    badge: "أرخص سعر",
    brief: "شحن آمن وفوري لعملات الألعاب الأكثر شعبية: فيبوكس (V-Bucks)، روبوكس روبلوكس، شدات ببجي موبايل، وكود بوينتس، بأسعار أرخص من المتجر الرسمي بكثير.",
    features: ["طرق شحن رسمية 100%", "بدون طلب كلمة السر", "تسليم سريع", "أسعار جملة تنافسية"]
  },
  {
    id: "bots-dev",
    name: "خدمات برمجية وبوتات",
    shortName: "برمجة وبوتات",
    icon: "Code2",
    color: "from-blue-500 to-violet-500",
    badge: "تقني محترف",
    brief: "برمجة وتطوير بوتات ديسكورد مخصصة لإدارة السيرفرات والمتاجر الرقمية، أنظمة تكتات تلقائية، بوتات حماية، وتصميم واجهات سيرفرات متكاملة.",
    features: ["برمجة خاصة حسب الطلب", "استضافة وتشغيل 24/7", "لوحة تحكم إلكترونية", "دعم فني وتحديثات دورية"]
  },
  {
    id: "software",
    name: "برامج التصميم والإنتاجية",
    shortName: "برامج وتصميم",
    icon: "Layers",
    color: "from-purple-500 to-indigo-500",
    badge: "مدى الحياة",
    brief: "تفعيلات أصلية لبرامج التصميم والإنتاجية العالمية: كانفا برو مدى الحياة، حزم أدوبي السحابية كاملة، مفاتيح ويندوز 10/11 برو أصلية مع ضمان مدى الحياة.",
    features: ["تفعيل رسمي عبر موقع الشركة", "اشتراك كانفا برو بدون انقطاع", "ويندوز أصلي يقبل التحديثات", "أدوبي كامل بجميع التطبيقات"]
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "ديسكورد نيترو قيمنق - اشتراك 3 أشهر رسمي",
    category: "discord",
    price: 65,
    originalPrice: 110,
    rating: 5.0,
    reviewsCount: 142,
    badge: "الأكثر مبيعاً",
    image: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=700&q=80",
    description: "اشتراك نيترو قيمنق أصلي لمدة 3 أشهر، يمنحك 2 سيرفر بوست مجاني، استخدام الإيموجيات في أي مكان، وبث بجودة 4K 60FPS.",
    features: [
      "تفعيل رسمي 100% بدون أي مشاكل",
      "يشمل 2 سيرفر بوست مجاناً",
      "إمكانية استخدام الإيموجيات المخصصة في جميع السيرفرات",
      "بث شاشة بجودة 4K ومعدل 60 إطار في الثانية",
      "حجم رفع ملفات يصل إلى 500 ميجابايت",
      "ضمان ذهبي طوال فترة الاشتراك"
    ],
    inStock: true,
    stockCount: 45,
    instantDeliveryKey: "NITRO-3M-GAME-XXXX-YYYY",
    deliveryType: "آلي فوري",
    views: 1240
  },
  {
    id: "prod-2",
    name: "سيرفر بوست ديسكورد لفل 3 (14 بوست) - شهر كامل",
    category: "discord",
    price: 45,
    originalPrice: 85,
    rating: 4.9,
    reviewsCount: 98,
    badge: "عرض التوفير",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80",
    description: "ترقية سيرفرك على الديسكورد فوراً إلى المستوى الثالث (Level 3) الكامل بواسطة 14 بوست، مع رابط مخصص وجودة صوت 384Kbps.",
    features: [
      "14 سيرفر بوست كامل للوصول للفل 3",
      "تخصيص رابط سيرفر مخصص (Vanity URL)",
      "جودة صوت عالية جداً 384Kbps",
      "إضافة أكثر من 250 إيموجي وستيكر",
      "ضمان بقاء البوستات لمدة 30 يوماً كاملة"
    ],
    inStock: true,
    stockCount: 28,
    instantDeliveryKey: "BOOST-LVL3-14X-XXXX-ZZZZ",
    deliveryType: "آلي فوري",
    views: 890
  },
  {
    id: "prod-3",
    name: "اشتراك نتفلكس بريميوم 4K Ultra HD - شهر كامل",
    category: "streaming",
    price: 18,
    originalPrice: 40,
    rating: 4.8,
    reviewsCount: 215,
    badge: "شعبية عالية",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=700&q=80",
    description: "اشتراك نتفلكس ملف خاص مع رمز سري (PIN) مخصص لك، دقة فائقة 4K مع تقنية الصوت المحيطي ودعم جميع اللغات والترجمة.",
    features: [
      "ملف خاص بك بالكامل برمز سري (PIN)",
      "دقة عرض 4K Ultra HD مع HDR",
      "يعمل على التلفزيون، الهاتف، الكمبيوتر والتابلت",
      "ضمان كامل لمدة 30 يوماً مع تعويض فوري",
      "بدون انقطاع نهائياً"
    ],
    inStock: true,
    stockCount: 60,
    instantDeliveryKey: "NFLX-PREM-4K-PROFILE-KEY",
    deliveryType: "آلي فوري",
    views: 2100
  },
  {
    id: "prod-4",
    name: "اشتراك يوتيوب بريميوم عائلي/خاص - 6 أشهر",
    category: "streaming",
    price: 49,
    originalPrice: 90,
    rating: 5.0,
    reviewsCount: 178,
    badge: "قيمة ممتازة",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=700&q=80",
    description: "تفعيل رسمي على إيميلك الخاص بدون طلب كلمة المرور، مشاهدة مقاطع يوتيوب بدون أي إعلانات، تشغيل في الخلفية، ويوتيوب ميوزك بريميوم.",
    features: [
      "تفعيل على إيميلك الشخصي مباشرة بدون باسوورد",
      "مشاهدة يوتيوب خالي تماماً من الإعلانات المزعجة",
      "تشغيل مقاطع الفيديو في الخلفية أثناء إغلاق الشاشة",
      "اشتراك يوتيوب ميوزك بريميوم مجاناً معه",
      "إمكانية تنزيل الفيديوهات والموسيقى بدون إنترنت"
    ],
    inStock: true,
    stockCount: 35,
    instantDeliveryKey: "YT-PREM-6M-INVITE-KEY",
    deliveryType: "آلي فوري",
    views: 1650
  },
  {
    id: "prod-5",
    name: "حساب قراند 5 مودد (GTA V) كاش 500 مليون + لفل 250",
    category: "gaming",
    price: 55,
    originalPrice: 120,
    rating: 4.9,
    reviewsCount: 88,
    badge: "نادر ومميز",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=80",
    description: "حساب قراند 5 أونلاين مهكر بأمان بدون باند، يحتوي على 500 مليون كاش نظيف في البنك، لفل 250، فتح جميع الأسلحة والسيارات والملابس النادرة.",
    features: [
      "كاش في البنك أكثر من 500,000,000$",
      "المستوى (Level): 250",
      "فتح كافة أسلحة اللعبة والملابس النادرة",
      "شراء أفخم الكراجات والمقرات",
      "تغيير كامل لبيانات الإيميل والباسوورد للحساب",
      "ضمان عدم التصفير أو الحظر"
    ],
    inStock: true,
    stockCount: 15,
    instantDeliveryKey: "GTAV-MOD-500M-ACC-DATA",
    deliveryType: "آلي فوري",
    views: 1430
  },
  {
    id: "prod-6",
    name: "مفتاح أصلي ويندوز 11 برو (Windows 11 Pro) مدى الحياة",
    category: "software",
    price: 25,
    originalPrice: 199,
    rating: 5.0,
    reviewsCount: 312,
    badge: "توفير 85%",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=700&q=80",
    description: "كود تفعيل رقمي رسمي 100% لنظام Windows 11 Pro لجهاز كمبيوتر واحد مدى الحياة، يدعم جميع التحديثات الأمنية من مايكروسوفت.",
    features: [
      "تفعيل رسمي أصلي من خوادم مايكروسوفت",
      "صالح لجهاز كمبيوتر واحد مدى الحياة",
      "يدعم التحديثات التلقائية بدون أي مشاكل",
      "يدعم اللغتين العربية والإنجليزية وكافة اللغات",
      "تسليم الكود فورياً بمجرد إتمام الطلب"
    ],
    inStock: true,
    stockCount: 80,
    instantDeliveryKey: "W11PRO-OEM-KEY-XXXXX-YYYYY-ZZZZZ",
    deliveryType: "آلي فوري",
    views: 3200
  },
  {
    id: "prod-7",
    name: "اشتراك كانفا برو (Canva Pro) رسمي مدى الحياة",
    category: "software",
    price: 30,
    originalPrice: 120,
    rating: 4.9,
    reviewsCount: 164,
    badge: "شامل الذكاء الاصطناعي",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=700&q=80",
    description: "تفعيل كانفا برو الرسمي على إيميلك الخاص مدى الحياة، إمكانية استخدام جميع القوالب والصور المميزة وأدوات الذكاء الاصطناعي وإزالة الخلفيات.",
    features: [
      "تفعيل على إيميلك الشخصي مباشرة بدون كلمة مرور",
      "وصول كامل لأكثر من 100 مليون صورة وقالب مميز",
      "أدوات الذكاء الاصطناعي Magic Studio كاملة",
      "ميزة إزالة خلفيات الصور والفيديو بضغطة زر",
      "سعة تخزين سحابية ضخمة 1 تيرابايت"
    ],
    inStock: true,
    stockCount: 50,
    instantDeliveryKey: "CANVA-PRO-INVITE-LIFETIME-ACCESS",
    deliveryType: "آلي فوري",
    views: 1890
  },
  {
    id: "prod-8",
    name: "شحن 13,500 فيبوكس فورتنايت (V-Bucks) رسمي",
    category: "currencies",
    price: 110,
    originalPrice: 190,
    rating: 5.0,
    reviewsCount: 140,
    badge: "الأكثر مبيعاً",
    image: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&w=700&q=80",
    description: "شحن حزمة 13,500 فيبوكس أصلية لحساب فورتنايت الخاص بك، رسمية وآمنة 100% بدون أي ريسك أو حظر، وتعمل على جميع المنصات.",
    features: [
      "شحن رسمي 100% من متجر اللعبة المعتمد",
      "يعمل على البلايستيشن، الإكسبوكس، الكمبيوتر والجوال",
      "لا يطلب كلمة السر للحساب في معظم الطرق",
      "تسليم سريع خلال دقائق معدودة",
      "ضمان مالي كامل"
    ],
    inStock: true,
    stockCount: 22,
    instantDeliveryKey: "VBUCKS-13500-BUNDLE-CODE",
    deliveryType: "آلي فوري",
    views: 2450
  },
  {
    id: "prod-9",
    name: "برمجة وتركيب بوت متجر ديسكورد إلكتروني متكامل",
    category: "bots-dev",
    price: 135,
    originalPrice: 250,
    rating: 5.0,
    reviewsCount: 46,
    badge: "للأعمال والمتاجر",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80",
    description: "بوت ديسكورد احترافي لمتجرك الرقمي، يتيح الشراء الآلي، نظام تذاكر الدعم الفني، التسليم التلقائي للأكواد، وإحصائيات المبيعات.",
    features: [
      "نظام تسليم أكواد وحسابات آلي عند الدفع",
      "نظام تكتات (Tickets) متطور ومنظم",
      "لوحة تحكم كاملة لإضافة المنتجات وتعديل الأسعار",
      "استضافة وتشغيل مجاني للشهر الأول",
      "شرح كامل بالفيديو ودعم فني مخصص"
    ],
    inStock: true,
    stockCount: 10,
    instantDeliveryKey: "STOREBOT-SOURCE-SETUP-TOKEN",
    deliveryType: "تسليم فوري + إعداد",
    views: 940
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    author: "عبدالرحمن الشمري",
    discordTag: "Abdulrahman#9090",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    product: "ديسكورد نيترو قيمنق 3 أشهر",
    comment: "أقسم بالله متجر أسطوري! استلمت النيترو في أقل من 10 ثواني وتفعل رسمي بدون أي مشاكل وسعرهم أرخص سعر شفته بالشرق الأوسط كاملاً.",
    date: "منذ ساعتين",
    verified: true
  },
  {
    id: "rev-2",
    author: "فيصل العتيبي",
    discordTag: "Faisal_Gamer#1122",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    product: "سيرفر بوست لفل 3",
    comment: "سيرفري وصل لفل 3 بنفس اللحظة والرابط المخصص شغال ممتاز، الدعم الفني في الديسكورد متواجدين 24 ساعة وردوا علي فوراً.",
    date: "منذ 5 ساعات",
    verified: true
  },
  {
    id: "rev-3",
    author: "سلطان الخالدي",
    discordTag: "Sultan_K#4040",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    product: "اشتراك كانفا برو مدى الحياة",
    comment: "شريت كانفا برو ووصلني رابط التفعيل فوراً على إيميلي الخاص، شغال كامل مع أدوات الذكاء الاصطناعي.. ثقة وسرعة ما لها مثيل.",
    date: "أمس",
    verified: true
  },
  {
    id: "rev-4",
    author: "خالد الحربي",
    discordTag: "KhaLiD#7788",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    product: "اشتراك نتفلكس 4K Ultra HD",
    comment: "أفضل تجربة شراء رقمي، الحساب شغال بجودة 4K حقيقية بدون أي تقطيع وبملفي الخاص المقفل بباسورد. معتمد 4K STORE دائماً!",
    date: "منذ يومين",
    verified: true
  }
];

export const INITIAL_FAQS = [
  {
    q: "كيف يتم استلام المنتج بعد الدفع؟",
    a: "نظام متجر 4K STORE يعتمد على التسليم الآلي الفوري! بمجرد إتمام الطلب سيظهر لك كود المنتج أو بيانات الحساب مباشرة على الشاشة وفي فاتورتك الإلكترونية، بالإضافة لإرسال نسخة لك، ويمكنك أيضاً فتح تذكرة بسيرفر الديسكورد لاستلام الدعم الفوري."
  },
  {
    q: "هل المنتجات والاشتراكات آمنة ومضمونة؟",
    a: "نعم، 100%! جميع اشتراكات النيترو وحسابات البث والبرامج مفعلة بطرق رسمية وقانونية وبضمان ذهبي كامل طوال فترة الاشتراك. في حال واجهت أي خلل، فريقنا يستبدل المنتج أو يعوضك فوراً."
  },
  {
    q: "كيف أنضم إلى سيرفر الديسكورد للتواصل مع الدعم؟",
    a: "يمكنك الانضمام مباشرة عبر الرابط الرسمي https://discord.gg/sg73KenQs4 والضغط على زر 'فتح تذكرة' (Open Ticket) وسيكون أحد مسؤولي الدعم معك في غضون ثوانٍ للإجابة على كل استفساراتك."
  },
  {
    q: "ما هي طرق الدفع المتاحة في المتجر؟",
    a: "ندعم جميع طرق الدفع الشائعة: مدى، فيزا، ماستركارد، Apple Pay، STC Pay، التحويلات البنكية، بالإضافة إلى الدفع عبر تذاكر الديسكورد وسوا."
  },
  {
    q: "هل أستطيع طلب منتج غير متوفر في المتجر؟",
    a: "بالتأكيد! إذا كان لديك طلب خاص أو كميات جملة أو خدمة برمجية محددة، فقط توجه لسيرفر الديسكورد وافتح تذكرة خاصة، وسنقوم بتوفيرها لك بأفضل سعر ممكن."
  }
];

export const INITIAL_COUPONS = [
  { code: "4K2026", discountPercent: 15, active: true, usageCount: 89 },
  { code: "WELCOME10", discountPercent: 10, active: true, usageCount: 142 },
  { code: "DISCORDVIP", discountPercent: 20, active: true, usageCount: 65 }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-94821",
    customerName: "سعود القحطاني",
    discordTag: "Saud#1120",
    phone: "0551234567",
    items: [
      { id: "prod-1", name: "ديسكورد نيترو قيمنق - اشتراك 3 أشهر رسمي", price: 65, quantity: 1 }
    ],
    totalAmount: 65,
    discountAmount: 0,
    status: "مكتمل",
    paymentMethod: "مدى / Apple Pay",
    createdAt: "2026-11-05 23:40",
    deliveryKey: "NITRO-3M-GAME-9842-7711"
  },
  {
    id: "ORD-94820",
    customerName: "محمد الدوسري",
    discordTag: "M_Dosari#9911",
    phone: "0509876543",
    items: [
      { id: "prod-6", name: "مفتاح أصلي ويندوز 11 برو مدى الحياة", price: 25, quantity: 2 }
    ],
    totalAmount: 50,
    discountAmount: 0,
    status: "مكتمل",
    paymentMethod: "فودافون كاش",
    createdAt: "2026-11-05 21:15",
    deliveryKey: "W11PRO-OEM-KEY-99214-55412"
  },
  {
    id: "ORD-94819",
    customerName: "عمر الحربي",
    discordTag: "OmarH#4412",
    phone: "0563322110",
    items: [
      { id: "prod-8", name: "شحن 13,500 فيبوكس فورتنايت", price: 110, quantity: 1 }
    ],
    totalAmount: 93.5,
    discountAmount: 16.5,
    status: "قيد المراجعة",
    paymentMethod: "مصرف الراجحي",
    createdAt: "2026-11-05 19:02",
    deliveryKey: "قيد التفعيل اليدوي عبر تكت ديسكورد"
  }
];
