import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { items as initialItems } from "../constants/constants";
import { useCart } from "../context/CartContext";
import "./Dashboard.scss";
import TitleBar from "../components/TitleBar";
import { RxTriangleDown } from "react-icons/rx";

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
            <TitleBar title={"Productos"} />

            <div className="select-container">
                <FaFilter className="select-icon filter-icon" />
                <select
                    className="product_sort_container"
                    data-test="product_sort_container"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="name-asc">Name (A to Z)</option>
                    <option value="name-desc">Name (Z to A)</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                </select>
                <RxTriangleDown className="select-icon arrow-icon" />
            </div>

            <main
                className="inventory_container"
                id="inventory_container"
                data-test="inventory_container"
            >
                {sortedItems.map((item, index) => (
                    <div key={index} className="inventory_item">
                        <Link
                            to={`/product/${encodeURIComponent(item.id)}`}
                            className="inventory_item_link"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="inventory_item_img"
                                data-test="inventory_item_img"
                            />
                            <h2 className="inventory_item_name" data-test="inventory-item-name">
                                {item.name}
                            </h2>
                            <p className="inventory_item_desc" data-test="inventory_item_desc">
                                {item.description}
                            </p>
                            <span
                                className="price inventory_item_price"
                                data-test="inventory_item_price"
                            >
                                {item.price}
                            </span>
                        </Link>
                        {isInCart(item) ? (
                            <button
                                className="blass-button small danger btn_inventory"
                                data-test="btn_inventory"
                                onClick={() => removeFromCart(item)}
                            >
                                {" "}
                                Quitar del carrito{" "}
                            </button>
                        ) : (
                            <button
                                className="blass-button small success btn_inventory"
                                data-test="btn_inventory"
                                onClick={() => addToCart(item)}
                            >
                                {" "}
                                Agregar al carrito{" "}
                            </button>
                        )}
                    </div>
                ))}
            </main>
        </div>
    );
}

export default Dashboard;
