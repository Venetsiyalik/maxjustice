"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { CheckIcon } from "@/components/ui/icons";
import { Link } from "@/i18n/navigation";

const INITIAL_STATE: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("form");

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[var(--color-gold-500)] px-6 text-base font-bold text-[var(--color-navy-950)] transition-colors hover:bg-[var(--color-gold-400)] disabled:opacity-60 sm:w-auto"
    >
      {pending ? t("submitting") : t("submit")}
    </button>
  );
}

export function ContactForm({ source }: { source?: string }) {
  const t = useTranslations("form");
  const locale = useLocale();
  const [state, formAction] = useActionState(submitContactForm, INITIAL_STATE);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold-500)] text-[var(--color-navy-950)]">
          <CheckIcon className="h-6 w-6" />
        </span>
        <p className="text-lg font-bold text-[var(--color-navy-950)]">
          {t("successTitle")}
        </p>
        <p className="text-[var(--color-muted)]">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="locale" value={locale} />
      {source && <input type="hidden" name="source" value={source} />}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          aria-invalid={state.fieldErrors?.name ? "true" : undefined}
          className="w-full rounded-lg border border-[var(--color-line)] px-4 py-3 text-base outline-none focus:border-[var(--color-navy-700)] aria-[invalid=true]:border-red-500"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-sm text-red-600">{t("errorRequired")}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          {t("phoneLabel")}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={t("phonePlaceholder")}
          aria-invalid={state.fieldErrors?.phone ? "true" : undefined}
          className="w-full rounded-lg border border-[var(--color-line)] px-4 py-3 text-base outline-none focus:border-[var(--color-navy-700)] aria-[invalid=true]:border-red-500"
        />
        {state.fieldErrors?.phone && (
          <p className="mt-1 text-sm text-red-600">{t("errorRequired")}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder={t("messagePlaceholder")}
          className="w-full resize-none rounded-lg border border-[var(--color-line)] px-4 py-3 text-base outline-none focus:border-[var(--color-navy-700)]"
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-[var(--color-muted)]">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={state.fieldErrors?.consent ? "true" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-[var(--color-line)] accent-[var(--color-navy-800)]"
          />
          <span>
            {t("consentPrefix")}
            <Link
              href="/maxfiylik-siyosati"
              target="_blank"
              className="underline hover:text-[var(--color-navy-900)]"
              onClick={(e) => e.stopPropagation()}
            >
              {t("consentLinkText")}
            </Link>
            {t("consentSuffix")}
          </span>
        </label>
        {state.fieldErrors?.consent && (
          <p className="mt-1 text-sm text-red-600">{t("errorConsent")}</p>
        )}
      </div>

      {state.status === "error" && !state.fieldErrors && (
        <p className="text-sm text-red-600">{t("errorText")}</p>
      )}

      <SubmitButton />
    </form>
  );
}
