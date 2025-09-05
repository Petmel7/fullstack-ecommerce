
export interface UpdateProfileRequest {
    name?: string;
    password?: string;
}

export interface UserProfileResponse {
    id: number;
    name: string | null;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
