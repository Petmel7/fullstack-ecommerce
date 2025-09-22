"use client";

import { useCart } from "@/context/CartContext";

const CartView = () => {
    const { cart, removeItem, clearCart } = useCart();

    const total = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    if (cart.items.length === 0) {
        return <p className="text-center text-gray-500">Cart is empty</p>;
    }

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Your Cart</h1>

            <ul className="divide-y border rounded">
                {cart.items.map((item) => (
                    <li
                        key={item.product.id}
                        className="flex justify-between items-center p-3"
                    >
                        <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-600">
                                {item.quantity} × ${item.product.price}
                            </p>
                        </div>
                        <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-red-600 hover:underline"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={clearCart}
                    className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                >
                    Clear Cart
                </button>
                <button
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartView;
