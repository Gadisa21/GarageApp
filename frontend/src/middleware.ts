import { NextResponse,NextRequest } from "next/server";

import { auth } from "./auth";

export async function middleware(req:NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes
  const publicPaths = ["/", "/signin", "/contact", "/about", "/services"];

  // Allow requests to public pages without authentication
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for a valid session on protected routes
  const session = await auth();
  

  if (!session) {
    console.log("Unauthorized access, redirecting to login...");
    const signInUrl=new URL("/signin", req.url)
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }

  console.log("Authorized access, proceeding...");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], 
};



// "employee_email": "update@gmail.com",
//  "employee_password": "8HYsy&^uud*7hh"