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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`Enquiry from ${name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
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
        className="border border-black px-10 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
      >
        {t.send}
      </button>

      {sent && (
        <p className="text-xs tracking-wide text-neutral-500 dark:text-neutral-400">
          {fmt(t.sentNote, { email: site.email })}
        </p>
      )}
    </form>
  );
}
