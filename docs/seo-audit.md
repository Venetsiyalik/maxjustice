# maxjustice.uz — SEO audit (1-bosqich)

**Sana:** 2026-11-17
**Usul:** `next build` → `next start` (production rejimi, lokal). `sitemap.xml` dagi 112 ta URL avtomatik skript bilan koʻrib chiqildi. Kod bazasi qoʻlda oʻrganildi, mobil koʻrinish 375 px kenglikda tekshirildi.
**Oʻzgartirilgan kod:** yoʻq. Faqat shu hisobot va `CLAUDE.md` dagi loyiha konteksti qoʻshildi.

> Belgilar: ✅ yaxshi · ⚠️ qisman / tuzatish kerak · ❌ yoʻq yoki xato · 🔍 qoʻlda tekshirish kerak

---

## 1. Texnologiya steki, build/deploy, URL tuzilmasi

| Narsa | Holat |
|---|---|
| Freymvork | Next.js 16.3.4 (App Router), React 19.2.8, TypeScript |
| Koʻp tillilik | next-intl 4.14 — `uz` (asosiy, prefikssiz), `kr` (uz dan avtomatik transliteratsiya), `ru`, `en` |
| Stil | Tailwind CSS 4 |
| Kontent | TypeScript fayllar: `content/services/{uz,ru,en}/*.ts`, `content/blog/uz/*.ts`. UI matnlari: `messages/{uz,ru,en}.json` |
| Render | Barcha sahifalar **SSG** (build paytida statik HTML) ✅ |
| Forma | Server Action (`app/actions/contact.ts`) → Telegram bot |
| Analitika | GA4 + Yandex Metrika komponenti tayyor, `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_YANDEX_METRIKA_ID` boʻlsa ishga tushadi |
| Deploy | GitHub (`Venetsiyalik/maxjustice`, `master`) → Vercel |
| NAP manbasi | `lib/site-config.ts` |

**Sahifalar** (har biri 4 tilda, jami 112 URL):

| Yoʻl | Sahifa |
|---|---|
| `/` | Bosh sahifa |
| `/xizmatlar` | Xizmatlar roʻyxati |
| `/xizmatlar/[slug]` | 10 ta xizmat: `jinoiy-ishlar`, `tergovga-qadar`, `mamuriy-ishlar`, `tadbirkor-himoyasi`, `iqtisodiy-jinoyatlar`, `fuqarolik-ishlari`, `oila-va-meros`, `mehnat-nizolari`, `shartnomalar`, `sudda-vakillik` |
| `/advokat-haqida` | Advokat haqida |
| `/amaliyot` | Amaliyot (anonim holatlar) |
| `/narxlar` | Narxlar |
| `/savol-javob` | FAQ |
| `/blog`, `/blog/[slug]` | Blog (8 ta maqola) |
| `/bog-lanish` | Aloqa |
| `/maxfiylik-siyosati`, `/foydalanish-shartlari` | Huquqiy sahifalar |

URL tuzilmasi: `uz` → `/xizmatlar/...`, boshqa tillar → `/ru/xizmatlar/...`. Sluglar barcha tillarda lotincha va bir xil. ✅

---

## 2. Har sahifa: title, description, sarlavhalar, canonical, OG

**Umumiy natija (112 URL):**

| Tekshiruv | Natija |
|---|---|
| HTTP status | 112/112 → 200 ✅ |
| `<title>` | Hammasida bor ✅. **9 tasi 60 belgidan uzun** ⚠️ |
| meta description | Hammasida bor, eng uzuni 154 belgi (≤155) ✅. `foydalanish-shartlari` da juda qisqa (51–58 belgi) ⚠️ |
| H1 | Har sahifada aynan 1 ta ✅ |
| canonical | Hammasida bor va oʻz URL'iga ishora qiladi ✅ |
| hreflang | `uz`, `uz-Cyrl`, `ru`, `en`, `x-default` — hammasida ✅ (blog uchun mazmun nomuvofiq, pastga qarang) |
| og:title / og:description / og:image | Bor, sahifaga xos ✅ |
| `og:url` | **Hech qayerda yoʻq** ❌ |
| `og:locale` | `ru`, `uz`, `uz-Cyrl` — formati `ru_RU`, `uz_UZ` boʻlishi kerak ⚠️ |
| `og:type` | Hammasida `website`, blog maqolalarida `article` boʻlishi kerak ⚠️ |
| Twitter card | `summary_large_image` ✅ |
| og:image | Barcha sahifalarda bitta `og-image.png` (1200×630, 81 KB) ⚠️ |
| Takroriy title | **8 ta blog maqolasi** `uz`, `ru` va `en` da aynan bir xil title bilan chiqadi ❌ |

**60 belgidan uzun title'lar:**

