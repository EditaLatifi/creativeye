"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import { fmt } from "@/i18n/dictionaries";

type FormText = {
  name: string;
  email: string;
  phone: string;
  message: string;
  send: string;
  sentNote: string;
};

export default function ContactForm({ t }: { t: FormText }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          message: String(data.get("message") || ""),
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
      <input name="phone" placeholder={t.phone} className={field} />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={t.message}
        className={`${field} resize-none`}
      />
      <button
        type="submit"
        disabled={sending}
        className="border border-black px-10 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-50 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
      >
        {t.send}
      </button>

      {sent && (
        <p className="text-xs tracking-wide text-neutral-500 dark:text-neutral-400">
          {fmt(t.sentNote, { email: site.email })}
        </p>
      )}
      {error && (
        <p className="text-xs tracking-wide text-red-600 dark:text-red-400">{error}</p>
      )}
    </form>
  );
}
