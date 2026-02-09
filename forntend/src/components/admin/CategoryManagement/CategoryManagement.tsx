import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import Table from "../../ui/Table/Table";
import Input from "../../ui/Input/Input";
import Form from "../../ui/Form/Form";
import { AdminTitles } from "../AdminTitle/AdminTitle";
import { Category, addCategory, deleteCategory, fetchCategories } from "../../../api/categoryApi";

const CategoryManagement = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error("Failed to load categories", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const added = await addCategory(newCategory);
            setCategories([...categories, added]);
            setNewCategory("");
        } catch (error) {
            alert("Failed to add category");
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete category?")) return;
        try {
            await deleteCategory(id);
            setCategories(categories.filter(c => c._id !== id));
        } catch (error) {
            alert("Failed to delete category");
        }
    };

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <AdminTitles title="Category Management" size="2rem" />
            </div>

            <div style={{ padding: "1rem" }}>
                <Form onSubmit={handleAddCategory} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New Category Name"
                        required
                    />
                    <Button type="submit">Add Category</Button>
                </Form>
            </div>

            <div className="admin-table">
                {loading ? <p>Loading...</p> : (
                    <Table headers={["ID", "Name", "Actions"]}>
                        {categories.map(cat => (
                            <tr key={cat._id}>
                                <td>{cat._id}</td>
                                <td>{cat.name}</td>
                                <td>
                                    <Button onClick={() => handleDelete(cat._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                )}
            </div>
        </div>
    );
};

export default CategoryManagement;
