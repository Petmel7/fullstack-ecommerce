
import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { RegisterRequest, LoginRequest } from "../types/auth";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body as RegisterRequest;

        const { user, token } = await authService.registerUser({ email, password, name });

        res.status(201).json({
            message: "User registered successfully",
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as LoginRequest;

        const { user, token } = await authService.loginUser({ email, password });

        res.status(200).json({
            message: "Login successful",
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
};