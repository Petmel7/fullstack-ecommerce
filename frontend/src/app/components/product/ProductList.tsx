
"use client";

// import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/services/productService";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    console.log('products', products);
    return (
        <div>
            <h2 className="text-xl font-bold">Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id} className="p-2 border-b">
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;