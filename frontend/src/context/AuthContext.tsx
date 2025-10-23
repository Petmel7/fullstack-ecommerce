
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@/types/user";
import {
    getUserProfile,
    loginUser,
    registerUser,
    logoutUser,
} from "@/services/authService";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    register: async () => { },
    logout: async () => { },
    refreshUser: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    /**
     * 🔄 Оновити стан користувача з бекенду (через cookie)
     */
    const refreshUser = async () => {
        try {
            const res = await getUserProfile();
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    /**
     * 🔑 Логін користувача
     */
    const login = async (email: string, password: string) => {
        await loginUser(email, password);
        await refreshUser();
        router.push("/profile");
    };

    /**
     * 🧾 Реєстрація
     */
    const register = async (email: string, password: string, name: string) => {
        await registerUser(email, password, name);
        router.push("/login");
    };

    /**
     * 🚪 Логаут
     */
    const logout = async () => {
        await logoutUser();
        setUser(null);
        router.push("/login");
    };

    /**
     * 🧠 При першому рендері — отримати користувача з cookie
     */
    useEffect(() => {
        refreshUser();
    }, []);

    /**
     * 🔁 Автоматичний redirect:
     * - Якщо неавторизований і не на login/register → редірект на /login
     * - Якщо авторизований і на login/register → редірект на /profile
     */
    useEffect(() => {
        if (loading) return;

        const authPaths = ["/login", "/register"];

        if (!user && !authPaths.includes(pathname)) {
            router.push("/login");
        } else if (user && authPaths.includes(pathname)) {
            router.push("/profile");
        }
    }, [user, loading, pathname, router]);

    console.log("👤 AuthContext user:", user);

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
