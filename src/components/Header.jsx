import Cookies from "js-cookie";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logos/logoRectangular.png";
import { useCart } from "../context/CartContext";
import "./Header.scss";

const Header = () => {
    const { cartItems, clearCart } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        clearCart();
        Cookies.remove("session-username");
        navigate("/login");
    };

    const about = (e) => {
        e.preventDefault();
        window.open("https://linktr.ee/blassacademy", "_blank", "noopener,noreferrer");
    };

    return (
        <header className="dashboard-header">
            <div className="menu-container">
                <button
                    className="hamburger"
                    id="react-burger-menu-btn"
                    data-test="react-burger-menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <GiHamburgerMenu />
                </button>
                <div className={`side-panel ${menuOpen ? "open" : ""}`}>
                    {menuOpen && (
                        <>
                            <button className="close-btn" onClick={() => setMenuOpen(false)}>
                                <IoIosClose />
                            </button>
                            <ul>
                                <Link to={"/dashboard"}>
                                    <li>All Items</li>
                                </Link>
                                <Link to={"https://linktr.ee/blassacademy"} onClick={about}>
                                    <li>About</li>
                                </Link>
                                <Link to={"/login"}>
                                    <li onClick={handleLogout}>Logout</li>
                                </Link>
                            </ul>
                        </>
                    )}
                </div>
            </div>

            <div className="app_logo">
                <img src={logo} width={150}></img>
            </div>

            <button className="shopping_cart_link" data-test="shopping-cart-link">
                <Link to="/checkout">
                    <FaShoppingCart size={30} />
                </Link>

                {cartItems?.length > 0 && (
                    <a className="cart-count" data-test="cart-count">
                        <span className="cart-count_badge" data-test="cart-count-badge">
                            {cartItems?.length}
                        </span>
                    </a>
                )}
            </button>
        </header>
    );
};

export default Header;
