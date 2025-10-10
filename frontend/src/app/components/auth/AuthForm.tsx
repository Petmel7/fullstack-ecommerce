"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser, registerUser } from "@/services/authService";
import { AuthFormProps } from "@/types/auth";

const AuthForm = ({ type }: AuthFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (type === "login") {
                await loginUser(email, password);
                alert("✅ Login successful!");
                router.push("/profile");
            } else {
                await registerUser(email, password, name);
                alert("✅ Registration successful!");
                router.push("/login");
            }

        } catch (err: unknown) {
            console.error("❌ Error:", err);

            // Якщо це помилка типу Error
            if (err instanceof Error) {
                if (err.message.includes("User already exists")) {
                    setError("❌ Користувач з таким email уже існує");
                } else if (err.message.includes("Login failed")) {
                    setError("❌ Невірна пошта або пароль");
                } else {
                    setError(`❌ ${err.message}`);
                }
            } else {
                setError("❌ Сталася невідома помилка");
            }
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
