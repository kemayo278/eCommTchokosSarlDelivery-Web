import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tchokos Delivery",
  description: "Espace livreur — Tchokos Sarl Delivery",
  authors: [{ name: "Dens Empire Technology", url: "https://github.com/kemayo278" }],
  keywords: ["Tchokos", "Tchokos Sarl", "Tchokos Delivery", "Tchokos Livreur", "Tchokos Delivery App"],
  applicationName: "Tchokos Delivery",
  generator: "KGS#",
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
