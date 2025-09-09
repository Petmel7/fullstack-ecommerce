
import { API_URL } from "@/lib/api";
import { GetProfileResponse, User } from "@/types/user";

export async function getUserProfile(token: string): Promise<GetProfileResponse<User>> {
    const res = await fetch(`${API_URL}/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user profile");
    }

    return res.json() as Promise<GetProfileResponse<User>>;
}
