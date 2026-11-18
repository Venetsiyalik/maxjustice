import { requireAdmin } from "@/lib/admin/auth";
import { canSaveContent, isGitHubConfigured, readRepoFile } from "@/lib/admin/github";
import type { SiteSettings } from "@/lib/settings-schema";
import bundledSettings from "@/content/settings.json";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  await requireAdmin();

  // GitHub ulangan bo'lsa — eng so'nggi saqlangan holat (deploy tugamagan bo'lsa ham)
  let settings = bundledSettings as SiteSettings;
  let readError = false;
  try {
    settings = JSON.parse((await readRepoFile("content/settings.json")).content) as SiteSettings;
  } catch (err) {
    console.error("[admin] Sozlamalarni o'qishda xatolik:", err);
    readError = true;
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[var(--color-navy-950)]">Sozlamalar</h1>
      <p className="mt-1 max-w-2xl text-sm text-[var(--color-muted)]">
        Bu maʼlumotlar butun saytda (sahifalar, footer, Google uchun schema) bir xil koʻrinadi.
        Saqlangach sayt 1–2 daqiqada yangilanadi. Telefon va manzilni oʻzgartirsangiz, Google Business
        va Yandex Bizneslardagi maʼlumotni ham shunga moslang.
      </p>
      {!isGitHubConfigured() && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {canSaveContent()
            ? "GITHUB_TOKEN yoʻq — lokal rejim: oʻzgarish faqat shu kompyuterdagi faylga yoziladi."
            : "GITHUB_TOKEN sozlanmagan — saqlash ishlamaydi."}
        </p>
      )}
      {readError && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
          GitHubʼdan oʻqib boʻlmadi — saytdagi joriy qiymatlar koʻrsatilmoqda.
        </p>
      )}
      <SettingsForm initial={settings} disabled={!canSaveContent()} />
    </div>
  );
}
