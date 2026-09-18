import { NextResponse } from "next/server";
import { getAdminDb } from "../../../lib/firebaseAdmin.js";
import { createHash } from "crypto";

export const dynamic = "force-dynamic";

const DOC = "series_support/mapping-hyd";

function clientKey(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ua = req.headers.get("user-agent") || "";
  return createHash("sha256").update(`${ip}|${ua.slice(0, 120)}`).digest("hex").slice(0, 32);
}

export async function GET() {
  try {
    const db = await getAdminDb();
    if (!db) return NextResponse.json({ count: 0, enabled: false });
    const snap = await db.doc(DOC).get();
    const count = snap.exists ? Number(snap.data()?.count || 0) : 0;
    return NextResponse.json({ count, enabled: true });
  } catch (err) {
    console.warn("series-support get fallback:", err?.message || err);
    return NextResponse.json({ count: 0, enabled: false });
  }
}

export async function POST(req) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");

  if (origin) {
    try {
      const originHost = new URL(origin).host;
      if (
        originHost !== host &&
        !originHost.endsWith("mapmyhyd.com") &&
        !originHost.includes("localhost") &&
        !originHost.includes("127.0.0.1")
      ) {
        return new NextResponse(null, { status: 403 });
      }
    } catch {}
  }

  try {
    const db = await getAdminDb();
    if (!db) {
      return NextResponse.json({ count: 1, already: false, devFallback: true });
    }

    const key = clientKey(req);
    const voteRef = db.collection("series_support_votes").doc(key);
    const counterRef = db.doc(DOC);

    const result = await db.runTransaction(async (tx) => {
      const voteSnap = await tx.get(voteRef);
      if (voteSnap.exists) {
        const counter = await tx.get(counterRef);
        return { count: Number(counter.data()?.count || 0), already: true };
      }
      const counter = await tx.get(counterRef);
      const next = Number(counter.data()?.count || 0) + 1;
      tx.set(voteRef, { at: Date.now(), product: "hub" }, { merge: true });
      tx.set(counterRef, { count: next, updatedAt: Date.now() }, { merge: true });
      return { count: next, already: false };
    });
    return NextResponse.json(result);
  } catch (err) {
    console.warn("series-support post fallback:", err?.message || err);
    return NextResponse.json({ count: 1, already: false, fallback: true });
  }
}
