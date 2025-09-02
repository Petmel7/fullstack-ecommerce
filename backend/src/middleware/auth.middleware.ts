import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/database";
import { AppError } from "./error.middleware";

// Розширюємо Express Request, щоб у нього був user
declare module "express-serve-static-core" {
    interface Request {
        user?: {
            id: number;
            email: string;
            name: string;
            role: string;
        };
    }
}

interface JwtPayload {
    userId: number;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Not authorized, no token", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            return next(new AppError("User not found", 404));
        }

        req.user = user; // тепер без ts-ignore
        next();
    } catch (error) {
        return next(new AppError("Not authorized, token failed", 401));
    }
};