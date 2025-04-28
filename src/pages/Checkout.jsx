// pages/Checkout.jsx
import { Link, useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css"; // Opcional: CSS Modules
import TitleBar from "../components/TitleBar";
import { useCart } from "../context/CartContex";

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
      <div className={styles.checkoutContainer}>
        <form className={styles.checkoutForm}>
          <input type="text" placeholder="Nombre" required />
          <input type="text" placeholder="Apellido" required />
          <input type="email" placeholder="Correo electrónico" required />

          <div className={styles.buttonsContainer}>
            <Link to="/dashboard" className={styles.cancelButton}>
              Cancelar
            </Link>
            <button type="button" // Evita el envío del formulario
              onClick={handleContinue}
              className={styles.continueButton}>
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}