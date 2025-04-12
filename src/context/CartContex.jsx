import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        } catch {
            return [];
        }
    });

    const addToCart = (product) => {
        const newCartItems = [...cartItems, product];
        setCartItems(newCartItems);
        localStorage.setItem("cart", JSON.stringify(newCartItems));
    };

    const removeFromCart = (product) => {
        const index = cartItems.findIndex((item) => item.name === product.name);
        if (index !== -1) {
            const newCartItems = [...cartItems];
            newCartItems.splice(index, 1);
            setCartItems(newCartItems);
            localStorage.setItem("cart", JSON.stringify(newCartItems));
        }
    };

    const isInCart = (product) => {
        return cartItems.some((item) => item.name === product.name);
    };

    const clearCart = () => {
        localStorage.removeItem("cart");
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);