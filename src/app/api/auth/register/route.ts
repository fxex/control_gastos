import { NextResponse } from "next/server";
import { BackendError, callGoApi, copySetCookies, responsePayload } from "@/lib/api/go-client";
import { isSameOrigin } from "@/lib/api/csrf";
import { registerSchema } from "@/lib/validation/auth-schemas";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ message: "Solicitud no permitida." }, { status: 403 });
  try {
    let body: unknown;
    try { body = await request.json(); } catch { return NextResponse.json({ message: "El cuerpo de la solicitud no es válido." }, { status: 400 }); }
    const input = registerSchema.safeParse(body);
    if (!input.success) return NextResponse.json({ message: "Revisá los datos ingresados." }, { status: 422 });
    const payload = { name: input.data.name, email: input.data.email, password: input.data.password };
    const backend = await callGoApi("/api/v1/auth/register", { method: "POST", body: JSON.stringify(payload) });
    const response = NextResponse.json(await responsePayload(backend), { status: 201 });
    copySetCookies(backend, response);
    return response;
  } catch (error) {
    if (error instanceof BackendError) {
      const status = error.status === 409 ? 409 : error.status === 429 ? 429 : error.status >= 500 ? 502 : 422;
      return NextResponse.json({ message: status === 409 ? "Ese email ya está registrado." : "No pudimos crear la cuenta." }, { status });
    }
    return NextResponse.json({ message: "No pudimos conectar con el servidor." }, { status: 503 });
  }
}
