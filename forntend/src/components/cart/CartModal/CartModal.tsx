import { styled } from "styled-components";
import { FaTimes } from "react-icons/fa";
import useCartStore from "../../../store/cartStore";
import { useUiStore } from "../../../store/uiStore";
import CartItem from "../CartItem/CartItem";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/logginStore";


/**
 * Styled container for the modal content.
 */
const ModalContent = styled.div`
    width: 500px;
    max-width: 90vw;
    background-color: #ffeaea;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 80vh;
    border-top: 4px solid #6C5B7B;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;

    h2 {
        margin: 0;
        font-family: 'Playfair Display', serif;
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6C5B7B;
    transition: all 0.2s;
    &:hover { 
        color: #333; 
        transform: scale(1.1);
    }
`;

const ItemsList = styled.div`
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
    padding-right: 5px;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }
`;

const EmptyCart = styled.div`
    text-align: center;
    padding: 40px;
    color: #666;
`;

const Footer = styled.div`
    border-top: 1px solid #eee;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const TotalRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: bold;
`;


/**
 * CartModal Component
 * 
 * Displays the user's shopping cart in a modal.
 * Allows viewing items, total price, and navigating to checkout.
 */
const CartModal = () => {
    const { cart } = useCartStore();
    const { isCartOpen, closeCart, openCheckout } = useUiStore();
    const { isLoggedIn } = useAuthStore();
    const navigate = useNavigate();

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);


    /**
     * Handles the "Place Order" button click.
     * Redirects to login if not authenticated, otherwise opens the checkout modal.
     */
    const handlePlaceOrder = () => {
        if (!isLoggedIn) {
            closeCart();
            navigate("/login");
            return;
        }
        closeCart();
        openCheckout();
    };

    if (!isCartOpen) return null;

    // We can reuse the Modal Overlay from the UI library or build a custom one.
    // Since useUiStore has isCartOpen, we'll wrap our content in the Modal if it supports passing children and isOpen props,
    // OR we can just use our own Overlay if the Modal component is too specific.
    // Looking at Modal.tsx (Step 19), it seems to be controlled by props.
    // However, the existing Modal.tsx might be specific. Let's assume we want a generic modal feel.
    // Actually, let's look at `src/components/ui/Modal/Modal.tsx` again or just use a full screen overlay here.
    // A better approach is to make this a self-contained modal component that conditionally renders.

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }} onClick={closeCart}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <Header>
                    <h2>Shopping Cart</h2>
                    <CloseButton onClick={closeCart}><FaTimes /></CloseButton>
                </Header>

                <ItemsList>
                    {cart.length === 0 ? (
                        <EmptyCart>Your cart is empty</EmptyCart>
                    ) : (
                        cart.map((item, index) => (
                            <CartItem key={`${item._id}-${index}`} item={item} />
                        ))
                    )}
                </ItemsList>

                {cart.length > 0 && (
                    <Footer>
                        <TotalRow>
                            <span>Total:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </TotalRow>
                        <Button
                            style={{ width: '100%', padding: '15px', fontSize: '1.1rem', backgroundColor: "#fbc0bbff" }}
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </Button>
                    </Footer>
                )}
            </ModalContent>
        </div>
    );
};

export default CartModal;
