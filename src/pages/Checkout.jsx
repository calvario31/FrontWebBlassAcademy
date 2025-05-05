import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import { dataErrors } from "../constants/constants";
import { useCart } from "../context/CartContex";
import "./Checkout.scss";

export default function Checkout() {
  const { clearCart } = useCart();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    mode: 'onBlur'
  });


  const onSubmit = (data) => {
    console.log(data);
    clearCart();
    navigate('/checkout-complete');
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
      <TitleBar>
        <h2 className="title">Sus Datos</h2>
      </TitleBar>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs-container">
            <input type="text" name="nombre" placeholder="Nombre"
              {...register('nombre', {
                required: dataErrors.nombre
              })}
              className={errors.nombre ? 'error' : ''}
            />
            {errors.nombre && (
              <div className="error-message">{errors.nombre.message.toString()}</div>
            )}

            <input type="text" name="apellido" placeholder="Apellido"
              {...register('apellido', {
                required: dataErrors.apellido
              })}
              className={errors.apellido ? 'error' : ''}
            />
            {errors.apellido && (
              <div className="error-message">{errors.apellido.message.toString()}</div>
            )}

            <input type="email" name="email" placeholder="Correo electrónico"
              {...register('email', {
                required: dataErrors.email,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'El correo ingresado no es válido'
                }
              })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <div className="error-message">{errors.email.message.toString()}</div>
            )}
          </div>

          <div className="buttons-container">
            <Link to="/dashboard" className="cancel-button">
              Cancelar
            </Link>
            <button type="submit" onClick={handleContinueClick}
              className="continue-button">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}