import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NoProfileOnly({ children }) {
    const { userId, hasProfile, isLoading } = useContext(AuthContext);

    console.log("🧠 NoProfileOnly התחיל:", {
        userId,
        hasProfile,
        isLoading,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userId) {
        console.log("No userId found, redirecting to login");
        return <Navigate to="/login" replace />;
    }

    if (hasProfile) {
        console.log("User has a profile, redirecting to dashboard");
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default NoProfileOnly;
