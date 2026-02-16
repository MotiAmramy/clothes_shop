import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../ui/Button/Button";
import Table from "../../ui/Table/Table";
import Input from "../../ui/Input/Input";
import Form from "../../ui/Form/Form";
import { AdminTitles } from "../AdminTitle/AdminTitle";
import { Category, addCategory, deleteCategory, fetchCategories } from "../../../api/categoryApi";
import ConfirmationModal from "../../ui/ConfirmationModal/ConfirmationModal";


const CategoryManagement = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });

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
            toast.success("Category added");
            setCategories([...categories, added]);
            setNewCategory("");
        } catch (error) {
            toast.error("Failed to add category");
        }
    };

    const handleDelete = (id: string) => {
        setDeleteConfirmation({ isOpen: true, id });
    };

    const confirmDelete = async () => {
        if (!deleteConfirmation.id) return;
        try {
            await deleteCategory(deleteConfirmation.id);
            setCategories(categories.filter(c => c._id !== deleteConfirmation.id));
            toast.success("Category deleted");
        } catch (error) {
            toast.error("Failed to delete category");
        } finally {
            setDeleteConfirmation({ isOpen: false, id: null });
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
            <ConfirmationModal
                isOpen={deleteConfirmation.isOpen}
                title="Delete Category"
                message="Are you sure you want to delete this category?"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteConfirmation({ isOpen: false, id: null })}
            />
        </div >
    );
};

export default CategoryManagement;
