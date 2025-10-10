import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/database";
import { AppError } from "./error.middleware";
import { AuthUser } from "../types/auth";

declare module "express-serve-static-core" {
    interface Request {
        user?: AuthUser;
    }
}

interface JwtPayload {
    userId: number;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return next(new AppError("Not authorized, no token", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        // Перевіряємо користувача в базі
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, name: true, role: true },
        });

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        req.user = user;
        next();
    } catch (err) {
        return next(new AppError("Not authorized, token failed", 401));
    }
};

