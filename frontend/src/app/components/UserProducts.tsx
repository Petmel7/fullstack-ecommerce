// "use client";

// import { useEffect, useState } from "react";
// import { productService } from "@/services/productService";
// import { Product } from "@/types/product";
// import CreateProductForm from "./profile/CreateProductForm";
// import EditProductForm from "./profile/EditProductForm";
// import ProductCard from "./product/ProductCard";

// const UserProducts = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [editing, setEditing] = useState<Product | null>(null);

//     useEffect(() => {
//         productService.getMyProducts().then(setProducts).catch(console.error);
//     }, []);

//     const handleDelete = async (id: number) => {
//         await productService.deleteProduct(id);
//         setProducts((prev) => prev.filter((p) => p.id !== id));
//     };

//     const handleProductCreated = (product: Product) => {
//         setProducts((prev) => [...prev, product]);
//     };

//     const handleProductUpdated = (updated: Product) => {
//         setProducts((prev) =>
//             prev.map((p) => (p.id === updated.id ? updated : p))
//         );
//         setEditing(null);
//     };

//     console.log("products", products);

//     return (
//         <div className="p-6 space-y-6">
//             <h1 className="text-2xl font-bold text-center">My Products</h1>

//             <CreateProductForm onProductCreated={handleProductCreated} />

//             {products.length === 0 ? (
//                 <p>No products yet</p>
//             ) : (
//                 <ul className="space-y-3">
//                     {products.map((product) => (
//                         <li
//                             key={product.id}
//                             className="flex flex-col gap-2 p-3 border rounded-lg shadow"
//                         >
//                             {editing?.id === product.id ? (
//                                 <EditProductForm
//                                     product={product}
//                                     onProductUpdated={handleProductUpdated}
//                                     onCancel={() => setEditing(null)}
//                                 />
//                             ) : (
//                                 <>
//                                     <ProductCard product={product} />

//                                     <div className="space-x-2">
//                                         <button
//                                             onClick={() => setEditing(product)}
//                                             className="px-3 py-1 bg-blue-600 text-white rounded"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(product.id)}
//                                             className="px-3 py-1 bg-red-600 text-white rounded"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default UserProducts;



// components/UserProducts.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";
import CreateProductForm from "./profile/CreateProductForm";
import EditProductForm from "./profile/EditProductForm";
import ProductCard from "./product/ProductCard";
import { useFetch } from "@/hooks/useFetch";
import AsyncState from "./common/AsyncState";

const UserProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [editing, setEditing] = useState<Product | null>(null);

    const fetchMyProducts = useCallback(() => {
        return productService.getMyProducts();
    }, []);

    const { data, loading, error } = useFetch<Product[]>(fetchMyProducts);

    useEffect(() => {
        if (data) setProducts(data);
    }, [data]);

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

            <AsyncState loading={loading} error={error} />

            {!loading && products.length === 0 && (
                <p className="text-center text-gray-600">No products yet</p>
            )}

            <ul className="space-y-3">
                {products.map((product) => (
                    <li
                        key={product.id}
                        className="flex flex-col gap-2 p-3 border rounded-lg shadow"
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

                                <div className="space-x-2">
                                    <button
                                        onClick={() => setEditing(product)}
                                        className="px-3 py-1 bg-blue-600 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProducts;
