import { NextResponse } from "next/server";
import { callGoApi, copySetCookies, requestCookies } from "@/lib/api/go-client";
import { isSameOrigin } from "@/lib/api/csrf";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return new NextResponse("Solicitud no permitida.", { status: 403 });
  const headers = requestCookies(request) ? { Cookie: requestCookies(request) as string } : undefined;
  try {
    const backend = await callGoApi("/api/v1/auth/logout", { method: "POST", headers });
    const response = new NextResponse(null, { status: 204 });
    copySetCookies(backend, response);
    response.cookies.set(env.sessionCookieName, "", { httpOnly: true, secure: env.sessionCookieSecure, sameSite: "lax", path: "/", maxAge: 0 });
    return response;
  } catch {
    const response = new NextResponse(null, { status: 204 });
    response.cookies.set(env.sessionCookieName, "", { httpOnly: true, secure: env.sessionCookieSecure, sameSite: "lax", path: "/", maxAge: 0 });
    return response;
  }
}
