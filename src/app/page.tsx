"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { livreur, chargement } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (chargement) return;
    router.replace(livreur ? "/dashboard" : "/auth/login");
  }, [chargement, livreur, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-aurora">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}
