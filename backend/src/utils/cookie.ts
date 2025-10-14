import { Response } from "express";

export const COOKIE_NAME = "auth_token";
const isProd = process.env.NODE_ENV === "production";

console.log("🏭isProd", isProd);

export function setAuthCookie(res: Response, token: string): void {
    console.log("🪙token", token);
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}

export function clearAuthCookie(res: Response): void {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "strict" : "lax",
    });
}

