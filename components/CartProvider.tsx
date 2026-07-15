"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Cart } from "@/lib/shopify";

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "over-the-rail-cart-id";

async function cartRequest(payload: Record<string, unknown>): Promise<Cart> {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong with the cart.");
  return data.cart;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cartId = window.localStorage.getItem(STORAGE_KEY);
    if (!cartId) return;

    cartRequest({ action: "get", cartId })
      .then(setCart)
      .catch(() => window.localStorage.removeItem(STORAGE_KEY));
  }, []);

  const rememberCart = useCallback((nextCart: Cart) => {
    setCart(nextCart);
    window.localStorage.setItem(STORAGE_KEY, nextCart.id);
  }, []);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const nextCart = cart?.id
        ? await cartRequest({ action: "add", cartId: cart.id, variantId, quantity })
        : await cartRequest({ action: "create", variantId, quantity });
      rememberCart(nextCart);
      setIsOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add this item.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cart?.id, rememberCart]);

  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    if (quantity <= 0) {
      await removeLine(lineId);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const nextCart = await cartRequest({ action: "update", cartId: cart.id, lineId, quantity });
      rememberCart(nextCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update this item.");
    } finally {
      setIsLoading(false);
    }
  }, [cart?.id, rememberCart]);

  const removeLine = useCallback(async (lineId: string) => {
    if (!cart?.id) return;
    setIsLoading(true);
    setError(null);
    try {
      const nextCart = await cartRequest({ action: "remove", cartId: cart.id, lineIds: [lineId] });
      rememberCart(nextCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to remove this item.");
    } finally {
      setIsLoading(false);
    }
  }, [cart?.id, rememberCart]);

  const value = useMemo(() => ({
    cart,
    isOpen,
    isLoading,
    error,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    updateLine,
    removeLine,
  }), [cart, isOpen, isLoading, error, addItem, updateLine, removeLine]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}
