import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import "./CheckoutComplete.scss";

export default function CheckoutComplete() {
    return (
        <div>
            <TitleBar>
                <h2 className="title">Checkout: Completo!</h2>
            </TitleBar>
            <div className="container">
                <FiCheckCircle className="checkIcon" size={80} color="#1a4789" />
                <h1>Gracias por su pedido!</h1>
                <p className="subtitle">
                    Su pedido ha sido enviado y llegará tan rápido como pueda llegar el poni.
                </p>
                <Link to="/dashboard" className="homeButton">
                    Volver a Inicio
                </Link>
            </div>
        </div>
    );
}