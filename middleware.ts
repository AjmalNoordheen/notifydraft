import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup"];
const publicPrefixes = ["/auth"];

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isPublic =
    pathname === "/" ||
    publicRoutes.includes(pathname) ||
    publicPrefixes.some((route) => pathname.startsWith(route));

  if (!isPublic) {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
