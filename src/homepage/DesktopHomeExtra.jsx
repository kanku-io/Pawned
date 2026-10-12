import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { productPath } from "../lib/routes";
import { FEATURED_TEE_SLUG, FEATURED_HAT_SLUG } from "../lib/config";

const BAG_ICON = "M256 144C256 108.7 284.7 80 320 80C355.3 80 384 108.7 384 144L384 192L256 192L256 144zM208 192L144 192C117.5 192 96 213.5 96 240L96 448C96 501 139 544 192 544L448 544C501 544 544 501 544 448L544 240C544 213.5 522.5 192 496 192L432 192L432 144C432 82.1 381.9 32 320 32C258.1 32 208 82.1 208 144L208 192zM232 240C245.3 240 256 250.7 256 264C256 277.3 245.3 288 232 288C218.7 288 208 277.3 208 264C208 250.7 218.7 240 232 240zM384 264C384 250.7 394.7 240 408 240C421.3 240 432 250.7 432 264C432 277.3 421.3 288 408 288C394.7 288 384 277.3 384 264z";

const IMG = "https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images";

// First two tiles open the tee page, last two open the bucket hat page
const TILES = [
  { src: `${IMG}/desktop/WhatsApp%20Image%202026-08-20%20at%2015.49.14%20(1).jpeg`, alt: "pawned-shirt", kind: "tee" },
  { src: `${IMG}/desktop/WhatsApp%20Image%202026-08-20%20at%2015.49.18%20(3).jpeg`, alt: "pawned-shirt", kind: "tee" },
  { src: `${IMG}/gallery1.jpg`, alt: "pawned-hat", kind: "hat" },
  { src: `${IMG}/gallery2.jpg`, alt: "pawned-hat", kind: "hat" },
];

const DesktopHomeExtra = () => {
  const [links, setLinks] = useState({ tee: "/shop", hat: "/shop" });

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("products")
      .select("slug, category")
      .in("category", ["Tees", "Accessories"])
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;

        const tee = data.find(
          (p) => p.category === "Tees" && (!FEATURED_TEE_SLUG || p.slug === FEATURED_TEE_SLUG)
        );
        const hat = data.find(
          (p) => p.category === "Accessories" && (!FEATURED_HAT_SLUG || p.slug === FEATURED_HAT_SLUG)
        );

        setLinks({
          tee: tee ? productPath(tee) : "/shop",
          hat: hat ? productPath(hat) : "/shop",
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="product-container">
        {TILES.map((tile) => (
          <Link
            key={tile.src}
            to={links[tile.kind]}
            className="product"
            aria-label={tile.kind === "tee" ? "View the tee" : "View the bucket hat"}
          >
            <img src={tile.src} alt={tile.alt} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
              <path d={BAG_ICON} />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopHomeExtra;