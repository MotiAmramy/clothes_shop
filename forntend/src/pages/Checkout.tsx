import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem/CartItem";
import List from "../components/List/List";
import useCartStore from "../store/cartStore";
import { useAuthStore } from "../store/logginStore";
import { createOrder } from "../api/orderApi";
import Button from "../components/ui/Button/Button";
import { ProductItemData } from "../hooks/useFetchProducts";

interface OrderItem {
    product: ProductItemData;
    quantity: number;
}

const Checkout = () => {
    const { cart, clearCart } = useCartStore();
    const { isLoggedIn } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Calculate total
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const handlePlaceOrder = async () => {
        if (!isLoggedIn) {
            alert("Please login to place an order");
            navigate("/login");
            return;
        }

        if (cart.length === 0) return;

        setLoading(true);
        try {
            // Group items by ID to calculate quantity (simplified for now as cart seems to be flat list of items)
            // Assuming the current cart structure is just an array of items, we'll map them 1:1 for now
            // or we should consolidate them. Given the cart implementation seems to be a list of products:

            // Consolidating items for the order API
            const itemMap = new Map<string, OrderItem>();
            cart.forEach(product => {
                if (itemMap.has(product._id)) {
                    itemMap.get(product._id)!.quantity += 1;
                } else {
                    itemMap.set(product._id, { product, quantity: 1 });
                }
            });

            const orderItems = Array.from(itemMap.values());

            await createOrder({
                items: orderItems,
                totalAmount
            });

            alert("Order placed successfully!");
            clearCart();
            navigate("/orders");
        } catch (err: any) {
            alert(err.message || "Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <h2>Checkout</h2>

            <div style={{ marginBottom: "2rem" }}>
                <List
                    data={cart}
                    Item={({ data }) => <CartItem item={data} />}
                />
            </div>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div style={{
                    borderTop: "1px solid #ddd",
                    paddingTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "1rem"
                }}>
                    <h3>Total: ${totalAmount.toFixed(2)}</h3>
                    <Button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            fontSize: "1.1rem",
                            padding: "0.75rem 2rem",
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Checkout;