import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { userId, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div className="p-4">טוען...</div>;
  }

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
