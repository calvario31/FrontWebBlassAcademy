import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContex";
import "./ProductDetails.scss";
import { items as initialItems } from "../constants/constants";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
import { IoArrowBackCircle } from "react-icons/io5";

const ProductDetails = () => {
    const { addToCart, isInCart, removeFromCart } = useCart();
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = initialItems.find((item) => encodeURIComponent(item.id) === productId);
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            navigate("/");
        }
    }, [productId, navigate]);

    if (!product) return <div className="loading">Loading...</div>;

    return (
        <div className="page-container">
            <TitleBar>
                <h2 className="blass-title">Detalles del producto</h2>
            </TitleBar>

            <div className="product-details-container">
                <button
                    className="inventory_details_back_button"
                    data-test="back-to-products"
                    id="back-to-products"
                    name="back-to-products"
                    onClick={() => navigate("/dashboard")}
                >
                    <IoArrowBackCircle />
                </button>
                <div className="product-details">
                    <div className="product-image-container">
                        <img
                            src={product.image}
                            alt={product.name}
                            height={450}
                            className="inventory_details_img"
                        />
                    </div>

                    <div className="product-info">
                        <h1 className="inventory_details_name" data-test="inventory-item-name">
                            {product.name}
                        </h1>

                        <p className="inventory_details_desc" data-test="inventory-item-desc">
                            {product.description}
                        </p>
                        <p className="inventory_details_price" data-test="inventory-item-price">
                            {product.price}
                        </p>

                        <div className="product-actions">
                            {isInCart(product) ? (
                                <button
                                    className="blass-button small danger btn_inventory"
                                    data-test="add-to-cart-button"
                                    onClick={() => removeFromCart(product)}
                                >
                                    {" "}
                                    Quitar del carrito{" "}
                                </button>
                            ) : (
                                <button
                                    className="blass-button small success btn_inventory"
                                    data-test="add-to-cart-button"
                                    onClick={() => addToCart(product)}
                                >
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
