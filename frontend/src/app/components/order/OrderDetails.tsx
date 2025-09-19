"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/orderService";
import { Order } from "@/types/order";

interface OrderDetailsProps {
    orderId: number;
}

const OrderDetails = ({ orderId }: OrderDetailsProps) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const data = await orderService.getOrderById(orderId);
                setOrder(data);
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message);
                else setError("Unknown error");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    if (loading) return <p>Loading order...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!order) return null;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">
                Order #{order.id} — {order.status}
            </h1>
            <ul className="space-y-2">
                {order.items.map((item) => (
                    <li
                        key={item.productId}
                        className="flex justify-between border-b pb-2"
                    >
                        <span>
                            {item.name} × {item.quantity}
                        </span>
                        <span>${item.price}</span>
                    </li>
                ))}
            </ul>
            <p className="font-bold">Total: ${order.totalPrice}</p>
        </div>
    );
};

export default OrderDetails;
