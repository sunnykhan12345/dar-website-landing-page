"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const CART_KEY = "dar_cart_items";
const CART_EVENT = "dar-cart-updated";
export const DELIVERY_CHARGE = 4.5;

function isBrowser() {
  return typeof window !== "undefined";
}

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function getCartKey(item) {
  return `${item.type || "product"}-${item.id || item.slug}`;
}

function normalizeCartItem(item, quantity = 1) {
  return {
    cartKey: item.cartKey || getCartKey(item),
    id: item.id,
    slug: item.slug,
    type: item.type || "product",
    title: item.title || "Untitled Item",
    image: item.image || "/images/watch.png",
    price: toNumber(item.price),
    oldPrice: item.oldPrice ? toNumber(item.oldPrice) : null,
    color: item.color || "Black",
    size: item.size || "Small",
    category: item.category || "",
    description: item.description || "",
    quantity: Math.max(1, toNumber(quantity || item.quantity, 1)),
  };
}

export function readCartItems() {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item) => normalizeCartItem(item, item.quantity));
  } catch {
    return [];
  }
}

export function writeCartItems(items) {
  if (!isBrowser()) return;

  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addCartItem(item, quantity = 1) {
  const nextItem = normalizeCartItem(item, quantity);
  const currentItems = readCartItems();

  const existingIndex = currentItems.findIndex(
    (cartItem) => cartItem.cartKey === nextItem.cartKey,
  );

  let nextItems;

  if (existingIndex >= 0) {
    nextItems = currentItems.map((cartItem, index) =>
      index === existingIndex
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          }
        : cartItem,
    );
  } else {
    nextItems = [...currentItems, nextItem];
  }

  writeCartItems(nextItems);
  return nextItems;
}

export function updateCartItemQuantity(cartKey, quantity) {
  const safeQuantity = toNumber(quantity, 1);

  const nextItems = readCartItems()
    .map((item) =>
      item.cartKey === cartKey
        ? {
            ...item,
            quantity: safeQuantity,
          }
        : item,
    )
    .filter((item) => item.quantity > 0);

  writeCartItems(nextItems);
  return nextItems;
}

export function removeCartItem(cartKey) {
  const nextItems = readCartItems().filter((item) => item.cartKey !== cartKey);
  writeCartItems(nextItems);
  return nextItems;
}

export function clearCartItems() {
  writeCartItems([]);
}

export function getCartTotals(items) {
  const subtotal = items.reduce(
    (total, item) => total + toNumber(item.price) * toNumber(item.quantity, 1),
    0,
  );

  const delivery = items.length ? DELIVERY_CHARGE : 0;
  const total = subtotal + delivery;

  return {
    subtotal,
    delivery,
    total,
  };
}

export function formatPrice(value) {
  return `$${toNumber(value).toFixed(value % 1 === 0 ? 0 : 2)}`;
}

export function useCart() {
  const [items, setItems] = useState([]);

  const syncCart = useCallback(() => {
    setItems(readCartItems());
  }, []);

  useEffect(() => {
    syncCart();

    window.addEventListener(CART_EVENT, syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener(CART_EVENT, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, [syncCart]);

  const addItem = useCallback((item, quantity = 1) => {
    setItems(addCartItem(item, quantity));
  }, []);

  const increaseItem = useCallback((cartKey) => {
    const currentItems = readCartItems();
    const item = currentItems.find((cartItem) => cartItem.cartKey === cartKey);

    if (!item) return;

    setItems(updateCartItemQuantity(cartKey, item.quantity + 1));
  }, []);

  const decreaseItem = useCallback((cartKey) => {
    const currentItems = readCartItems();
    const item = currentItems.find((cartItem) => cartItem.cartKey === cartKey);

    if (!item) return;

    setItems(updateCartItemQuantity(cartKey, item.quantity - 1));
  }, []);

  const removeItem = useCallback((cartKey) => {
    setItems(removeCartItem(cartKey));
  }, []);

  const clearCart = useCallback(() => {
    clearCartItems();
    setItems([]);
  }, []);

  const totals = useMemo(() => getCartTotals(items), [items]);

  return {
    items,
    totals,
    addItem,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart,
  };
}
