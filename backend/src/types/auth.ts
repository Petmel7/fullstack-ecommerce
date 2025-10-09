
export interface RegisterRequest {
    email: string;
    password: string;
    name?: string;
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

export interface AuthUser {
    id: number;
    email: string;
    name: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

