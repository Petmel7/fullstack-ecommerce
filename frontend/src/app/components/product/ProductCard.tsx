"use client";

import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="p-3 border rounded-lg shadow-sm">
            {product.imageUrl ? (
                <Image
                    src={`http://localhost:5000${product.imageUrl}`}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-cover rounded-lg border"
                    unoptimized
                />
            ) : (
                <div className="w-[150px] h-[150px] flex items-center justify-center border rounded-lg text-gray-400">
                    No image
                </div>
            )}

            <p className="font-semibold mt-2">{product.name}</p>
            <p className="text-gray-600">${product.price}</p>
        </div>
    );
}

export default ProductCard;
