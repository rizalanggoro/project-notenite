import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { repositorySession } from "./lib/data/repositories/session";

const checkSession = async (): Promise<boolean> => {
  const session = await repositorySession.read();
  if (session) return true;
  return false;
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!(await checkSession()))
      return NextResponse.redirect(new URL("/auth/login", request.url));
    return NextResponse.next();
  } else {
    return NextResponse.next();
  }

  // return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
