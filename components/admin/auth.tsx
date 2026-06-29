"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged, signInWithEmailAndPassword, signOut, type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";
import { COL } from "@/lib/firebase/collections";

type AuthState = { user: User | null; isAdmin: boolean; loading: boolean };
const Ctx = createContext<AuthState>({ user: null, isAdmin: false, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isAdmin: false, loading: true });

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return setState({ user: null, isAdmin: false, loading: false });
      let isAdmin = false;
      try {
        isAdmin = (await getDoc(doc(db, COL.admins, user.uid))).exists();
      } catch {
        isAdmin = false;
      }
      setState({ user, isAdmin, loading: false });
    });
  }, []);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
export const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
