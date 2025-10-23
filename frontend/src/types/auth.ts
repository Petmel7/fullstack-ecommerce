export type AuthType = "login" | "register";

export interface AuthFormProps {
    type: AuthType;
}

export interface AuthResponse {
    success: boolean;
    user: {
        id: number;
        email: string;
        name?: string | null;
    };
    token: string;
}
