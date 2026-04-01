export function buildRu(o) {
  o.header = {
    themeSelect: 'Шаблон',
    themeClassic: 'Классика (светлая)',
    themeModern: 'Современная (тёмная)',
    langSelect: 'Язык',
    companyLine: 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.',
    login: 'Вход',
    signUp: 'Регистрация',
    logOut: 'Выход',
    logoutConfirm: 'Выйти из аккаунта?',
    logoutConfirmTitle: 'Подтвердите',
    ok: 'OK',
    cancel: 'Отмена',
    loggedOut: 'Вы вышли'
  }
  o.nav = {
    product: 'Продукция',
    allCategories: 'Все категории',
    home: 'Главная',
    about: 'О нас',
    news: 'Новости',
    contact: 'Контакты'
  }
  o.common = {
    hotline: 'Горячая линия:',
    hotlineWei: 'Горячая линия:',
    address: 'Адрес: высокотехнологичная зона Баодзи, провинция Шэньси, Китай',
    customerHotline: 'Служба поддержки:',
    customerEmail: 'Эл. почта:',
    icpSuffix: '— Техподдержка Shengtang Jialian',
    breadcrumbHome: 'Главная',
    facilityAlt: 'Объект'
  }
  o.home = {
    sectionProducts: 'ПРОДУКЦИЯ И УСЛУГИ',
    sectionAbout: 'О КОМПАНИИ',
    sectionNews: 'НОВОСТИ КОМПАНИИ',
    top: 'НАВЕРХ',
    seoH1: 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.'
  }
  o.product = {
    breadcrumb: 'Продукция',
    title: 'ПРОДУКЦИЯ И УСЛУГИ',
    lead: 'Линейки титановых велосипедов по категориям на базе металлообработки Баодзи.',
    viewSeries: 'Смотреть серию →',
    metaTitle: 'Продукция',
    metaDesc: '{company} — титановые велосипеды: МТБ, шоссе, складные, малые колёса, гравел.'
  }
  o.productDetail = { metaDesc: '{category} — {company}.', notFound: 'Категория не найдена' }
  o.about = {
    breadcrumb: 'О нас',
    sectionKicker: 'О КОМПАНИИ',
    metaTitle: 'О нас',
    metaDesc: 'Профиль — {company}, высокотехнологичная зона Баодзи.'
  }
  o.news = {
    breadcrumb: 'Новости',
    title: 'НОВОСТИ КОМПАНИИ',
    metaTitle: 'Новости',
    metaDesc: 'Новости — {company}.'
  }
  o.contact = {
    breadcrumb: 'Контакты',
    title: 'КОНТАКТЫ',
    metaTitle: 'Контакты',
    metaDesc: 'Контакты {company} — Баодзи, Шэньси.'
  }
  o.auth = {
    loginTitle: 'Вход',
    loginMetaDesc: 'Вход — {company}',
    account: 'Учётная запись',
    accountPh: 'Телефон / логин / email',
    password: 'Пароль',
    passwordPh: 'Пароль',
    submitLogin: 'Войти',
    registerNow: 'Регистрация',
    retrievePassword: 'Восстановить пароль',
    registerTitle: 'Регистрация',
    registerMetaDesc: 'Создать аккаунт — {company}',
    personalTab: 'Физлицо',
    companyTab: 'Компания',
    username: 'Логин',
    usernamePh: 'Имя для входа',
    companyName: 'Название компании',
    companyNamePh: 'Регистрационное имя',
    fullAddress: 'Адрес',
    companyAddressPh: 'Адрес компании',
    contactName: 'Контакт',
    contactNamePh: 'Контактное лицо',
    mobile: 'Телефон',
    mobilePh: '11-значный китайский мобильный',
    mobileRegPh: 'Зарегистрированный номер',
    pictureVerify: 'Пример',
    captchaPh: 'Ответ',
    verifyCode: 'Код SMS',
    smsPh: 'Код SMS',
    getCode: 'Получить код',
    setPassword: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    pwdHint: 'Минимум 8 символов, буквы и цифры.',
    agreePrefix: 'Прочитал и согласен',
    agreeLink: '(Условия сервиса)',
    signUp: 'Зарегистрироваться',
    alreadyHave: 'Уже есть аккаунт?',
    termsTitle: 'Условия сервиса',
    termsOk: 'OK',
    forgotTitle: 'Восстановление пароля',
    forgotMetaDesc: 'Сброс — {company}',
    newPassword: 'Новый пароль',
    submitReset: 'Отправить',
    backLogin: 'Ко входу'
  }
  o.validation = {
    enterAccount: 'Введите учётную запись',
    enterPassword: 'Введите пароль',
    minPass8: 'Минимум 8 символов',
    required: 'Обязательно',
    invalidMobile: 'Неверный номер',
    passwordMismatch: 'Пароли не совпадают',
    wrongCaptcha: 'Неверный ответ',
    passPattern: 'От 8 символов с буквами и цифрами',
    acceptAgreement: 'Примите соглашение',
    validMobileFirst: 'Сначала введите корректный номер'
  }
  o.toast = {
    loginFailed: 'Ошибка входа',
    signedIn: 'Вход выполнен',
    codeSent: 'Код отправлен',
    sendFailed: 'Ошибка отправки',
    regFailed: 'Ошибка регистрации',
    welcome: 'Добро пожаловать!',
    regPleaseSignIn: 'Регистрация завершена. Войдите.',
    resetFailed: 'Сброс не удался',
    resetOk: 'Пароль обновлён. Войдите.'
  }
  o.errors = {
    pageNotFound: '404',
    notFoundMessage: 'Страница не найдена или нет доступа.',
    backHome: 'На главную',
    notFoundHint: 'Проверьте URL или вернитесь на главную.',
    notFoundMeta: '404 — не найдено',
    pageNotFoundTitle: 'Страница не найдена'
  }
  o.meta = {
    homeDesc:
      'Титановые велосипеды и материалы — Shaanxi Tuotaizhe, высокотехнологичная зона Баодзи.'
  }
  o.terms = {
    html:
      '<p><strong>1. Сервис</strong></p><p>Вы соглашаетесь использовать сайт только для законных деловых запросов, связанных с Shaanxi Tuotaizhe Metal Technology Co., Ltd.</p><p><strong>2. Аккаунт</strong></p><p>Вы отвечаете за пароль и действия под учётной записью.</p><p><strong>3. Контакты</strong></p><p>Вопросы — телефон и email в подвале.</p>'
  }
  return o
}
