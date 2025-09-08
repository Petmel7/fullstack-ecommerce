
import prisma from "../config/database";
import { AppError } from "../middleware/error.middleware";
import { CreateProductInput } from "../types/product";

export const productService = {
    createProduct(data: CreateProductInput, sellerId: number) {
        return prisma.product.create({
            data: { ...data, sellerId },
        });
    },

    async updateProduct(id: number, data: Partial<CreateProductInput>, sellerId: number) {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) throw new AppError("Product not found", 404);

        if (product.sellerId !== sellerId) throw new AppError("Not authorized", 403);

        return prisma.product.update({
            where: { id },
            data,
        });
    },

    async deleteProduct(id: number, sellerId: number) {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) throw new AppError("Product not found", 404);

        if (product.sellerId !== sellerId) throw new AppError("Not authorized", 403);

        return prisma.product.delete({ where: { id } });
    },

    getMyProducts(sellerId: number) {
        return prisma.product.findMany({ where: { sellerId } });
    },

    getAllProducts() {
        return prisma.product.findMany();
    },
};

