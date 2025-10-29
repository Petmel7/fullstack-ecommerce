
"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

const CartView = () => {
    const { cart, removeItem, clearCart, checkout } = useCart();

    console.log("CartView cart", cart);
    console.log("getImageUrl", getImageUrl());

    const total = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {cart.items.length === 0 ? (
                <p className="text-gray-500">Your cart is empty 🛒</p>
            ) : (
                <>
                    <ul className="space-y-4 mb-4">
                        {cart.items.map(({ product, quantity }) => (
                            <li
                                key={product.id}
                                className="flex items-center justify-between border-b pb-2"
                            >
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={getImageUrl(product.imageUrl)}
                                        alt={product.name}
                                        width={60}
                                        height={60}
                                        className="rounded"
                                        unoptimized
                                    />
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm text-gray-500">
                                            ${product.price} × {quantity}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeItem(product.id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between items-center border-t pt-4">
                        <p className="font-semibold text-lg">Total: ${total.toFixed(2)}</p>

                        <div className="flex gap-3">
                            <button
                                onClick={clearCart}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                            >
                                Clear Cart
                            </button>

                            <button
                                onClick={checkout}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartView;
