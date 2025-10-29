
export const getImageUrl = (path?: string) => {
    if (!path) return "/placeholder.jpg";

    const base =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    return `${base}${path}`;
};
