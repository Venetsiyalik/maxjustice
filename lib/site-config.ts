/**
 * Sayt bo'ylab ishlatiladigan o'zgarmas biznes ma'lumotlari — yagona manba.
 * NAP (Nom-Manzil-Telefon) izchilligi lokal SEO uchun hal qiluvchi ahamiyatga
 * ega (10.4-band), shuning uchun bu qiymatlar boshqa hech qayerda qo'lda
 * qaytarilmasligi kerak.
 *
 * Telefon, manzil, email, ish vaqti, sameAs va reyting admin paneldan
 * tahrirlanadi — ular content/settings.json da turadi va shu yerga ulanadi.
 */
import rawSettings from "@/content/settings.json";
import { phoneHref, type SiteSettings } from "@/lib/settings-schema";

const settings = rawSettings as SiteSettings;

export const siteConfig = {
  domain: "maxjustice.uz",
  url: "https://maxjustice.uz",
  legalName: "MAXLEGAL AND JUSTICE advokatlik byurosi",
  // Title, Open Graph va schema'dagi brend nomi
  brandName: "MAXLEGAL AND JUSTICE",
  secondBrand: "IMPERIUM LEGAL SOLUTIONS",
  founder: {
    fullName: "Nasrdinov To'lanboy Baxtiyor o'g'li",
    jobTitle: "Advokat",
    // Rasmiy portret (public/ ichida), 4:5, 960×1200
    photo: { src: "/images/nasrdinov-tolanboy-advokat.jpg", width: 960, height: 1200 },
  },
  license: {
    // Advokatlik litsenziyasi raqami (buyurtmachi tasdiqlagan, 7.3-band).
    // Kirill sahifada ham lotin harfi bilan qolishi kerak — shuning uchun
    // localizeText() orqali o'tkazilmaydi.
    number: "L70665018",
    isPlaceholder: false,
  },
  // STIR (soliq to'lovchining identifikatsiya raqami) — footer va schema.org taxID
  taxId: "311112344",
  // Ijtimoiy tarmoq va katalog profillari (Instagram, Facebook, Telegram
  // kanal, Google Business profili...) — schema.org `sameAs`. Bo'sh bo'lsa
  // schema'ga chiqmaydi. Havolalar kelganda shu ro'yxatga qo'shing.
  sameAs: settings.sameAs,
  // Ish vaqti hali tasdiqlanmagan (sayt matnida "24/7"). Tasdiqlanmaguncha
  // schema.org openingHoursSpecification CHIQARILMAYDI — noto'g'ri vaqt
  // Google'da ko'rinib qolgandan ko'ra yo'qligi yaxshi. Tasdiqlangach, masalan:
  // { days: ["Monday", ..., "Saturday"], opens: "09:00", closes: "18:00" }
  openingHours: settings.openingHours,
  // Xizmat ko'rsatish hududi — schema.org areaServed (kr: uz dan transliteratsiya)
  serviceArea: {
    city: { uz: "Farg'ona", ru: "Фергана", en: "Fergana" },
    region: { uz: "Farg'ona viloyati", ru: "Ферганская область", en: "Fergana Region" },
  },
  // Butun sayt bo'ylab ishlatiladigan yagona telefon raqami — To'lanboyning
  // shaxsiy raqami (buyurtmachi tasdiqlagan). Diqqat: bu raqam mavjud Google
  // Business profilidagi ("Адвокатура", 5.0 ★, 7 sharh) "90 300 94 06"dan
  // FARQ QILADI — NAP izchilligi uchun Google Business profilini ham shu
  // yangi raqamga yangilash tavsiya etiladi (10.4-band).
  phone: {
    display: settings.phone,
    href: phoneHref(settings.phone),
  },
  telegram: {
    // @Maxjusticebot — hozircha murojaat formasi xabarlarini advokatga
    // yuborish uchun ishlatiladi (TELEGRAM_BOT_TOKEN/CHAT_ID, .env.local)
    // VA sayt bo'ylab "Telegramda yozish" ommaviy tugmasi ham shu botga
    // ochiladi. Botda hozircha avtomatik javob logikasi yo'q — bu AI
    // qo'shilgunga qadar ataylab shunday qoldirilgan (buyurtmachi so'rovi).
    handle: settings.telegramHandle,
    href: `https://t.me/${settings.telegramHandle}`,
  },
  email: {
    // Ommaviy/asosiy kontakt — Bog'lanish sahifasi, footer, schema.org
    info: settings.email.info,
    // To'lanboyning shaxsiy pochtasi ("Advokat haqida" sahifasida)
    founder: settings.email.founder,
    // Huquqiy so'rovlar uchun alohida manzil (hozircha alohida joyda
    // ko'rsatilmaydi, kerak bo'lganda ishlatish uchun tayyor)
    advokat: settings.email.advokat,
  },
  address: {
    display: settings.address.display,
    // Meta description'lardagi qisqa shakl — matnlarda `{address}` o'rniga
    // qo'yiladi (lib/nap.ts). kr — uz dan avtomatik transliteratsiya.
    short: settings.address.short,
    street: settings.address.street,
    locality: settings.address.locality,
    region: settings.address.region,
    postalCode: settings.address.postalCode,
    country: "UZ",
    // Taxminiy — Farg'ona shahar markazi. Aniq (bino darajasidagi)
    // koordinatalarni Google Business Profile boshqaruv panelidan olib
    // almashtirish tavsiya etiladi (schema.org geo uchun mos kelishi kerak).
    latitude: settings.address.latitude,
    longitude: settings.address.longitude,
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
    value: settings.rating.value,
    // Google Business profilidagi joriy sharhlar soni (2026-09 holatiga)
    reviewCount: settings.rating.reviewCount,
  },
  experience: {
    // TODO: haqiqiy raqamlar bilan almashtirish — noaniq/oshirib ko'rsatilgan
    // raqam etika talablariga zid (7.1-band)
    investigatorYears: "3-4",
    advocateYears: "TODO",
  },
} as const;
