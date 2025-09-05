import prisma from "../config/database";
import { hashPassword } from "../utils/hash";
import { UpdateProfileRequest, UserProfileResponse } from "../types/user";

export const getUserProfile = async (userId: number): Promise<UserProfileResponse | null> => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateUserProfile = async (
    userId: number,
    data: UpdateProfileRequest
): Promise<UserProfileResponse> => {
    const updateData: any = {};

    if (data.name) {
        updateData.name = data.name;
    }

    if (data.password) {
        updateData.password = await hashPassword(data.password);
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return updatedUser;
};
