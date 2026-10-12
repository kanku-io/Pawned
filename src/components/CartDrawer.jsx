import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatZAR } from "../lib/format";
import { productPath } from "../lib/routes";
import { MAX_QTY } from "../lib/config";

export default function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, setQty, removeItem } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") closeCart();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  return createPortal(
    <>
      <div
        className={`cart-scrim ${isOpen ? "is-visible" : ""}`}
        aria-hidden="true"
        onClick={closeCart}
      />

      <aside
        className={`cart-drawer ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-label="Shopping bag"
      >
        <div className="cart-head">
          <h2>Bag ({count})</h2>
          <button type="button" className="link-btn" onClick={closeCart}>
            Close
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Your bag is empty.</p>
              <Link to="/shop" className="btn-outline" onClick={closeCart}>
                Shop now
              </Link>
            </div>
          ) : (
            items.map((line) => (
              <div className="cart-line" key={line.key}>
                <Link to={productPath(line)} onClick={closeCart}>
                  <img src={line.image_url} alt={line.name} />
                </Link>

                <div>
                  <Link to={productPath(line)} className="cart-line-name" onClick={closeCart}>
                    {line.name}
                  </Link>
                  <p className="cart-line-meta">
                    {line.size ? `Size ${line.size}` : "One size"}
                  </p>

                  <div className="cart-line-row">
                    <div className="qty">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${line.name}`}
                        onClick={() => setQty(line.key, line.qty - 1)}
                      >
                        -
                      </button>
                      <span>{line.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${line.name}`}
                        disabled={line.qty >= MAX_QTY}
                        onClick={() => setQty(line.key, line.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-line-price">{formatZAR(line.price_cents * line.qty)}</p>
                  </div>

                  <button type="button" className="link-btn" onClick={() => removeItem(line.key)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>{formatZAR(subtotal)}</span>
            </div>
            <p className="cart-note">Delivered by courier. Shipping is shown at checkout.</p>
            <Link to="/checkout" className="btn-solid" onClick={closeCart}>
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>,
    document.body
  );
}