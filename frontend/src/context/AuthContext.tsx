// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { getUserProfile } from "@/services/userService";
// import { User } from "@/types/user";

// interface AuthContextType {
//     user: User | null;
//     loading: boolean;
//     refreshUser: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({
//     user: null,
//     loading: true,
//     refreshUser: async () => { },
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);

//     // const refreshUser = async () => {
//     //     try {
//     //         const res = await getUserProfile();
//     //         setUser(res.data);
//     //     } catch {
//     //         setUser(null);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const refreshUser = async () => {
//         try {
//             const res = await getUserProfile();
//             setUser(res.data);
//         } catch {
//             // ❗️НЕ очищай user одразу
//             console.warn("⚠️ No user found");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         refreshUser();
//     }, []);

//     console.log("refreshUser👉user", user);

//     return (
//         <AuthContext.Provider value={{ user, loading, refreshUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);



"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "@/services/userService";

interface User {
    id: number;
    name: string | null;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUser: async () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const res = await getUserProfile();
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    useEffect(() => {
        refreshUser();
    }, []);

    console.log("🧩 AuthContext → user", user);

    return (
        <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
