"use client";

import { useState } from "react";
import { clsx } from "clsx";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check (client-side; real check is on Web3Forms side)
    if (data.get("_honey")) {
      setState("success"); // silently ignore bots
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "REPLACE_WITH_YOUR_KEY",
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          from_name: "Grinscreen Digital Website",
        }),
      });

      const json = await res.json();
      if (json.success) {
        setState("success");
        form.reset();
      } else {
        throw new Error(json.message ?? "Submission failed");
      }
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const inputClass =
    "w-full bg-surface border border-border rounded-lg px-4 py-3 text-fg placeholder-fg-muted text-sm focus:outline-none focus:border-brand-bright/50 focus:ring-1 focus:ring-brand-bright/30 transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block font-mono text-xs text-fg-muted uppercase tracking-widest mb-2">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
            disabled={state === "loading" || state === "success"}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-xs text-fg-muted uppercase tracking-widest mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@brand.com"
            className={inputClass}
            disabled={state === "loading" || state === "success"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block font-mono text-xs text-fg-muted uppercase tracking-widest mb-2">
          Company / Brand
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Your brand name"
          className={inputClass}
          disabled={state === "loading" || state === "success"}
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs text-fg-muted uppercase tracking-widest mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project, goals, and timeline..."
          className={clsx(inputClass, "resize-none")}
          disabled={state === "loading" || state === "success"}
        />
      </div>

      {/* Error */}
      {state === "error" && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error || "Something went wrong. Please try again or reach us on social media."}
        </p>
      )}

      {/* Success */}
      {state === "success" && (
        <p className="text-sm text-brand-bright bg-brand/10 border border-brand/20 rounded-lg px-4 py-3">
          Message sent! We&apos;ll get back to you within 24 hours.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading" || state === "success"}
        className={clsx(
          "w-full py-4 rounded-full font-semibold text-base transition-all duration-200",
          state === "loading"
            ? "bg-surface text-fg-muted cursor-not-allowed"
            : state === "success"
            ? "bg-brand/20 text-brand-bright cursor-default"
            : "bg-brand-bright text-bg hover:bg-brand-glow"
        )}
      >
        {state === "loading"
          ? "Sending..."
          : state === "success"
          ? "Sent ✓"
          : "Send Message"}
      </button>

      <p className="text-xs text-fg-muted text-center">
        {/* PLACEHOLDER: replace with real email once available */}
        Or email us directly at{" "}
        <a href="mailto:hello@grinscreen.com" className="text-brand-bright hover:underline">
          hello@grinscreen.com {/* PLACEHOLDER_EMAIL */}
        </a>
      </p>
    </form>
  );
}
