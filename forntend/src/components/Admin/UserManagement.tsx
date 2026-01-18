import { useEffect, useState } from "react";
import { User, fetchUsers, updateUser } from "../../api/adminApi";
import { useAuthStore } from "../../store/logginStore";
import Table from "../ui/Table/Table";

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user: currentUser } = useAuthStore();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (err: any) {
            setError(err.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: "user" | "admin") => {
        if (userId === currentUser?.id) {
            alert("You cannot change your own role");
            return;
        }

        try {
            await updateUser(userId, { "role": newRole });
            setUsers(users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
        } catch (err: any) {
            alert(err.message || "Failed to update role");
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3>User Management</h3>
            </div>

            <div className="admin-table">
                <Table headers={["Name", "Email", "Role", "Actions"]}>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>
                                <span className={`badge ${u.role}`} style={{
                                    padding: "0.25rem 0.5rem",
                                    borderRadius: "4px",
                                    backgroundColor: u.role === "admin" ? "#e7f5ff" : "#f8f9fa",
                                    color: u.role === "admin" ? "#1971c2" : "#495057",
                                    fontWeight: 600
                                }}>
                                    {u.role}
                                </span>
                            </td>
                            <td>
                                {u._id !== currentUser?.id && (
                                    <select
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u._id, e.target.value as "user" | "admin")}
                                        style={{ padding: "0.3rem", borderRadius: "4px", border: "1px solid #ced4da" }}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                )}
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
        </div>
    );
};

export default UserManagement;
