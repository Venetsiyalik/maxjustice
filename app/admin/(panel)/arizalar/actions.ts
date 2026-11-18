"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteLead, setLeadStatus } from "@/lib/leads";

export async function toggleLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = formData.get("status") === "done" ? "done" : "new";
  if (id) await setLeadStatus(id, status);
  revalidatePath("/admin/arizalar");
}

export async function removeLead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteLead(id);
  revalidatePath("/admin/arizalar");
}