| URL | Uzunlik |
|---|---|
| `/xizmatlar/tergovga-qadar` | 63 |
| `/xizmatlar/sudda-vakillik` | 63 |
| `/kr/xizmatlar/sudda-vakillik` | 61 |
| `/ru/xizmatlar/sudda-vakillik` | 62 |
| `/xizmatlar/oila-va-meros` | 61 |
| `/ru/xizmatlar/oila-va-meros` | 64 |
| `/xizmatlar/tadbirkor-himoyasi`, `/xizmatlar/shartnomalar`, `/blog/gumon-qilinuvchining-huquqlari` | 60 (chegarada) |

**Kalit soʻz nuqtai nazaridan:**
- Bosh sahifa title'i: `MAXLEGAL AND JUSTICE — advokatlik byurosi, Farg'ona`. Asosiy soʻrov «advokat Fargʻona» boshida emas. Taklif: «Advokat Fargʻona — Nasrdinov Toʻlanboy | MAXLEGAL AND JUSTICE».
- Bosh sahifa H1: «Fargʻona viloyatida jinoiy va maʼmuriy ishlar boʻyicha advokat» — yaxshi, lekin «Fargʻona shahri» soʻzi yoʻq.
- Brend qoʻshimchasi bir xil emas: ba'zi sahifalarda `| MAXLEGAL`, ba'zilarida `| MAXLEGAL advokatlik byurosi`, `| MAXLEGAL AND JUSTICE`.
- `/advokat-haqida` H1 faqat ism («Nasrdinov Toʻlanboy Baxtiyor oʻgʻli»), «advokat» soʻzi yoʻq.

**Asosiy sahifalarning H1–H3 tuzilmasi** (uz):

<details><summary>Bosh sahifa</summary>

- H1: Fargʻona viloyatida jinoiy va maʼmuriy ishlar boʻyicha advokat
- H2: Sizga qanday holatda yordam bera olaman
- H2: Nima uchun menga ishonishingiz mumkin
- H2: Keyin nima boʻladi → H3 ×3 (qadamlar)
- H2: Advokat haqida qisqacha
- H2: Soʻnggi maqolalar → H3 ×3 (maqolalar)
- H2: Manzil va bogʻlanish
- H2: Murojaat yuboring
- H3: Xizmatlar, Bogʻlanish (footer)
</details>

<details><summary>Xizmat sahifasi (/xizmatlar/jinoiy-ishlar)</summary>

- H1: Jinoiy ishlar boʻyicha advokat — Fargʻona
- H2: Bu holatda nima qilish kerak / Men qanday yordam beraman / Jarayon bosqichlari / Ushbu yoʻnalish boʻyicha savol-javob / Vaziyatingizni muhokama qilaylik
- Yetishmaydi: «Kerakli hujjatlar», «Tergovchilik tajribasining afzalligi», ichki havolalar boʻlimi
</details>

<details><summary>Advokat haqida</summary>

- H1: Nasrdinov Toʻlanboy Baxtiyor oʻgʻli
- H2: Taʼlim / Tergov organlaridagi tajriba / Advokatlik faoliyati / MAXLEGAL AND JUSTICE va IMPERIUM LEGAL SOLUTIONS haqida / Ilmiy faoliyat / Ixtisoslashuv yoʻnalishlari / Nega men himoya bilan shugʻullanaman / Vaziyatingizni muhokama qilishga tayyorman
</details>

<details><summary>Blog maqolasi</summary>

- H1: savol shaklidagi sarlavha
- H2: raqamlangan qadamlar
- Yetishmaydi: mundarija, FAQ, muallif bloki, oʻqish vaqti
</details>

**Matn hajmi** (header/footer siz, taxminiy soʻz soni):

| Sahifa turi | Soʻz | Maqsad |
|---|---|---|
| Xizmat sahifalari | 410–650 (uz) | 700–1200 ⚠️ |
| Blog maqolalari | 280–365 | 1000–1500 ❌ |
| Bosh sahifa | ~300 | — |
| Narxlar | ~76 | juda kam ⚠️ |

---

## 3. sitemap.xml, robots.txt, hreflang, 404, HTTPS va www

| Narsa | Holat |
|---|---|
| `sitemap.xml` | ✅ Avtomatik (`app/sitemap.ts`), 112 URL, har birida `xhtml:link` hreflang alternativlari |
| sitemap `lastmod` | ⚠️ Hamma URL'da build vaqti — haqiqiy oʻzgarish sanasi emas (blogda `updatedAt` bor, ishlatilmaydi) |
| `robots.txt` | ✅ `User-Agent: * Allow: / Disallow: /api/` + sitemap havolasi. AI botlar (GPTBot, PerplexityBot va b.) `*` orqali ruxsat olgan, alohida koʻrsatilmagan |
| hreflang | ✅ Sahifa `<head>` ida ham, sitemap'da ham. `kr` → `uz-Cyrl` toʻgʻri |
| hreflang × mazmun | ❌ `/ru/blog/*` va `/en/blog/*` **oʻzbekcha matn** koʻrsatadi, lekin `hreflang="ru"` / `"en"` deb belgilangan. Bosh sahifaning `ru`/`en` versiyalaridagi «Soʻnggi maqolalar» ham oʻzbekcha |
| 404 — mavjud boʻlmagan yoʻl (`/yoq-sahifa`, `/ru/net`) | ❌ Next.js'ning **standart inglizcha** sahifasi («This page could not be found»): dizaynsiz, menyusiz, havolasiz |
| 404 — mavjud boʻlim ichida (`/blog/nope`) | ⚠️ Brendli sahifa, lekin `<title>` bosh sahifaniki, havolalar faqat «Bosh sahifa» va «Qoʻngʻiroq». Xizmatlar va aloqa havolalari yoʻq |
| 404 status kodi | ✅ 404 va `noindex` |
| `/uz/...` → `/...` | ✅ Yoʻnaltiriladi, lekin **307** (vaqtinchalik). 308/301 boʻlishi kerak ⚠️ |
| Oxiridagi `/` | ✅ `/xizmatlar/` → `/xizmatlar` (308) |
| HTTPS, www → asosiy domen | 🔍 Bu kompyuterdan tekshirib boʻlmadi. DNS Vercel'ga ishora qiladi (`216.198.79.x`), lekin `https://maxjustice.uz` ulanishi bu tarmoqdan uzildi, `http://` esa 403 qaytardi. **Vercel → Domains** panelida `maxjustice.uz` va `www.maxjustice.uz` «Valid» ekanini va www → asosiy domen yoʻnaltirilishini tekshiring |

---

## 4. Tezlik xavflari

| Narsa | Holat |
|---|---|
| Render | ✅ Statik HTML. Barcha matn JS siz koʻrinadi |
| Shrift | ✅ `next/font` (Manrope, `display: swap`, latin + kirill), oʻz serverdan, 2 ta woff2 preload |
| CSS | ✅ 1 fayl, ~6.6 KB gzip |
| JS (bosh sahifa) | ⚠️ 10 fayl, **~200 KB gzip**. Sabablari: `Header` toʻliq client komponent, `NextIntlClientProvider` ga **barcha tarjimalar** uzatiladi |
| HTML hajmi | ⚠️ Bosh sahifa 120 KB (gzip 21 KB). Ichida barcha sahifalarning tarjima matnlari bor (masalan, «Advokat haqida» matni bosh sahifa HTML'ida) |
| Rasmlar | ✅ Sahifada faqat logo (`next/image`, width/height bor, WebP). ⚠️ Manba PNG'lar katta: `icon-mark.png` 140 KB, `logo-full.png` 119 KB, `app/icon.png` 140 KB |
| Advokat fotosi | ❌ Hali yoʻq (Hero, AboutPreview, Advokat haqida — gradient placeholder). Foto qoʻshilganda LCP elementi boʻladi, `priority` + `sizes` kerak |
| Xarita | ✅ Google Maps iframe `loading="lazy"` |
| Lighthouse | 🔍 Bu bosqichda oʻlchanmadi. 2-bosqich boshida «oldin» koʻrsatkichi sifatida mobil Lighthouse oʻlchanadi |

---

## 5. Mobil moslik va accessibility

| Narsa | Holat |
|---|---|
| Viewport meta | ✅ |
| Gorizontal scroll (375 px) | ✅ Yoʻq |
| Pastki yopishqoq panel | ✅ Mobil'da «Telegram» va «Qoʻngʻiroq» (56 px balandlik), `lg` dan yashirinadi |
| `<html lang>` | ✅ `uz`, `uz-Cyrl`, `ru`, `en` |
| Forma | ✅ Har maydonda `<label>`, `aria-invalid`, `type="tel"` |
| Logo `alt=""` | ⚠️ Yonida matnli brend bor, shuning uchun dekorativ sifatida qabul qilsa boʻladi |
| Kichik tugmalar (<44 px) | ⚠️ 19 ta: til taklifi bannerining «×» tugmasi (16×16), footer havolalari (~19 px balandlik), kontakt sektsiyasidagi telefon/email havolalari (28 px), consent checkbox (20×20) |
| Kontrast | ✅ Asosiy matn `#5b6675` oq fonda ≈ 5.9:1. 🔍 Footer'dagi `text-white/50` kichik matnlarni avtomatik vosita bilan tekshirish kerak |
| Header (375 px) | 🔍 Skrinshotda menyu tugmasi oʻng chetga juda yaqin koʻrindi. Haqiqiy telefonda tekshirish kerak |

---

## 6. Strukturali maʼlumot (JSON-LD)

| Sahifa | Hozir bor | Yetishmaydi |
|---|---|---|
| Barcha sahifalar | `LegalService` (layout'dan, har sahifada) | — |
| Bosh sahifa | `LegalService` | `Organization`, `WebSite`, `sameAs` |
| Xizmat sahifalari | `LegalService` + `FAQPage` + `BreadcrumbList` | `Service` |
| Advokat haqida | `LegalService` + `BreadcrumbList` | **`Person`** (alumniOf, knowsAbout, hasCredential, worksFor) |
| Savol-javob | `FAQPage` + `BreadcrumbList` | — |
| Blog maqolasi | `Article` + `BreadcrumbList` | `BlogPosting` (author → Person havola bilan), `FAQPage` |
| Boshqa sahifalar | `BreadcrumbList` | — |

**`LegalService` tafsilotlari:**
- ✅ name, address, geo, telephone, email, taxID, hasCredential, founder (Person), areaServed, openingHoursSpecification, priceRange, image
- ⚠️ `openingHours` 24/7 deb belgilangan — CLAUDE.md da ish vaqti hali tasdiqlanmagan
- ⚠️ `geo` taxminiy (shahar markazi), bino koordinatasi emas
- ⚠️ `areaServed` faqat viloyat, «Fargʻona shahri» alohida koʻrsatilmagan
- ❌ `sameAs` yoʻq — `site-config` da ijtimoiy tarmoq havolalari umuman yoʻq (Instagram, Facebook, Telegram kanal, Google Business profili)
- ❌ **`aggregateRating` (5.0, 7 sharh)** saytning oʻzida koʻrsatilmagan Google sharhlariga asoslangan. Google qoidalariga koʻra LocalBusiness/Organization uchun «self-serving» reytinglar rich result bermaydi va qoʻlda chora (manual action) xavfi bor. Olib tashlash yoki sharhlar blokiga koʻchirish kerak
- ⚠️ `image` — logo/OG rasm, ofis yoki advokat fotosi emas
- ⚠️ `LegalService` har sahifada takrorlanadi. Ruxsat etilgan, lekin `@id` bilan bitta tugun qilib, boshqa schema'lardan havola qilish toza boʻladi

---

## 7. NAP izchilligi

Yagona manba `lib/site-config.ts` mavjud va komponentlar undan foydalanadi ✅. Lekin config'dan tashqarida **qoʻlda yozilgan** joylar ham bor:

| Joy | Muammo |
|---|---|
| `messages/{uz,ru,en}.json` — `meta.defaultDescription` va 6–7 ta sahifa `metaDescription` | Telefon `+998 77 018 14 02` va manzil «S. Temur 43» matn ichida qoʻlda yozilgan ⚠️ |
| `messages/*.json` — `home.hero.callButton` | Telefon qoʻlda ⚠️ |
| `content/services/*/*.ts` — `metaDescription` | Telefon va manzil qoʻlda ⚠️ |
| `content/blog/uz/*.ts` — `metaDescription` | Telefon qoʻlda ⚠️ |
| `public/llms.txt` | ❌ **Telegram `@maxjustice_uz`** deb yozilgan — haqiqiysi `@Maxjusticebot`. Fayl statik, config'dan olinmaydi |
| Manzil shakli | «Fargʻona shahri, S. Temur koʻchasi, 43-uy» (footer) · «S. Temur 43» (meta) · «S. Temur koʻchasi 43» (llms.txt) — har xil yozilgan ⚠️ |
| Google Business profili | ⚠️ `site-config` izohiga koʻra profilda boshqa raqam (`90 300 94 06`) va «Адвокатура» nomi. Profilni yangilash kerak (qoʻlda) |
| Ish vaqti | ⚠️ Sayt: «har kuni, 24/7». Tasdiqlanmagan |
| Imlo | ⚠️ Barcha oʻzbekcha matnlarda oddiy apostrof (`'`), ʻ (U+02BB) va ʼ (U+02BC) emas. Transliterator ikkala belgini ham qabul qiladi, shuning uchun almashtirish xavfsiz |

---

## 8. Konversiya elementlari

| Element | Holat |
|---|---|
| `tel:` havola | ✅ Header, Hero, footer, kontakt bloki, mobil panel, 404 |
| Telegram tugmasi | ✅ Hero, footer, mobil panel → `t.me/Maxjusticebot` |
| Mobil pastki panel | ✅ Qoʻngʻiroq + Telegram |
| Xarita | ✅ Google embed + Google/Yandex havolalari. ⚠️ «Moʻljal» (orientir) matni yoʻq |
| Forma | ✅ Ism, telefon, xabar, rozilik → Telegram. Bosh sahifa, aloqa va narxlar sahifalarida |
| Konversiya hodisalari | ✅ `phone_click`, `telegram_click`, `form_submit` → GA4 + Yandex `reachGoal`. 🔍 Vercel'da GA/Metrika ID'lari sozlanganini tekshirish kerak |
| Sharhlar bloki | ❌ Yoʻq (faqat schema'dagi reyting raqami) |
| Advokat fotosi | ❌ Placeholder — ishonch uchun muhim |
| Advokatlik staji | ⚠️ `advocateYears: "TODO"` — ishonch blokida raqamsiz chiqadi |
| «15 daqiqada javob beramiz» | 🔍 4 ta joyda vaʼda qilingan — real ekanini tasdiqlang |
| «Birinchi konsultatsiya bepul» | 🔍 `en.json`/`ru.json` da bor — haqiqatda shundaymi? |

**Odob qoidalari boʻyicha topilmalar:**
- ⚠️ `content/services/uz/tergovga-qadar.ts:62` va uning `ru` tarjimasi: advokat ishtiroki «huquqlaringiz toʻliq taʼminlanishini **kafolatlaydi**» / «**гарантирует** полное соблюдение». Natija kafolatiga oʻxshaydi, yumshatish kerak
- ❌ Xizmat va blog matnlarining oxirida majburiy ogohlantirish («Bu umumiy maʼlumot, yuridik maslahat oʻrnini bosmaydi...») **yoʻq**. Faqat footer'da qisqa versiyasi bor
- ✅ «Eng yaxshi», «№1», «100%» kabi daʼvolar topilmadi

---

## 9. Kontent boʻshliqlari

**CLAUDE.md dagi 8 ta xizmat bilan solishtirish:**

| # | Talab qilingan xizmat | Hozirgi sahifa | Holat |
|---|---|---|---|
| 1 | Jinoyat ishlari (tergov va sud) | `jinoiy-ishlar`, `tergovga-qadar`, `iqtisodiy-jinoyatlar`, `sudda-vakillik` | ✅ |
| 2 | Oilaviy nizolar (ajrashish, aliment, bola) | `oila-va-meros` (meros bilan birga) | ⚠️ Alohida sahifa kerak |
| 3 | Meros ishlari | `oila-va-meros` (oila bilan birga) | ⚠️ Alohida sahifa kerak |
| 4 | Mehnat nizolari | `mehnat-nizolari` | ✅ (matn qisqa) |
| 5 | Fuqarolik nizolari (qarz, shartnoma, zarar) | `fuqarolik-ishlari`, `shartnomalar` | ✅ (qarz undirish chuqurroq ochilishi mumkin) |
| 6 | Iqtisodiy (xoʻjalik) nizolar va biznesga yordam | `tadbirkor-himoyasi` (asosan jinoiy himoya), `shartnomalar` | ⚠️ Iqtisodiy sudda nizolar boʻyicha sahifa yoʻq |
| 7 | Maʼmuriy ishlar | `mamuriy-ishlar` | ✅ |
| 8 | Huquqiy konsultatsiya | — | ❌ Yoʻq |

**Boshqa boʻshliqlar:**
- Xizmat sahifalarida «Kerakli hujjatlar» boʻlimi, «tergovchilik tajribasi afzalligi» bloki, bogʻliq blog maqolalariga havolalar yoʻq
- **Blog:** 8 ta maqola, faqat oʻzbekcha (har biri 280–365 soʻz). `ru`/`en` versiyalari yoʻq. Kategoriya, teg, FAQ, mundarija, RSS, sahifalash, muallif bloki yoʻq. Mavzular asosan jinoyat va tergov — oila, meros, mehnat, qarz boʻyicha bitta ham yoʻq
- `kr` versiyasi avtomatik — sifatini ona tili kirill boʻlgan odam tekshirishi kerak
- `narxlar` sahifasida ~76 soʻz

---

## Muammolar jadvali

| # | Muhimlik | Muammo | Joy | Bosqich |
|---|---|---|---|---|
| 1 | **Kritik** | 🔍 Jonli domen (HTTPS, www yoʻnaltirish) bu yerdan tasdiqlanmadi | Vercel Domains | qoʻlda |
| 2 | **Kritik** | `ru`/`en` blog sahifalari oʻzbekcha matnni `ru`/`en` hreflang bilan beradi (takroriy kontent, notoʻgʻri til signali) | `content/blog/index.ts` | 2 |
| 3 | **Kritik** | Mavjud boʻlmagan URL'larda Next.js'ning standart inglizcha 404 sahifasi | `app/` (root not-found yoʻq) | 2 |
| 4 | **Kritik** | `aggregateRating` saytda koʻrinmaydigan sharhlarga asoslangan (Google siyosatiga zid) | `lib/schema.ts` | 3 |
| 5 | **Yuqori** | `llms.txt` da notoʻgʻri Telegram (`@maxjustice_uz`) | `public/llms.txt` | 2 / 6 |
| 6 | **Yuqori** | Telefon/manzil meta matnlarda qoʻlda yozilgan (NAP bitta manbadan olinmaydi) | `messages/*.json`, `content/**` | 2 |
| 7 | **Yuqori** | Bosh sahifa title'ida asosiy kalit soʻz yoʻq. 9 ta title 60 belgidan uzun. Brend qoʻshimchasi turlicha | metadata | 2 |
| 8 | **Yuqori** | Har sahifa HTML'ida barcha tarjimalar + ~200 KB JS | `app/[locale]/layout.tsx`, `Header.tsx` | 2 |
| 9 | **Yuqori** | `Person` schema yoʻq. `Organization`, `WebSite`, `Service`, `BlogPosting` yoʻq. `sameAs` yoʻq | `lib/schema.ts` | 3 |
| 10 | **Yuqori** | Xizmatlar va blogda majburiy huquqiy ogohlantirish yoʻq. `tergovga-qadar` da «kafolatlaydi» | `content/**` | 4 |
| 11 | **Yuqori** | Alohida sahifalar yoʻq: oila, meros, iqtisodiy nizolar, huquqiy konsultatsiya | `content/services` | 4 |
| 12 | **Yuqori** | Advokat fotosi yoʻq (ishonch + `Person.image`) | Hero, About | 5 (foto kerak) |
| 13 | **Oʻrta** | `og:url` yoʻq, `og:locale` formati notoʻgʻri, maqolalarda `og:type=article` emas | metadata | 2 |
| 14 | **Oʻrta** | `/uz/*` → `/*` 307 (vaqtinchalik) | `proxy.ts` | 2 |
| 15 | **Oʻrta** | Sitemap `lastmod` = build vaqti | `app/sitemap.ts` | 2 |
| 16 | **Oʻrta** | Manba PNG'lar katta (140 KB) | `public/brand`, `app/icon.png` | 2 |
| 17 | **Oʻrta** | Kichik bosiladigan elementlar (<44 px) | Banner, footer, kontakt | 2 |
| 18 | **Oʻrta** | Oddiy apostrof `'` → ʻ / ʼ | Barcha uz matnlar | alohida |
| 19 | **Oʻrta** | Xizmat matnlari 410–650 soʻz, blog 280–365 soʻz | `content/**` | 4 / B3 |
| 20 | **Oʻrta** | Ish vaqti, litsenziya sanasi, advokatlik staji tasdiqlanmagan | `site-config`, CLAUDE.md | mijozdan |
| 21 | **Oʻrta** | Sharhlar bloki, «moʻljal» matni, ijtimoiy tarmoq havolalari yoʻq | — | 5 |
| 22 | **Oʻrta** | Google Business profilidagi telefon va nom saytdagidan farq qiladi | Google Business | qoʻlda |

---

## Keyingi bosqichlar rejasi (taklif)

Asl rejadagi bosqichlarni saqlaymiz, lekin mavjud kodni hisobga olib qisqartiramiz.

**Qoʻlda (siz):**
- Vercel → Domains: `maxjustice.uz` va `www` holati
- Ish vaqti, litsenziya sanasi, advokatlik stajini tasdiqlash
- Ijtimoiy tarmoq havolalarini yuborish
- Google Business profilidagi telefon va nomni yangilash
- Advokat fotosi
- Vercel'da GA4 / Yandex Metrika ID'lari

**2-bosqich — Texnik SEO** (1–3, 5–8, 13–17-bandlar):
- Boshida mobil Lighthouse «oldin» oʻlchovi
- Root `not-found` + brendli 404 (xizmatlar va aloqa havolalari bilan)
- Blog `ru`/`en` versiyalarini tarjima tayyor boʻlguncha sitemap/hreflang'dan chiqarish va `noindex` qilish, yoki ularni `uz` ga canonical qilish
- Meta matnlardagi telefon/manzilni config'dan qoʻyish, `llms.txt` ni config'dan avtomatik yaratish
- Title qoidalari (≤60 belgi, yagona brend qoʻshimchasi, bosh sahifa namunasi)
- `og:url`, `og:locale`, `og:type=article`
- Har sahifaga faqat kerakli tarjimalarni uzatish, Header'ni server + kichik client qismga ajratish
- `/uz` → 308, real `lastmod`, PNG'larni siqish, tugmalar oʻlchami
- Oxirida Lighthouse «keyin»

**3-bosqich — Schema** (4, 9-bandlar):
- `aggregateRating` ni olib tashlash
- `@id` bilan bogʻlangan `Organization` + `LegalService` + `WebSite`
- «Advokat haqida» sahifasiga `Person`, xizmatlarga `Service`, blogga `BlogPosting` (+ FAQ)
- `sameAs` (havolalar kelgach)
- Rich Results Test uchun URL roʻyxati

**4-bosqich — Xizmat sahifalari** (10, 11, 19-bandlar):
- `oila-va-meros` ni `oilaviy-nizolar` + `meros-ishlari` ga ajratish (eski URL'dan 301)
- Yangi sahifalar: `iqtisodiy-nizolar`, `huquqiy-konsultatsiya`
- Mavjud sahifalarni 700+ soʻzgacha kengaytirish, hujjatlar va ogohlantirish boʻlimlari bilan
- Har sahifa uchun matn yozishdan oldin reja

**5-bosqich — Ishonch va konversiya:**
- Advokat haqida (birinchi shaxsda), aloqa sahifasida moʻljal
- Sharhlar komponenti (Google havolasi bilan, soxta sharhlarsiz)
- Footer'da ijtimoiy tarmoqlar
- Pastki panel va analitika allaqachon bor — faqat tekshiruv

**6-bosqich — AI koʻrinishi:**
- `llms.txt` ni (uz + ru) config'dan avtomatik qilish
- robots.txt'da AI botlarni aniq koʻrsatish
- Bosh sahifa va «Advokat haqida» boshiga 2–3 gaplik taʼrif
- SSR allaqachon ✅

**Blog B1–B3:**
- Mavjud TS kontent tizimi saqlanadi yoki MDX'ga oʻtiladi — B1 boshida kelishamiz
- Kategoriyalar, FAQ, RSS, muallif bloki, `ru` tarjimalar
- `docs/blog-plan.md` (40 mavzu)

**Alohida (kelishilgan vaqtda):** butun saytda `'` → ʻ / ʼ almashtirish.

---

# 2-bosqich natijalari — Texnik SEO

**Sana:** 2026-11-17 · **Holat:** bajarildi, commit qilinmagan

## Nima oʻzgardi

| # | Audit bandi | Nima qilindi | Asosiy fayllar |
|---|---|---|---|
| 3 | 404 sahifa | Har qanday notoʻgʻri URL endi tilga mos, brendli 404 sahifani koʻrsatadi. Sahifada: «404 — …» title, qoʻngʻiroq va Telegram tugmalari, xizmatlar roʻyxati, bosh sahifa va aloqa havolalari. Status 404 + `noindex`. `[locale]` ga umuman tushmaydigan URL'lar (masalan, `/eski.php`) uchun uz/ru zaxira sahifa | `app/[locale]/[...rest]/page.tsx`, `app/[locale]/not-found.tsx`, `app/global-not-found.tsx`, `lib/not-found-metadata.ts`, `next.config.ts` |
| 2 | Blog ru/en | `/ru/blog*` va `/en/blog*` — `noindex, follow`, sitemap'dan chiqarildi. Maqolalar hreflang'ida faqat `uz`, `uz-Cyrl`, `x-default` qoldi. ru/en sahifalarida «Статьи пока доступны только на узбекском…» izohi. Bosh sahifa va blog roʻyxatida maqola kartochkasi «На узбекском» belgisi bilan toʻgʻridan-toʻgʻri `/blog/...` (uz) ga havola qiladi | `content/blog/index.ts` (`BLOG_LOCALES`), `app/[locale]/blog/**`, `components/sections/ArticlesPreview.tsx`, `components/blog/ArticleLink.tsx`, `lib/routes.ts`, `app/sitemap.ts` |
| 7 | Title | Yagona qoida (`brandTitle`): sigʻsa `| MAXLEGAL AND JUSTICE`, aks holda `| MAXLEGAL`. **Title 60 belgidan yoki description 155 belgidan oshsa, build xato beradi.** Bosh sahifa: «Advokat Fargʻona: Nasrdinov Toʻlanboy \| MAXLEGAL AND JUSTICE» (60). 9 ta uzun title qisqartirildi, takroriy title'lar qolmadi | `lib/seo.ts`, `messages/*.json`, `content/**` |
| 5, 6 | NAP | Meta matnlardagi telefon va manzil oʻrniga `{phone}` / `{address}` yozildi. Ular `site-config.ts` dan avtomatik toʻldiriladi (kirill uchun transliteratsiyadan oldin). `public/llms.txt` oʻchirildi, oʻrniga config'dan yaratiladigan `/llms.txt` qoʻshildi (Telegram endi toʻgʻri: `@Maxjusticebot`) | `lib/nap.ts`, `i18n/request.ts`, `content/*/index.ts`, `app/llms.txt/route.ts`, `lib/site-config.ts` |
| 13 | Open Graph | Har sahifada `og:url`, `og:locale` (`uz_UZ`/`ru_RU`/`en_US`) + `og:locale:alternate`. Blogda `og:type=article`, `article:published_time` va `article:author`. Twitter title/description. Barchasi bitta `buildPageMetadata()` orqali | `lib/seo.ts`, barcha `page.tsx` |
| 8 | Tezlik | HTML'ga endi faqat client komponentlar ishlatadigan tarjimalar uzatiladi (`nav`, `cta`, `common`, `langSwitcher`, `form`). Bosh sahifa HTML 120 → 107 KB, boshqa sahifalarning matnlari endi yoʻq | `app/[locale]/layout.tsx` |
| 16 | Rasmlar | PNG'lar oʻlchami oʻzgarmagan holda siqildi: `icon.png` 140 → 36 KB, `og-image.png` 81 → 17 KB, `logo-full.png` 119 → 37 KB, `icon-mark*.png` ~145 → ~37 KB | `app/*.png`, `public/**/*.png` |
| 14 | `/uz` yoʻnaltirish | 307 → **308** (doimiy) | `proxy.ts` |
| 15 | Sitemap lastmod | Build vaqti oʻrniga haqiqiy sana: blog — maqoladagi `updatedAt/publishedAt`, qolganlari — `lib/routes.ts` dagi `CONTENT_UPDATED_AT` | `app/sitemap.ts`, `lib/routes.ts` |
| 17 | Accessibility | Bosh sahifadagi oltin rangli kichik matn kontrasti 3.7:1 → ~4.9:1 (`--color-gold-600` biroz toʻqlashdi). Banner'dagi «×» 16 → 44 px. Kontakt blokidagi telefon/email 44 px. Footer havolalari ≥32 px. Consent qatori 44 px | `app/globals.css`, `components/**` |
| — | Boshqa | `foydalanish-shartlari` description'lari kengaytirildi | `messages/*.json` |

## Lighthouse (mobil, lokal production build)

Birinchi «oldin» oʻlchovi va keyingi oʻlchovlar turli kompyuter yuklamasida olingan. Shuning uchun eski va yangi build **bir vaqtda, navbatma-navbat**, 3 martadan qayta oʻlchandi. Jadvalda medianalar:

| Sahifa | Versiya | Performance | LCP | TBT | CLS |
|---|---|---|---|---|---|
| Bosh sahifa | oldin | 94 | 2.8 s | 150 ms | 0.054 |
| Bosh sahifa | keyin | 92 | 2.8 s | 210 ms | **0** |
| Xizmat sahifasi | oldin | 86 | 2.8 s | 400 ms | 0 |
| Xizmat sahifasi | keyin | 92 | 2.8 s | 220 ms | 0 |

Toʻrt sahifaning bir martalik toʻliq oʻlchovi (keyin): Accessibility **100** (oldin bosh sahifada 96), Best Practices 100, SEO 92.

**Xulosa:**
- Tezlik **oʻzgarmadi**: farqlar oʻlchov tebranishi doirasida, regressiya yoʻq.
- Bosh sahifada CLS 0.054 → 0 boʻldi.
- **LCP < 2.5 s maqsadiga yetilmadi**: bu kompyuterda ikkala versiyada ham ~2.8 s. LCP elementi — H1 matni, vaqtning ~80% «render delay» (shrift + JS gidratsiyasi). Bu keyingi ish uchun ochiq qoldi.
- Lighthouse'dagi SEO 92 faqat `canonical` auditidan: lokal `localhost` sahifasi `maxjustice.uz` ga canonical qiladi. Jonli domenda bu xato boʻlmaydi.

## Rejadan farqlar

- **Header'ni server + client qismlarga ajratish qilinmadi.** Oʻlchov bu oʻzgarish deyarli foyda bermasligini koʻrsatdi: Lighthouse «ishlatilmagan JS» ni butun sahifa uchun ~28 KB deb baholadi, asosiy hajm React/Next runtime. Xavfi esa yuqori. LCP ustidagi ishda (shrift preload, H1 render delay) qayta koʻrib chiqiladi.
- **Footer havolalari 44 px emas, ≥32 px** qilindi. 44 px footer balandligini deyarli ikki barobar oshirardi. 32 px WCAG 2.2 AA talabidan (24 px) yuqori.
- **Consent checkbox'ning oʻzi 20×20 px.** Lekin uni oʻrab turgan label (bosiladigan maydon) endi 44 px balandlikda.
- **`--color-gold-600` rangi biroz toʻqlashdi** (#a9760f → #8f6410). Kontrast uchun shart edi. Ikonka va kichik sarlavhalarda sezilarli emas, lekin dizayn tokeni oʻzgargan.

## Yangi topilgan muammolar (tuzatilmagan)

- Rus/ingliz sahifalarida kontakt blokidagi manzil **oʻzbekcha** chiqadi («Farg'ona shahri, S. Temur ko'chasi, 43-uy»). `site-config` da `address.display` faqat uz tilida. 3- yoki 5-bosqichda tuzatiladi.
- 375 px ekranda rus tilidagi mobil pastki panelda «Позвонить прямо сейчас» matni sigʻmay, kesilib qoladi. 5-bosqichda tuzatiladi.
- Rus/ingliz blog sahifalari uchun B3 bosqichida rus tarjimalari yozilgach, `BLOG_LOCALES` ga `"ru"` qoʻshish kifoya: sitemap, hreflang va indeksatsiya avtomatik yoqiladi.

## Qoʻlda tekshirish kerak (deploy'dan keyin)

1. `https://maxjustice.uz/yoq-sahifa` va `/ru/net` — brendli 404 chiqishi, brauzer tab'ida «404 — …» title.
2. `https://maxjustice.uz/uz/xizmatlar` → `/xizmatlar` ga **308** bilan oʻtishi.
3. `https://maxjustice.uz/llms.txt` — toʻgʻri telefon va Telegram.
4. `https://maxjustice.uz/sitemap.xml` — 94 URL, `/ru/blog` yoʻq.
5. Google Search Console → URL Inspection: `/ru/blog/tintuv-paytida-huquqlar` «Excluded by noindex» boʻlishi kerak (bu kutilgan holat).
6. Telegram yoki Facebook'da sahifa havolasini ulashib, OG preview'ni koʻrish.
7. Favicon va logo siqilgandan keyin ham toza koʻrinishini tekshirish.
