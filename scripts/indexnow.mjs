#!/usr/bin/env node
/**
 * IndexNow — Bing va Yandex'ga yangi/o'zgargan sahifalar haqida xabar berish.
 * (Google IndexNow'ni qo'llamaydi — u uchun sitemap va Search Console.)
 *
 * Ishlashi:
 *   1. Jonli saytning sitemap.xml faylini o'qiydi.
 *   2. `--since=YYYY-MM-DD` dan keyin o'zgargan (lastmod) URL'larni tanlaydi
 *      yoki `--all` bo'lsa — hammasini.
 *   3. Ularni api.indexnow.org ga yuboradi (Bing, Yandex va boshqalarga
 *      tarqatiladi).
 *
 * Kalit: public/<32 hex>.txt — fayl nomi va mazmuni bir xil. U saytda
 * https://maxjustice.uz/<kalit>.txt manzilida ochilib turishi shart.
 *
 * Avtomatik: .github/workflows/indexnow.yml har muvaffaqiyatli Vercel
 * Production deploy'idan keyin ishga tushiradi.
 *
 * Qo'lda:
 *   node scripts/indexnow.mjs --since=2026-11-17 [--dry-run]
 *   node scripts/indexnow.mjs --all [--dry-run]
 *
 * MUHIM: sahifa matni o'zgarganda sitemap `lastmod` ham yangilanishi kerak
 * (lib/routes.ts → CONTENT_UPDATED_AT, blogda — updatedAt), aks holda
 * o'zgarish bu yerda "yangi" deb ko'rilmaydi.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = process.env.SITE_URL ?? "https://maxjustice.uz";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const keyFile = fs.readdirSync(path.join(root, "public")).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("IndexNow kalit fayli topilmadi (public/<32 hex>.txt)");
  process.exit(1);
}
const key = keyFile.replace(".txt", "");

if (!args.all && !(typeof args.since === "string" && /^\d{4}-\d{2}-\d{2}$/.test(args.since))) {
  console.error("Foydalanish: --since=YYYY-MM-DD yoki --all  [--dry-run]");
  process.exit(1);
}

const res = await fetch(`${SITE_URL}/sitemap.xml`);
if (!res.ok) {
  console.error(`sitemap.xml olinmadi: HTTP ${res.status}`);
  process.exit(1);
}
const xml = await res.text();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: (m[1].match(/<loc>([^<]+)<\/loc>/) ?? [])[1],
  lastmod: ((m[1].match(/<lastmod>([^<]+)<\/lastmod>/) ?? [])[1] ?? "").slice(0, 10),
}));

const urls = entries
  .filter((e) => e.loc && (args.all || e.lastmod >= args.since))
  .map((e) => e.loc);

console.log(`Sitemap: ${entries.length} URL, yuboriladi: ${urls.length}${args.all ? " (--all)" : ` (lastmod >= ${args.since})`}`);
if (urls.length === 0) {
  console.log("Yangi o'zgarish yo'q — hech narsa yuborilmadi.");
  process.exit(0);
}
urls.slice(0, 5).forEach((u) => console.log("  " + u));
if (urls.length > 5) console.log(`  ... va yana ${urls.length - 5} ta`);

if (args["dry-run"]) {
  console.log("--dry-run: yuborilmadi.");
  process.exit(0);
}

const host = new URL(SITE_URL).host;
const submit = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${SITE_URL}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow javobi: HTTP ${submit.status} ${submit.statusText}`);
// 200 — qabul qilindi; 202 — qabul qilindi, kalit hali tekshirilmoqda
if (submit.status !== 200 && submit.status !== 202) {
  console.error(await submit.text());
  process.exit(1);
}
