
export interface OrderItem {
    productId: number;
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    totalPrice: number;
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
    createdAt: string;
    updatedAt: string;
}

export interface OrderItemInput {
    productId: number;
    quantity: number;
}

export interface CreateOrderDto {
    items: OrderItemInput[];
    shippingAddress: string;
    paymentMethod: string;
}

