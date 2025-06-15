import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AuthGate() {
  const { userId, isLoading, hasProfile } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  if (!hasProfile) {
    return <Navigate to="/create-profile" replace />;
  }

  return <Navigate to="/dashboard" replace />;

}

export default AuthGate;
