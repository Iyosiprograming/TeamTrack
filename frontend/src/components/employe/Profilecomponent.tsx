import { useState } from "react";
import { getProfile } from "../../services/fetch";
import { Toaster, toast } from "react-hot-toast";

export default function ProfileComponent() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const fetchProfile = async () => {
        if (profile) {
            // Already fetched, just toggle display
            setShowProfile(!showProfile);
            return;
        }

        setLoading(true);
        try {
            const response = await getProfile();
            setProfile(response);
            setShowProfile(true); // Show it after fetching
            toast.success(response.message || "Profile loaded successfully");
        } catch (err) {
            toast.error("Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile">
            <Toaster position="top-right" />
            <button onClick={fetchProfile} disabled={loading}>
                {loading ? "Loading..." : showProfile ? "Hide Profile" : "Show Profile"}
            </button>

            {showProfile && profile && (
                <div className="profile-details">
                    <p><strong>Name:</strong> {profile}</p>
                    <p><strong>Email:</strong> {profile}</p>
                    <p><strong>Bio:</strong> {profile}</p>
                </div>
            )}

            {!showProfile && !loading && !profile && <p>No profile data loaded yet</p>}
        </div>
    );
}
