import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import NewsletterForm from "./NewsletterForm";

const Chevron = ({ flip = false }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    style={flip ? { transform: "rotate(180deg)" } : undefined}
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
);

/**
 * items = [
 *   { label: "Tees", to: "/shop?category=Tees" },
 *   { label: "Help", children: [{ label: "Contact", to: "/contact" }] },
 * ]
 * promo = { image, label, to }
 */
export default function HamburgerMenu({ items = [], promo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stack, setStack] = useState([]);
  const buttonRef = useRef(null);

  const current = stack[stack.length - 1];
  const list = current ? current.children : items;

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    if (!isOpen) setStack([]);
    setIsOpen((prev) => !prev);
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // The scrim and panel are portaled to <body>. The nav bar uses backdrop-filter,
  // which makes position: fixed children size themselves to the nav bar instead of the screen.
  const overlay = (
    <>
      <div
        className={`pw-nav-scrim ${isOpen ? "is-visible" : ""}`}
        aria-hidden="true"
        onClick={close}
      />

      <div
        id="pw-nav-panel"
        className={`pw-nav-panel ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-label="Menu"
      >
        {current ? (
          <div className="pw-nav-level-head">
            <button
              type="button"
              className="pw-nav-back"
              onClick={() => setStack((s) => s.slice(0, -1))}
            >
              <Chevron flip />
              Back
            </button>
            <p className="pw-nav-heading">{current.label}</p>
          </div>
        ) : (
          <p className="pw-nav-heading">Explore</p>
        )}

        <nav aria-label="Main categories">
          <ul className="pw-category-list">
            {list.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <button
                    type="button"
                    className="pw-category-link"
                    onClick={() => setStack((s) => [...s, item])}
                  >
                    {item.label}
                    <Chevron />
                  </button>
                ) : (
                  <Link to={item.to} className="pw-category-link" onClick={close}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {!current && promo && (
          <Link to={promo.to} className="pw-nav-promo" onClick={close}>
            <img src={promo.image} alt="" />
            <span>{promo.label}</span>
          </Link>
        )}

        {!current && (
          <div className="pw-email-capture">
            <p className="pw-nav-heading">Stay in the loop</p>
            <NewsletterForm placeholder="Enter your email" buttonLabel="Join" />
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <button
        ref={buttonRef}
        className={`pw-hamburger-btn ${isOpen ? "is-open" : ""}`}
        aria-expanded={isOpen}
        aria-controls="pw-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        <span className="pw-hamburger-line" />
        <span className="pw-hamburger-line" />
        <span className="pw-hamburger-line" />
      </button>

      {createPortal(overlay, document.body)}
    </>
  );
}