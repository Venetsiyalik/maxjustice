import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { ADMIN_COOKIE, verifySessionToken } from "./lib/admin/session";

const intlMiddleware = createMiddleware(routing);

/**
 * /admin — til middleware'idan tashqarida. Sessiyasiz so'rov login sahifasiga
 * yo'naltiriladi (optimistik tekshiruv; asosiy tekshiruv sahifa va action'larda).
 */
function adminProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const session = verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);

  const response =
    !isLogin && !session
      ? NextResponse.redirect(new URL("/admin/login", request.url))
      : NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return adminProxy(request);
  }

  const response = intlMiddleware(request);

  // next-intl `/uz/...` ni prefikssiz `/...` ga 307 (vaqtinchalik) bilan
  // yo'naltiradi. Bu doimiy qoida — qidiruv tizimlari signalni asosiy URL'ga
  // o'tkazishi uchun 308 (doimiy) qilamiz.
  const location = response.headers.get("location");
  if (response.status === 307 && location) {
    const { pathname } = request.nextUrl;
    if (pathname === "/uz" || pathname.startsWith("/uz/")) {
      const permanent = NextResponse.redirect(location, 308);
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === "set-cookie") permanent.headers.append(key, value);
      });
      return permanent;
    }
  }

  return response;
}

export const config = {
  // api, _next, statik fayllar (nuqta bo'lgan fayl nomlari) middleware'dan chetlab o'tadi
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
