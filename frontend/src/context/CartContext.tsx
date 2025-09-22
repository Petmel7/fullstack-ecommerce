"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Cart } from "@/types/cart";
import { Product } from "@/types/product";

interface CartContextValue {
    cart: Cart;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart>({ items: [] });

    const addItem = (product: Product, quantity: number = 1) => {
        setCart((prev) => {
            const existing = prev.items.find((i) => i.product.id === product.id);

            if (existing) {
                return {
                    items: prev.items.map((i) =>
                        i.product.id === product.id
                            ? { ...i, quantity: i.quantity + quantity }
                            : i
                    ),
                };
            }

            return { items: [...prev.items, { product, quantity }] };
        });
    };

    const removeItem = (productId: number) => {
        setCart((prev) => ({
            items: prev.items.filter((i) => i.product.id !== productId),
        }));
    };

    const clearCart = () => setCart({ items: [] });

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextValue => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};
