import { test } from "node:test";
import assert from "node:assert/strict";
import { buildWhatsAppLink, consultLink } from "../lib/wa.ts";
import { instagramEmbedUrl, tiktokVideoId } from "../lib/embed.ts";

test("buildWhatsAppLink strips non-digits and encodes message", () => {
  const link = buildWhatsAppLink("0889-9422-9661", {
    nama: "Budi", phone: "08123", vehicleType: "mobil",
    brand: "Toyota", model: "Fortuner", keluhan: "BiLED", tanggal: "2026-07-01",
  });
  assert.match(link, /^https:\/\/wa\.me\/088994229661\?text=/);
  assert.ok(decodeURIComponent(link).includes("Toyota Fortuner"));
});

test("consultLink builds wa.me with default message", () => {
  assert.match(consultLink("62888"), /^https:\/\/wa\.me\/62888\?text=/);
});

test("instagramEmbedUrl strips query and appends /embed", () => {
  assert.equal(instagramEmbedUrl("https://www.instagram.com/p/ABC/?utm=1"), "https://www.instagram.com/p/ABC/embed");
});

test("tiktokVideoId extracts id or null", () => {
  assert.equal(tiktokVideoId("https://www.tiktok.com/@x/video/7123456789"), "7123456789");
  assert.equal(tiktokVideoId("https://www.tiktok.com/@x"), null);
});
