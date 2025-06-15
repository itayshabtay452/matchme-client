import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RequireProfile({ children }) {
  const { userId, hasProfile, isLoading } = useContext(AuthContext);

  if (isLoading) return <div>טוען פרופיל...</div>;

  if (!userId) return <Navigate to="/login" replace />;
  if (!hasProfile) return <Navigate to="/create-profile" replace />;

  return children;
}

export default RequireProfile;
