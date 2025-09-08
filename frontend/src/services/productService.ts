
// import { API_URL } from "@/lib/api";

// export async function getAllProducts() {
//     const res = await fetch(`${API_URL}/products`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//     });
//     if (!res.ok) throw new Error("No products");
//     return res.json();
// }

// services/productService.ts
import { Product } from "@/types/product";

export interface GetAllProductsResponse {
    success: boolean;
    products: Product[];
}

export const getAllProducts = async (): Promise<GetAllProductsResponse> => {
    const res = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
};

