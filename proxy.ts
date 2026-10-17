import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_TOKEN_NAME = process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ১. API Routes এর জন্য CORS এবং প্রিফ্লাইট OPTIONS হ্যান্ডলিং
  if (pathname.startsWith("/api")) {
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    return response;
  }

  // ২. ব্রাউজার কুকি থেকে Access Token চেক করা
  const token =
    request.cookies.get(ACCESS_TOKEN_NAME)?.value ||
    request.cookies.get("accessToken")?.value;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isDashboardPage = pathname.startsWith("/dashboard");

  // ৩. ইউজার লগইন থাকলে Auth পেজে (/login, /register) ঢুকতে পারবে না -> ড্যাশবোর্ডে পাঠাবে
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ৪. ইউজার লগইন না থাকলে Dashboard-এ ঢুকতে পারবে না -> লগইন পেজে পাঠাবে
  if (!token && isDashboardPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/api/:path*",
  ],
};
