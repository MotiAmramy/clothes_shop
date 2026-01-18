import styled from "styled-components";
import { useUiStore } from "../../store/uiStore";
import Button from "../ui/Button/Button";
import useCartStore from "../../store/cartStore";
import { useAuthStore } from "../../store/logginStore";
import { useNavigate } from "react-router-dom";

import Modal from "../ui/Modal/Modal";

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
`;

const ProductModal = () => {
  const { selectedProduct, isModalOpen, closeModal } = useUiStore();
  const { addItem } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  if (!isModalOpen || !selectedProduct) return null;

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addItem(selectedProduct);
      closeModal();
    } else {
      closeModal();
      navigate("/login");
    }
  };

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <ProductImage src={selectedProduct.image} alt={selectedProduct.title} />
        <h2 style={{ textAlign: "center" }}>{selectedProduct.title}</h2>
        <p style={{ textAlign: "center", color: "#666" }}>{selectedProduct.description}</p>
        <h3 style={{ color: "#333" }}>${selectedProduct.price}</h3>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </Modal>
  );
};

export default ProductModal;
