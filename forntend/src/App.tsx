import Navigation from "./components/Navigation/Navigation";
import CategoryNavbar from "./components/Navigation/CategoryNavbar";
import AppRouter from "./router/AppRouter";
import CartModal from "./components/Cart/CartModal";
import CheckoutModal from "./components/Checkout/CheckoutModal";

const App = () => (
      <AppRouter navigator={
            <>
                  <Navigation />
                  <CategoryNavbar />
                  <CartModal />
                  <CheckoutModal />
            </>
      } />
)

export default App;
