import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { formatZAR } from "../lib/format";
import { productPath } from "../lib/routes";
import Footer from "../components/Footer";

const FILTERS = ["All", "Tees", "Accessories"];

function Shop() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const active = FILTERS.includes(searchParams.get("category"))
    ? searchParams.get("category")
    : "All";

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.log(error);
        setError("Could not fetch products");
        setData([]);
      } else {
        setError(null);
        setData(data ?? []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const visible = active === "All" ? data : data.filter((p) => p.category === active);

  return (
    <div className="shopping-section">
      <div className="section-header">
        <p className="concept">pawned era</p>
        <h3>just the beginning</h3>
        <p className="origins">Origins</p>

        <div className="shop-filters" role="group" aria-label="Filter products">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`shop-filter ${active === f ? "is-active" : ""}`}
              aria-pressed={active === f}
              onClick={() => setSearchParams(f === "All" ? {} : { category: f })}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="shop-status">Loading...</p>}
      {error && <p className="shop-status">{error}</p>}
      {!loading && !error && visible.length === 0 && (
        <p className="shop-status">Nothing here yet.</p>
      )}

      <div className="product-cards-001">
        {visible.map((product) => (
          <Link key={product.id} to={productPath(product)} className="product-card">
            <div className="product-card-img">
              <img src={product.image_url} alt={product.name} />
            </div>
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-category">{product.category}</p>
              <p className="product-price">{formatZAR(product.price_cents)}</p>
            </div>
          </Link>
        ))}
      </div>

      <hr />

      <div className="pawned-checkmate" id="checkmate">
        <img
          src="https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/pawned-checkmate.jpeg"
          alt="pawned-checkmate"
        />
        <p className="pawned-checkmate-text">pawned: checkmate</p>
        <h3>coming soon</h3>
      </div>

      <Footer />
    </div>
  );
}

export default Shop;