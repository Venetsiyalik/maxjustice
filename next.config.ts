import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  experimental: {
    // app/global-not-found.tsx — [locale] ga tushmaydigan URL'lar uchun zaxira 404
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
