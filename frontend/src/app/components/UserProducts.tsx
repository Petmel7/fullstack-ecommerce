"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";
import CreateProductForm from "./profile/CreateProductForm";
import EditProductForm from "./profile/EditProductForm";
import ProductCard from "./product/ProductCard";

const UserProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [editing, setEditing] = useState<Product | null>(null);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const myProducts = await productService.getMyProducts();
                setProducts(myProducts);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserProducts()
    }, []);

    const handleDelete = async (id: number) => {
        await productService.deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const handleProductCreated = (product: Product) => {
        setProducts((prev) => [...prev, product]);
    };

    const handleProductUpdated = (updated: Product) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
        );
        setEditing(null);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">My Products</h1>

            <CreateProductForm onProductCreated={handleProductCreated} />

            {products.length === 0 ? (
                <p className="text-center text-gray-600">No products yet</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col"
                        >
                            {editing?.id === product.id ? (
                                <EditProductForm
                                    product={product}
                                    onProductUpdated={handleProductUpdated}
                                    onCancel={() => setEditing(null)}
                                />
                            ) : (
                                <>
                                    <ProductCard product={product} />

                                    <div className="flex justify-between mt-3">
                                        <button
                                            onClick={() => setEditing(product)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default UserProducts;