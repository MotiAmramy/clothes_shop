import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "../../ui/Table/Table";
import Button from "../../ui/Button/Button";
import { AdminTitles } from "../AdminTitle/AdminTitle";
import { User, deleteUser, fetchUsers, updateUser } from "../../../api/adminApi";
import { useAuthStore } from "../../../store/logginStore";
import ConfirmationModal from "../../ui/ConfirmationModal/ConfirmationModal";

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user: currentUser } = useAuthStore();

    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });

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
        if (userId === currentUser?._id) {
            toast.warning("You cannot change your own role");
            return;
        }

        try {
            await updateUser(userId, { role: newRole });
            setUsers(users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
        } catch (err: any) {
            toast.error(err.message || "Failed to update role");
        }
    };

    const handleDelete = (userId: string) => {
        if (userId === currentUser?._id) {
            toast.warning("You cannot delete yourself");
            return;
        }
        setDeleteConfirmation({ isOpen: true, id: userId });
    };

    const confirmDelete = async () => {
        if (!deleteConfirmation.id) return;
        try {
            await deleteUser(deleteConfirmation.id);
            setUsers(users.filter((u) => u._id !== deleteConfirmation.id));
            toast.success("User deleted");
        } catch (err: any) {
            toast.error(err.message || "Failed to delete user");
        } finally {
            setDeleteConfirmation({ isOpen: false, id: null });
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <AdminTitles title="User Management" size="2rem" />
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
                                {u._id !== currentUser?._id && (
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
                            <td>
                                <Button
                                    onClick={() => handleDelete(u._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
            <ConfirmationModal
                isOpen={deleteConfirmation.isOpen}
                title="Delete User"
                message="Are you sure you want to delete this user?"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteConfirmation({ isOpen: false, id: null })}
            />
        </div >
    );
};

export default UserManagement;
