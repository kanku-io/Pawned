import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

export function Success() {
  const { clearCart } = useCart();

  // Payment finished, so the bag can be emptied
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="result-page">
      <div className="result-inner">
        <h1>Thank you</h1>
        <p>
          Your payment went through. PayFast will email you a receipt, and we will be in touch
          about your delivery. Orders are sent by courier.
        </p>
        <div className="result-actions">
          <Link to="/shop" className="btn-solid">Keep shopping</Link>
          <Link to="/shipping" className="btn-outline">Shipping details</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function Cancel() {
  return (
    <div className="result-page">
      <div className="result-inner">
        <h1>Payment cancelled</h1>
        <p>You were not charged. Your bag is still saved if you want to try again.</p>
        <div className="result-actions">
          <Link to="/checkout" className="btn-solid">Back to checkout</Link>
          <Link to="/shop" className="btn-outline">Keep shopping</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}