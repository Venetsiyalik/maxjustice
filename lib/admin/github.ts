/**
 * Admin panel o'zgarishlarini GitHub'ga commit qiladi — Vercel shu commit'dan
 * saytni qayta yig'adi (1–2 daqiqa), IndexNow workflow esa yangilangan
 * sahifalarni Bing/Yandex'ga yuboradi.
 *
 * Muhit o'zgaruvchilari:
 *   GITHUB_TOKEN  — fine-grained token, faqat shu repo, Contents: Read and write
 *   GITHUB_REPO   — "owner/name" (standart: Venetsiyalik/maxjustice)
 *   GITHUB_BRANCH — standart: master
 *
 * Token yo'q va lokal `next dev` bo'lsa — fayl diskka yoziladi (sinov uchun).
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const REPO = process.env.GITHUB_REPO ?? "Venetsiyalik/maxjustice";
const BRANCH = process.env.GITHUB_BRANCH ?? "master";

export function isGitHubConfigured(): boolean {
  return Boolean(process.env.GITHUB_TOKEN);
}

function canWriteLocally(): boolean {
  return process.env.NODE_ENV === "development";
}

export function canSaveContent(): boolean {
  return isGitHubConfigured() || canWriteLocally();
}

/** Lokal rejimda yozish mumkin bo'lgan fayllar (statik yo'llar — build tracing uchun). */
function localPath(filePath: string): string {
  switch (filePath) {
    case "content/settings.json":
      return path.join(process.cwd(), "content", "settings.json");
    default:
      throw new Error(`Lokal rejimda ruxsat etilmagan fayl: ${filePath}`);
  }
}

function apiUrl(filePath: string) {
  return `https://api.github.com/repos/${REPO}/contents/${filePath}`;
}

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "maxjustice-admin",
  };
}

/** Fayl matnini o'qiydi: GitHub'dan (eng yangi holat) yoki lokal diskdan. */
export async function readRepoFile(filePath: string): Promise<{ content: string; sha?: string }> {
  if (isGitHubConfigured()) {
    const res = await fetch(`${apiUrl(filePath)}?ref=${BRANCH}`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`GitHub'dan o'qib bo'lmadi: ${res.status}`);
    const data = (await res.json()) as { content: string; sha: string };
    return { content: Buffer.from(data.content, "base64").toString("utf-8"), sha: data.sha };
  }
  return { content: await readFile(localPath(filePath), "utf-8") };
}

/** Faylni yozadi va commit qiladi. */
export async function saveRepoFile(filePath: string, content: string, message: string) {
  if (isGitHubConfigured()) {
    const { sha } = await readRepoFile(filePath);
    const res = await fetch(apiUrl(filePath), {
      method: "PUT",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content: Buffer.from(content, "utf-8").toString("base64"),
        sha,
        branch: BRANCH,
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`GitHub'ga saqlab bo'lmadi: ${res.status} ${await res.text()}`);
    return { mode: "github" as const };
  }
  if (canWriteLocally()) {
    await writeFile(localPath(filePath), content, "utf-8");
    return { mode: "local" as const };
  }
  throw new Error("GITHUB_TOKEN sozlanmagan");
}
