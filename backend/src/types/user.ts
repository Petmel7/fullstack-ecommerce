
export interface UpdateProfileRequest {
    name?: string;
    password?: string;
}

export interface UserProfileResponse {
    id: number;
    name: string | null;
    email: string;
    role: "buyer" | "seller" | "admin";
    createdAt: Date;
    updatedAt: Date;
}

