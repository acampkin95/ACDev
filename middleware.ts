import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const username = process.env.CMS_BASIC_AUTH_USER ?? "Admin";
const password = process.env.CMS_BASIC_AUTH_PASS ?? "Password123";

function unauthorizedResponse() {
  const response = new NextResponse("Authentication required", { status: 401 });
  response.headers.set("WWW-Authenticate", 'Basic realm="ACDev CMS"');
  return response;
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const encoded = authHeader.split(" ")[1] ?? "";
  const decoded = atob(encoded);
  const [user, pass] = decoded.split(":");

  if (user === username && pass === password) {
    return NextResponse.next();
  }

  return unauthorizedResponse();
}

export const config = {
  matcher: ["/admin/:path*"],
};
