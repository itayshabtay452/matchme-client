import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
    const { setHasProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        age: "",
        city: "",
        preferredDays: [],
        preferredHours: [],
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const daysOptions = ["ראשון", "שני", "שלישי", "רביעי", "חמישי"];
    const hoursOptions = ["18:00", "19:00", "20:00", "21:00"];

    const handleCheckbox = (field, value) => {
        setForm((prev) => {
            const arr = prev[field];
            return {
                ...prev,
                [field]: arr.includes(value)
                    ? arr.filter((v) => v !== value)
                    : [...arr, value],
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!form.name || !form.age || !form.city) {
            return setError("נא למלא את כל השדות החובה");
        }

        try {
            const res = await fetch("http://localhost:5000/api/users/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ ...form }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "שגיאה בשמירת הפרופיל");

            setSuccess("הפרופיל נשמר בהצלחה!");
            setHasProfile(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 5000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">צור פרופיל</h2>

            {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-2">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="שם"
                    className="w-full border p-2 rounded"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="גיל"
                    className="w-full border p-2 rounded"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="עיר"
                    className="w-full border p-2 rounded"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                />

                <div>
                    <label className="font-bold">ימים מועדפים:</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {daysOptions.map((day) => (
                            <label key={day} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={form.preferredDays.includes(day)}
                                    onChange={() => handleCheckbox("preferredDays", day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="font-bold">שעות מועדפות:</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {hoursOptions.map((hour) => (
                            <label key={hour} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={form.preferredHours.includes(hour)}
                                    onChange={() => handleCheckbox("preferredHours", hour)}
                                />
                                {hour}
                            </label>
                        ))}
                    </div>
                </div>

                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                    שמור פרופיל
                </button>
            </form>
        </div>
    );
}

export default CreateProfile;
