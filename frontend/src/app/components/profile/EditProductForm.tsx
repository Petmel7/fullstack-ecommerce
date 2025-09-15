"use client";

import { useState } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";
import PhotoUpload from "../product/PhotoUpload";

interface EditProductFormProps {
    product: Product;
    onProductUpdated?: (updated: Product) => void;
    onCancel?: () => void;
}

const EditProductForm = ({
    product,
    onProductUpdated,
    onCancel,
}: EditProductFormProps) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description || "");
    const [price, setPrice] = useState<number>(product.price);
    const [quantity, setQuantity] = useState<number>(product.quantity);
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

            const updated = await productService.updateProduct(product.id, formData);

            if (onProductUpdated) onProductUpdated(updated);
        } catch (err) {
            console.log("err", err);
            setError("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-4"
        >
            <h2 className="text-xl font-bold">Edit Product</h2>

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

            <PhotoUpload onChange={setPhoto} />

            <div className="flex justify-between gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default EditProductForm;

