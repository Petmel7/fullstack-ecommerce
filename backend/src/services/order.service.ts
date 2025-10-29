import prisma from "../config/database";
import { AppError } from "../middleware/error.middleware";
// import { CreateOrderInput, OrderStatus } from "../types/order";
import { OrderStatus } from "../types/order";

interface CreateOrderInput {
    items: {
        productId: number;
        quantity: number;
    }[];
}

export const orderService = {
    async createOrder(userId: number, data: CreateOrderInput) {
        if (!data.items || data.items.length === 0) {
            throw new AppError("Order must have at least one item", 400);
        }

        // отримуємо ціни з бази, щоб уникнути маніпуляцій на фронтенді
        const products = await prisma.product.findMany({
            where: { id: { in: data.items.map((i) => i.productId) } },
            select: { id: true, price: true },
        });

        const totalAmount = data.items.reduce((sum, item) => {
            const product = products.find((p) => p.id === item.productId);
            return sum + (product?.price || 0) * item.quantity;
        }, 0);

        return await prisma.order.create({
            data: {
                userId,
                totalAmount,
                items: {
                    create: data.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: { include: { product: true } },
            },
        });
    },


    // async createOrder(userId: number, data: CreateOrderInput) {
    //     if (!data.items || data.items.length === 0) {
    //         throw new AppError("Order must have at least one item", 400);
    //     }

    //     return await prisma.order.create({
    //         data: {
    //             userId,
    //             items: {
    //                 create: data.items.map((item) => ({
    //                     productId: item.productId,
    //                     quantity: item.quantity,
    //                 })),
    //             },
    //         },
    //         include: {
    //             items: {
    //                 include: { product: true },
    //             },
    //         },
    //     });
    // },

    async getMyOrders(userId: number) {
        return await prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });
    },

    async getOrderById(id: number, userId: number) {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: { include: { product: true } },
                user: true,
            },
        });

        if (!order) throw new AppError("Order not found", 404);
        if (order.userId !== userId) throw new AppError("Not authorized", 403);

        return order;
    },

    async updateOrderStatus(id: number, status: OrderStatus) {
        const order = await prisma.order.findUnique({ where: { id } });
        if (!order) throw new AppError("Order not found", 404);

        return await prisma.order.update({
            where: { id },
            data: { status },
        });
    },
};
