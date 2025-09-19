
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PhotoUploadProps {
    file: File | null;
    onChange: (file: File | null) => void;
}

const PhotoUpload = ({ file, onChange }: PhotoUploadProps) => {
    const [previewSrc, setPreviewSrc] = useState<string>("");

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewSrc(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewSrc("");
        }
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0] || null;
        onChange(newFile);
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
                        onClick={() => onChange(null)}
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
