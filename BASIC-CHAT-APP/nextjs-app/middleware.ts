import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "jwt");

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.startsWith("/chat") || req.nextUrl.pathname.startsWith("/api/postmessage")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    try {
  
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT Error:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/createbot/:path*" , "/api/postmessage/:path*"],
};
