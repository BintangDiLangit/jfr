"use client";
import { useEffect, useState } from "react";
import type { QueryConstraint } from "firebase/firestore";
import { listen, type Doc } from "@/lib/firebase/repo";

/** Realtime list of a collection. */
export function useCollection<T>(name: string, constraints?: QueryConstraint[]) {
  const [rows, setRows] = useState<Doc<T>[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = listen<T>(name, (r) => { setRows(r); setLoading(false); }, constraints);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  return { rows, loading };
}
