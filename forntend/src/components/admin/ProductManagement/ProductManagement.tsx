import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import Table from "../../ui/Table/Table";
import useFetchProducts, { ProductItemData } from "../../../hooks/useFetchProducts";
import { addProduct, deleteProduct, updateProduct } from "../../../api/productApi";
import { Category, fetchCategories } from "../../../api/categoryApi";
import { AdminTitles } from "../AdminTitle/AdminTitle";
import AdminProductModal from "../ProductModal/ProductModal";


const ProductManagement = () => {
    type ModalMode = "add" | "edit" | null;
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const { data, loading, error } = useFetchProducts();
    const [products, setProducts] = useState<ProductItemData[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<Omit<ProductItemData, "_id">>({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
    });
    const isOpen = modalMode !== null;
    const isEdit = modalMode === "edit";

    useEffect(() => {
        if (data === null) return;
        setProducts([...data]);
    }, [data]);

    useEffect(() => {
        fetchCategories().then(setCategories).catch(console.error);
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    const resetForm = () => {
        setFormData({
            title: "",
            price: 0,
            description: "",
            category: "",
            image: "",
        });
        setEditingId(null);
        setModalMode(null);
    };

    const addProducts = async () => {
        try {

            const response = await addProduct(formData);

            setProducts(prev => [...prev, response]);
            resetForm();
        } catch (err: any) {
            alert(err.message || "Failed to add product");
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await deleteProduct(id);
            setProducts(prev => prev.filter(p => p._id !== id));
            alert("Product deleted");
        } catch (err: any) {
            alert(err.message || "Failed to delete");
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEdit && editingId) {
            await updateProducts();
        } else {
            await addProducts();
        }
    };
    const updateProducts = async () => {
        try {
            const response = await updateProduct(editingId!, formData)
            setProducts(prev => prev.map(p => p._id === editingId ? response : p))
            resetForm();
        } catch (err: any) {
            alert(err.message || "failed to update")
        }
    }

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <AdminTitles title="Product Management" size="2rem" />
            </div>

            <Button style={{
                backgroundColor: "#2563eb",
                color: "white",
                fontWeight: 600,
                padding: "10px 22px",
                borderRadius: "10px",
                transition: "all 0.2s ease",
            }} onClick={() => {
                setModalMode("add")
            }}>
                Add Product
            </Button>

            <AdminProductModal
                isOpen={isOpen}
                isEdit={isEdit}
                formData={formData}
                categories={categories}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                onClose={() => {
                    resetForm()
                    setModalMode(null)
                    setEditingId(null);
                }
                }
            />

            <div className="admin-table">
                {loading && <p>Loading products...</p>}
                {error && <p>Error loading products</p>}

                {!loading && products && (
                    <Table headers={["Image", "Title", "Price", "Category", "Description", "Actions"]}>
                        {products.map((p) => (
                            <tr key={p._id}>
                                <td>

                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="product-thumb"
                                        style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                                    />
                                </td>
                                <td>{p.title}</td>
                                <td>${p.price}</td>
                                <td>{p.category}</td>
                                <td>{p.description}</td>
                                <td>
                                    <Button
                                        onClick={() => handleDelete(p._id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setFormData({
                                                title: p.title,
                                                price: p.price,
                                                description: p.description,
                                                category: p.category,
                                                image: p.image,
                                            });
                                            setEditingId(p._id)
                                            setModalMode("edit")
                                        }}
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                )}
            </div>
        </div>
    );
};

export default ProductManagement;
