"use client";

import Link from "next/link";
import {
  Bike,
  BadgeCheck,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Star,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { formatFCFA, livraisons } from "@/lib/data";

export default function ProfilPage() {
  const { livreur, deconnexion } = useAuth();
  if (!livreur) return null;

  const livrees = livraisons.filter((l) => l.statut === "livree");
  const totalEncaisse = livrees.reduce((s, l) => s + l.montant, 0);

  const infos = [
    { icon: Mail, label: "E-mail", valeur: livreur.email },
    { icon: Phone, label: "Téléphone", valeur: livreur.telephone },
    { icon: MapPin, label: "Ville", valeur: livreur.ville },
    { icon: Bike, label: "Véhicule", valeur: livreur.vehicule },
    { icon: BadgeCheck, label: "Matricule", valeur: livreur.matricule },
  ];

  return (
    <div className="animate-rise space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">Profil</h1>
        <Link
          href="/profil/update"
          className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-surface px-3.5 py-2 text-sm font-semibold text-secondary transition hover:border-primary/40"
        >
          <Pencil className="h-4 w-4" /> Modifier
        </Link>
      </div>

      <section className="overflow-hidden rounded-[var(--radius-card)] border border-slate-100 bg-surface shadow-sm">
        <div className="relative h-28 bg-linear-to-br from-secondary via-secondary to-secondary-soft">
          <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/25 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-info/20 blur-2xl" />
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5 text-primary" /> Vérifié
          </span>
        </div>
        <div className="px-5 pb-5">
          <div className="-mt-11 flex items-end gap-4">
            <div className="relative">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-surface bg-linear-to-br from-primary to-primary-dark text-2xl font-extrabold text-white shadow-lg shadow-primary/30">
                {livreur.initiales}
              </span>
              <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-surface bg-primary text-white">
                <BadgeCheck className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="min-w-0 translate-y-1.5">
              <p className="truncate text-lg font-extrabold tracking-tight">
                {livreur.nom}
              </p>
              <p className="text-sm text-slate-500">Livreur Tchokos</p>
            </div>
            <span className="mb-1.5 ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-warn-soft px-2.5 py-1 text-sm font-bold text-warn">
              <Star className="h-4 w-4 fill-warn text-warn" />
              {livreur.note.toFixed(1)}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <MapPin className="h-3.5 w-3.5 text-primary" /> {livreur.ville}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <Bike className="h-3.5 w-3.5 text-primary" /> {livreur.vehicule}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" /> {livreur.matricule}
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-100 bg-surface p-4">
          <p className="text-2xl font-extrabold text-secondary">
            {livrees.length}
          </p>
          <p className="text-sm text-slate-500">Livraisons réussies</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-surface p-4">
          <p className="text-2xl font-extrabold text-primary-dark">
            {formatFCFA(totalEncaisse)}
          </p>
          <p className="text-sm text-slate-500">Total encaissé</p>
        </div>
      </section>

      <section className="rounded-[var(--radius-card)] border border-slate-100 bg-surface p-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold text-slate-500">Zones affectées</h2>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {livreur.zones.map((z) => (
            <span
              key={z}
              className="rounded-full bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary-dark"
            >
              {z}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Les zones sont attribuées par Tchokos Sarl. Vous recevez les commandes
          de ces secteurs.
        </p>
      </section>

      <section className="rounded-[var(--radius-card)] border border-slate-100 bg-surface p-2">
        <h2 className="px-3 py-2 text-sm font-bold text-slate-500">
          Informations
        </h2>
        <dl className="divide-y divide-slate-50">
          {infos.map(({ icon: Icon, label, valeur }) => (
            <div key={label} className="flex items-center gap-3 px-3 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs text-slate-400">{label}</dt>
                <dd className="truncate text-sm font-semibold text-secondary">
                  {valeur}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <button
        onClick={deconnexion}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-danger/20 bg-danger-soft py-3.5 text-sm font-bold text-danger transition hover:bg-danger/10"
      >
        <LogOut className="h-4 w-4" /> Se déconnecter
      </button>
    </div>
  );
}
