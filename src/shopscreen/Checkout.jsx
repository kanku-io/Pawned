import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";
import { launchPayFast, createOrderNumber } from "../lib/payfast";
import { SHIPPING_FEE_CENTS, SA_PROVINCES } from "../lib/config";
import { formatZAR } from "../lib/format";
import Footer from "../components/Footer";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postal: "",
};

export default function Checkout() {
  const { items, subtotal } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const total = subtotal + SHIPPING_FEE_CENTS;

  // If the visitor comes back from PayFast with the back button, unlock the form again
  useEffect(() => {
    const unlock = () => setSubmitting(false);
    window.addEventListener("pageshow", unlock);
    return () => window.removeEventListener("pageshow", unlock);
  }, []);

  function update(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting || items.length === 0) return;

    setSubmitting(true);
    setError(null);

    try {
      // Re-check prices in the database so a stale cart can never be underpriced
      const ids = [...new Set(items.map((i) => i.id))];
      const { data: fresh, error: priceError } = await supabase
        .from("products")
        .select("id, price_cents")
        .in("id", ids);

      if (priceError || !fresh) throw new Error("Could not confirm prices. Please try again.");

      const priceById = Object.fromEntries(fresh.map((p) => [p.id, p.price_cents]));
      const lines = items.map((i) => ({ ...i, price_cents: priceById[i.id] }));

      if (lines.some((l) => l.price_cents == null)) {
        throw new Error("An item in your bag is no longer available. Please remove it and try again.");
      }

      const totalCents =
        lines.reduce((sum, l) => sum + l.qty * l.price_cents, 0) + SHIPPING_FEE_CENTS;

      launchPayFast({
        ...form,
        orderNumber: createOrderNumber(),
        total: totalCents / 100,
        items: lines,
      });
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="checkout">
        <div className="checkout-empty">
          <h1>Your bag is empty</h1>
          <Link to="/shop" className="btn-outline">Shop now</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h1>Checkout</h1>

          <h2>Contact</h2>
          <div className="field-row">
            <label className="field">
              First name
              <input name="firstName" value={form.firstName} onChange={update} required autoComplete="given-name" />
            </label>
            <label className="field">
              Last name
              <input name="lastName" value={form.lastName} onChange={update} required autoComplete="family-name" />
            </label>
          </div>
          <label className="field">
            Email
            <input type="email" name="email" value={form.email} onChange={update} required autoComplete="email" />
          </label>
          <label className="field">
            Phone
            <input type="tel" name="phone" value={form.phone} onChange={update} required autoComplete="tel" />
          </label>

          <h2>Delivery address</h2>
          <p className="field-hint">Your order is delivered by courier, so please use a street address.</p>
          <label className="field">
            Street address
            <input name="address" value={form.address} onChange={update} required autoComplete="street-address" />
          </label>
          <div className="field-row">
            <label className="field">
              City
              <input name="city" value={form.city} onChange={update} required autoComplete="address-level2" />
            </label>
            <label className="field">
              Postal code
              <input
                name="postal"
                value={form.postal}
                onChange={update}
                required
                inputMode="numeric"
                pattern="\d{4}"
                title="Four digit postal code"
                autoComplete="postal-code"
              />
            </label>
          </div>
          <label className="field">
            Province
            <select name="province" value={form.province} onChange={update} required autoComplete="address-level1">
              <option value="">Select a province</option>
              {SA_PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="btn-solid" disabled={submitting}>
            {submitting ? "Redirecting to PayFast" : `Pay ${formatZAR(total)} with PayFast`}
          </button>
        </form>

        <aside className="checkout-summary" aria-label="Order summary">
          <h2>Order summary</h2>

          {items.map((line) => (
            <div className="summary-line" key={line.key}>
              <img src={line.image_url} alt="" />
              <div>
                <p className="summary-name">{line.name}</p>
                <p className="summary-meta">
                  {line.size ? `Size ${line.size}` : "One size"}, qty {line.qty}
                </p>
              </div>
              <p>{formatZAR(line.price_cents * line.qty)}</p>
            </div>
          ))}

          <div className="summary-totals">
            <p><span>Subtotal</span><span>{formatZAR(subtotal)}</span></p>
            <p>
              <span>Shipping</span>
              <span>{SHIPPING_FEE_CENTS === 0 ? "Free" : formatZAR(SHIPPING_FEE_CENTS)}</span>
            </p>
            <p className="summary-total"><span>Total</span><span>{formatZAR(total)}</span></p>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}