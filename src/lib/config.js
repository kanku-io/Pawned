// Edit the values in this file to match the business.

export const SHIPPING_FEE_CENTS = 0; // flat courier fee in cents, e.g. 9900 for R99.00
export const MAX_QTY = 10;

export const CONTACT_EMAIL = "hello@pawndera.co.za"; // TODO: replace with the real address
export const INSTAGRAM_URL = "https://www.instagram.com/pawnedera/";
export const TIKTOK_URL = "https://www.tiktok.com/@pawnedera";

export const TEE_SIZES = ["S", "M", "L", "XL"];

// Second image shown on every tee detail page (the back print)
export const TEE_BACK_IMAGE =
  "https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-09-15%20at%2012.44.03.jpeg";

// Image card at the bottom of the hamburger menu
export const MENU_PROMO = {
  image: "https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/hero.jpeg",
  label: "Pawned: Origins",
  to: "/shop",
};

// Optional: pin which product the homepage tiles open. Leave null to use the first one found.
export const FEATURED_TEE_SLUG = null;
export const FEATURED_HAT_SLUG = null;

export const SA_PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];