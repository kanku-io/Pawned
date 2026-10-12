import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useCart } from "../../context/CartContext";
import { formatZAR } from "../../lib/format";
import { MAX_QTY } from "../../lib/config";
import Footer from "../Footer";

function ProductView({ product, extraImages, sizes }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);

  const needsSize = Array.isArray(sizes) && sizes.length > 0;
  const canAdd = !needsSize || size !== null;
  const gallery = [product.image_url, ...extraImages].filter(Boolean);

  function handleAdd() {
    if (!canAdd) return;
    addItem(product, { size: needsSize ? size : null, qty });
  }

  return (
    <div className="pd-main">
      <div className="pd-gallery">
        {gallery.map((src, i) => (
          <div className="pd-gallery-item" key={src}>
            <img src={src} alt={i === 0 ? product.name : `${product.name}, view ${i + 1}`} />
          </div>
        ))}
      </div>

      <div className="pd-info">
        <p className="pd-breadcrumb">
          <Link to="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
        </p>

        <h1 className="pd-name">{product.name}</h1>
        <p className="pd-price">{formatZAR(product.price_cents)}</p>

        <hr className="pd-rule" />

        {product.description && <p className="pd-description">{product.description}</p>}

        {needsSize ? (
          <fieldset className="pd-sizes">
            <legend>Size</legend>
            <div className="pd-size-grid">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`pd-size ${size === s ? "is-selected" : ""}`}
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        ) : (
          <p className="pd-onesize">One size</p>
        )}

        <div className="pd-buy">
          <div className="qty">
            <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              -
            </button>
            <span>{qty}</span>
            <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}>
              +
            </button>
          </div>

          <button type="button" className="pd-cta" disabled={!canAdd} onClick={handleAdd}>
            {canAdd ? "Add to bag" : "Select a size"}
          </button>
        </div>

        <details className="pd-details">
          <summary>Shipping and delivery</summary>
          <p>
            Every order is delivered by courier. The shipping cost is shown at checkout.{" "}
            <Link to="/shipping">Read more about shipping</Link>.
          </p>
        </details>
      </div>
    </div>
  );
}

export default function ProductPage({ sizes = null, extraImages = [] }) {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data) {
          console.log(error);
          setProduct(null);
          setError("We could not find that product.");
        } else {
          setProduct(data);
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <div className="pd">
      {loading && <p className="pd-status">Loading...</p>}

      {!loading && error && (
        <div className="pd-status">
          <p>{error}</p>
          <Link to="/shop" className="btn-outline">Back to shop</Link>
        </div>
      )}

      {!loading && product && (
        <ProductView key={product.id} product={product} extraImages={extraImages} sizes={sizes} />
      )}

      <Footer />
    </div>
  );
}