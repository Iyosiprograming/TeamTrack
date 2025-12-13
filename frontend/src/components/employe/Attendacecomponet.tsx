import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { attendance } from "../../services/fetch";

export const AttendanceComponent = () => {
    const [loading, setLoading] = useState(false);

    const handleMarkAttendance = async () => {
        setLoading(true);
        try {
            const response = await attendance();
            toast.success(response.message || "Attendance marked successfully!");
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message || "Failed to mark attendance");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="attendance-container">
            <Toaster position="top-right" />
            <h2>Mark Attendance</h2>
            <button onClick={handleMarkAttendance} disabled={loading}>
                {loading ? "Marking..." : "Mark Attendance"}
            </button>
        </div>
    );
};
