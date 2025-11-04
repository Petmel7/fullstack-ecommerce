export interface GetAllProductsResponse {
    success: boolean;
    products: Product[];
}

export interface Product {
    id: number;
    name: string;
    slug?: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    sellerId: number;
    createdAt: string;
    updatedAt: string;
}

// export interface Product {
//     id: number;
//     name: string;
//     slug?: string;
//     price: number;
//     imageUrl?: string | null;
// }


