import { useState } from "react";
import { items as initialItems } from "./constantes";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import { FaShoppingCart } from "react-icons/fa";
import Cookies from 'js-cookie';


function Dashboard() {
  const [sortOption, setSortOption] = useState("none");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const sortedItems = [...initialItems].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return parseFloat(a.precio.replace("$", "")) - parseFloat(b.precio.replace("$", ""));
      case "price-desc":
        return parseFloat(b.precio.replace("$", "")) - parseFloat(a.precio.replace("$", ""));
      case "name-asc":
        return a.nombre.localeCompare(b.nombre);
      case "name-desc":
        return b.nombre.localeCompare(a.nombre);
    }
    return 0;
  });

  const handleLogout = () => {
    localStorage.removeItem("auth");
    Cookies.remove('session-username');
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="menu-container">
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          {menuOpen && (
            <div className="side-panel">
              <button className="close-btn" onClick={() => setMenuOpen(false)}>✖</button>
              <ul>
                <li>All Items</li>
                <li>About</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>

        <h1>Lista de Productos</h1>

        <button className="cart-btn" onClick={() => console.log("Cart clicked")}>
          <FaShoppingCart size={20} />
        </button>
      </header>

      <div className="header-controls">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="none">Ordenar por...</option>
          <option value="name-asc">Nombre (A-Z)</option>
          <option value="name-desc">Nombre (Z-A)</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <main className="product-grid">
        {sortedItems.map((item, index) => (
          <div key={index} className="product-card">
            <img src={item.image} alt={item.nombre} />
            <h2>{item.nombre}</h2>
            <p>{item.descripcion}</p>
            <span className="price">{item.precio}</span>
            <button className="cart-button"> Agregar al carrito </button>
          </div>
        ))}
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 Blass Academy. All Rights Reserved. Terms of Service | Privacy Policy</p>
      </footer>
    </div>
  );
}

export default Dashboard;
