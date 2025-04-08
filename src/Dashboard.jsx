import { useState } from "react";
import { items as initialItems } from "./constants";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFilter } from "react-icons/fa";
import Cookies from "js-cookie";
import { IoIosClose } from "react-icons/io";


function Dashboard() {
    const [sortOption, setSortOption] = useState("none");
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        try {
            return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        } catch {
            return [];
        }
    });
    const navigate = useNavigate();

    const sortedItems = [...initialItems].sort((a, b) => {
        switch (sortOption) {
            case "price-asc":
                return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
            case "price-desc":
                return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
        }
        return 0;
    });

    const handleLogout = () => {
        localStorage.removeItem("auth");
        Cookies.remove("session-username");
        navigate("/login");
    };

    const addToCart = (product) => {
        const newCartItems = [...cartItems, product]
        setCartItems(newCartItems);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
    };

    const removeFromCart = (product) => {
        const index = cartItems.findIndex(item => item.name === product.name);
        if (index !== -1) {
            const newCartItems = [...cartItems];
            newCartItems.splice(index, 1);
            setCartItems(newCartItems);
            localStorage.setItem('cart', JSON.stringify(newCartItems));
        }
    };

    const isInCart = (product) => {
        return cartItems.some(item => item.name === product.name);
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="menu-container">
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        <GiHamburgerMenu />
                    </button>
                    {menuOpen && (
                        <div className="side-panel">
                            <button className="close-btn" onClick={() => setMenuOpen(false)}>
                                <IoIosClose />
                            </button>
                            <ul>
                                <li>All Items</li>
                                <li>About</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>

                <h1>Blass Academy</h1>

                <button className="cart-btn" onClick={() => console.log("Cart clicked")}>
                    <FaShoppingCart size={20} />
                    <a className="cart-count" data-test="cart-count">
                        <span className="cart-count_badge" data-test="cart-count-badge">{cartItems?.length}</span>
                    </a>
                </button>
            </header>

            <div className="header-controls">
                <h2>Products</h2>
                <div className="filter-container">
                    <button className="filter-button">
                        <FaFilter />
                    </button>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="none">Ordenar por...</option>
                        <option value="name-asc">name (A-Z)</option>
                        <option value="name-desc">name (Z-A)</option>
                        <option value="price-asc">Precio: menor a mayor</option>
                        <option value="price-desc">Precio: mayor a menor</option>
                    </select>
                </div>
            </div>

            <main className="product-grid">
                {sortedItems.map((item, index) => (
                    <div key={index} className="product-card">
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <span className="price">{item.price}</span>
                        {isInCart(item) ?
                            (<button className="cart-button remove" onClick={() => removeFromCart(item)}> Quitar del carrito </button>)
                            :
                            (<button className="cart-button add" onClick={() => addToCart(item)}> Agregar al carrito </button>)
                        }
                    </div>
                ))}
            </main>

            <footer className="dashboard-footer">
                <div className="footer-content">
                    <div className="social-icons">

                        <a href="https://www.youtube.com/@blassx31" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <svg className="social-icon" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>

                        <a href="https://www.instagram.com/blassx31" target="_blank" rel="noopener noreferrer">
                            <svg className="social-icon" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>

                        <a href="https://www.linkedin.com/company/blassx31" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg className="social-icon" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>

                        <a href="https://tiktok.com/@blassx31" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                            <svg className="social-icon" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                            </svg>
                        </a>

                        <a href="https://www.facebook.com/blass31" target="_blank" rel="noopener noreferrer">
                            <svg className="social-icon" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <p>&copy; Blass Academy. Todos los derechos Reservados</p>
            </footer>
        </div>
    );
}

export default Dashboard;
