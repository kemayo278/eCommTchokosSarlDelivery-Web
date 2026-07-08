"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import BottomNav from "./BottomNav";
import DesktopSidebar from "./DesktopSidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { livreur, chargement } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!chargement && !livreur) router.replace("/auth/login");
  }, [chargement, livreur, router]);

  if (chargement || !livreur) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:flex">
      <DesktopSidebar />
      <div className="flex-1">
        <main className="mx-auto w-full max-w-2xl px-4 pb-24 pt-4 lg:max-w-5xl lg:px-8 lg:pb-10 lg:pt-8">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
