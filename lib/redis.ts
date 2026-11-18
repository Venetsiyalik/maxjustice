/**
 * Upstash Redis REST mijozi (qo'shimcha paketsiz).
 *
 * Vercel Marketplace orqali Upstash ulanganda KV_REST_API_URL va
 * KV_REST_API_TOKEN (yoki UPSTASH_REDIS_REST_URL / _TOKEN) avtomatik
 * qo'shiladi. Sozlanmagan bo'lsa `isRedisConfigured()` false qaytaradi.
 */
type RedisArg = string | number;

function getConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function isRedisConfigured(): boolean {
  return getConfig() !== null;
}

/** Bir nechta buyruqni bitta so'rovda bajaradi; har birining natijasini qaytaradi. */
export async function redisPipeline(commands: RedisArg[][]): Promise<unknown[]> {
  const config = getConfig();
  if (!config) throw new Error("Redis sozlanmagan (KV_REST_API_URL / KV_REST_API_TOKEN)");

  const res = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis xatosi: ${res.status}`);

  const results = (await res.json()) as { result?: unknown; error?: string }[];
  return results.map((r) => {
    if (r.error) throw new Error(`Redis xatosi: ${r.error}`);
    return r.result;
  });
}

export async function redis(...command: RedisArg[]): Promise<unknown> {
  const [result] = await redisPipeline([command]);
  return result;
}
