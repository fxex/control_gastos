"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/core/_components/button";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return <Button type="button" variant="ghost" onClick={handleLogout} disabled={isLoading}>{isLoading ? "Saliendo…" : "Salir"}</Button>;
}
