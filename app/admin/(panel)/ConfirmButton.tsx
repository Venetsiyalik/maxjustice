"use client";

/** Qaytarib bo'lmaydigan amallar uchun tasdiq so'raydigan submit tugma. */
export function ConfirmButton({ message, children }: { message: string; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className="rounded-md border border-red-200 px-3 py-1 text-red-700 hover:bg-red-50"
    >
      {children}
    </button>
  );
}
