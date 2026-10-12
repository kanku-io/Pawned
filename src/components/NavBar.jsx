import { Link } from "react-router-dom";
import HamburgerMenu from "./Hamburger";
import { useCart } from "../context/CartContext";
import { MENU_PROMO } from "../lib/config";

const MENU_ITEMS = [
  { label: "New arrivals", to: "/shop" },
  { label: "Pawned: Origins", to: "/shop" },
  { label: "Pawned: Checkmate", to: "/shop#checkmate" },
  { label: "Tees", to: "/shop?category=Tees" },
  { label: "Accessories", to: "/shop?category=Accessories" },
  {
    label: "Help",
    children: [
      { label: "Contact", to: "/contact" },
      { label: "Shipping", to: "/shipping" },
    ],
  },
];

const NavBar = () => {
  const { count, openCart } = useCart();

  return (
    <div>
      <div className="nav-bar-container">
        <HamburgerMenu items={MENU_ITEMS} promo={MENU_PROMO} />

        <Link to="/" className="pawned-link">
          <p>PAWNED</p>
        </Link>

        <div className="nav-icons">
          {/* Search is wired up in the next pass */}
          <button type="button" className="nav-icon-btn" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          </button>

          <button
            type="button"
            className="nav-icon-btn"
            aria-label={`Open bag, ${count} items`}
            onClick={openCart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-80q-33 0-56.5-23.5T120-160v-480q0-33 23.5-56.5T200-720h80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720h80q33 0 56.5 23.5T840-640v480q0 33-23.5 56.5T760-80H200Zm0-80h560v-480H200v480Zm421.5-298.5Q680-517 680-600h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85h-80q0 83 58.5 141.5T480-400q83 0 141.5-58.5ZM360-720h240q0-50-35-85t-85-35q-50 0-85 35t-35 85ZM200-160v-480 480Z"/></svg>
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;