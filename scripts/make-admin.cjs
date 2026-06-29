/* Create (or update) an admin login. Usage: node scripts/make-admin.cjs <email> <password> */
const path = require("path");
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const sa = require(path.join(__dirname, "..", "jfr-technology-firebase-adminsdk-fbsvc-43ea38b711.json"));

const [, , email, password] = process.argv;
if (!email || !password) { console.error("Usage: node scripts/make-admin.cjs <email> <password>"); process.exit(1); }

initializeApp({ credential: cert(sa) });
const auth = getAuth();
const db = getFirestore();

async function main() {
  let user;
  try {
    user = await auth.getUserByEmail(email);
    await auth.updateUser(user.uid, { password });
    console.log("User sudah ada, password diperbarui:", email);
  } catch {
    user = await auth.createUser({ email, password, emailVerified: true });
    console.log("User dibuat:", email);
  }
  await db.collection("admins").doc(user.uid).set({ email, role: "owner" }, { merge: true });
  console.log("Admin OK. UID:", user.uid);
  console.log("Login di /admin dengan email + password tersebut.");
  process.exit(0);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
