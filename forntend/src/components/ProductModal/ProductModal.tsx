import styled from "styled-components";
import { useUiStore } from "../../store/uiStore";
import Button from "../ui/Button/Button";
import useCartStore from "../../store/cartStore";
import { useAuthStore } from "../../store/logginStore";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

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
        <Overlay onClick={closeModal}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ProductImage src={selectedProduct.image} alt={selectedProduct.title} />
                <h2>{selectedProduct.title}</h2>
                <p>{selectedProduct.description}</p>
                <h3>${selectedProduct.price}</h3>
                <Button onClick={handleAddToCart}>Add to Cart</Button>
            </ModalContainer>
        </Overlay>
    );
};

export default ProductModal;
