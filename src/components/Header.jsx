import Cookies from "js-cookie";
import { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logos/logoRectangular.png";
import { useCart } from "../context/CartContex";
import "./Header.scss";


const Header = () => {
    const { cartItems, clearCart } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearCart();
        Cookies.remove("session-username");
        navigate("/login");
    };

    const about = () => {
        window.open('https://linktr.ee/blassacademy', "_blank", "noopener,noreferrer");
    }

    return (
        <header className="dashboard-header">
            <div className="menu-container">
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <GiHamburgerMenu />
                </button>
                <div className={`side-panel ${menuOpen ? 'open' : ''}`}>
                    {menuOpen && (
                        <>
                            <button className="close-btn" onClick={() => setMenuOpen(false)}>
                                <IoIosClose />
                            </button>
                            <ul>
                                <li>All Items</li>
                                <li onClick={about}>About</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </>
                    )}
                </div>
            </div>

            <div className="title">
                <img src={logo} width={150}></img>
            </div>

            <button className="cart-btn">
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