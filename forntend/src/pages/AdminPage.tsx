import UserManagement from "../components/Admin/UserManagement";
import ProductManagement from "../components/Admin/ProductManagement";
import CategoryManagement from "../components/Admin/CategoryManagement";
import { useAuthStore } from "../store/logginStore";
import { Navigate } from "react-router-dom";
import { useAdminStore } from "../store/tabStore";
import Button from "../components/ui/Button/Button";
import { AdminTitles } from "../components/AdminTitle/AdminTitle";





const AdminPage = () => {
    const { user, isLoggedIn } = useAuthStore();
    const { activeTab, setActiveTab } = useAdminStore();

    if (!isLoggedIn || user?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return (
        <div className="admin-page" style={{ padding: "20px" }}>
            <AdminTitles title="Admin Dashboard" size="2.5rem" />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    backgroundColor: "#f1f5f9",
                    padding: "8px",
                    borderRadius: "12px",
                    width: "fit-content",
                    margin: "0 auto 30px",
                }}
            >

                <Button
                    onClick={() => setActiveTab("users")}
                    style={{
                        backgroundColor: activeTab === "users" ? "#2563eb" : "transparent",
                        color: activeTab === "users" ? "white" : "#1e293b",
                        fontWeight: 600,
                        padding: "10px 22px",
                        borderRadius: "10px",
                        transition: "all 0.2s ease",
                    }}
                >
                    Manage Users
                </Button>

                <Button
                    onClick={() => setActiveTab("products")}
                    style={{
                        backgroundColor: activeTab === "products" ? "#2563eb" : "transparent",
                        color: activeTab === "products" ? "white" : "#1e293b",
                        fontWeight: 600,
                        padding: "10px 22px",
                        borderRadius: "10px",
                        transition: "all 0.2s ease",
                    }}
                >
                    Manage Products
                </Button>

                <Button
                    onClick={() => setActiveTab("categories")}
                    style={{
                        backgroundColor: activeTab === "categories" ? "#2563eb" : "transparent",
                        color: activeTab === "categories" ? "white" : "#1e293b",
                        fontWeight: 600,
                        padding: "10px 22px",
                        borderRadius: "10px",
                        transition: "all 0.2s ease",
                    }}
                >
                    Manage Categories
                </Button>
            </div>

            <div className="admin-content">
                {activeTab === "users" && <UserManagement />}
                {activeTab === "products" && <ProductManagement />}
                {activeTab === "categories" && <CategoryManagement />}
            </div>
        </div>
    );
};

export default AdminPage;
