import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

                <div className="mb-4 md:mb-0">
                    <h1 className="text-xl font-bold">Fullstack E-Commerce</h1>
                </div>

                <div className="flex space-x-6 mb-4 md:mb-0">
                    <Link href="/" className="hover:text-gray-400 transition">Home</Link>
                    <a href="/products" className="hover:text-gray-400 transition">Products</a>
                    <a href="/about" className="hover:text-gray-400 transition">About</a>
                    <a href="/contact" className="hover:text-gray-400 transition">Contact</a>
                </div>

                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-400 transition">Facebook</a>
                    <a href="#" className="hover:text-gray-400 transition">Twitter</a>
                    <a href="#" className="hover:text-gray-400 transition">Instagram</a>
                </div>
            </div>

            <div className="text-center text-gray-400 text-sm mt-4">
                &copy; {new Date().getFullYear()} Fullstack E-Commerce. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
