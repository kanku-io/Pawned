import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { CONTACT_EMAIL, INSTAGRAM_URL, TIKTOK_URL } from "../lib/config";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function update(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });

    if (error) {
      console.log(error);
      setStatus("error");
      return;
    }

    setForm({ name: "", email: "", message: "" });
    setStatus("sent");
  }

  return (
    <div className="info-page">
      <div className="info-inner contact-grid">
        <div>
          <h1>Contact</h1>
          <p className="info-lead">
            Questions about an order, sizing or anything else? Send us a message and we will get back to you.
            If it is about an order, include your order number.
          </p>

          <section>
            <h2>Email</h2>
            <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          </section>

          <section>
            <h2>Social</h2>
            <p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
              {" and "}
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">TikTok</a>
            </p>
          </section>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <label className="field">
            Name
            <input name="name" value={form.name} onChange={update} required autoComplete="name" />
          </label>
          <label className="field">
            Email
            <input type="email" name="email" value={form.email} onChange={update} required autoComplete="email" />
          </label>
          <label className="field">
            Message
            <textarea name="message" rows="6" value={form.message} onChange={update} required />
          </label>

          {status === "sent" && <p className="form-ok" role="status">Message sent. We will reply by email.</p>}
          {status === "error" && (
            <p className="form-error" role="alert">
              Your message did not send. Please try again or email us directly.
            </p>
          )}

          <button type="submit" className="btn-solid" disabled={status === "sending"}>
            {status === "sending" ? "Sending" : "Send message"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}