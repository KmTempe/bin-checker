import { NextResponse } from "next/server";

export function proxy(request) {
    const start = Date.now();
    const { pathname } = request.nextUrl;

    // Skip static files and Next.js internals to reduce noise
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.startsWith("/favicon.ico") ||
        pathname === "/robots.txt"
    ) {
        return NextResponse.next();
    }

    const response = NextResponse.next();

    // Log after response is ready (approximate duration)
    const duration = Date.now() - start;
    const method = request.method;
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "-";

    console.log(
        `[${new Date().toISOString()}] ${method} ${pathname} - ${duration}ms - IP: ${ip} - UA: ${userAgent}`
    );

    return response;
}

export const config = {
    matcher: "/:path*",
};
