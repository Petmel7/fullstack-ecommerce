"use client";

import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileIcon() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = document.cookie.includes("auth_token");
        setIsAuthenticated(token);
    }, []);

    const handleClick = () => {
        if (!isAuthenticated) {
            router.push("/register");
        } else {
            router.push("/profile");
        }
    };

    return (
        <button onClick={handleClick}>
            <User className="w-6 h-6 text-gray-600 hover:text-blue-600 transition" />
        </button>
    );
}
