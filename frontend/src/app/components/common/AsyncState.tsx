
"use client";

interface AsyncStateProps {
    loading: boolean;
    error: string | null;
}

const AsyncState = ({ loading, error }: AsyncStateProps) => {
    if (loading) return <p className="text-blue-600">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    return null;
};

export default AsyncState;

