export function buildAr(o) {
  o.header = {
    themeSelect: 'القالب',
    themeClassic: 'فاتح كلاسيكي',
    themeModern: 'داكن عصري',
    langSelect: 'اللغة',
    companyLine: 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.',
    login: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    logOut: 'تسجيل الخروج',
    logoutConfirm: 'تسجيل الخروج من الحساب؟',
    logoutConfirmTitle: 'تأكيد',
    ok: 'موافق',
    cancel: 'إلغاء',
    loggedOut: 'تم تسجيل الخروج'
  }
  o.nav = {
    product: 'المنتجات',
    allCategories: 'جميع الفئات',
    home: 'الرئيسية',
    about: 'من نحن',
    news: 'الأخبار',
    contact: 'اتصل بنا'
  }
  o.common = {
    hotline: 'الخط الساخن:',
    hotlineWei: 'الخط الساخن:',
    address: 'العنوان: منطقة باوجي للتكنولوجيا العالية، مقاطعة شنشي، الصين',
    customerHotline: 'خدمة العملاء:',
    customerEmail: 'البريد:',
    icpSuffix: '— دعم تقني من Shengtang Jialian',
    breadcrumbHome: 'الرئيسية',
    facilityAlt: 'المنشأة'
  }
  o.home = {
    sectionProducts: 'المنتجات والخدمات',
    sectionAbout: 'نبذة عن الشركة',
    sectionNews: 'أخبار الشركة',
    top: 'أعلى',
    seoH1: 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.'
  }
  o.product = {
    breadcrumb: 'المنتجات',
    title: 'المنتجات والخدمات',
    lead: 'اكتشف دراجات سبيكة التيتانيوم حسب الفئة، مستفيدًا من قدرات باوجي في تشغيل المعادن.',
    viewSeries: 'عرض السلسلة ←',
    metaTitle: 'المنتجات',
    metaDesc: '{company} — دراجات تيتانيوم: جبال، طريق، قابلة للطي، عجلات صغيرة، gravel.'
  }
  o.productDetail = { metaDesc: '{category} — {company}.', notFound: 'الفئة غير موجودة' }
  o.about = {
    breadcrumb: 'من نحن',
    sectionKicker: 'نبذة عن الشركة',
    metaTitle: 'من نحن',
    metaDesc: 'ملف الشركة — {company}، منطقة باوجي للتكنولوجيا العالية.'
  }
  o.news = {
    breadcrumb: 'الأخبار',
    title: 'أخبار الشركة',
    metaTitle: 'الأخبار',
    metaDesc: 'أخبار وتحديثات — {company}.'
  }
  o.contact = {
    breadcrumb: 'اتصل بنا',
    title: 'اتصل بنا',
    metaTitle: 'اتصل بنا',
    metaDesc: 'الاتصال بـ {company} — باوجي، شنشي.'
  }
  o.auth = {
    loginTitle: 'تسجيل الدخول',
    loginMetaDesc: 'تسجيل الدخول — {company}',
    account: 'الحساب',
    accountPh: 'الهاتف / اسم المستخدم / البريد',
    password: 'كلمة المرور',
    passwordPh: 'كلمة المرور',
    submitLogin: 'دخول',
    registerNow: 'تسجيل',
    retrievePassword: 'استرجاع كلمة المرور',
    registerTitle: 'التسجيل',
    registerMetaDesc: 'إنشاء حساب — {company}',
    personalTab: 'فردي',
    companyTab: 'شركة',
    username: 'اسم المستخدم',
    usernamePh: 'اسم الدخول',
    companyName: 'اسم الشركة',
    companyNamePh: 'الاسم القانوني',
    fullAddress: 'العنوان',
    companyAddressPh: 'عنوان الشركة',
    contactName: 'جهة الاتصال',
    contactNamePh: 'الشخص المسؤول',
    mobile: 'الجوال',
    mobilePh: 'جوال صيني 11 خانة',
    mobileRegPh: 'رقم مسجل',
    pictureVerify: 'تحقق حسابي',
    captchaPh: 'الإجابة',
    verifyCode: 'رمز الرسالة',
    smsPh: 'رمز SMS',
    getCode: 'احصل على الرمز',
    setPassword: 'تعيين كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    pwdHint: '8 أحرف على الأقل مع أرقام وحروف.',
    agreePrefix: 'قرأت وأوافق',
    agreeLink: '(اتفاقية الخدمة)',
    signUp: 'تسجيل',
    alreadyHave: 'لديك حساب؟',
    termsTitle: 'اتفاقية الخدمة',
    termsOk: 'موافق',
    forgotTitle: 'استرجاع كلمة المرور',
    forgotMetaDesc: 'إعادة تعيين — {company}',
    newPassword: 'كلمة مرور جديدة',
    submitReset: 'إرسال',
    backLogin: 'العودة لتسجيل الدخول'
  }
  o.validation = {
    enterAccount: 'أدخل الحساب',
    enterPassword: 'أدخل كلمة المرور',
    minPass8: '8 أحرف على الأقل',
    required: 'مطلوب',
    invalidMobile: 'رقم غير صالح',
    passwordMismatch: 'كلمتا المرور غير متطابقتين',
    wrongCaptcha: 'إجابة خاطئة',
    passPattern: '8+ أحرف مع حروف وأرقام',
    acceptAgreement: 'يرجى الموافقة',
    validMobileFirst: 'أدخل رقمًا صالحًا أولاً'
  }
  o.toast = {
    loginFailed: 'فشل تسجيل الدخول',
    signedIn: 'تم تسجيل الدخول',
    codeSent: 'تم إرسال الرمز',
    sendFailed: 'فشل الإرسال',
    regFailed: 'فشل التسجيل',
    welcome: 'مرحبًا!',
    regPleaseSignIn: 'تم التسجيل. سجّل الدخول.',
    resetFailed: 'فشل إعادة التعيين',
    resetOk: 'تم تحديث كلمة المرور. سجّل الدخول.'
  }
  o.errors = {
    pageNotFound: '404',
    notFoundMessage: 'الصفحة غير موجودة أو ليست لديك صلاحية.',
    backHome: 'الرئيسية',
    notFoundHint: 'تحقق من الرابط أو عد للرئيسية.',
    notFoundMeta: '404 - غير موجود',
    pageNotFoundTitle: 'صفحة غير موجودة'
  }
  o.meta = {
    homeDesc: 'دراجات سبيكة تيتانيوم ومواد — Shaanxi Tuotaizhe، منطقة باوجي للتكنولوجيا العالية.'
  }
  o.terms = {
    html:
      '<p><strong>1. الخدمة</strong></p><p>توافق على استخدام هذا الموقع فقط لاستفسارات تجارية مشروعة تتعلق بـ Shaanxi Tuotaizhe Metal Technology Co., Ltd.</p><p><strong>2. الحساب</strong></p><p>أنت مسؤول عن كلمة المرور والنشاط تحت حسابك.</p><p><strong>3. الاتصال</strong></p><p>للأسئلة استخدم الهاتف والبريد في التذييل.</p>'
  }
  return o
}
