import { Link } from "react-router-dom";
import NewsletterForm from "./NewsletterForm";
import { INSTAGRAM_URL, TIKTOK_URL } from "../lib/config";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="parent">
        <div className="div1">
          <h1>pawned</h1>
          <p>Streetwear built for those who move different. Based in Johannesburg.</p>

          <div className="social-media-btns">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <p>Instagram</p>
            </a>

            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
              <p>TikTok</p>
            </a>
          </div>
        </div>

        <div className="div2">
          <p>Shop</p>

          <div className="shop-sub">
            <ul>
              <li><Link to="/shop">All products</Link></li>
              <li><Link to="/shop?category=Tees">Tees</Link></li>
              <li><Link to="/shop?category=Accessories">Accessories</Link></li>
            </ul>
          </div>
        </div>

        <div className="div3">
          <p>Help</p>

          <div className="help-sub">
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
            </ul>
          </div>
        </div>

        <div className="div4">
          <p>Stay Updated</p>
          <NewsletterForm />
        </div>
      </div>

      <hr />

      <div className="lower-footer">
        <p>© 2026 PAWNED. All rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;