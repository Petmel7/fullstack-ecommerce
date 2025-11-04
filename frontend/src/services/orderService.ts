
import { Order } from "@/types/order";
import { API_URL } from "@/lib/api";
import { Cart, CartItem } from "@/types/cart";

interface CreateOrderPayload {
    items: {
        productId: number;
        quantity: number;
    }[];
}

export const orderService = {
    createOrder: async (cart: Cart): Promise<Order> => {
        // Формуємо payload для бекенду
        const payload: CreateOrderPayload = {
            items: cart.items.map((i: CartItem) => ({
                productId: i.product.id,
                quantity: i.quantity,
            })),
        };

        try {
            const res = await fetch(`${API_URL}/orders/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to create order");
            }

            const order: Order = await res.json();
            return order;
        } catch (error) {
            console.error("❌ Checkout error:", error);
            throw error;
        }
    },

    getMyOrders: async (): Promise<Order[]> => {
        const res = await fetch(`${API_URL}/orders`, {
            credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
    },

    getOrderById: async (id: number): Promise<Order> => {
        const res = await fetch(`${API_URL}/orders/${id}`, {
            credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
    },

    updateOrderStatus: async (id: number, status: string): Promise<Order> => {
        const res = await fetch(`${API_URL}/orders/${id}/status`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({ status }),
        });

        if (!res.ok) throw new Error("Failed to update order status");
        return res.json();
    },
};

