import { NextResponse, NextRequest } from 'next/server'

export function middleware(request) {
    console.log("middleware running...");

    const AuthLogToken = request.cookies.get("loginAuthToken")?.value;
    const loggedInUserNotAccessPath = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/usersignup";

    if (loggedInUserNotAccessPath) {
        if (AuthLogToken) {
            // Redirect logged-in users from /login or /usersignup to /dashboard
            return NextResponse.redirect(new URL("/dashboard", request.url));
        } else {
            // Redirect unauthenticated users to /login
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    console.log(AuthLogToken); // For debugging purposes
}

// Matcher to limit the middleware to specific paths
export const config = {
    matcher: [
        "/dashboard",
        "/login",
        "/usersignup",
    ],
}
