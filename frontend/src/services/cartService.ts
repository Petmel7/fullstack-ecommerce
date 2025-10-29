
import { API_URL } from "@/lib/api";
import { Cart } from "@/types/cart";

export const checkoutOrder = async (cart: Cart) => {
    const res = await fetch(`${API_URL}/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(cart),
    });

    if (!res.ok) throw new Error("Checkout failed");
    return res.json();
};
