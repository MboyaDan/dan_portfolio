"use server";

import { Resend } from "resend";
import { site } from "@/data/site";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "All fields are required." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return {
      status: "error",
      message: "Email isn't configured yet. Please reach out directly instead.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: site.email,
      replyTo: email,
      subject: `New message from ${name} via portfolio`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return { status: "success", message: "Message sent — thanks for reaching out." };
  } catch (error) {
    console.error("Failed to send contact message", error);
    return { status: "error", message: "Something went wrong sending your message. Try email instead." };
  }
}
