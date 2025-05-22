import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import "./CheckoutComplete.scss";

const CheckoutComplete: React.FC<any> = () => {
    return (
        <div>
            <TitleBar title={'Compra Completada'} />
            <div className="container">
                <FiCheckCircle
                    className="checkIcon"
                    size={80}
                    color="#1a4789"
                    data-test="check-express"
                />
                <h1 data-test="complete-header">Gracias por su pedido!</h1>
                <p className="subtitle" data-test="complete-subheader">
                    Su pedido ha sido enviado y llegará tan rápido como pueda llegar.
                </p>
                <Link
                    to="/dashboard"
                    className="blass-button success"
                    id="back-to-products"
                    data-test="back-to-products"
                >
                    Volver a Inicio
                </Link>
            </div>
        </div>
    );
}

export default CheckoutComplete;
