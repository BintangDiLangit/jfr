/* Deploy firestore.rules via Firebase Rules REST API (bypasses CLI serviceusage check).
   Usage: node scripts/deploy-rules.cjs */
const fs = require("fs");
const path = require("path");
const { cert } = require("firebase-admin/app");

const PROJECT = "jfr-technology";
const sa = require(path.join(__dirname, "..", "jfr-technology-firebase-adminsdk-fbsvc-43ea38b711.json"));
const rules = fs.readFileSync(path.join(__dirname, "..", "firestore.rules"), "utf8");

async function main() {
  const { access_token } = await cert(sa).getAccessToken();
  const H = { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" };
  const api = "https://firebaserules.googleapis.com/v1";

  // 1) create ruleset
  const rs = await fetch(`${api}/projects/${PROJECT}/rulesets`, {
    method: "POST", headers: H,
    body: JSON.stringify({ source: { files: [{ name: "firestore.rules", content: rules }] } }),
  });
  const rsBody = await rs.json();
  if (!rs.ok) throw new Error("ruleset: " + JSON.stringify(rsBody));
  const rulesetName = rsBody.name;
  console.log("ruleset:", rulesetName);

  // 2) point the firestore release at the new ruleset (update, else create)
  const relName = `projects/${PROJECT}/releases/cloud.firestore`;
  let rel = await fetch(`${api}/${relName}?updateMask=rulesetName`, {
    method: "PATCH", headers: H,
    body: JSON.stringify({ release: { name: relName, rulesetName } }),
  });
  if (rel.status === 404) {
    rel = await fetch(`${api}/projects/${PROJECT}/releases`, {
      method: "POST", headers: H, body: JSON.stringify({ name: relName, rulesetName }),
    });
  }
  const relBody = await rel.json();
  if (!rel.ok) throw new Error("release: " + JSON.stringify(relBody));
  console.log("Firestore rules deployed ✓");
  process.exit(0);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
