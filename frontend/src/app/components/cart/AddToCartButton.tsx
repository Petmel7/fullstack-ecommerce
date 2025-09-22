"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
    product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
    const { addItem } = useCart();

    return (
        <button
            onClick={() => addItem(product)}
            className="px-3 py-1 bg-blue-600 text-white rounded"
        >
            Add to Cart
        </button>
    );
};

export default AddToCartButton;

