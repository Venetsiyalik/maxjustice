"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";

const ERRORS: Record<NonNullable<LoginState["error"]>, string> = {
  invalid: "Login yoki parol notoʻgʻri.",
  blocked: "Urinishlar koʻp boʻldi. 15 daqiqadan keyin qayta urinib koʻring.",
  config: "Admin kirish sozlanmagan (ADMIN_LOGIN, ADMIN_PASSWORD_HASH, ADMIN_SESSION_SECRET).",
};

const inputClass =
  "mt-1 w-full rounded-lg border border-[var(--color-line)] px-3 py-2.5 text-base outline-none focus:border-[var(--color-navy-700)] focus:ring-2 focus:ring-[var(--color-navy-700)]/20";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <label className="text-sm font-semibold text-[var(--color-ink)]">
        Login
        <input name="login" autoComplete="username" required className={inputClass} />
      </label>
      <label className="text-sm font-semibold text-[var(--color-ink)]">
        Parol
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </label>
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {ERRORS[state.error]}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[var(--color-navy-900)] px-4 py-2.5 font-bold text-white hover:bg-[var(--color-navy-800)] disabled:opacity-60"
      >
        {pending ? "Tekshirilmoqda…" : "Kirish"}
      </button>
    </form>
  );
}
