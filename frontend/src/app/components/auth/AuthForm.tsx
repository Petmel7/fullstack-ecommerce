
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { AuthFormProps } from "@/types/auth";

const AuthForm = ({ type }: AuthFormProps) => {
    const router = useRouter();
    const { login, register } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (type === "login") {
                await login(email, password);
            } else {
                await register(email, password, name);
            }
        } catch (err) {
            console.error("❌ Auth error:", err);
            setError("❌ Invalid credentials or something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-12"
        >
            <h1 className="text-2xl font-bold mb-4 text-center">
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
                {loading
                    ? "Loading..."
                    : type === "login"
                        ? "Login"
                        : "Register"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="text-sm text-center mt-4 text-gray-600">
                {type === "login" ? (
                    <>
                        Don’t have an account?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/register")}
                            className="text-blue-600 hover:underline"
                        >
                            Register
                        </button>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="text-blue-600 hover:underline"
                        >
                            Login
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};

export default AuthForm;
