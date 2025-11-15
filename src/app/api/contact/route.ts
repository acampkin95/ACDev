import { NextResponse } from "next/server";
import { forwardSubmission, persistSubmission, validateSubmission } from "@/lib/contact";
import { isRateLimited } from "@/lib/rate-limit";

function getClientIp(request: Request) {
  const header = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip");
  if (!header) return "unknown";
  return header.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch (error) {
    console.error("Invalid contact payload", error);
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }

  if (payload && typeof (payload as Record<string, unknown>).website === "string") {
    const honeypot = ((payload as Record<string, unknown>).website as string).trim();
    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true });
    }
  }

  const validation = validateSubmission(payload);
  if (!validation.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form inputs.", errors: validation.errors },
      { status: 422 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Too many submissions" }, { status: 429 });
  }

  const userAgent = request.headers.get("user-agent") ?? undefined;
  const submission = {
    ...validation.data,
    submittedAt: new Date().toISOString(),
    ip,
    userAgent,
  };

  try {
    await persistSubmission(submission);
    const delivery = await forwardSubmission(submission, { ip, userAgent });
    return NextResponse.json({ ok: true, delivery });
  } catch (error) {
    console.error("Contact submission handling failed", error);
    return NextResponse.json({ ok: false, message: "Unable to process submission" }, { status: 500 });
  }
}
