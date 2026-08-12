import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/profile";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Very small fixed-window limiter. It only protects a single server instance,
 * which is enough to blunt casual abuse; put a real limiter (Upstash, WAF) in
 * front of this if the form ever gets hammered.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        code: "validation_error",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 422 },
    );
  }

  // Silently accept honeypot submissions so bots get no signal.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, code: "rate_limited" },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    // The client falls back to a prefilled mailto link on this code.
    return NextResponse.json(
      { ok: false, code: "not_configured" },
      { status: 501 },
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: profile.email,
      replyTo: email,
      subject: `[lms.devop] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return NextResponse.json(
      { ok: false, code: "delivery_failed" },
      { status: 502 },
    );
  }
}
