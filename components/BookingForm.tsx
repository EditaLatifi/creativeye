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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) || "");

    const subject = encodeURIComponent(
      `Booking request: ${get("service") || "shoot"} (${get("name")})`
    );
    const body = encodeURIComponent(
      [
        `Name: ${get("name")}`,
        `Email: ${get("email")}`,
        `Phone: ${get("phone")}`,
        `Preferred date: ${get("date")}`,
        `Type: ${get("service")}`,
        "",
        get("message"),
      ].join("\n")
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
          className="border border-black px-10 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          {t.send}
        </button>
      </div>

      {sent && (
        <p className="text-center text-xs tracking-wide text-neutral-500 dark:text-neutral-400">
          {fmt(t.sentNote, { email: site.email })}
        </p>
      )}
    </form>
  );
}
