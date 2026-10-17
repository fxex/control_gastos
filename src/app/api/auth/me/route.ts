import { NextResponse } from "next/server";
import { BackendError, callGoApi, requestCookies, responsePayload } from "@/lib/api/go-client";

export async function GET(request: Request) {
  try {
    const cookie = requestCookies(request);
    if (!cookie) return NextResponse.json({ message: "No autenticado." }, { status: 401 });
    const backend = await callGoApi("/api/v1/auth/me", { headers: { Cookie: cookie } });
    return NextResponse.json(await responsePayload(backend), { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof BackendError ? "Sesión inválida." : "No pudimos conectar con el servidor." }, { status: error instanceof BackendError ? 401 : 503 });
  }
}
