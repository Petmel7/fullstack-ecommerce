import { API_URL } from "@/lib/api";

export const loginUser = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

export const registerUser = async (email: string, password: string, name?: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
        credentials: "include",
    });
    if (!res.ok) throw new Error("Register failed");
    return res.json();
}