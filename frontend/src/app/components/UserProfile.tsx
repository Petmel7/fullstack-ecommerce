
"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/userService";
import { User } from "@/types/user";
import AuthForm from "./auth/AuthForm";
import UserProducts from "./UserProducts";

const UserProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setUser(response.data);
            } catch (err) {
                console.error("Failed to load user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!user) return <AuthForm type="register" />;

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


// "use client";

// import { useCallback } from "react";
// import { getUserProfile } from "@/services/userService";
// import { User } from "@/types/user";
// import { getToken } from "@/utils/auth";
// import AuthForm from "./auth/AuthForm";
// import UserProducts from "./UserProducts";
// import { useFetch } from "@/hooks/useFetch";
// import AsyncState from "./common/AsyncState";

// const UserProfile = () => {
//     const token = getToken();

//     const fetchUserProfile = useCallback(async () => {
//         if (!token) throw new Error("No token");
//         const response = await getUserProfile(token);
//         return response.data;
//     }, [token]);

//     const { data: user, loading, error } = useFetch<User>(
//         fetchUserProfile,
//         { autoRun: Boolean(token), deps: [token] }
//     );

//     if (!token) return <AuthForm type="register" />;

//     return (
//         <>
//             <AsyncState loading={loading} error={error} />

//             {!loading && user && (
//                 <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8">
//                     <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>
//                     <p><strong>Name:</strong> {user.name}</p>
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <p><strong>Role:</strong> {user.role}</p>
//                 </div>
//             )}

//             {user && <UserProducts />}
//         </>
//     );
// };

// export default UserProfile;

