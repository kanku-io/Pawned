import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { MAX_QTY } from "../lib/config";

const CartContext = createContext(null);
const STORAGE_KEY = "pawned-cart-v1";

const lineKey = (id, size) => `${id}:${size ?? "one-size"}`;
const clampQty = (qty) => Math.max(0, Math.min(MAX_QTY, qty));

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.item.id, action.item.size);
      const found = state.find((line) => line.key === key);
      if (found) {
        return state.map((line) =>
          line.key === key ? { ...line, qty: clampQty(line.qty + action.qty) } : line
        );
      }
      return [...state, { ...action.item, key, qty: clampQty(action.qty) }];
    }
    case "setQty": {
      const qty = clampQty(action.qty);
      if (qty === 0) return state.filter((line) => line.key !== action.key);
      return state.map((line) => (line.key === action.key ? { ...line, qty } : line));
    }
    case "remove":
      return state.filter((line) => line.key !== action.key);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage can be blocked, the cart still works for this visit
    }
  }, [items]);

  const addItem = useCallback((product, { size = null, qty = 1 } = {}) => {
    dispatch({
      type: "add",
      qty,
      item: {
        id: product.id,
        slug: product.slug,
        category: product.category,
        name: product.name,
        price_cents: product.price_cents,
        image_url: product.image_url,
        size,
      },
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((key, qty) => dispatch({ type: "setQty", key, qty }), []);
  const removeItem = useCallback((key) => dispatch({ type: "remove", key }), []);
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = items.reduce((sum, line) => sum + line.qty * line.price_cents, 0);
    return { items, count, subtotal, addItem, setQty, removeItem, clearCart, isOpen, openCart, closeCart };
  }, [items, isOpen, addItem, setQty, removeItem, clearCart, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}