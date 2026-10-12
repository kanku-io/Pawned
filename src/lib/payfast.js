import SparkMD5 from "spark-md5";

const env = import.meta.env;

const MERCHANT_ID = env.VITE_PAYFAST_MERCHANT_ID;
const MERCHANT_KEY = env.VITE_PAYFAST_MERCHANT_KEY;
const PASSPHRASE = env.VITE_PAYFAST_PASSPHRASE || "";
const NOTIFY_URL = env.VITE_PAYFAST_NOTIFY_URL || "";
const SANDBOX_MODE = env.VITE_PAYFAST_SANDBOX === "true";

const PAYFAST_URL = SANDBOX_MODE
  ? "https://sandbox.payfast.co.za/eng/process"
  : "https://www.payfast.co.za/eng/process";

// PayFast expects PHP style url encoding, which differs from JS for ! ' ( ) * and spaces.
function pfEncode(val) {
  return encodeURIComponent(String(val).trim())
    .replace(/%20/g, "+")
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
}

function buildSignature(data) {
  let str = Object.entries(data)
    .filter(([, v]) => v !== "" && v !== null && v !== undefined)
    .map(([k, v]) => k + "=" + pfEncode(v))
    .join("&");

  if (PASSPHRASE) str += "&passphrase=" + pfEncode(PASSPHRASE);
  return SparkMD5.hash(str);
}

const clip = (value, max) => String(value).slice(0, max);

export function createOrderNumber() {
  return "PWN-" + Date.now().toString(36).toUpperCase();
}

/**
 * order = {
 *   orderNumber, total (in rand, number), items: [{ name, size, qty, price_cents }],
 *   firstName, lastName, email, phone, address, city, province, postal
 * }
 */
export function launchPayFast(order) {
  if (!MERCHANT_ID || !MERCHANT_KEY) {
    throw new Error("Payments are not set up yet. Please contact us to place your order.");
  }

  const origin = window.location.origin;
  const totalQty = order.items.reduce((sum, i) => sum + i.qty, 0);

  const itemName =
    order.items.length === 1
      ? order.items[0].name
      : `PAWNED order, ${totalQty} items`;

  const description = order.items
    .map((i) => `${i.qty}x ${i.name}${i.size ? " " + i.size : ""}`)
    .join(", ");

  const data = {};

  // Field order matters: the signature is built in the same order the form posts.
  data.merchant_id = MERCHANT_ID;
  data.merchant_key = MERCHANT_KEY;
  data.return_url = origin + "/success";
  data.cancel_url = origin + "/cancel";
  if (NOTIFY_URL) data.notify_url = NOTIFY_URL;

  if (order.firstName) data.name_first = clip(order.firstName, 100);
  if (order.lastName) data.name_last = clip(order.lastName, 100);
  if (order.email) data.email_address = order.email;
  const cell = (order.phone || "").replace(/\D/g, "");
  if (cell) data.cell_number = cell;

  data.m_payment_id = order.orderNumber;
  data.amount = Number(order.total).toFixed(2);
  data.item_name = clip(itemName, 100);
  if (description) data.item_description = clip(description, 255);

  if (order.address) data.custom_str1 = clip(order.address, 255);
  if (order.city) data.custom_str2 = clip(order.city, 255);
  if (order.province) data.custom_str3 = clip(order.province, 255);
  if (order.postal) data.custom_str4 = clip(order.postal, 255);

  // Sends the merchant (you) PayFast's payment confirmation email.
  data.email_confirmation = "1";

  data.signature = buildSignature(data);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = PAYFAST_URL;
  form.style.display = "none";

  Object.entries(data).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) return;
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = String(value).trim();
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}