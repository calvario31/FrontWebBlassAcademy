// pages/Checkout.jsx
import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import { useCart } from "../context/CartContex";
import "./Checkout.scss";
import { useState } from "react";
import { dataErrors } from "../constants/constants";

export default function Checkout() {
  const { clearCart } = useCart();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });

  const validateField = (name, value) => {
    let error = '';
    if (!value.trim()) {
      error = dataErrors[name];
    } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Correo no válido';
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when typing
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = dataErrors[name];
        isValid = false;
      } else if (key === 'email' && !/^\S+@\S+\.\S+$/.test(formData[key])) {
        newErrors[key] = 'Correo no válido';
        isValid = false;
      }
    });
    setErrors(newErrors);
    if (isValid) {
      clearCart();
      navigate('/checkout-complete');
    }
  };

  const isContinueDisabled =
    !formData.nombre.trim() ||
    !formData.email.trim() ||
    !formData.apellido.trim() ||
    Object.values(errors).some(error => error);

  return (
    <div>
      <TitleBar>
        <h2 className="title">Sus Datos</h2>
      </TitleBar>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="inputs-container">
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre}
              onChange={handleChange} onBlur={handleBlur} required />
            {errors.nombre && <p className="error">{errors.nombre}</p>}

            <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido}
              onChange={handleChange} onBlur={handleBlur} required />
            {errors.apellido && <p className="error">{errors.apellido}</p>}

            <input type="email" name="email" placeholder="Correo electrónico" value={formData.email}
              onChange={handleChange} onBlur={handleBlur} required />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="buttons-container">
            <Link to="/dashboard" className="cancel-button">
              Cancelar
            </Link>
            <button type="submit"
              className="continue-button"
              disabled={isContinueDisabled}>
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}