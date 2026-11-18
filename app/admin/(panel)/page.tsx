import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { isRedisConfigured } from "@/lib/redis";
import { countNewLeads } from "@/lib/leads";
import { isGitHubConfigured } from "@/lib/admin/github";

export default async function AdminHomePage() {
  await requireAdmin();

  let newLeads: number | null = null;
  if (isRedisConfigured()) {
    try {
      newLeads = await countNewLeads();
    } catch {
      newLeads = null;
    }
  }

  const cards = [
    {
      href: "/admin/arizalar",
      title: "Arizalar",
      text:
        newLeads === null
          ? isRedisConfigured()
            ? "Saytdagi formadan kelgan murojaatlar"
            : "Redis ulanmagan — arizalar faqat Telegram'ga boradi"
          : `Yangi arizalar: ${newLeads}`,
    },
    {
      href: "/admin/sozlamalar",
      title: "Sozlamalar",
      text: "Telefon, manzil, ish vaqti, ijtimoiy tarmoqlar",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[var(--color-navy-950)]">Admin panel</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-[var(--color-line)] bg-white p-5 hover:border-[var(--color-navy-700)]"
          >
            <h2 className="text-lg font-bold text-[var(--color-navy-950)]">{card.title}</h2>
            <p className="mt-1 text-[var(--color-muted)]">{card.text}</p>
          </Link>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-[var(--color-line)] bg-white p-5 text-sm">
        <h2 className="font-bold text-[var(--color-navy-950)]">Holat</h2>
        <ul className="mt-2 flex flex-col gap-1">
          <li>{isRedisConfigured() ? "✅" : "⚠️"} Arizalar bazasi (Upstash Redis)</li>
          <li>{isGitHubConfigured() ? "✅" : "⚠️"} Saytga saqlash (GitHub token)</li>
        </ul>
        <p className="mt-3 text-[var(--color-muted)]">
          Blog va xizmat sahifalarini tahrirlash keyingi bosqichlarda qoʻshiladi.
        </p>
      </section>
    </div>
  );
}
