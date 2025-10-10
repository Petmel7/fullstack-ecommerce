
import prisma from "../config/database";

export const getAllUsers = async () => {
    return prisma.user.findMany();
};