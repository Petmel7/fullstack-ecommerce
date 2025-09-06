"use client";

import { useState } from "react";
import { loginUser, registerUser } from "@/lib/api";
import { AuthResponse } from "@/types/auth";

interface AuthFormProps {
    type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let data: AuthResponse;
            if (type === "login") {
                data = await loginUser(email, password);
            } else {
                data = await registerUser(email, password, name);
            }
            localStorage.setItem("token", data.token);
            alert("✅ Success!");
        } catch (err) {
            console.error(err);
            setError("❌ Authentication failed");
        } finally {
            setLoading(false);
        }
    }

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
