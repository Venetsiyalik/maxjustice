#!/usr/bin/env node
/**
 * schema.org JSON-LD tekshiruvi. Ishlab turgan sayt (lokal `next start` yoki
 * jonli domen) sitemap'idagi har bir URL'ni ochib, JSON-LD bloklarini
 * tekshiradi:
 *   - JSON to'g'ri tahlil qilinadimi
 *   - `{ "@id": ... }` havolalari shu sahifadagi tugunga mos keladimi
 *   - Google talab qiladigan asosiy maydonlar bormi
 *   - taqiqlangan narsalar yo'qmi (aggregateRating, to'ldirilmagan {phone})
 *
 * Ishlatish:
 *   npm run build && npx next start -p 3100
 *   SITE_URL=http://localhost:3100 npm run check:schema
 */
const BASE = process.env.SITE_URL ?? "http://localhost:3000";
const CANONICAL = "https://maxjustice.uz";

const REQUIRED = {
  LegalService: ["name", "address", "telephone", "url"],
  WebSite: ["name", "url"],
  Person: ["name"],
  ProfilePage: ["mainEntity"],
  Service: ["name", "provider"],
  BlogPosting: ["headline", "datePublished", "author", "image"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
};

function walk(node, visit) {
  if (Array.isArray(node)) return node.forEach((n) => walk(n, visit));
  if (node && typeof node === "object") {
    visit(node);
    Object.values(node).forEach((v) => walk(v, visit));
  }
}

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(CANONICAL, BASE));

const problems = [];
const typeCounts = {};

for (const url of urls) {
  const path = url.replace(BASE, "") || "/";
  const html = await (await fetch(url)).text();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (blocks.length === 0) problems.push(`${path}: JSON-LD yo'q`);

  const defined = new Set();
  const refs = [];
  const nodes = [];

  for (const raw of blocks) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      problems.push(`${path}: JSON xato — ${e.message}`);
      continue;
    }
    if (raw.includes("{phone}") || raw.includes("{address}")) problems.push(`${path}: to'ldirilmagan NAP o'rinbosari`);
    walk(data, (n) => {
      const keys = Object.keys(n);
      if (keys.length === 1 && keys[0] === "@id") refs.push(n["@id"]);
      else if (n["@type"]) {
        nodes.push(n);
        if (n["@id"]) defined.add(n["@id"]);
      }
    });
  }

  for (const n of nodes) {
    const type = n["@type"];
    typeCounts[type] = (typeCounts[type] ?? 0) + 1;
    if ("aggregateRating" in n) problems.push(`${path}: ${type} da aggregateRating bor`);
    for (const field of REQUIRED[type] ?? []) {
      const v = n[field];
      if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) {
        problems.push(`${path}: ${type}.${field} yo'q`);
      }
    }
    if (type === "Question" && !n.acceptedAnswer?.text) problems.push(`${path}: Question javobsiz`);
  }

  for (const ref of refs) {
    if (!defined.has(ref)) problems.push(`${path}: @id havolasi topilmadi — ${ref}`);
  }
}

console.log(`Tekshirildi: ${urls.length} URL`);
console.log("Turlar:", Object.entries(typeCounts).map(([t, c]) => `${t}×${c}`).join(", "));
if (problems.length) {
  console.log(`\n${problems.length} ta muammo:`);
  problems.forEach((p) => console.log(" - " + p));
  process.exit(1);
}
console.log("Muammo topilmadi ✓");
