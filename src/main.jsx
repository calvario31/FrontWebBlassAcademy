import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutRoute from "./components/Layout";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import CheckoutComplete from "./pages/CheckoutComplete";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <CartProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                <Route element={<LayoutRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/product/:productId" element={<ProductDetails />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout-complete" element={<CheckoutComplete />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </CartProvider>
);
