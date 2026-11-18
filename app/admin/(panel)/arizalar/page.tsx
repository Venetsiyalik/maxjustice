import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { isRedisConfigured } from "@/lib/redis";
import { listLeads, type Lead } from "@/lib/leads";
import { removeLead, toggleLeadStatus } from "./actions";
import { ConfirmButton } from "../ConfirmButton";

const dateFormat = new Intl.DateTimeFormat("ru-RU", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Asia/Tashkent",
});

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  await requireAdmin();
  const { filter } = await searchParams;

  if (!isRedisConfigured()) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-900">
        <h1 className="text-xl font-extrabold">Arizalar</h1>
        <p className="mt-2">
          Arizalarni saqlash uchun Redis ulanmagan. Vercel → Storage → Upstash (Redis) ni loyihaga
          ulang — <code>KV_REST_API_URL</code> va <code>KV_REST_API_TOKEN</code> avtomatik qoʻshiladi.
          Shungacha arizalar faqat Telegramʼga boradi.
        </p>
      </div>
    );
  }

  let leads: Lead[] = [];
  let loadError = false;
  try {
    leads = await listLeads();
  } catch (err) {
    console.error("[admin] Arizalarni o'qishda xatolik:", err);
    loadError = true;
  }

  const newCount = leads.filter((l) => l.status === "new").length;
  const shown = filter === "new" ? leads.filter((l) => l.status === "new") : leads;

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-4">
        <h1 className="text-2xl font-extrabold text-[var(--color-navy-950)]">Arizalar</h1>
        <nav className="flex gap-3 text-sm">
          <Link href="/admin/arizalar" className={filter !== "new" ? "font-bold underline" : ""}>
            Hammasi ({leads.length})
          </Link>
          <Link href="/admin/arizalar?filter=new" className={filter === "new" ? "font-bold underline" : ""}>
            Yangi ({newCount})
          </Link>
        </nav>
      </div>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Saytdagi formadan kelgan murojaatlar (oxirgi 200 tasi). Maʼlumotlar maxfiy — advokat siri.
      </p>

      {loadError && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-red-700">
          Arizalarni yuklab boʻlmadi. Birozdan keyin qayta urinib koʻring.
        </p>
      )}

      {!loadError && shown.length === 0 && (
        <p className="mt-8 text-[var(--color-muted)]">Hozircha arizalar yoʻq.</p>
      )}

      <ul className="mt-6 flex flex-col gap-3">
        {shown.map((lead) => (
          <li
            key={lead.id}
            className={`rounded-xl border bg-white p-4 ${
              lead.status === "new" ? "border-[var(--color-gold-500)]" : "border-[var(--color-line)] opacity-75"
            }`}
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-bold text-[var(--color-navy-950)]">{lead.name}</span>
              <a href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`} className="font-semibold text-[var(--color-navy-700)]">
                {lead.phone}
              </a>
              <span className="text-sm text-[var(--color-muted)]">
                {dateFormat.format(new Date(lead.createdAt))} · {lead.locale}
              </span>
              {lead.status === "new" && (
                <span className="rounded-full bg-[var(--color-gold-500)] px-2 py-0.5 text-xs font-bold text-white">
                  yangi
                </span>
              )}
            </div>
            {lead.message && (
              <p className="mt-2 whitespace-pre-wrap text-[var(--color-ink)]">{lead.message}</p>
            )}
            {lead.source && <p className="mt-1 text-xs text-[var(--color-muted)]">Manba: {lead.source}</p>}
            <div className="mt-3 flex gap-2 text-sm">
              <form action={toggleLeadStatus}>
                <input type="hidden" name="id" value={lead.id} />
                <input type="hidden" name="status" value={lead.status === "new" ? "done" : "new"} />
                <button type="submit" className="rounded-md border border-[var(--color-line)] px-3 py-1 hover:bg-[var(--color-surface-alt)]">
                  {lead.status === "new" ? "Koʻrildi deb belgilash" : "Yangi deb belgilash"}
                </button>
              </form>
              <form action={removeLead}>
                <input type="hidden" name="id" value={lead.id} />
                <ConfirmButton message="Ariza butunlay oʻchiriladi. Davom etasizmi?">Oʻchirish</ConfirmButton>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
