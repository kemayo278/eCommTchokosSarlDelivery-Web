"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

const contacts = [
  {
    icon: Phone,
    titre: "Appeler le support",
    detail: "+237 6 90 00 00 00",
    href: "tel:+237690000000",
    teinte: "bg-primary-soft text-primary-dark",
  },
  {
    icon: MessageCircle,
    titre: "WhatsApp",
    detail: "Réponse sous quelques minutes",
    href: "https://wa.me/237690000000",
    teinte: "bg-info-soft text-info",
  },
  {
    icon: Mail,
    titre: "E-mail",
    detail: "support@tchokos.cm",
    href: "mailto:support@tchokos.cm",
    teinte: "bg-warn-soft text-warn",
  },
];

const faq = [
  {
    q: "Comment accepter une livraison ?",
    r: "Ouvrez la commande depuis l'accueil ou vos notifications, puis appuyez sur « Accepter la livraison ». Elle passe alors au statut « En cours ».",
  },
  {
    q: "Comment valider une livraison auprès du client ?",
    r: "Une fois la commande en cours, un QR code s'affiche dans le détail. Le client le scanne à la remise du colis pour confirmer la livraison.",
  },
  {
    q: "Comment fonctionne le paiement à la livraison ?",
    r: "Pour les commandes « À la livraison », vous encaissez le montant indiqué auprès du client. Le total attendu est visible dans le détail de la commande.",
  },
  {
    q: "Pourquoi je ne reçois que certaines commandes ?",
    r: "Vous recevez uniquement les commandes des zones qui vous sont affectées. Vos zones sont visibles dans votre profil.",
  },
];

export default function AidePage() {
  const router = useRouter();
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <div className="animate-rise space-y-5">
      <header className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-surface text-slate-600 transition hover:text-secondary"
          aria-label="Retour"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-extrabold tracking-tight">Aide & support</h1>
      </header>

      <section className="rounded-[var(--radius-card)] bg-secondary p-5 text-white">
        <h2 className="font-bold">Une question ? Un souci sur le terrain ?</h2>
        <p className="mt-1 text-sm text-slate-300">
          L'équipe Tchokos Sarl est disponible pour vous aider pendant vos
          tournées.
        </p>
      </section>

      <div className="grid gap-3">
        {contacts.map(({ icon: Icon, titre, detail, href, teinte }) => (
          <a
            key={titre}
            href={href}
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-surface p-4 transition hover:border-primary/40"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${teinte}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-secondary">{titre}</p>
              <p className="truncate text-sm text-slate-500">{detail}</p>
            </div>
          </a>
        ))}
      </div>

      <section>
        <h2 className="mb-2 px-1 text-sm font-bold text-slate-500">
          Questions fréquentes
        </h2>
        <div className="space-y-2">
          {faq.map((item, i) => {
            const actif = ouvert === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-surface"
              >
                <button
                  onClick={() => setOuvert(actif ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                >
                  <span className="text-sm font-semibold text-secondary">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition ${
                      actif ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {actif && (
                  <p className="border-t border-slate-50 px-4 py-3 text-sm text-slate-500">
                    {item.r}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
