"use client";

import { useActionState, useState } from "react";
import { WEEK_DAYS, type SiteSettings } from "@/lib/settings-schema";
import { saveSettings, type SettingsState } from "./actions";

const inputClass =
  "mt-1 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-base outline-none focus:border-[var(--color-navy-700)] focus:ring-2 focus:ring-[var(--color-navy-700)]/20";

function Field({
  label,
  name,
  defaultValue,
  hint,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  hint?: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-[var(--color-ink)]">
      {label}
      <input name={name} type={type} defaultValue={defaultValue} className={inputClass} />
      {hint && <span className="mt-1 block text-xs font-normal text-[var(--color-muted)]">{hint}</span>}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-[var(--color-line)] bg-white p-5">
      <legend className="px-1 text-base font-bold text-[var(--color-navy-950)]">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function SettingsForm({ initial: initialProp, disabled }: { initial: SiteSettings; disabled: boolean }) {
  const [state, formAction, pending] = useActionState<SettingsState, FormData>(saveSettings, {
    status: "idle",
  });
  const initial = state.values ?? initialProp;
  const [hoursEnabled, setHoursEnabled] = useState(initial.openingHours !== null);
  const hours = initial.openingHours ?? {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  };

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-6">
      <Section title="Aloqa">
        <Field label="Telefon" name="phone" defaultValue={initial.phone} hint="+998 XX XXX XX XX" />
        <Field
          label="Telegram (bot yoki akkaunt nomi, @ siz)"
          name="telegramHandle"
          defaultValue={initial.telegramHandle}
        />
        <Field label="Asosiy email" name="email.info" type="email" defaultValue={initial.email.info} />
        <Field
          label="Advokatning emaili («Advokat haqida» sahifasi)"
          name="email.founder"
          type="email"
          defaultValue={initial.email.founder}
        />
        <Field
          label="Huquqiy soʻrovlar uchun email"
          name="email.advokat"
          type="email"
          defaultValue={initial.email.advokat}
        />
      </Section>

      <Section title="Manzil">
        <div className="sm:col-span-2">
          <Field label="Toʻliq manzil (oʻzbekcha)" name="address.display" defaultValue={initial.address.display} />
        </div>
        <Field label="Qisqa manzil — uz" name="address.short.uz" defaultValue={initial.address.short.uz} />
        <Field label="Qisqa manzil — ru" name="address.short.ru" defaultValue={initial.address.short.ru} />
        <Field label="Qisqa manzil — en" name="address.short.en" defaultValue={initial.address.short.en} />
        <Field label="Koʻcha va uy" name="address.street" defaultValue={initial.address.street} />
        <Field label="Shahar" name="address.locality" defaultValue={initial.address.locality} />
        <Field label="Viloyat" name="address.region" defaultValue={initial.address.region} />
        <Field label="Pochta indeksi" name="address.postalCode" defaultValue={initial.address.postalCode} />
        <Field
          label="Kenglik (latitude)"
          name="address.latitude"
          defaultValue={initial.address.latitude}
          hint="Google Maps'da binoni bosib olinadi"
        />
        <Field label="Uzunlik (longitude)" name="address.longitude" defaultValue={initial.address.longitude} />
      </Section>

      <fieldset className="rounded-xl border border-[var(--color-line)] bg-white p-5">
        <legend className="px-1 text-base font-bold text-[var(--color-navy-950)]">Ish vaqti (Google uchun)</legend>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            name="hoursEnabled"
            checked={hoursEnabled}
            onChange={(e) => setHoursEnabled(e.target.checked)}
          />
          Ish vaqtini Google qidiruvida koʻrsatish
        </label>
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          Faqat tasdiqlangan vaqtni yoqing. Sahifalardagi «24/7» matni alohida oʻzgartiriladi.
        </p>
        {hoursEnabled && (
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              {WEEK_DAYS.map((day) => (
                <label key={day.value} className="flex items-center gap-1.5 text-sm">
                  <input type="checkbox" name={`day.${day.value}`} defaultChecked={hours.days.includes(day.value)} />
                  {day.label}
                </label>
              ))}
            </div>
            <div className="grid max-w-xs grid-cols-2 gap-4">
              <Field label="Ochiladi" name="opens" type="time" defaultValue={hours.opens} />
              <Field label="Yopiladi" name="closes" type="time" defaultValue={hours.closes} />
            </div>
          </div>
        )}
      </fieldset>

      <Section title="Ijtimoiy tarmoqlar va reyting">
        <label className="block text-sm font-semibold text-[var(--color-ink)] sm:col-span-2">
          Profillar (har qatorga bitta havola)
          <textarea
            name="sameAs"
            rows={4}
            defaultValue={initial.sameAs.join("\n")}
            placeholder={"https://www.instagram.com/...\nhttps://t.me/..."}
            className={inputClass}
          />
          <span className="mt-1 block text-xs font-normal text-[var(--color-muted)]">
            Instagram, Facebook, Telegram kanal, Google Business — Google advokatni tanishi uchun
          </span>
        </label>
        <Field
          label="Google reytingi"
          name="rating.value"
          defaultValue={initial.rating.value}
          hint="Google Business'dagi haqiqiy qiymat"
        />
        <Field label="Sharhlar soni" name="rating.reviewCount" defaultValue={initial.rating.reviewCount} />
      </Section>

      {state.status === "error" && state.errors && (
        <ul role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.errors.map((e) => (
            <li key={e}>• {e}</li>
          ))}
        </ul>
      )}
      {state.status === "saved" && (
        <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
          {state.mode === "github"
            ? "Saqlandi. Sayt 1–2 daqiqada yangilanadi."
            : "Saqlandi (lokal faylga)."}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending || disabled}
          className="rounded-lg bg-[var(--color-navy-900)] px-6 py-2.5 font-bold text-white hover:bg-[var(--color-navy-800)] disabled:opacity-60"
        >
          {pending ? "Saqlanmoqda…" : "Saqlash"}
        </button>
      </div>
    </form>
  );
}
