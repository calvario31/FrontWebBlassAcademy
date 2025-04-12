import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContex";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";


ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
);