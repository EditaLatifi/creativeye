"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import { fmt } from "@/i18n/dictionaries";

type BookingText = {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  serviceDefault: string;
  message: string;
  send: string;
  sentNote: string;
};

export default function BookingForm({
  t,
  services,
}: {
  t: BookingText;
  services: { value: string; label: string }[];
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) || "");
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "booking",
          name: get("name"),
          email: get("email"),
          phone: get("phone"),
          date: get("date"),
          service: get("service"),
          message: get("message"),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong.");
      }
      form.reset();
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  const field =
    "w-full border-b border-black/20 bg-transparent py-3 text-sm text-black placeholder-neutral-400 outline-none transition-colors focus:border-black dark:border-white/20 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <input name="name" required placeholder={t.name} className={field} />
        <input
          name="email"
          type="email"
          required
          placeholder={t.email}
          className={field}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <input name="phone" placeholder={t.phone} className={field} />
        <input
          name="date"
          type="text"
          onFocus={(e) => (e.currentTarget.type = "date")}
          onBlur={(e) => {
            if (!e.currentTarget.value) e.currentTarget.type = "text";
          }}
          placeholder={t.date}
          className={field}
        />
      </div>
      <select name="service" required defaultValue="" className={`${field} dark:[color-scheme:dark]`}>
        <option value="" disabled>
          {t.serviceDefault}
        </option>
        {services.map((s) => (
          <option key={s.value} value={s.label}>
            {s.label}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        rows={5}
        placeholder={t.message}
        className={`${field} resize-none`}
      />
      <div className="text-center">
        <button
          type="submit"
          disabled={sending}
          className="border border-black px-10 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          {t.send}
        </button>
      </div>

      {sent && (
        <p className="text-center text-xs tracking-wide text-neutral-500 dark:text-neutral-400">
          {fmt(t.sentNote, { email: site.email })}
        </p>
      )}
      {error && (
        <p className="text-center text-xs tracking-wide text-red-600 dark:text-red-400">{error}</p>
      )}
    </form>
  );
}
