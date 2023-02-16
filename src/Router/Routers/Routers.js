import { createBrowserRouter } from "react-router-dom";
import Inventory from "../../components/Inventory/Inventory";
import Login from "../../components/Login/Login/Login";
import Signup from "../../components/Login/Signup/Signup";
import Orders from "../../components/Orders/Orders";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import Shop from "../../components/Shop/Shop";
import Main from "../../Layouts/Main/Main";
import { productsAndCartLoader } from "../../loader/productsAndCartLoader";
import Shipping from "../../components/Shipping/Shipping";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                loader: productsAndCartLoader,
                element: <Shop></Shop>,
            },
            {
                path: '/shop',
                loader: productsAndCartLoader,
                element: <Shop></Shop>,
            },

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/orders',
                loader: productsAndCartLoader,
                element: <Orders></Orders>
            },
            {
                path: '/inventory',
                element:
                    <PrivateRoute>
                        <Inventory></Inventory>
                    </PrivateRoute>
            },
            {
                path: '/shipping',
                element:
                    <PrivateRoute>
                        <Shipping></Shipping>
                    </PrivateRoute>
            }
        ]
    }
]);

export { router }