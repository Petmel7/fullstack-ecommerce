
import { Order, CreateOrderDto } from "@/types/order";
import { API_URL } from "@/lib/api";

export const orderService = {
    createOrder: async (data: CreateOrderDto): Promise<Order> => {
        const res = await fetch(`${API_URL}/orders`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
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

