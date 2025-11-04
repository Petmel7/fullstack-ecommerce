import { Request, Response, NextFunction } from "express";
import { AppError } from "./error.middleware";

export const validateOrderInput = (req: Request, res: Response, next: NextFunction) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new AppError("Order must contain at least one item", 400);
    }

    for (const item of items) {
        if (!item.productId || typeof item.productId !== "number") {
            throw new AppError("Invalid productId in order items", 400);
        }
        if (!item.quantity || typeof item.quantity !== "number" || item.quantity <= 0) {
            throw new AppError("Invalid quantity in order items", 400);
        }
    }

    next();
};
