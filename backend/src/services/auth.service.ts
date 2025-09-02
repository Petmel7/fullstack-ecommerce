
import prisma from "../config/database";
import { AppError } from "../middleware/error.middleware";
import { hashPassword, comparePassword } from "../utils/hash";
import { RegisterRequest, LoginRequest, AuthResponse } from "../types/auth";
import generateToken from "../utils/jwt";

export const registerUser = async (data: RegisterRequest) => {
    const { email, password, name } = data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new AppError("User already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name: name || null,
        },
    });

    const token = generateToken(user.id);

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    };
};

export const loginUser = async (data: LoginRequest) => {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken(user.id);

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    };
};

