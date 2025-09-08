
import { Request, Response, NextFunction } from "express";
import { productService } from "../services/product.service";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productService.createProduct(req.body, req.user!.id);
        res.status(201).json({ success: true, product });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productService.updateProduct(
            parseInt(req.params.id),
            req.body,
            req.user!.id
        );
        res.json({ success: true, product });
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
        res.json({ success: true, products });
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
