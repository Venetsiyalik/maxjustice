import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--color-line)] bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-gold-600)]">
          MAXLEGAL AND JUSTICE
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-[var(--color-navy-950)]">Admin panel</h1>
        <LoginForm />
      </div>
    </main>
  );
}
