
export interface GetProfileResponse<T> {
    success: boolean;
    data: T;
}

export interface User {
    id: number;
    name: string | null;
    email: string;
    role: "buyer" | "seller" | "admin";
    createdAt: string;
    updatedAt: string;
}

