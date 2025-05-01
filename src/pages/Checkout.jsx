// pages/Checkout.jsx
import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import { useCart } from "../context/CartContex";
import "./Checkout.scss";

export default function Checkout() {
  const { clearCart } = useCart();

  const navigate = useNavigate();

  const handleContinue = () => {
    // Limpiar el carrito del localStorage
    clearCart();
    // Navegar a la página de confirmación
    navigate("/checkout-complete");
  };

  return (
    <div>
      <TitleBar>
        <h2 className="title">Checkout</h2>
      </TitleBar>
      <div className="checkout-container">
        <form className="checkout-form">
          <input type="text" placeholder="Nombre" required />
          <input type="text" placeholder="Apellido" required />
          <input type="email" placeholder="Correo electrónico" required />

          <div className="buttons-container">
            <Link to="/dashboard" className="cancel-button">
              Cancelar
            </Link>
            <button type="button" // Evita el envío del formulario
              onClick={handleContinue}
              className="continue-button">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}