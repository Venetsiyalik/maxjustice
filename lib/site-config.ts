/**
 * Sayt bo'ylab ishlatiladigan o'zgarmas biznes ma'lumotlari — yagona manba.
 * NAP (Nom-Manzil-Telefon) izchilligi lokal SEO uchun hal qiluvchi ahamiyatga
 * ega (10.4-band), shuning uchun bu qiymatlar boshqa hech qayerda qo'lda
 * qaytarilmasligi kerak.
 */
export const siteConfig = {
  domain: "maxjustice.uz",
  url: "https://maxjustice.uz",
  legalName: "MAXLEGAL AND JUSTICE advokatlik byurosi",
  secondBrand: "IMPERIUM LEGAL SOLUTIONS",
  founder: {
    fullName: "Nasrdinov To'lanboy Baxtiyor o'g'li",
    jobTitle: "Advokat",
  },
  license: {
    // TODO: haqiqiy litsenziya raqami bilan almashtirish (7.3-band, majburiy)
    number: "№ ______ (litsenziya raqami kiritilishi kerak)",
  },
  // Butun sayt bo'ylab ishlatiladigan yagona telefon raqami — To'lanboyning
  // shaxsiy raqami (buyurtmachi tasdiqlagan). Diqqat: bu raqam mavjud Google
  // Business profilidagi ("Адвокатура", 5.0 ★, 7 sharh) "90 300 94 06"dan
  // FARQ QILADI — NAP izchilligi uchun Google Business profilini ham shu
  // yangi raqamga yangilash tavsiya etiladi (10.4-band).
  phone: {
    display: "+998 77 018 14 02",
    href: "tel:+998770181402",
  },
  telegram: {
    // @Maxjusticebot — hozircha murojaat formasi xabarlarini advokatga
    // yuborish uchun ishlatiladi (TELEGRAM_BOT_TOKEN/CHAT_ID, .env.local)
    // VA sayt bo'ylab "Telegramda yozish" ommaviy tugmasi ham shu botga
    // ochiladi. Botda hozircha avtomatik javob logikasi yo'q — bu AI
    // qo'shilgunga qadar ataylab shunday qoldirilgan (buyurtmachi so'rovi).
    handle: "Maxjusticebot",
    href: "https://t.me/Maxjusticebot",
  },
  email: {
    // Ommaviy/asosiy kontakt — Bog'lanish sahifasi, footer, schema.org
    info: "info@maxjustice.uz",
    // To'lanboyning shaxsiy pochtasi ("Advokat haqida" sahifasida)
    founder: "tolanboy@maxjustice.uz",
    // Huquqiy so'rovlar uchun alohida manzil (hozircha alohida joyda
    // ko'rsatilmaydi, kerak bo'lganda ishlatish uchun tayyor)
    advokat: "advokat@maxjustice.uz",
  },
  address: {
    display: "Farg'ona shahri, S. Temur ko'chasi, 43-uy",
    street: "S. Temur ko'chasi, 43",
    locality: "Farg'ona",
    region: "Farg'ona viloyati",
    postalCode: "150100",
    country: "UZ",
    // Taxminiy — Farg'ona shahar markazi. Aniq (bino darajasidagi)
    // koordinatalarni Google Business Profile boshqaruv panelidan olib
    // almashtirish tavsiya etiladi (schema.org geo uchun mos kelishi kerak).
    latitude: "40.3894",
    longitude: "71.7864",
  },
  maps: {
    // Mavjud Google Business profili ("Адвокатура", 5.0 ★, 7 sharh) manzil
    // va nom bo'yicha qidiriladi — shu orqali to'g'ri joyga ochiladi.
    google:
      "https://www.google.com/maps/search/?api=1&query=Advokatura+S.+Temur+ko%27chasi+43+Farg%27ona",
    yandex:
      "https://yandex.uz/maps/?text=Advokatura+S.+Temur+ko%27chasi+43+Farg%27ona",
    googleEmbed:
      "https://www.google.com/maps?q=Advokatura+S.+Temur+ko%27chasi+43+Farg%27ona&output=embed",
  },
  rating: {
    value: "5.0",
    // Google Business profilidagi joriy sharhlar soni (2026-09 holatiga)
    reviewCount: "7",
  },
  experience: {
    // TODO: haqiqiy raqamlar bilan almashtirish — noaniq/oshirib ko'rsatilgan
    // raqam etika talablariga zid (7.1-band)
    investigatorYears: "3-4",
    advocateYears: "TODO",
  },
} as const;
