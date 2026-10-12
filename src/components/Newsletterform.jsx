import { useState } from "react";
import { subscribeToNewsletter } from "../lib/newsletter";

export default function NewsletterForm({ placeholder = "Your email", buttonLabel = "Subscribe" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      await subscribeToNewsletter(email);
      setEmail("");
      setStatus("done");
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder={placeholder}
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining" : buttonLabel}
      </button>
      {status === "done" && (
        <span className="newsletter-msg" role="status">You are on the list. Thank you.</span>
      )}
      {status === "error" && (
        <span className="newsletter-msg" role="alert">Something went wrong. Please try again.</span>
      )}
    </form>
  );
}