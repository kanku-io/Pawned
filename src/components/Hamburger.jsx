import { useState, useEffect, useRef } from "react";


/**
 * HamburgerMenu — top-anchored dropdown nav panel for PAWNED.
 *
 * Usage:
 *   <HamburgerMenu
 *     user={{ name: "Guest", avatarUrl: null }}
 *     categories={[
 *       { label: "PAWNED: ORIGINS", href: "/origins" },
 *       { label: "PAWNED: CHECKMATE", href: "/checkmate" },
 *       { label: "TEES", href: "/tees" },
 *       { label: "ACCESSORIES", href: "/accessories" },
 *     ]}
 *     onSubscribe={(email) => { ... }}
 *   />
 */
export default function HamburgerMenu({
  user = { name: "Guest", avatarUrl: null },
  categories = [],
  onSubscribe,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }

    function handleClickOutside(e) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    onSubscribe?.(email);
    setEmail("");
  }

  return (
    <>
      <button
        ref={buttonRef}
        className={`pw-hamburger-btn ${isOpen ? "is-open" : ""}`}
        aria-expanded={isOpen}
        aria-controls="pw-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="pw-hamburger-line" />
        <span className="pw-hamburger-line" />
        <span className="pw-hamburger-line" />
      </button>

      <div
        className={`pw-nav-scrim ${isOpen ? "is-visible" : ""}`}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      />

      <div
        id="pw-nav-panel"
        ref={panelRef}
        className={`pw-nav-panel ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="pw-account-widget">
          <div className="pw-avatar-placeholder" aria-hidden="true" />
          <div className="pw-account-text">
            <span className="pw-account-name">{user.name}</span>
            <span className="pw-account-welcome">Welcome</span>
          </div>
        </div>

        <nav aria-label="Main categories">
          <ul className="pw-category-list">
            {categories.map((cat) => (
              <li key={cat.href}>
                <a
                  href={cat.href}
                  className="pw-category-link"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <form className="pw-email-capture" onSubmit={handleSubscribe}>
          <label htmlFor="pw-email-input" className="pw-email-label">
            Stay in the loop
          </label>
          <div className="pw-email-row">
            <input
              id="pw-email-input"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pw-email-input"
            />
            <button type="submit" className="pw-email-submit">
              Join
            </button>
          </div>
        </form>
      </div>
    </>
  );
}