"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { identifiantsDemo, livreurDemo } from "./data";
import type { Livreur } from "./types";

interface AuthState {
  livreur: Livreur | null;
  chargement: boolean;
  connexion: (email: string, motDePasse: string) => Promise<void>;
  deconnexion: () => void;
  majLivreur: (patch: Partial<Livreur>) => void;
}

const STORAGE_KEY = "tchokos.livreur.session";

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [livreur, setLivreur] = useState<Livreur | null>(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    try {
      const brut = localStorage.getItem(STORAGE_KEY);
      if (brut) setLivreur(JSON.parse(brut));
    } catch {
      setLivreur(null);
    } finally {
      setChargement(false);
    }
  }, []);

  const connexion = useCallback(async (email: string, motDePasse: string) => {
    await new Promise((r) => setTimeout(r, 650));

    const ok =
      email.trim().toLowerCase() === identifiantsDemo.email &&
      motDePasse === identifiantsDemo.motDePasse;

    if (!ok) {
      throw new Error("E-mail ou mot de passe incorrect.");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(livreurDemo));
    setLivreur(livreurDemo);
  }, []);

  const deconnexion = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setLivreur(null);
  }, []);

  const majLivreur = useCallback((patch: Partial<Livreur>) => {
    setLivreur((prev) => {
      if (!prev) return prev;
      const maj = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(maj));
      return maj;
    });
  }, []);

  const value = useMemo(
    () => ({ livreur, chargement, connexion, deconnexion, majLivreur }),
    [livreur, chargement, connexion, deconnexion, majLivreur]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
  return ctx;
}
