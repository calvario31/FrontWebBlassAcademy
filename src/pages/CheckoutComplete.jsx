import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from "./CheckoutComplete.module.css";
import TitleBar from "../components/TitleBar";

export default function CheckoutComplete() {
    return (
        <div>
            <TitleBar>
                <h2 className="title">Checkout: Completo!</h2>
            </TitleBar>
            <div className={styles.container}>
                <FiCheckCircle className={styles.checkIcon} size={80} color="#1a4789" />
                <h1>Gracias por su pedido!</h1>
                <p className={styles.subtitle}>
                    Su pedido ha sido enviado y llegará tan rápido como pueda llegar el poni.
                </p>
                <Link to="/dashboard" className={styles.homeButton}>
                    Volver a Inicio
                </Link>
            </div>
        </div>
    );
}