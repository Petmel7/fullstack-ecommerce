import React from "react";

interface AsyncStateProps {
    loading: boolean;
    error: string | null;
    children?: React.ReactNode;
}

const AsyncState: React.FC<AsyncStateProps> = ({ loading, error, children }) => {
    if (loading) {
        return <p className="text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return <>{children}</>;
};

export default AsyncState;
