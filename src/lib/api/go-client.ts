import { env } from "@/lib/env";

export class BackendError extends Error {
  constructor(
    public readonly status: number,
    public readonly payload: unknown,
  ) {
    super("El servidor no pudo completar la solicitud.");
    this.name = "BackendError";
  }
}

export async function callGoApi(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${env.goApiUrl}${path}`, {
    ...options,
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      payload = undefined;
    }
    throw new BackendError(response.status, payload);
  }

  return response;
}

export function requestCookies(request: Request): string | null {
  return request.headers.get("cookie");
}

export function copySetCookies(source: Response, target: Response): void {
  const cookies = source.headers.getSetCookie?.() ?? [];
  for (const cookie of cookies) {
    target.headers.append("Set-Cookie", cookie);
  }
}

export async function responsePayload(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}
