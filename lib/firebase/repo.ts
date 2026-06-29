"use client";
import {
  collection, doc, addDoc, updateDoc, deleteDoc, setDoc, getDoc,
  onSnapshot, query, orderBy, serverTimestamp, type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

/** Client-side repository. UI never touches Firestore directly — goes through here. */

export type Doc<T> = T & { id: string };

export function listen<T>(
  name: string,
  cb: (rows: Doc<T>[]) => void,
  constraints: QueryConstraint[] = [orderBy("order", "asc")],
) {
  const q = query(collection(db, name), ...constraints);
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }))),
    // fall back to unordered if the order field is missing
    () => {
      const u = onSnapshot(collection(db, name), (s) =>
        cb(s.docs.map((d) => ({ id: d.id, ...(d.data() as T) }))),
      );
      return u;
    },
  );
}

export async function create<T extends object>(name: string, data: T) {
  return addDoc(collection(db, name), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
}

export async function update<T extends object>(name: string, id: string, data: Partial<T>) {
  return updateDoc(doc(db, name, id), { ...data, updatedAt: serverTimestamp() });
}

export async function remove(name: string, id: string) {
  return deleteDoc(doc(db, name, id));
}

/** Single-doc collections (settings/site, hero/main, seo/<key>). */
export async function getSingle<T>(name: string, id: string): Promise<T | null> {
  const snap = await getDoc(doc(db, name, id));
  return snap.exists() ? (snap.data() as T) : null;
}

export async function saveSingle<T extends object>(name: string, id: string, data: T) {
  return setDoc(doc(db, name, id), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}
