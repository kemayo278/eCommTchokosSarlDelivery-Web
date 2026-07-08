"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Copy,
  MapPin,
  Navigation,
  Phone,
  QrCode,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
} from "lucide-react";
import {
  formatFCFA,
  getLivraison,
  libelleLivraison,
  libellePaiement,
} from "@/lib/data";
import type { StatutLivraison } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

export default function DetailLivraisonPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const livraison = getLivraison(id);

  const [statut, setStatut] = useState<StatutLivraison>(
    livraison?.statut ?? "en_attente"
  );
  const [copie, setCopie] = useState(false);

  const totalArticles = useMemo(
    () =>
      livraison
        ? livraison.articles.reduce((s, a) => s + a.prixUnitaire * a.quantite, 0)
        : 0,
    [livraison]
  );

  if (!livraison) {
    return (
      <div className="animate-rise py-20 text-center">
        <p className="font-semibold text-secondary">Livraison introuvable</p>
        <Link
          href="/livraisons"
          className="mt-3 inline-block text-sm font-semibold text-primary-dark hover:underline"
        >
          Retour aux livraisons
        </Link>
      </div>
    );
  }

  const codeValidation = `https://tchokos.cm/valider/${livraison.id}?ref=${livraison.numero.replace("#", "")}`;

  function copier() {
    navigator.clipboard?.writeText(livraison!.numero);
    setCopie(true);
    setTimeout(() => setCopie(false), 1500);
  }

  return (
    <div className="animate-rise space-y-4">
      <header className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-surface text-slate-600 transition hover:text-secondary"
          aria-label="Retour"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-bold tracking-tight">Détail de la livraison</h1>
        <StatusBadge statut={statut} />
      </header>

      <section className="rounded-[var(--radius-card)] border border-slate-100 bg-surface p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
            <Truck className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <button
              onClick={copier}
              className="flex items-center gap-1.5 text-lg font-extrabold tracking-tight"
            >
              {livraison.numero}
              {copie ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Copy className="h-4 w-4 text-slate-400" />
              )}
            </button>
            <p className="text-sm text-slate-500">
              {statut === "livree"
                ? "Livraison terminée"
                : statut === "en_cours"
                  ? `Temps estimé : ${livraison.etaMinutes} min`
                  : "En attente d'acceptation"}
            </p>
          </div>
          <p className="text-right text-lg font-extrabold text-secondary">
            {formatFCFA(livraison.montant)}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-primary" />
          <div className="relative h-0.5 flex-1 bg-slate-200">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface p-1">
              <Truck className="h-4 w-4 text-primary" />
            </span>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{livraison.itineraire.origine}</span>
          <span>{livraison.itineraire.destination}</span>
        </div>
      </section>

      {statut === "en_attente" && (
        <button
          onClick={() => setStatut("en_cours")}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-white shadow-[0_16px_40px_-16px_rgba(16,185,129,0.7)] transition hover:bg-primary-dark active:scale-[0.99]"
        >
          Accepter la livraison
        </button>
      )}

      {statut === "en_cours" && (
        <section className="rounded-[var(--radius-card)] border border-primary/30 bg-primary-soft p-5 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary-dark">
            <QrCode className="h-5 w-5" />
          </div>
          <h2 className="mt-3 font-bold text-secondary">
            Validation par le client
          </h2>
          <p className="mx-auto mt-1 max-w-xs text-sm text-slate-600">
            Faites scanner ce code par le client à la remise du colis pour
            marquer la livraison comme terminée.
          </p>

          <div className="mx-auto mt-4 w-fit rounded-2xl border border-primary/20 bg-white p-4">
            <QRCodeSVG
              value={codeValidation}
              size={180}
              level="M"
              marginSize={0}
              fgColor="#0f172a"
              bgColor="#ffffff"
            />
          </div>
          <p className="mt-3 font-mono text-xs text-slate-500">
            {livraison.numero}
          </p>

          <button
            onClick={() => setStatut("livree")}
            className="mx-auto mt-4 flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-white px-4 py-2.5 text-xs font-semibold text-primary-dark transition hover:bg-primary/5"
          >
            <ScanLine className="h-4 w-4" />
            Simuler le scan client (démo)
          </button>
        </section>
      )}

      {statut === "livree" && (
        <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-soft py-4 text-base font-bold text-primary-dark">
          <Check className="h-5 w-5" /> Livraison confirmée par le client
        </div>
      )}

      <section className="rounded-[var(--radius-card)] border border-slate-100 bg-surface">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-500">
          <ShoppingBag className="h-4 w-4" /> Articles de la commande
        </div>
        <ul className="divide-y divide-slate-50 px-5">
          {livraison.articles.map((a, i) => (
            <li key={i} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                  {a.quantite}×
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-secondary">
                    {a.nom}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatFCFA(a.prixUnitaire)} / unité
                  </p>
                </div>
              </div>
              <p className="shrink-0 text-sm font-semibold text-secondary">
                {formatFCFA(a.prixUnitaire * a.quantite)}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
          <span className="text-sm font-bold text-secondary">Total</span>
          <span className="text-base font-extrabold text-primary-dark">
            {formatFCFA(totalArticles)}
          </span>
        </div>
      </section>

      <section className="rounded-[var(--radius-card)] border border-slate-100 bg-surface">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-500">
          <Store className="h-4 w-4" /> Détails du colis
        </div>
        <dl className="divide-y divide-slate-50 px-5">
          <Ligne label="Boutique" valeur={livraison.boutique} />
          <Ligne label="Articles" valeur={`${livraison.nbArticles}`} />
          <Ligne
            label="Mode de livraison"
            valeur={libelleLivraison[livraison.modeLivraison]}
          />
        </dl>
      </section>

      <section className="rounded-[var(--radius-card)] border border-slate-100 bg-surface p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
              {livraison.client.nom
                .split(" ")
                .map((m) => m[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div className="leading-tight">
              <p className="font-bold">{livraison.client.nom}</p>
              <p className="flex items-center gap-1 text-xs text-primary-dark">
                <ShieldCheck className="h-3.5 w-3.5" /> Client vérifié
              </p>
            </div>
          </div>
          <a
            href={`tel:${livraison.client.telephone.replace(/\s/g, "")}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-dark"
            aria-label="Appeler le client"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 p-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <div>
            <p className="text-sm font-medium text-secondary">
              {livraison.client.adresse}
            </p>
            <p className="text-xs text-slate-500">
              {livraison.client.quartier}, Douala
            </p>
          </div>
          {/* <button className="ml-auto flex items-center gap-1 self-center rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-semibold text-white">
            <Navigation className="h-3.5 w-3.5" /> Itinéraire
          </button> */}
        </div>
      </section>

      <section className="rounded-[var(--radius-card)] border border-slate-100 bg-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-500">
            <ChevronRight className="h-4 w-4" /> Suivi du colis
          </h2>
        </div>
        <ol className="relative space-y-5 pl-6">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200" />
          {livraison.suivi.map((e, i) => (
            <li key={i} className="relative">
              <span
                className={`absolute -left-6 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-surface ${
                  e.atteint ? "bg-primary" : "border-2 border-slate-300 bg-surface"
                }`}
              />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      e.atteint ? "text-secondary" : "text-slate-400"
                    }`}
                  >
                    {e.libelle}
                  </p>
                  <p className="text-xs text-slate-400">{e.lieu}</p>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <p className="font-semibold text-slate-500">{e.heure}</p>
                  <p>{e.date}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Ligne({ label, valeur }: { label: string; valeur: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-sm font-semibold text-secondary">{valeur}</dd>
    </div>
  );
}
