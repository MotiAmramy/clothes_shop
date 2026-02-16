import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import { FaCreditCard, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { useUiStore } from "../../../store/uiStore";
import useCartStore from "../../../store/cartStore";
import { createOrder, OrderItem } from "../../../api/orderApi";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import { fetchCities } from "../../../services/cityService";
import { useNavigate } from "react-router-dom";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    zIndex: 1000;
`;

const ModalContent = styled.div`
    width: 600px;
    max-width: 95vw;
    background: #ffeaea;
    border-radius: 12px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    border-top: 4px solid #6C5B7B;
`;

const MultiStepHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 10%;
        right: 10%;
        height: 2px;
        background: #eee;
        z-index: 0;
    }
`;

const StepIndicator = styled.div<{ active: boolean; completed: boolean }>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.active || props.completed ? '#6C5B7B' : '#eee'};
    color: ${props => props.active || props.completed ? 'white' : '#666'};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: relative;
    font-weight: bold;
    transition: all 0.3s ease;
`;

const StepLabel = styled.span<{ active: boolean }>`
    position: absolute;
    bottom: -25px;
    font-size: 0.8rem;
    white-space: nowrap;
    color: ${props => props.active ? '#333' : '#999'};
    font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const FormTitle = styled.h3`
    margin-bottom: 20px;
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    text-align: center;
`;

const FormRow = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
`;


const PaymentMock = styled.div`
    background: linear-gradient(135deg, #333 0%, #000 100%);
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SuccessContainer = styled.div`
    text-align: center;
    padding: 20px;
    
    svg {
        font-size: 4rem;
        color: #28a745;
        margin-bottom: 20px;
    }
`;

type Step = 'address' | 'payment' | 'success';

const CheckoutModal = () => {
    const { isCheckoutOpen, closeCheckout } = useUiStore();
    const { cart, clearCart } = useCartStore();
    const navigate = useNavigate();

    const [step, setStep] = useState<Step>('address');
    const [cities, setCities] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Form States
    const [address, setAddress] = useState({ city: '', street: '', number: '' });
    const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvv: '' });
    const [isCityListOpen, setIsCityListOpen] = useState(false);

    useEffect(() => {
        if (isCheckoutOpen) {
            setStep('address'); // Reset step on open
            setLoading(true);
            fetchCities().then(data => {
                setCities(data);
                setLoading(false);
            });
        }
    }, [isCheckoutOpen]);

    const handleAddressSubmit = () => {
        if (!address.city || !address.street || !address.number) {
            toast.error("Please fill in all address fields");
            return;
        }
        setStep('payment');
    };

    const handlePaymentSubmit = async () => {
        if (!payment.cardNumber || !payment.expiry || !payment.cvv) {
            toast.error("Please fill in all payment fields");
            return;
        }

        setLoading(true);
        try {
            // Transform cart to order items
            const itemMap = new Map<string, OrderItem>();
            cart.forEach(product => {
                if (itemMap.has(product._id)) {
                    itemMap.get(product._id)!.quantity += 1;
                } else {
                    itemMap.set(product._id, { product, quantity: 1 });
                }
            });

            const orderItems = Array.from(itemMap.values());
            const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

            await createOrder({
                items: orderItems,
                totalAmount,
                shippingAddress: address
            });

            setStep('success');
            setTimeout(() => {
                clearCart();
            }, 500);
        } catch (error) {
            console.error("Order failed", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        closeCheckout();
        if (step === 'success') {
            navigate('/orders');
        }
    };

    if (!isCheckoutOpen) return null;

    return (
        <ModalOverlay onClick={handleClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                {/* Steps Header */}
                <MultiStepHeader>
                    <StepIndicator active={step === 'address'} completed={step === 'payment' || step === 'success'}>
                        <FaMapMarkerAlt />
                        <StepLabel active={step === 'address'}>Address</StepLabel>
                    </StepIndicator>
                    <StepIndicator active={step === 'payment'} completed={step === 'success'}>
                        <FaCreditCard />
                        <StepLabel active={step === 'payment'}>Payment</StepLabel>
                    </StepIndicator>
                    <StepIndicator active={step === 'success'} completed={false}>
                        <FaCheckCircle />
                        <StepLabel active={step === 'success'}>Done</StepLabel>
                    </StepIndicator>
                </MultiStepHeader>

                {step === 'address' && (
                    <>
                        <FormTitle>Shipping Address</FormTitle>
                        <div style={{ position: 'relative', marginBottom: '15px' }}>
                            <Input
                                placeholder="Select City"
                                value={address.city}
                                onChange={e => setAddress({ ...address, city: e.target.value })}
                                onFocus={() => setIsCityListOpen(true)}
                                onBlur={() => setTimeout(() => setIsCityListOpen(false), 200)} // Delay to allow click
                            />
                            {isCityListOpen && (
                                <ul style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    background: 'white',
                                    border: '1px solid #ddd',
                                    zIndex: 10,
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}>
                                    {cities
                                        .filter(c => c.includes(address.city))
                                        .map(city => (
                                            <li
                                                key={city}
                                                style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                                                onClick={() => setAddress({ ...address, city: city })}
                                            >
                                                {city}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                        <FormRow>
                            <Input
                                placeholder="Street"
                                value={address.street}
                                onChange={e => setAddress({ ...address, street: e.target.value })}
                            />
                            <Input
                                placeholder="Number"
                                value={address.number}
                                onChange={e => setAddress({ ...address, number: e.target.value })}
                                style={{ width: '100px' }}
                            />
                        </FormRow>
                        <Button onClick={handleAddressSubmit} style={{ width: '100%', backgroundColor: "#fbc0bbff" }}>
                            Proceed to Payment
                        </Button>
                    </>
                )}

                {step === 'payment' && (
                    <>
                        <FormTitle>Payment Details</FormTitle>
                        <PaymentMock>
                            <div>CARD NUMBER</div>
                            <div style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>
                                {payment.cardNumber || '•••• •••• •••• ••••'}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <div>{payment.expiry || 'MM/YY'}</div>
                                <div>{payment.cvv || 'CVV'}</div>
                            </div>
                        </PaymentMock>

                        <Input
                            placeholder="Card Number"
                            value={payment.cardNumber}
                            onChange={e => setPayment({ ...payment, cardNumber: e.target.value })}
                        />
                        <FormRow>
                            <Input
                                placeholder="MM/YY"
                                value={payment.expiry}
                                onChange={e => setPayment({ ...payment, expiry: e.target.value })}
                            />
                            <Input
                                placeholder="CVV"
                                value={payment.cvv}
                                onChange={e => setPayment({ ...payment, cvv: e.target.value })}
                            />
                        </FormRow>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <Button
                                onClick={() => setStep('address')}
                                style={{ background: '#eee', color: '#333' }}
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handlePaymentSubmit}
                                disabled={loading}
                                style={{ flex: 1, backgroundColor: "#fbc0bbff" }}
                            >
                                {loading ? 'Processing...' : 'Pay Now'}
                            </Button>
                        </div>
                    </>
                )}

                {step === 'success' && (
                    <SuccessContainer>
                        <FaCheckCircle />
                        <h2>Order Placed Successfully!</h2>
                        <p>Thank you for your purchase. You can view your order in the orders page.</p>
                        <Button onClick={handleClose} style={{ marginTop: '20px' }}>
                            Go to My Orders
                        </Button>
                    </SuccessContainer>
                )}
            </ModalContent>
        </ModalOverlay>
    );
};

export default CheckoutModal;
