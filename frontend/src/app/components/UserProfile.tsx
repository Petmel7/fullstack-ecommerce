
"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/userService";
import { User } from "@/types/user";

export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             setLoading(false);
    //             return;
    //         }

    //         try {
    //             const data = await getUserProfile(token);
    //             setUser(data);
    //         } catch (err) {
    //             console.error("Failed to load user profile:", err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchProfile();
    // }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await getUserProfile(token);
                setUser(response.data); // 🔥 тут беремо .data, а не весь response
            } catch (err) {
                console.error("Failed to load user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found or not logged in</p>;
    console.log('user.profile', user);
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8">
            <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
}

