/** @param {Record<string, unknown>} o cloned en */
export function buildDe(o) {
  o.header = {
    themeSelect: 'Vorlage',
    themeClassic: 'Klassisch hell',
    themeModern: 'Modern dunkel',
    langSelect: 'Sprache',
    companyLine: 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.',
    login: 'Anmelden',
    signUp: 'Registrieren',
    logOut: 'Abmelden',
    logoutConfirm: 'Vom Konto abmelden?',
    logoutConfirmTitle: 'Bestätigen',
    ok: 'OK',
    cancel: 'Abbrechen',
    loggedOut: 'Abgemeldet'
  }
  o.nav = {
    product: 'Produkte',
    allCategories: 'Alle Kategorien',
    home: 'Start',
    about: 'Über uns',
    news: 'News',
    contact: 'Kontakt'
  }
  o.common = {
    hotline: 'Hotline:',
    hotlineWei: 'Hotline:',
    address: 'Adresse: Hochtechnologie-Industriezone Baoji, Provinz Shaanxi, China',
    customerHotline: 'Kundenservice:',
    customerEmail: 'E-Mail:',
    icpSuffix: '— Technischer Support Shengtang Jialian',
    breadcrumbHome: 'Start',
    facilityAlt: 'Standort'
  }
  o.home = {
    sectionProducts: 'PRODUKTE & DIENSTE',
    sectionAbout: 'UNTERNEHMENSPROFIL',
    sectionNews: 'UNTERNEHMENSNEWS',
    top: 'NACH OBEN',
    seoH1: 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.'
  }
  o.product = {
    breadcrumb: 'Produkte',
    title: 'PRODUKTE & DIENSTE',
    lead: 'Entdecken Sie unsere Titanlegierungs-Fahrradserien nach Kategorie. Entwickelt in Baojis Metallverarbeitungsstärke.',
    viewSeries: 'Serie ansehen →',
    metaTitle: 'Produkte',
    metaDesc: '{company} — Titanlegierungsräder: MTB, Rennrad, Faltrad, Kleinrad, Gravel.'
  }
  o.productDetail = { metaDesc: '{category} — {company}.', notFound: 'Kategorie nicht gefunden' }
  o.about = {
    breadcrumb: 'Über uns',
    sectionKicker: 'UNTERNEHMENSPROFIL',
    metaTitle: 'Über uns',
    metaDesc: 'Unternehmensprofil — {company}, Hochtechnologiezone Baoji.'
  }
  o.news = {
    breadcrumb: 'News',
    title: 'UNTERNEHMENSNEWS',
    metaTitle: 'News',
    metaDesc: 'News und Updates — {company}.'
  }
  o.contact = {
    breadcrumb: 'Kontakt',
    title: 'KONTAKT',
    metaTitle: 'Kontakt',
    metaDesc: 'Kontakt {company} — Baoji, Shaanxi.'
  }
  o.auth = {
    loginTitle: 'Anmelden',
    loginMetaDesc: 'Anmelden — {company}',
    account: 'Konto',
    accountPh: 'Telefon / Benutzername / E-Mail',
    password: 'Passwort',
    passwordPh: 'Passwort',
    submitLogin: 'Anmelden',
    registerNow: 'Registrieren',
    retrievePassword: 'Passwort zurücksetzen',
    registerTitle: 'Registrierung',
    registerMetaDesc: 'Konto erstellen — {company}',
    personalTab: 'Privat',
    companyTab: 'Firma',
    username: 'Benutzername',
    usernamePh: 'Anmeldename',
    companyName: 'Firmenname',
    companyNamePh: 'Handelsname',
    fullAddress: 'Adresse',
    companyAddressPh: 'Firmenadresse',
    contactName: 'Ansprechpartner',
    contactNamePh: 'Name des Ansprechpartners',
    mobile: 'Mobiltelefon',
    mobilePh: '11-stellige chinesische Mobilnummer',
    mobileRegPh: 'Registrierte Mobilnummer',
    pictureVerify: 'Rechenaufgabe',
    captchaPh: 'Antwort',
    verifyCode: 'Bestätigungscode',
    smsPh: 'SMS-Code',
    getCode: 'Code senden',
    setPassword: 'Passwort festlegen',
    confirmPassword: 'Passwort bestätigen',
    pwdHint: 'Mindestens 8 Zeichen inkl. Ziffern und Buchstaben.',
    agreePrefix: 'Gelesen und zugestimmt',
    agreeLink: '(Nutzungsbedingungen)',
    signUp: 'Registrieren',
    alreadyHave: 'Bereits ein Konto?',
    termsTitle: 'Nutzungsbedingungen',
    termsOk: 'OK',
    forgotTitle: 'Passwort zurücksetzen',
    forgotMetaDesc: 'Reset — {company}',
    newPassword: 'Neues Passwort',
    submitReset: 'Absenden',
    backLogin: 'Zurück zur Anmeldung'
  }
  o.validation = {
    enterAccount: 'Bitte Konto eingeben',
    enterPassword: 'Bitte Passwort eingeben',
    minPass8: 'Mindestens 8 Zeichen',
    required: 'Pflichtfeld',
    invalidMobile: 'Ungültige Mobilnummer',
    passwordMismatch: 'Passwörter stimmen nicht',
    wrongCaptcha: 'Falsche Antwort',
    passPattern: '8+ Zeichen mit Buchstaben und Ziffern',
    acceptAgreement: 'Bitte Vereinbarung akzeptieren',
    validMobileFirst: 'Zuerst gültige Mobilnummer eingeben'
  }
  o.toast = {
    loginFailed: 'Anmeldung fehlgeschlagen',
    signedIn: 'Angemeldet',
    codeSent: 'Code gesendet',
    sendFailed: 'Senden fehlgeschlagen',
    regFailed: 'Registrierung fehlgeschlagen',
    welcome: 'Willkommen!',
    regPleaseSignIn: 'Registriert. Bitte anmelden.',
    resetFailed: 'Zurücksetzen fehlgeschlagen',
    resetOk: 'Passwort aktualisiert. Bitte anmelden.'
  }
  o.errors = {
    pageNotFound: '404',
    notFoundMessage: 'Die Seite existiert nicht oder Sie haben keinen Zugriff.',
    backHome: 'Zur Startseite',
    notFoundHint: 'URL prüfen oder zur Startseite.',
    notFoundMeta: '404 - Seite nicht gefunden',
    pageNotFoundTitle: 'Seite nicht gefunden'
  }
  o.meta = {
    homeDesc:
      'Titanlegierungsfahrräder und Materialien — Shaanxi Tuotaizhe Metal Technology Co., Ltd., Hochtechnologiezone Baoji.'
  }
  o.terms = {
    html:
      '<p><strong>1. Service</strong></p><p>Sie nutzen diese Website nur für rechtmäßige Geschäftsanfragen zu Shaanxi Tuotaizhe Metal Technology Co., Ltd.</p><p><strong>2. Konto</strong></p><p>Sie sind für Ihr Passwort und Aktivitäten unter Ihrem Konto verantwortlich.</p><p><strong>3. Kontakt</strong></p><p>Fragen: Hotline und E-Mail in der Fußzeile.</p>'
  }
  return o
}
