
import { Order } from "@/types/order";
import { API_URL } from "@/lib/api";
import { Cart } from "@/types/cart";

export const orderService = {
    createOrder: async (cart: Cart): Promise<Order> => {
        const payload = {
            items: cart.items.map((i) => ({
                productId: i.product.id,
                quantity: i.quantity,
            })),
            totalAmount: cart.items.reduce(
                (sum, i) => sum + i.product.price * i.quantity,
                0
            ),
        };

        const res = await fetch(`${API_URL}/orders/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to create order");

        return res.json() as Promise<Order>;
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

