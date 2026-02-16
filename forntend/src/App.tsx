import Navigation from "./components/layout/Navigation/Navigation";
import CategoryNavbar from "./components/layout/CategoryNavbar/CategoryNavbar";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import AppRouter from "./router/AppRouter";
import CartModal from "./components/cart/CartModal/CartModal";
import CheckoutModal from "./components/checkout/CheckoutModal/CheckoutModal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
                  <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                  />
            </>
      } />
)

export default App;

