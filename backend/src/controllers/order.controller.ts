import { Request, Response, NextFunction } from "express";
import { orderService } from "../services/order.service";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const order = await orderService.createOrder(userId, req.body);
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const orders = await orderService.getMyOrders(userId);
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const orderId = parseInt(req.params.id);
        const order = await orderService.getOrderById(orderId, userId);
        res.json(order);
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = parseInt(req.params.id);
        const { status } = req.body;
        const updated = await orderService.updateOrderStatus(orderId, status);
        res.json(updated);
    } catch (error) {
        next(error);
    }
};

export const checkoutOrder = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const { items } = req.body;

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const order = await orderService.createOrder(user.id, { items });

        res.status(201).json({ success: true, data: order });
    } catch (err: any) {
        console.error("❌ Checkout error:", err);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Failed to checkout",
        });
    }
};

