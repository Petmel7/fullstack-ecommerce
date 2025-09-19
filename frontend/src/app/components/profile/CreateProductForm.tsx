"use client";

import { useState } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";
import PhotoUpload from "../product/PhotoUpload";

interface CreateProductFormProps {
    onProductCreated?: (product: Product) => void;
}

const CreateProductForm = ({ onProductCreated }: CreateProductFormProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [photo, setPhoto] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price.toString());
            formData.append("quantity", quantity.toString());
            if (photo) formData.append("photo", photo);
            // console.log("formData", formData);
            const product = await productService.createProduct(formData);
            console.log("created product", product);
            if (onProductCreated) onProductCreated(product);

            setName("");
            setDescription("");
            setPrice(0);
            setQuantity(1);
            setPhoto(null);
        } catch (err) {
            console.log("err", err);
            setError("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-4"
        >
            <h2 className="text-xl font-bold">Create Product</h2>

            {error && <p className="text-red-500">{error}</p>}

            <input
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
                rows={3}
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border p-2 rounded"
                required
            />

            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border p-2 rounded"
                min={1}
                required
            />

            {/* <PhotoUpload onChange={setPhoto} /> */}
            <PhotoUpload
                key={photo ? photo.name : "empty"}
                file={photo}
                onChange={setPhoto}
            />


            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
                {loading ? "Creating..." : "Create Product"}
            </button>
        </form>
    );
};

export default CreateProductForm;






// "use client";

// import { useState } from "react";
// import { productService } from "@/services/productService";
// import { Product } from "@/types/product";
// import PhotoUpload from "../product/PhotoUpload";
// import { useAsync } from "@/hooks/useAsync";
// import AsyncState from "../common/AsyncState";

// interface CreateProductFormProps {
//     onSubmit: (product: Product) => void;
// }

// const CreateProductForm = ({ onSubmit }: CreateProductFormProps) => {
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState<number>(0);
//     const [quantity, setQuantity] = useState<number>(1);
//     const [photo, setPhoto] = useState<File | null>(null);

//     const { run, loading, error, reset } = useAsync(productService.createProduct);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("description", description);
//         formData.append("price", price.toString());
//         formData.append("quantity", quantity.toString());
//         if (photo) formData.append("photo", photo);

//         const product = await run(formData);

//         if (product) {
//             onSubmit(product);
//             reset();
//             setName("");
//             setDescription("");
//             setPrice(0);
//             setQuantity(1);
//             setPhoto(null);
//         }
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-4"
//         >
//             <h2 className="text-xl font-bold">Create Product</h2>

//             <AsyncState loading={loading} error={error} />

//             <input
//                 type="text"
//                 placeholder="Product name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full border p-2 rounded"
//                 required
//             />

//             <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full border p-2 rounded"
//                 rows={3}
//             />

//             <input
//                 type="number"
//                 placeholder="Price"
//                 value={price}
//                 onChange={(e) => setPrice(Number(e.target.value))}
//                 className="w-full border p-2 rounded"
//                 required
//             />

//             <input
//                 type="number"
//                 placeholder="Quantity"
//                 value={quantity}
//                 onChange={(e) => setQuantity(Number(e.target.value))}
//                 className="w-full border p-2 rounded"
//                 min={1}
//                 required
//             />

//             <PhotoUpload onChange={setPhoto} />

//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//             >
//                 {loading ? "Creating..." : "Create Product"}
//             </button>
//         </form>
//     );
// };

// export default CreateProductForm;
