
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthFormProps } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";
import { API_URL } from "@/lib/api";

const AuthForm = ({ type }: AuthFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { refreshUser } = useAuth();

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const endpoint = `${API_URL}/auth/${type}`;
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password, name }),
            });

            if (!res.ok) throw new Error("Auth failed");

            await refreshUser();
            router.push("/profile");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError("❌ Помилка: " + err.message);
            } else {
                setError("❌ Невідома помилка");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl"
        >
            <h1 className="text-2xl font-bold mb-4">
                {type === "login" ? "Login" : "Register"}
            </h1>

            {type === "register" && (
                <input
                    type="text"
                    placeholder="Name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
                {loading ? "Loading..." : type === "login" ? "Login" : "Register"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
}

export default AuthForm;