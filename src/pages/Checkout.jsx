import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import { dataErrors } from "../constants/constants";
import { useCart } from "../context/CartContext";
import "./Checkout.scss";

export default function Checkout() {
    const { clearCart } = useCart();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        clearErrors,
    } = useForm({
        mode: "onSubmit",
    });

    const onSubmit = () => {
        clearCart();
        navigate("/checkout-complete");
    };

    const handleContinueClick = async (e) => {
        e.preventDefault();
        const isValid = await trigger();

        if (isValid) {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div>
            <TitleBar title={"Sus Datos"} />
            <div className="checkout-container">
                <form className="checkout-form">
                    <div className="inputs-container">
                        <input
                            type="text"
                            name="nombre"
                            id="first-name"
                            data-test="firstName"
                            placeholder="Nombre"
                            {...register("nombre", {
                                required: dataErrors.nombre,
                            })}
                            className={errors.nombre ? "error" : ""}
                        />

                        <input
                            type="text"
                            name="apellido"
                            id="last-name"
                            data-test="lastName"
                            placeholder="Apellido"
                            {...register("apellido", {
                                required: dataErrors.apellido,
                            })}
                            className={errors.apellido ? "error" : ""}
                        />

                        <input
                            type="email"
                            name="email"
                            id="email"
                            data-test="email"
                            placeholder="Correo electrónico"
                            {...register("email", {
                                required: dataErrors.email,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "El correo ingresado no es válido",
                                },
                            })}
                            className={errors.email ? "error" : ""}
                        />
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <h3 className="error-box" data-test="error">
                            <span>
                                {errors.nombre?.message.toString() ||
                                    errors.apellido?.message.toString() ||
                                    errors.email?.message.toString()}
                            </span>
                            <button className="close-btn" onClick={() => clearErrors()}>
                                ×
                            </button>
                        </h3>
                    )}
                </form>
                <div className="buttons-container">
                    <Link
                        to="/dashboard"
                        className="blass-button danger"
                        data-test="cancel"
                        id="cancel"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="button"
                        onClick={handleContinueClick}
                        className="blass-button success"
                        id="continue"
                        data-test="continue"
                        name="continue"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}
