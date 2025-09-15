
import { API_URL } from "@/lib/api";
import { GetAllProductsResponse, Product } from "@/types/product";
import { getToken } from "@/utils/auth";

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
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            body: formData,
        });
        if (!res.ok) throw new Error("Failed to create product");
        return res.json();
    },

    updateProduct: async (id: number, formData: FormData): Promise<Product> => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            body: formData,
        });
        if (!res.ok) throw new Error("Failed to update product");
        return res.json();
    },

    deleteProduct: async (id: number) => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        if (!res.ok) throw new Error("Failed to delete product");
        return res.json();
    },

    getMyProducts: async (): Promise<Product[]> => {
        const res = await fetch(`${API_URL}/products/my`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    },
};
