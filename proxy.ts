import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // api, _next, statik fayllar (nuqta bo'lgan fayl nomlari) middleware'dan chetlab o'tadi
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
