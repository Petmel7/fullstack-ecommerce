"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { API_URL } from "@/lib/api";

interface FavoritesContextType {
    favorites: Product[];
    count: number;
    isFavorite: (productId: number) => boolean;
    toggleFavorite: (product: Product) => Promise<void>;
    refresh: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/favorites`, { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch favorites");
            const data = await res.json();
            setFavorites(data.items ?? []);
        } catch (err) {
            console.error("fetchFavorites:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const toggleFavorite = async (product: Product) => {
        try {
            const res = await fetch(`${API_URL}/favorites/toggle`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || "Failed to toggle favorite");
            }

            const data = await res.json();
            setFavorites((prev) => {
                if (data.removed) {
                    return prev.filter((p) => p.id !== product.id);
                }
                return [product, ...prev.filter((p) => p.id !== product.id)];
            });
        } catch (err) {
            console.error("toggleFavorite:", err);
            throw err;
        }
    };

    const isFavorite = (productId: number) => favorites.some((p) => p.id === productId);

    return (
        <FavoritesContext.Provider
            value={{ favorites, count: favorites.length, isFavorite, toggleFavorite, refresh: fetchFavorites }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
    return ctx;
};
