import { useState } from "react";
import { useAuthStore } from "../store/logginStore";
import { Navigate } from "react-router-dom";
import Form from "../components/ui/Form/Form";
import Input from "../components/ui/Input/Input";
import Button from "../components/ui/Button/Button";
import { updateUser } from "../api/userApi";

const ProfilePage = () => {
    const { user, isLoggedIn, login } = useAuthStore();
    const [name, setName] = useState(user?.name || "");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            console.log(user);
            const updatedUser = await updateUser(user?._id, {
                name,
                password: password || undefined
            });

            // Update local store with new details (preserving other fields like role/token)
            if (user) {
                login({
                    ...user,
                    name: updatedUser.name
                });
            }

            setMessage("Profile updated successfully!");
            setPassword(""); // Clear password field
        } catch (err: any) {
            setMessage(err.message || "Failed to update profile");
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h2>My Profile</h2>
            <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Name</label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ padding: "0.5rem", width: "100%" }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>New Password (leave blank to keep current)</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: "0.5rem", width: "100%" }}
                    />
                </div>
                <Button type="submit" style={{ padding: "0.5rem 1rem", marginTop: "1rem", cursor: "pointer" }}>
                    Update Profile
                </Button>
            </Form>
            {message && <p style={{ marginTop: "1rem", color: message.includes("success") ? "green" : "red" }}>{message}</p>}
        </div>
    );
};

export default ProfilePage;
