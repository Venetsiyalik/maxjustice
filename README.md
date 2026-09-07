# maxjustice.uz

"MAXLEGAL AND JUSTICE" advokatlik byurosi veb-sayti — Next.js 16 (App Router), TypeScript, Tailwind CSS 4, `next-intl`.

## Ishga tushirish

```bash
npm install
npm run dev
```

Sayt http://localhost:3000 da ochiladi.

```bash
npm run build   # production build
npm run lint    # ESLint tekshiruvi
```

## Muhit o'zgaruvchilari

`.env.example` faylini `.env.local` nomi bilan nusxalab, quyidagilarni to'ldiring:

| O'zgaruvchi | Nima uchun |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Murojaat formasi xabarlarini Telegramga yuborish uchun (@BotFather orqali olinadi) |
| `TELEGRAM_CHAT_ID` | Xabarlar keladigan chat/kanal ID |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 o'lchov ID (masalan, `G-XXXXXXX`) |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | Yandex Metrika hisob raqami |

Bu o'zgaruvchilar sozlanmagan bo'lsa, tegishli funksiya (forma yuborish, analitika) jim o'tkaziladi — sayt buzilmaydi.

**`TELEGRAM_CHAT_ID` ni qanday topish mumkin:**
1. Telegramda @Maxjusticebot ga istalgan xabar (masalan, `/start`) yuboring.
2. Brauzerda oching: `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. Javobdagi `message.chat.id` qiymatini `.env.local` ga qo'ying.

## Vercel'ga deploy qilish

1. [vercel.com](https://vercel.com) da hisob oching va GitHub akkauntingizni ulang.
2. "Add New Project" → shu repozitoriyni (`Venetsiyalik/maxjustice`) tanlang. Vercel Next.js loyihasini avtomatik aniqlaydi, qo'shimcha sozlash shart emas.
3. "Environment Variables" bo'limida yuqoridagi 4 ta o'zgaruvchini qo'shing (qiymatlarni `.env.local` dan yoki BotFather/Analytics panelidan oling — bu qiymatlar hech qachon kodga yoki GitHub'ga yozilmasligi kerak).
4. "Deploy" tugmasini bosing. Bir necha daqiqada sayt `https://<loyiha-nomi>.vercel.app` manzilida ishga tushadi.
5. O'z domeningizni (`maxjustice.uz`) ulash uchun: loyiha sozlamalarida "Domains" → domenni kiriting → Vercel bergan DNS yozuvlarini domen provayderingizda (masalan, GoDaddy, Cloudflare) sozlang. SSL sertifikat Vercel tomonidan avtomatik chiqariladi.
6. Har safar `master` branch'ga push qilinganda Vercel avtomatik qayta deploy qiladi.

## Arxitektura

- **Ko'p tillilik** (`i18n/`, `messages/*.json`): `next-intl`. `uz` — asosiy til, prefikssiz (`/`); `kr`, `ru`, `en` — `/kr`, `/ru`, `/en` prefiksi bilan.
- **Kirill versiyasi qo'lda tarjima qilinmaydi** — `lib/transliterate.ts` orqali `uz` matnidan avtomatik hosil qilinadi (brend nomlari kabi maxsus atamalar `PROTECTED_TERMS` da lotin holida saqlanadi).
- **Kontent** (`content/services/`, `content/blog/`): sahifa matnlari MDX yoki CMS o'rniga oddiy TypeScript obyektlari sifatida saqlanadi — bu transliteratsiya va tip xavfsizligini soddalashtiradi. Har bir xizmat/maqola papkada tilga qarab (`uz/`, `ru/`, `en/`) alohida fayl.
- **SEO** (`lib/schema.ts`, `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`): schema.org (LegalService, FAQPage, BreadcrumbList, Article, AggregateRating), hreflang alternates, sitemap.
- **Forma** (`app/actions/contact.ts`): server action orqali Telegram Bot API ga yuboriladi.
- **Narxlar sahifasi** (`/narxlar`) ataylab jadval/raqam ko'rsatmaydi — buyurtmachi talabiga ko'ra, aniq narx faqat murojaat orqali beriladi.

## Hozircha PLACEHOLDER holatida bo'lgan narsalar

Ishga tushirishdan oldin quyidagilarni haqiqiy ma'lumot bilan almashtirish kerak (kodda `TODO` deb belgilangan):

- [ ] **Advokatlik litsenziyasi raqami** — `lib/site-config.ts`
- [ ] **Ish staji raqamlari** (IIB, advokatlik yillari) — `lib/site-config.ts`
- [ ] **Bino darajasidagi aniq koordinatalar** — hozir Farg'ona shahar markazi bo'yicha taxminiy (`lib/site-config.ts`); Google/Yandex xarita havolalari mavjud "Адвокатура" profili manzili+nomi bo'yicha qidiruv sifatida ishlaydi (to'g'ri joyni ochadi), lekin `schema.org` uchun aniq lat/long Google Business Profile panelidan olinishi tavsiya etiladi
- [ ] **"Telegramda yozish" ommaviy tugmasi** (`lib/site-config.ts` → `telegram.handle`) — hozircha `maxjustice_uz` placeholder. @Maxjusticebot murojaat formasi xabarlarini qabul qilish uchun ishlatiladi, lekin unga yozgan tashrifchiga hozircha avtomatik javob yo'q — shu sabab bu tugma uchun alohida, real javob beradigan Telegram profil/handle tavsiya etiladi
- [ ] **Professional fotosuratlar** — hozircha barcha rasm o'rnida CSS bilan yasalgan placeholder (initsiallar) bor: `components/sections/Hero.tsx`, `components/sections/AboutPreview.tsx`, `app/[locale]/advokat-haqida/page.tsx`
- [ ] **Google Analytics / Yandex Metrika ID** — `.env.local` va Vercel Environment Variables
- [ ] **Barcha matnlarning advokat tomonidan etika kodeksiga muvofiqligini tekshirish** (texnik topshiriq 7.1-band) — bu andoza kontent, yakuniy tasdiq advokatning o'zida

## Kelajakdagi rejalar (hozircha qo'shilmagan)

- **Telegram botga AI orqali oddiy savollarga avtomatik javob** — buyurtmachi tomonidan so'ralgan, lekin alohida backend (webhook + AI API) talab qilgani sabab hozircha amalga oshirilmagan.
