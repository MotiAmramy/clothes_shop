import Checkout from "../pages/Checkout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"

interface RouteItem {
    readonly path: string
    readonly component: React.ReactNode
}

type RouterConfig = ReadonlyArray<RouteItem>

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
        path: '/checkout',
        component: <Checkout />
    },
    {
        path: '/login',
        component: <Login />
    },
    {
        path: '/signup',
        component: <Signup />
    }
]