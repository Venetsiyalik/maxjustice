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
  phone: {
    display: "+998 90 300 94 06",
    href: "tel:+998903009406",
  },
  telegram: {
    handle: "maxjustice_uz",
    href: "https://t.me/maxjustice_uz",
  },
  email: {
    info: "info@maxjustice.uz",
    founder: "tolanboy@maxjustice.uz",
  },
  address: {
    display: "Farg'ona shahri, S. Temur ko'chasi, 43-uy",
    street: "S. Temur ko'chasi, 43",
    locality: "Farg'ona",
    region: "Farg'ona viloyati",
    postalCode: "150100",
    country: "UZ",
    // TODO: haqiqiy koordinatalarga almashtirish (Google Maps'dan olinadi)
    latitude: "40.3894",
    longitude: "71.7864",
  },
  maps: {
    // TODO: byuroning haqiqiy Google/Yandex Maps havolalari bilan almashtirish
    google: "https://maps.google.com/?q=Farg'ona+S.+Temur+ko'chasi+43",
    yandex: "https://yandex.uz/maps/?text=Farg'ona+S.+Temur+ko'chasi+43",
    googleEmbed:
      "https://www.google.com/maps?q=Farg'ona+S.+Temur+ko'chasi+43&output=embed",
  },
  rating: {
    value: "5.0",
  },
  experience: {
    // TODO: haqiqiy raqamlar bilan almashtirish — noaniq/oshirib ko'rsatilgan
    // raqam etika talablariga zid (7.1-band)
    investigatorYears: "3-4",
    advocateYears: "TODO",
  },
} as const;
