import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContex';
import './ProductDetails.scss';
import { items as initialItems } from "../constants/constants";
import Header from '../components/Header';
import Footer from '../components/Footer';
import TitleBar from '../components/TitleBar';

const ProductDetails = () => {
    const { addToCart, isInCart, removeFromCart } = useCart();
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = initialItems.find(item =>
            encodeURIComponent(item.id) === productId
        );
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            navigate('/');
        }
    }, [productId, navigate]);

    if (!product) return <div className="loading">Loading...</div>;

    return (
        <div className="page-container">
            <TitleBar>
                <button className="back-button" onClick={() => navigate("/dashboard")}>
                    &larr; Regresar a Productos
                </button>
            </TitleBar>

            <div className="product-details-container">
                <div className="product-details">
                    <div className="product-image-container">
                        <img
                            src={product.image}
                            alt={product.name}
                            height={450}
                            className="product-main-image"
                        />
                    </div>

                    <div className="product-info">
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-price">{product.price}</p>
                        <p className="product-description">{product.description}</p>

                        <div className="product-actions">
                            {isInCart(product) ? (
                                <button className="cart-button remove" onClick={() => removeFromCart(product)}>
                                    {" "}
                                    Quitar del carrito{" "}
                                </button>
                            ) : (
                                <button className="cart-button add" onClick={() => addToCart(product)}>
                                    {" "}
                                    Agregar al carrito{" "}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;