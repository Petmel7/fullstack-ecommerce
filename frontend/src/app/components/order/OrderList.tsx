"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/orderService";
import Link from "next/link";
import { Order } from "@/types/order";

const OrderList = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await orderService.getMyOrders();
                setOrders(data);
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message);
                else setError("Unknown error");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">My Orders</h1>

            {orders.length === 0 ? (
                <p className="text-gray-600">No orders yet</p>
            ) : (
                <ul className="space-y-3">
                    {orders.map((order) => (
                        <li
                            key={order.id}
                            className="p-4 border rounded-lg shadow flex justify-between items-center"
                        >
                            <div>
                                <p className="font-medium">
                                    Order #{order.id} — {order.status}
                                </p>
                                <p className="text-gray-500">
                                    {order.items.length} items — $
                                    {order.totalPrice}
                                </p>
                            </div>
                            <Link
                                href={`/orders/${order.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                View
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderList;
