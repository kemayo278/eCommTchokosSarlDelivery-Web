"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Truck, Bell, User, Settings } from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Accueil", icon: LayoutDashboard },
  { href: "/livraisons", label: "Livraisons", icon: Truck },
  { href: "/notifications", label: "Notifs", icon: Bell },
  { href: "/profil", label: "Profil", icon: User },
  { href: "/settings", label: "Réglages", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-100 bg-surface/95 backdrop-blur lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const actif = pathname === href || pathname.startsWith(href + "/");
          return (
            <li key={href}>
              <Link
                href={href}
                className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    actif ? "bg-primary text-white" : "text-slate-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className={actif ? "text-secondary" : "text-slate-400"}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
