import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ תיקון

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // נטען את המשתמש המחובר מהטוקן בלוקאל סטורג'
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (err) {
        console.error("שגיאה בפענוח הטוקן:", err.message);
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUserId(decoded.id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
