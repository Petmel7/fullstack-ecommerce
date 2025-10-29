"use client";

import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
    product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
    const { addItem } = useCart();
    const router = useRouter();

    console.log("🛍️AddToCartButton👉product", product);

    const handleAdd = () => {
        addItem(product);
        router.push("/cart");
    };

    return (
        <button
            onClick={handleAdd}
            className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
        >
            Add to Cart
        </button>
    );
};

export default AddToCartButton;

