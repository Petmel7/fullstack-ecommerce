
import { Order, CreateOrderDto } from "@/types/order";
import { getToken } from "@/utils/auth";
import { API_URL } from "@/lib/api";

export const orderService = {
    createOrder: async (data: CreateOrderDto): Promise<Order> => {
        const res = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Failed to create order");

        return res.json() as Promise<Order>;
    },

    getMyOrders: async (): Promise<Order[]> => {
        const res = await fetch(`${API_URL}/orders`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
    },

    getOrderById: async (id: number): Promise<Order> => {
        const res = await fetch(`${API_URL}/orders/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });

        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
    },

    updateOrderStatus: async (id: number, status: string): Promise<Order> => {
        const res = await fetch(`${API_URL}/orders/${id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ status }),
        });

        if (!res.ok) throw new Error("Failed to update order status");
        return res.json();
    },
};

