import CartItem from "../components/CartItem/CartItem"
import List from "../components/List/List"
import useCartStore from "../store/cartStore"

const Checkout = () => {
    const { cart } = useCartStore()

    return  (
        <List 
            data={cart} 
            Item={({ data }) => <CartItem item={data} />} 
        />
    )
}

export default Checkout