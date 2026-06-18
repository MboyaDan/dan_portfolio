"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { sendContactMessage, type ContactFormState } from "@/lib/contact-actions";
import { buttonVariants } from "@/components/ui/button";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          placeholder="What are you building, and what kind of help do you need?"
        />
      </div>

      <button type="submit" disabled={pending} className={buttonVariants("primary")}>
        <Send className="h-4 w-4" />
        {pending ? "Sending…" : "Send message"}
      </button>

      {state.status !== "idle" && (
        <p
          role="status"
          className={`text-sm ${state.status === "success" ? "text-accent" : "text-danger"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
