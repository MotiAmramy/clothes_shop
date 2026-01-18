import { useState } from "react";
import UserManagement from "../components/Admin/UserManagement";
import ProductManagement from "../components/Admin/ProductManagement";
import { useAuthStore } from "../store/logginStore";
import { Navigate } from "react-router-dom";
import Button from "../components/ui/Button/Button";

const AdminPage = () => {
    const { user, isLoggedIn } = useAuthStore();
    const [activeTab, setActiveTab] = useState<"users" | "products">("users");

    if (!isLoggedIn || user?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return (
        <div className="admin-page" style={{ padding: "20px" }}>
            <h1>Admin Dashboard</h1>
            <div style={{ marginBottom: "20px", backgroundColor: "lightblue" }}>
                <Button
                    onClick={() => setActiveTab("users")}
                    style={{ marginRight: "10px", fontWeight: activeTab === "users" ? "bold" : "normal" }}
                >
                    Manage Users
                </Button>
                <Button
                    onClick={() => setActiveTab("products")}
                    style={{ fontWeight: activeTab === "products" ? "bold" : "normal" }}
                >
                    Manage Products
                </Button>
            </div>

            <div className="admin-content">
                {activeTab === "users" ? <UserManagement /> : <ProductManagement />}
            </div>
        </div>
    );
};

export default AdminPage;
