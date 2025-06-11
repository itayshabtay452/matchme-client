import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      return setError("נא למלא את כל השדות");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "שגיאה לא ידועה");
      }

      localStorage.setItem("token", data.token);
      login(data.token);
      setSuccess("התחברת בהצלחה!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">התחברות</h2>

        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-2">{success}</div>}

        <input
          type="email"
          placeholder="אימייל"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="סיסמה"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          התחבר
        </button>
      </form>
    </div>
  );
}

export default Login;
