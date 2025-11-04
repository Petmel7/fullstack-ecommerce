"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";

const FavoritesPage = () => {
    const { favorites, refresh } = useFavorites();

    useEffect(() => {
        refresh();
    }, []);

    if (favorites.length === 0) {
        return <div className="p-6">У тебе поки що немає улюблених товарів.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {favorites.map((product) => (
                <Link key={product.id} href={`/product/${product.slug ?? product.id}`}>
                    <div className="border rounded p-3 hover:shadow">
                        {/* <img src={p.imageUrl ?? "/no-image.png"} alt={p.name} className="w-full h-40 object-cover rounded" /> */}
                        <Image
                            src={getImageUrl(product.imageUrl)}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="object-cover rounded-lg border w-full h-48"
                            unoptimized
                        />
                        <h3 className="mt-2 font-semibold">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default FavoritesPage;
