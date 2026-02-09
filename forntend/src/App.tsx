import Navigation from "./components/layout/Navigation/Navigation";
import CategoryNavbar from "./components/layout/CategoryNavbar/CategoryNavbar";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import AppRouter from "./router/AppRouter";
import CartModal from "./components/cart/CartModal/CartModal";
import CheckoutModal from "./components/checkout/CheckoutModal/CheckoutModal";


/**
 * Main Application Component
 * 
 * Serves as the root of the React application.
 * Composes the layout (Navigation, Navbar, Sidebar) and global modals (Cart, Checkout) 
 * passing them as a navigator prop to the AppRouter.
 */
const App = () => (
      <AppRouter navigator={
            <>
                  <Navigation />
                  <CategoryNavbar />
                  <CartModal />
                  <CheckoutModal />
                  <Sidebar />
            </>
      } />
)

export default App;

