
import { API_URL } from "@/lib/api";
import { GetAllProductsResponse } from "@/types/product";

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

