import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import AdminPage from "../pages/AdminPage"
import ProfilePage from "../pages/ProfilePage"
import OrdersPage from "../pages/OrdersPage"
import About from "../pages/About"
import Contact from "../pages/Contact"

interface RouteItem {
    readonly path: string
    readonly component: React.ReactNode
}

type RouterConfig = ReadonlyArray<RouteItem>


/**
 * Router Configuration
 * 
 * Defines the mapping between URL paths and React components.
 * Used by AppRouter to dynamically generate routes.
 */
export const config: RouterConfig = [
    {
        path: '/',
        component: <Home />
    },
    {
        path: '/category/:category',
        component: <Home />
    },
    {
        path: '/login',
        component: <Login />
    },
    {
        path: '/signup',
        component: <Signup />
    },
    {
        path: '/admin',
        component: <AdminPage />
    },
    {
        path: '/profile',
        component: <ProfilePage />
    },
    {
        path: '/orders',
        component: <OrdersPage />
    },
    {
        path: '/about',
        component: <About />
    },
    {
        path: '/contact',
        component: <Contact />
    }
]