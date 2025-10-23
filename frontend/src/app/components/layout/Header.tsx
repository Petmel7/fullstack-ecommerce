"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Heart, User, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    🛍️ E-Shop
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <Link href="/catalog" className="hover:text-blue-600 transition">
                        Catalog
                    </Link>
                    <Link href="/about" className="hover:text-blue-600 transition">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-blue-600 transition">
                        Contact
                    </Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <Link href="/favorites">
                        <Heart className="w-6 h-6 text-gray-600 hover:text-blue-600 transition" />
                    </Link>
                    <Link href="/cart">
                        <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-blue-600 transition" />
                    </Link>

                    {user ? (
                        <>
                            <Link href="/profile">
                                <User className="w-6 h-6 text-gray-700 hover:text-blue-600" />
                            </Link>
                            <button onClick={logout}>
                                <LogOut className="w-6 h-6 text-gray-700 hover:text-red-600" />
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                            Login
                        </Link>
                    )}

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <nav className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-3 space-y-2">
                    <Link
                        href="/catalog"
                        className="block text-gray-700 hover:text-blue-600 transition"
                    >
                        Catalog
                    </Link>
                    <Link
                        href="/about"
                        className="block text-gray-700 hover:text-blue-600 transition"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="block text-gray-700 hover:text-blue-600 transition"
                    >
                        Contact
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
