import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { userId, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">📊 דשבורד</h1>
      <p className="mb-4 text-green-600">אתה מחובר בתור: {userId}</p>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        התנתק
      </button>
    </div>
  );
}

export default Dashboard;
