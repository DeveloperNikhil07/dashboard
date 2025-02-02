import { NextResponse } from "next/server";

export function middleware(req) {
  const isAuthenticated = req.cookies.get("sessionId")?.value; // Check for sessionId

  console.log("Middleware - isAuthenticated:", isAuthenticated);

  const { pathname } = req.nextUrl;
  // If user is NOT authenticated and trying to access a protected route
  if (!isAuthenticated && pathname !== "/login") {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is authenticated and tries to access login page, redirect to dashboard
  if (isAuthenticated && pathname === "/login") {
    console.log("Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next(); // Continue to requested page
}

// Protect all pages except Next.js internal assets
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
