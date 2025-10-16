
"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
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
    const [isHydrated, setIsHydrated] = useState(false);

    // 🧠 1. Завантажуємо корзину з localStorage тільки після гідрації
    useEffect(() => {
        try {
            const stored = localStorage.getItem("cart");
            if (stored) {
                setCart(JSON.parse(stored));
            }
        } catch (err) {
            console.error("Failed to load cart from localStorage:", err);
        }
        setIsHydrated(true);
    }, []);

    // 💾 2. Зберігаємо в localStorage при кожній зміні кошика
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, isHydrated]);

    // 🛒 3. Операції з кошиком
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

    // ⚡ 4. Не рендеримо дітей до гідрації (щоб уникнути mismatch)
    if (!isHydrated) return null;

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

