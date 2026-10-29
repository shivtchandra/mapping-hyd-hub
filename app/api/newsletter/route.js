import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getAdminDb } from "../../../lib/firebaseAdmin.js";
import { EMAIL_RE } from "../../../lib/newsletter.js";

export const dynamic = "force-dynamic";

const SOURCES = ["home", "footer", "about"];

function originOk(req) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const host = new URL(origin).host;
    return (
      host === req.headers.get("host") ||
      host === "mapmyhyd.com" ||
      host.endsWith(".mapmyhyd.com") ||
      host.startsWith("localhost") ||
      host.startsWith("127.0.0.1")
    );
  } catch {
    return false;
  }
}

/** Collects emails only. Sending happens elsewhere; this list is not shared with other apps. */
export async function POST(req) {
  if (!originOk(req)) return new NextResponse(null, { status: 403 });

  let body;
  try {
    const raw = await req.text();
    if (raw.length > 1024) return new NextResponse(null, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this. Answer like a success so bots learn nothing.
  if (body?.company) return NextResponse.json({ ok: true });

  const email = String(body?.email || "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  try {
    const db = await getAdminDb();
    if (!db) return NextResponse.json({ ok: true, devFallback: true });

    const id = createHash("sha256").update(email).digest("hex").slice(0, 32);
    const ref = db.collection("newsletter_subscribers").doc(id);
    const snap = await ref.get();
    // Same response for new and existing addresses, so the form can't be used to probe the list.
    if (!snap.exists) {
      await ref.set({
        email,
        status: "active",
        subscribedAt: Date.now(),
        source: SOURCES.includes(body?.source) ? body.source : "home",
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("newsletter signup failed:", err?.message || err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
