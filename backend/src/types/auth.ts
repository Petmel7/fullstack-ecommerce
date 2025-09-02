
export interface RegisterRequest {
    email: string;
    password: string;
    name?: string; // необов’язкове поле
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name?: string | null;
    };
}
