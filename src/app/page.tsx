import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = (await cookies()).get(env.sessionCookieName);
  redirect(session ? "/dashboard" : "/login");
}
