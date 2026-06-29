import "server-only";
import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Service account via env. On Vercel set FIREBASE_SERVICE_ACCOUNT_KEY to the
// JSON string (base64 or raw). Used for public server-side reads (SEO/speed).
function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not set");
  const json = raw.trim().startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");
  return JSON.parse(json);
}

let app: App;
if (getApps().length) {
  app = getApps()[0]!;
} else {
  app = initializeApp({ credential: cert(getServiceAccount()) });
}

export const adminDb = getFirestore(app);
