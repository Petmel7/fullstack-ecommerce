export interface CreateOrderItemInput {
    productId: number;
    quantity: number;
}

export interface CreateOrderInput {
    items: CreateOrderItemInput[];
}

export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "CANCELED";