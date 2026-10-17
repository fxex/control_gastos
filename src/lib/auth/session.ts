import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { callGoApi } from "@/lib/api/go-client";
import { env } from "@/lib/env";
import type { User } from "@/types/auth";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(env.sessionCookieName);

  if (!session) return null;

  try {
    const response = await callGoApi("/api/v1/auth/me", {
      headers: { Cookie: `${env.sessionCookieName}=${session.value}` },
    });
    const payload = (await response.json()) as { user?: User } | User;
    return "id" in payload ? payload : payload.user ?? null;
  } catch {
    return null;
  }
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
