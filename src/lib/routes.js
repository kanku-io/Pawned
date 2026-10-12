// Tees go to /shop/tees/:slug, everything else (hats) goes to /shop/hats/:slug
export const productPath = (product) => {
  const section = product.category === "Accessories" ? "hats" : "tees";
  return `/shop/${section}/${product.slug}`;
};