

// "use client";

// import Image from "next/image";
// import { Product } from "@/types/product";
// import AddToCartButton from "@/app/components/cart/AddToCartButton";
// import { getImageUrl } from "@/lib/utils";

// interface ProductCardProps {
//     product: Product;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//     return (
//         <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
//             {product.imageUrl ? (
//                 <Image
//                     src={getImageUrl(product.imageUrl)}
//                     alt={product.name}
//                     width={200}
//                     height={200}
//                     className="object-cover rounded-lg border w-full h-48"
//                     unoptimized
//                 />
//             ) : (
//                 <div className="w-full h-48 flex items-center justify-center border rounded-lg text-gray-400">
//                     No image
//                 </div>
//             )}

//             <p className="font-semibold mt-3">{product.name}</p>
//             <p className="text-gray-600">${product.price}</p>
//             <AddToCartButton product={product} />
//         </div>
//     );
// };

// export default ProductCard;



"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import AddToCartButton from "@/app/components/cart/AddToCartButton";
import { getImageUrl } from "@/lib/utils";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart } from "lucide-react";
import { clsx } from 'clsx';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const fav = isFavorite(product.id);

    const onHeart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await toggleFavorite(product);
        } catch (err) {
            console.log("err", err);
            alert("Не вдалось оновити улюблене. Увійдіть або спробуйте пізніше.");
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col relative">
            <button
                onClick={onHeart}
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                className="absolute top-3 right-3 z-10"
            >
                <Heart className={clsx("w-6 h-6 transition", { "text-red-500 fill-red-500": fav, "text-gray-400": !fav })} />
            </button>

            {product.imageUrl ? (
                <Image
                    src={getImageUrl(product.imageUrl)}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-cover rounded-lg border w-full h-48"
                    unoptimized
                />
            ) : (
                <div className="w-full h-48 flex items-center justify-center border rounded-lg text-gray-400">
                    No image
                </div>
            )}

            <p className="font-semibold mt-3">{product.name}</p>
            <p className="text-gray-600">${product.price}</p>
            <AddToCartButton product={product} />
        </div>
    );
};

export default ProductCard;
