

"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import AddToCartButton from "@/app/components/cart/AddToCartButton";
import { getImageUrl } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
            {product.imageUrl ? (
                <Image
                    src={getImageUrl(product.imageUrl)}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-cover rounded-lg border w-full h-48"
                    unoptimized
                />
            ) : (
                <div className="w-full h-48 flex items-center justify-center border rounded-lg text-gray-400">
                    No image
                </div>
            )}

            <p className="font-semibold mt-3">{product.name}</p>
            <p className="text-gray-600">${product.price}</p>
            <AddToCartButton product={product} />
        </div>
    );
};

export default ProductCard;

