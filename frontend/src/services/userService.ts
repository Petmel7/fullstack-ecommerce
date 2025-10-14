
import { API_URL } from "@/lib/api";
import { GetProfileResponse, User } from "@/types/user";

export const getUserProfile = async (): Promise<GetProfileResponse<User>> => {
    const res = await fetch(`${API_URL}/users/profile`, {
        method: "GET",
        credentials: "include",
    });

    console.log("💬res", res);

    if (!res.ok) {
        throw new Error("Failed to fetch user profile");
    }

    return res.json() as Promise<GetProfileResponse<User>>;
}
