
import { Request, Response, NextFunction } from "express";
import { productService } from "../services/product.service";
import { AppError } from "../middleware/error.middleware";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) return next(new AppError("Not authorized", 401));

        const { name, description, price, quantity } = req.body;
        if (!name || !price) return next(new AppError("Name and price are required", 400));

        const photoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

        const product = await productService.createProduct(
            {
                name,
                description,
                price: parseFloat(price),
                quantity: parseInt(quantity, 10) || 0,
            },
            req.user.id,
            photoUrl
        );

        res.status(201).json({ success: true, product });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) return next(new AppError("Not authorized", 401));

        const { id } = req.params;
        const { name, description, price, quantity } = req.body;

        const photoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedProduct = await productService.updateProduct(
            parseInt(id, 10),
            {
                name,
                description,
                price: price ? parseFloat(price) : undefined,
                quantity: quantity ? parseInt(quantity, 10) : undefined,
            },
            req.user.id,
            photoUrl
        );

        res.json({ success: true, product: updatedProduct });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productService.deleteProduct(parseInt(req.params.id), req.user!.id);
        res.json({ success: true, message: "Product deleted" });
    } catch (err) {
        next(err);
    }
};

export const getMyProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getMyProducts(req.user!.id);
        res.json(products);
    } catch (err) {
        next(err);
    }
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getAllProducts();
        res.json({ success: true, products });
    } catch (err) {
        next(err);
    }
};
