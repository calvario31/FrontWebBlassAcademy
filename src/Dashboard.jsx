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
                <p>&copy; Blass Academy. Todos los derechos Reservados</p>
            </footer>
        </div>
    );
}

export default Dashboard;
