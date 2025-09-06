export interface AuthResponse {
    success: boolean;
    user: {
        id: number;
        email: string;
        name?: string | null;
    };
    token: string;
}
