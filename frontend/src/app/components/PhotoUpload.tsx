"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PhotoUploadProps {
    initialPhoto?: string;
    onChange: (file: File | null) => void;
}

const PhotoUpload = ({ initialPhoto, onChange }: PhotoUploadProps) => {
    const [photo, setPhoto] = useState<File | null>(null);
    const [previewSrc, setPreviewSrc] = useState<string>(initialPhoto || "");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setPhoto(file);
        onChange(file);
    };

    useEffect(() => {
        if (photo) {
            const objectUrl = URL.createObjectURL(photo);
            setPreviewSrc(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        } else if (initialPhoto) {
            setPreviewSrc(initialPhoto);
        } else {
            setPreviewSrc("");
        }
    }, [photo, initialPhoto]);

    const handleRemovePhoto = () => {
        setPhoto(null);
        setPreviewSrc("");
        onChange(null);
    };

    return (
        <div className="space-y-2">
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {previewSrc && (
                <div className="mt-2 relative w-fit">
                    <Image
                        src={previewSrc}
                        alt="Product preview"
                        width={150}
                        height={150}
                        className="object-cover rounded-lg border"
                        unoptimized
                    />
                    <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                    >
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhotoUpload;


