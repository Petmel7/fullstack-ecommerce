import prisma from "../config/database";
import { AppError } from "../middleware/error.middleware";
import { CreateOrderInput, OrderStatus } from "../types/order";

export const orderService = {
    async createOrder(userId: number, data: CreateOrderInput) {
        console.log("📦 Creating order for user:", userId);
        console.log("🧾 Received data:", data);

        // Перевірка на наявність товарів
        if (!data.items || data.items.length === 0) {
            throw new AppError("Order must have at least one item", 400);
        }

        // Отримуємо ID продуктів
        const productIds = data.items.map((item) => item.productId);

        // Підтягуємо актуальні ціни з бази
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, price: true },
        });

        if (products.length !== productIds.length) {
            throw new AppError("One or more products not found", 404);
        }

        // Рахуємо totalAmount на основі даних з бази
        const totalAmount = data.items.reduce((sum, item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) {
                throw new AppError(`Product with ID ${item.productId} not found`, 404);
            }
            return sum + product.price * item.quantity;
        }, 0);

        console.log("💰 Total amount:", totalAmount);

        // Створюємо замовлення
        const order = await prisma.order.create({
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
                items: {
                    include: { product: true },
                },
            },
        });

        console.log("✅ Order created successfully:", order.id);

        return order;
    },

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
