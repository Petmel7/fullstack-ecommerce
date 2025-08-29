// Auth controller
import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.createUser(name, email, password);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};