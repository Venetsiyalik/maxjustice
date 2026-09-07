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

## Arxitektura

- **Ko'p tillilik** (`i18n/`, `messages/*.json`): `next-intl`. `uz` — asosiy til, prefikssiz (`/`); `kr`, `ru`, `en` — `/kr`, `/ru`, `/en` prefiksi bilan.
- **Kirill versiyasi qo'lda tarjima qilinmaydi** — `lib/transliterate.ts` orqali `uz` matnidan avtomatik hosil qilinadi (brend nomlari kabi maxsus atamalar `PROTECTED_TERMS` da lotin holida saqlanadi).
- **Kontent** (`content/services/`, `content/blog/`): sahifa matnlari MDX yoki CMS o'rniga oddiy TypeScript obyektlari sifatida saqlanadi — bu transliteratsiya va tip xavfsizligini soddalashtiradi. Har bir xizmat/maqola papkada tilga qarab (`uz/`, `ru/`, `en/`) alohida fayl.
- **SEO** (`lib/schema.ts`, `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`): schema.org (LegalService, FAQPage, BreadcrumbList, Article), hreflang alternates, sitemap.
- **Forma** (`app/actions/contact.ts`): server action orqali Telegram Bot API ga yuboriladi.

## Hozircha PLACEHOLDER holatida bo'lgan narsalar

Ishga tushirishdan oldin quyidagilarni haqiqiy ma'lumot bilan almashtirish kerak (kodda `TODO` deb belgilangan):

- [ ] **Advokatlik litsenziyasi raqami** — `lib/site-config.ts`
- [ ] **Ish staji raqamlari** (IIB, advokatlik yillari) — `lib/site-config.ts`
- [ ] **Google Maps koordinatalari va havolalari** — `lib/site-config.ts`
- [ ] **Professional fotosuratlar** — hozircha barcha rasm o'rnida CSS bilan yasalgan placeholder (initsiallar) bor: `components/sections/Hero.tsx`, `components/sections/AboutPreview.tsx`, `app/[locale]/advokat-haqida/page.tsx`
- [ ] **Telegram bot token va chat ID** — `.env.local`
- [ ] **Google Analytics / Yandex Metrika ID** — `.env.local`
- [ ] **Aniq xizmat narxlari** — `messages/*.json` dagi `pricesPage.rows`
- [ ] **10 tadan 9 ta xizmat sahifasining rus/ingliz tarjimasi** — hozircha `content/services/ru|en/*.ts` fayllarining aksariyati vaqtincha `uz` kontentini qayta eksport qiladi (fayl ichidagi `TODO` izohiga qarang); faqat "jinoiy-ishlar" to'liq tarjima qilingan
- [ ] **Barcha matnlarning advokat tomonidan etika kodeksiga muvofiqligini tekshirish** (texnik topshiriq 7.1-band) — bu andoza kontent, yakuniy tasdiq advokatning o'zida

## Deploy

Vercel yoki Cloudflare Pages tavsiya etiladi (texnik topshiriq 2.1-band). Deploy paytida yuqoridagi muhit o'zgaruvchilarini hosting platformasining "Environment Variables" bo'limida sozlang.
