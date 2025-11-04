
export interface CreateProductInput {
    name: string;
    slug?: string;
    description?: string;
    price: number;
    quantity?: number;
    imageUrl?: string;
}
