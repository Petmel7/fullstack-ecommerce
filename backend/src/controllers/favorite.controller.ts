import { Request, Response, NextFunction } from "express";
import prisma from "../config/database";
import { AppError } from "../middleware/error.middleware";

export const toggleFavorite = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { productId } = req.body;

        if (!userId) throw new AppError("Not authorized", 401);
        if (typeof productId !== "number") throw new AppError("Invalid productId", 400);

        const existing = await prisma.favorite.findUnique({
            where: { userId_productId: { userId, productId } },
        });

        if (existing) {
            await prisma.favorite.delete({ where: { id: existing.id } });
            return res.json({ message: "Removed from favorites", removed: true });
        }

        // Перевірка, що продукт існує (опціонально)
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new AppError("Product not found", 404);

        const fav = await prisma.favorite.create({
            data: { userId, productId },
        });

        return res.json({ message: "Added to favorites", favorite: fav, removed: false });
    } catch (err) {
        next(err);
    }
};

export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AppError("Not authorized", 401);

        const favorites = await prisma.favorite.findMany({
            where: { userId },
            include: {
                product: {
                    select: { id: true, name: true, price: true, imageUrl: true, slug: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        const products = favorites.map((f) => f.product);
        res.json({ items: products, count: products.length });
    } catch (err) {
        next(err);
    }
};
