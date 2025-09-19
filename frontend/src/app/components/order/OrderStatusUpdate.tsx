"use client";

import { useState } from "react";
import { orderService } from "@/services/orderService";
import { Order } from "@/types/order";

export const ORDER_STATUSES = [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
] as const;

export type OrderStatus = typeof ORDER_STATUSES[number];

interface OrderStatusUpdateProps {
    order: Order;
    onUpdated?: (updated: Order) => void;
}

const OrderStatusUpdate = ({ order, onUpdated }: OrderStatusUpdateProps) => {
    const [status, setStatus] = useState<OrderStatus>(order.status as OrderStatus);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdate = async () => {
        setLoading(true);
        setError(null);

        try {
            const updated = await orderService.updateOrderStatus(order.id, status);
            if (onUpdated) onUpdated(updated);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <select
                value={status}
                onChange={(e) => {
                    const newStatus = ORDER_STATUSES.find((s) => s === e.target.value);
                    if (newStatus) setStatus(newStatus);
                }}
                className="border rounded p-2"
            >
                {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                ))}
            </select>

            <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                {loading ? "Updating..." : "Update Status"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default OrderStatusUpdate;

