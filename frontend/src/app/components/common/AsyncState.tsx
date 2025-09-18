// import React from "react";

// interface AsyncStateProps {
//     loading: boolean;
//     error: string | null;
//     children?: React.ReactNode;
// }

// const AsyncState: React.FC<AsyncStateProps> = ({ loading, error, children }) => {
//     if (loading) {
//         return <p className="text-gray-500">Loading...</p>;
//     }

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }

//     return <>{children}</>;
// };

// export default AsyncState;

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

