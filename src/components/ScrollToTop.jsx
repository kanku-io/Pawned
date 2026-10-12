import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the top on every page change, or to #hash targets like /shop#checkmate
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}