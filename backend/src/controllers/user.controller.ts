import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { AppError } from "../middleware/error.middleware";
import { UpdateProfileRequest } from "../types/user";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return next(new AppError("Not authorized", 401));
        }

        const user = await userService.getUserProfile(req.user.id);

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return next(new AppError("Not authorized", 401));
        }

        const { name, password } = req.body as UpdateProfileRequest;

        if (!name && !password) {
            return next(new AppError("No fields to update", 400));
        }

        const updatedUser = await userService.updateUserProfile(req.user.id, { name, password });

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};
