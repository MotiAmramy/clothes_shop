import { useEffect, useState } from "react";
import { Order, fetchOrders } from "../api/orderApi";
import Table from "../components/ui/Table/Table";
import { useAuthStore } from "../store/logginStore";
import { Navigate } from "react-router-dom";


/**
 * Orders Page
 * 
 * Displays a list of past orders for the logged-in user.
 * Fetches order history from the API.
 */
const OrdersPage = () => {
    const { isLoggedIn } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isLoggedIn) {
            loadOrders();
        }
    }, [isLoggedIn]);

    /**
     * Fetches orders from the backend and updates state.
     */
    const loadOrders = async () => {
        try {
            const data = await fetchOrders();
            setOrders(data);
        } catch (err: any) {
            setError(err.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <h2>My Orders</h2>
            {loading && <p>Loading orders...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && orders.length === 0 && <p>No orders found.</p>}

            {!loading && orders.length > 0 && (
                <Table headers={["Order ID", "Date", "Items", "Total"]}>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td style={{ fontSize: "0.85rem", color: "#666" }}>{order._id}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {order.items.map((item, index) => (
                                        <li key={index} style={{ fontSize: "0.9rem" }}>
                                            {item.quantity}x {item.product.title}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td style={{ fontWeight: "bold" }}>${order.totalAmount.toFixed(2)}</td>
                        </tr>
                    ))}
                </Table>
            )}
        </div>
    );
};

export default OrdersPage;
