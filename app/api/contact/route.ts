import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
  date?: string;
  kind?: "contact" | "booking";
};

function esc(s: string) {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ error: "Email is not configured on the server." }, { status: 500 });
  }

  const isBooking = body.kind === "booking";
  const to = CONTACT_TO || SMTP_USER;
  const from = CONTACT_FROM || SMTP_USER;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", body.phone || "—"],
  ];
  if (isBooking) {
    rows.push(["Service", body.service || "—"], ["Preferred date", body.date || "—"]);
  }

  const subject = isBooking
    ? `Booking request — ${body.service || "shoot"} (${name})`
    : `Website enquiry — ${name}`;

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${message}`;
  const html =
    `<h2 style="font:600 16px system-ui">${esc(subject)}</h2>` +
    `<table style="font:14px system-ui;border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(k)}</td><td style="padding:4px 0">${esc(v)}</td></tr>`).join("") +
    `</table><p style="font:14px system-ui;white-space:pre-wrap">${esc(message)}</p>`;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 465),
      secure: String(SMTP_SECURE ?? "true") !== "false",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `CREATIVEYE Website <${from}>`,
      to,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact send failed:", err);
    return NextResponse.json({ error: "Could not send. Please try again later." }, { status: 502 });
  }
}
