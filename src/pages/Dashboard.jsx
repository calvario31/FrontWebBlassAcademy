import { useState } from "react";
import { FaFilter, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { items as initialItems } from "../constants/constants";
import { useCart } from '../context/CartContex';
import "./Dashboard.scss";
import TitleBar from "../components/TitleBar";

function Dashboard() {
    const { addToCart, isInCart, removeFromCart } = useCart();
    const [sortOption, setSortOption] = useState("name-asc");

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

    return (
        <div className="dashboard">

            <Header />

            <TitleBar>
                <h2 className="dashboard-title">Productos</h2>
                <div className="custom-select-container">
                    <FaFilter className="select-icon filter-icon" />
                    <select className="custom-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="name-asc">name (A-Z)</option>
                        <option value="name-desc">name (Z-A)</option>
                        <option value="price-asc">Precio: menor a mayor</option>
                        <option value="price-desc">Precio: mayor a menor</option>
                    </select>
                    <FaChevronDown className="select-icon arrow-icon" />
                </div>
            </TitleBar>

            <main className="product-grid">
                {sortedItems.map((item, index) => (
                    <div key={index} className="product-card">
                        <Link
                            to={`/product/${encodeURIComponent(item.id)}`}
                            className="product-card-link"
                        >
                            <img src={item.image} alt={item.name} />
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <span className="price">{item.price}</span>
                        </Link>
                        {isInCart(item) ? (
                            <button className="cart-button remove" onClick={() => removeFromCart(item)}>
                                {" "}
                                Quitar del carrito{" "}
                            </button>
                        ) : (
                            <button className="cart-button add" onClick={() => addToCart(item)}>
                                {" "}
                                Agregar al carrito{" "}
                            </button>
                        )}
                    </div>
                ))}
            </main>

            <Footer />
        </div>
    );
}

export default Dashboard;
