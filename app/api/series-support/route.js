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
  const db = await getAdminDb();
  if (!db) return NextResponse.json({ count: 0, enabled: false });
  try {
    const snap = await db.doc(DOC).get();
    const count = snap.exists ? Number(snap.data()?.count || 0) : 0;
    return NextResponse.json({ count, enabled: true });
  } catch (err) {
    console.error("series-support get:", err?.message || err);
    return NextResponse.json({ count: 0, enabled: false });
  }
}

export async function POST(req) {
  if (req.headers.get("origin") !== new URL(req.url).origin) {
    return new NextResponse(null, { status: 403 });
  }
  const db = await getAdminDb();
  if (!db) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const key = clientKey(req);
  const voteRef = db.collection("series_support_votes").doc(key);
  const counterRef = db.doc(DOC);

  try {
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
    console.error("series-support post:", err?.message || err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
