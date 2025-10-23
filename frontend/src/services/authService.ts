
import { API_URL } from "@/lib/api";
import { AuthType } from "@/types/auth";
import { GetProfileResponse, User } from "@/types/user";

/**
 * Загальний хелпер для виконання запитів з обробкою помилок
 */
async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    console.log("endpoint", endpoint);
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        let message = "Помилка запиту";
        try {
            const errorData = await res.json();
            message = errorData.message || message;
        } catch {
            /* ignore */
        }
        throw new Error(message);
    }

    return res.json() as Promise<T>;
}

/**
 * Реєстрація або логін користувача
 */
export async function authUser(
    type: AuthType,
    email: string,
    password: string,
    name?: string
) {
    console.log("type", type);
    return request(`/auth/${type}`, {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
    });
}

/**
 * Окремо: login
 */
export async function loginUser(
    email: string,
    password: string) {
    return authUser("login", email, password);
}

/**
 * Окремо: register
 */
export async function registerUser(
    email: string,
    password: string,
    name: string
) {
    return authUser("register", email, password, name);
}

/**
 * Logout — знищує cookie на бекенді
 */
export async function logoutUser() {
    return request("/auth/logout", {
        method: "POST",
    });
}

/**
 * Отримати профіль користувача (автоматично з cookie)
 */
export async function getUserProfile(): Promise<GetProfileResponse<User>> {
    return request("/users/profile", {
        method: "GET",
    });
}

/**
 * Оновити токен (наприклад, при автооновленні сесії)
 */
export async function refreshToken() {
    return request("/auth/refresh", {
        method: "POST",
    });
}
