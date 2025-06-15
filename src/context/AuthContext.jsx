import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ תיקון

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // נטען את המשתמש המחובר מהטוקן בלוקאל סטורג'
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("📦 טוען useEffect עם token:", token); // 🟡 בדיקה בסיסית
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
        console.log("✅ טוקן תקין, userId:", decoded.id);
        checkProfile(token);
      } catch (err) {
        console.error("שגיאה בפענוח הטוקן:", err.message);
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  const checkProfile = async (token) => {
    try {
      console.log("📡 נשלחת בקשה לבדוק פרופיל עם הטוקן:", token);
      const res = await fetch("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📥 תגובת שרת:", res.status);

      const data = await res.json();
      console.log("📄 תוכן תגובה משרת (hasProfile):", data);
      setHasProfile(data.hasProfile);
      console.log("🎯 hasProfile הוגדר ל:", data.hasProfile);

    } catch (err) {
      console.error("שגיאה בטעינת הפרופיל:", err.message);
      setHasProfile(false);
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token);
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      await checkProfile(token);
    } catch (err) {
      console.error("שגיאה בפענוח הטוקן:", err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserId(null);
    setHasProfile(false);
  };

  return (
    <AuthContext.Provider value={{ userId, hasProfile, login, logout, isLoading, setHasProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
