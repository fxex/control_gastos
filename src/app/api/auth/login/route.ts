import { NextResponse } from "next/server";
import { BackendError, callGoApi, copySetCookies, responsePayload } from "@/lib/api/go-client";
import { isSameOrigin } from "@/lib/api/csrf";
import { loginSchema } from "@/lib/validation/auth-schemas";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ message: "Solicitud no permitida." }, { status: 403 });
  try {
    let body: unknown;
    try { body = await request.json(); } catch { return NextResponse.json({ message: "El cuerpo de la solicitud no es válido." }, { status: 400 }); }
    const input = loginSchema.safeParse(body);
    if (!input.success) return NextResponse.json({ message: "Los datos ingresados no son válidos." }, { status: 422 });
    const backend = await callGoApi("/api/v1/auth/login", { method: "POST", body: JSON.stringify(input.data) });
    const response = NextResponse.json(await responsePayload(backend), { status: 200 });
    copySetCookies(backend, response);
    return response;
  } catch (error) {
    if (error instanceof BackendError) {
      const status = error.status === 429 ? 429 : error.status === 401 ? 401 : error.status >= 500 ? 502 : 422;
      return NextResponse.json({ message: status === 401 ? "El email o la contraseña no son correctos." : "No pudimos procesar el inicio de sesión." }, { status });
    }
    return NextResponse.json({ message: "No pudimos conectar con el servidor." }, { status: 503 });
  }
}
