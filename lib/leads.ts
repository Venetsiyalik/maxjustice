/**
 * Murojaat formasidan kelgan arizalar — Upstash Redis'da saqlanadi.
 *
 * Diqqat: GitHub repozitoriysi ochiq (public), shuning uchun mijozlarning
 * shaxsiy maʼlumotlari hech qachon git'ga yozilmaydi — faqat shu yerda.
 *
 * Kalitlar: `leads:index` (ZSET, ball = vaqt, aʼzo = id), `lead:<id>` (JSON).
 */
import { randomUUID } from "node:crypto";
import { isRedisConfigured, redis, redisPipeline } from "@/lib/redis";

export type LeadStatus = "new" | "done";

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  message: string;
  source: string;
  locale: string;
  status: LeadStatus;
};

const INDEX_KEY = "leads:index";
const leadKey = (id: string) => `lead:${id}`;

export async function saveLead(
  input: Omit<Lead, "id" | "createdAt" | "status">
): Promise<boolean> {
  if (!isRedisConfigured()) return false;
  const lead: Lead = {
    name: input.name.slice(0, 120),
    phone: input.phone.slice(0, 30),
    message: input.message.slice(0, 3000),
    source: input.source.slice(0, 200),
    locale: input.locale.slice(0, 5),
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  await redisPipeline([
    ["SET", leadKey(lead.id), JSON.stringify(lead)],
    ["ZADD", INDEX_KEY, Date.now(), lead.id],
  ]);
  return true;
}

export async function listLeads(limit = 200): Promise<Lead[]> {
  const ids = (await redis("ZRANGE", INDEX_KEY, 0, limit - 1, "REV")) as string[];
  if (!ids.length) return [];
  const raw = (await redis("MGET", ...ids.map(leadKey))) as (string | null)[];
  return raw.filter((r): r is string => Boolean(r)).map((r) => JSON.parse(r) as Lead);
}

export async function countNewLeads(): Promise<number> {
  const leads = await listLeads();
  return leads.filter((l) => l.status === "new").length;
}

export async function setLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const raw = (await redis("GET", leadKey(id))) as string | null;
  if (!raw) return;
  const lead = { ...(JSON.parse(raw) as Lead), status };
  await redis("SET", leadKey(id), JSON.stringify(lead));
}

export async function deleteLead(id: string): Promise<void> {
  await redisPipeline([
    ["DEL", leadKey(id)],
    ["ZREM", INDEX_KEY, id],
  ]);
}
