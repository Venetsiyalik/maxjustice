import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { logout } from "../actions";

const NAV = [
  { href: "/admin", label: "Bosh sahifa" },
  { href: "/admin/arizalar", label: "Arizalar" },
  { href: "/admin/sozlamalar", label: "Sozlamalar" },
];

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--color-line)] bg-[var(--color-navy-950)] text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <span className="font-extrabold">
            MAXLEGAL <span className="text-[var(--color-gold-400)]">Admin</span>
          </span>
          <nav className="flex flex-wrap gap-4 text-sm">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/80 hover:text-white">
                {item.label}
              </Link>
            ))}
            <a href="/" target="_blank" className="text-white/60 hover:text-white">
              Saytni ochish ↗
            </a>
          </nav>
          <form action={logout} className="ml-auto flex items-center gap-3 text-sm">
            <span className="text-white/60">{session.sub}</span>
            <button type="submit" className="rounded-md border border-white/30 px-3 py-1 hover:bg-white/10">
              Chiqish
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
