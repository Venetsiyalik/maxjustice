import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  // 4-bosqich: "oila-va-meros" ikkiga bo'lindi (oilaviy-nizolar + meros-ishlari).
  // Eski URL va unga to'plangan signal oilaviy nizolar sahifasiga o'tadi.
  async redirects() {
    return [
      {
        source: "/xizmatlar/oila-va-meros",
        destination: "/xizmatlar/oilaviy-nizolar",
        permanent: true,
      },
      {
        source: "/:locale(uz|kr|ru|en)/xizmatlar/oila-va-meros",
        destination: "/:locale/xizmatlar/oilaviy-nizolar",
        permanent: true,
      },
    ];
  },
  experimental: {
    // app/global-not-found.tsx — [locale] ga tushmaydigan URL'lar uchun zaxira 404
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
