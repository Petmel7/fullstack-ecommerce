
import { API_URL } from "@/lib/api";
import { GetAllProductsResponse, Product } from "@/types/product";

export const getAllProducts = async (): Promise<GetAllProductsResponse> => {
    const res = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
};

export const productService = {
    createProduct: async (formData: FormData): Promise<Product> => {
        const res = await fetch(`${API_URL}/products`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        if (!res.ok) throw new Error("Failed to create product");

        const data = await res.json();
        return data.product;
    },

    updateProduct: async (id: number, formData: FormData): Promise<Product> => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });
        if (!res.ok) throw new Error("Failed to update product");

        const data = await res.json();
        return data.product;
    },

    deleteProduct: async (id: number) => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to delete product");
        return res.json();
    },

    getMyProducts: async (): Promise<Product[]> => {
        const res = await fetch(`${API_URL}/products/my`, {
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    },
};
