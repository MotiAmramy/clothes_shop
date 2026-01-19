import Modal from "../../ui/Modal/Modal";
import Form from "../../ui/Form/Form";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { ProductItemData } from "../../../hooks/useFetchProducts";
import { Category } from "../../../api/categoryApi";
import styled from "styled-components";

const StyledSelect = styled.select`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

type Props = {
    isOpen: boolean;
    isEdit: boolean;
    formData: Omit<ProductItemData, "_id">;
    categories: Category[];
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
};

const AdminProductModal = ({
    isOpen,
    isEdit,
    formData,
    categories,
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

                <StyledSelect
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                    required
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                </StyledSelect>

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