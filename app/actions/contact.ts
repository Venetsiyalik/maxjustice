"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errorReason?: "validation" | "config" | "network";
  fieldErrors?: Partial<Record<"name" | "phone" | "consent", boolean>>;
};

const PHONE_PATTERN = /^[+0-9()\-\s]{7,20}$/;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = formData.get("consent") === "on";
  const source = String(formData.get("source") ?? "").trim();
  const locale = String(formData.get("locale") ?? "uz").trim();

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!name) fieldErrors.name = true;
  if (!phone || !PHONE_PATTERN.test(phone)) fieldErrors.phone = true;
  if (!consent) fieldErrors.consent = true;

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", errorReason: "validation", fieldErrors };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error(
      "[contact] TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID muhit o'zgaruvchilari sozlanmagan (.env.example ga qarang)"
    );
    return { status: "error", errorReason: "config" };
  }

  const lines = [
    "🆕 Yangi murojaat — maxjustice.uz",
    `👤 Ism: ${name}`,
    `📞 Telefon: ${phone}`,
  ];
  if (message) lines.push(`💬 Xabar: ${message}`);
  if (source) lines.push(`📍 Manba: ${source}`);
  lines.push(`🌐 Til: ${locale}`);

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
        }),
      }
    );

    if (!res.ok) {
      console.error("[contact] Telegram API xatosi:", await res.text());
      return { status: "error", errorReason: "network" };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[contact] Telegramga yuborishda xatolik:", err);
    return { status: "error", errorReason: "network" };
  }
}
