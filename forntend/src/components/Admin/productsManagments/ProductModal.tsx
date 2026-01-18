import Modal from "../../ui/Modal/Modal";
import Form from "../../ui/Form/Form";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { ProductItemData } from "../../../hooks/useFetchProducts";

type Props = {
    isOpen: boolean;
    isEdit: boolean;
    formData: Omit<ProductItemData, "_id">;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
};

const AdminProductModal = ({
    isOpen,
    isEdit,
    formData,
    onChange,
    onSubmit,
    onClose,
}: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Update Product" : "Add Product"}
        >
            <Form onSubmit={onSubmit} className="admin-form">
                <Input
                    name="title"
                    placeholder="Product title"
                    value={formData.title}
                    onChange={onChange}
                    required
                />

                <Input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={onChange}
                    required
                />

                <Input
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={onChange}
                    required
                />

                <Input
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={onChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={onChange}
                    className="textarea"
                    required
                />

                <Button type="submit">Save Product</Button>
            </Form>
        </Modal>
    );
};
export default AdminProductModal;