
"use client";

import { useAuth } from "@/context/AuthContext";
import UserProducts from "./UserProducts";

const UserProfile = () => {
    const { user, loading } = useAuth();

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!user) return null;

    return (
        <>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8">
                <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>

            <UserProducts />
        </>
    );
}

export default UserProfile;
