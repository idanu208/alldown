import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/course"];

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isProtected = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));

  if (isProtected && !session) {
    const url = new URL("/auth/login", nextUrl.origin);
    url.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (nextUrl.pathname.startsWith("/dashboard/admin") && session?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/course/:path*"]
};
