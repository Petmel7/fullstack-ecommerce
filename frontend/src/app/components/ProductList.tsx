
"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/services/productService";
import { Product } from "@/types/product";

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
                        {product.name} – ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;