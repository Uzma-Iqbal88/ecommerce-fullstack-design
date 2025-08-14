import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const userId = user?._id || "guest"; // ✅ fixed _id

  const cartKey = `cart_${userId}`;
  const favKey = `favorites_${userId}`;

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // ✅ Load cart & favorites only when Auth loading is done
  useEffect(() => {
    if (!loading) {
      const storedCart = localStorage.getItem(cartKey);
      setCart(storedCart ? JSON.parse(storedCart) : []);

      const storedFav = localStorage.getItem(favKey);
      setFavorites(storedFav ? JSON.parse(storedFav) : []);
    }
  }, [loading, cartKey, favKey]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart[index].quantity += 1;
        return newCart;
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const removeMultipleFromCart = (ids) => {
    if (!Array.isArray(ids)) ids = [ids];
    setCart((prevCart) => prevCart.filter((item) => !ids.includes(item.id)));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(cartKey);
  };

  const addToFavorites = (item) => {
    setFavorites((prevFav) => {
      if (prevFav.some((fav) => fav.id === item.id)) {
        return prevFav;
      }
      return [...prevFav, item];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prevFav) => prevFav.filter((item) => item.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(favKey);
  };

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, cartKey, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(favKey, JSON.stringify(favorites));
    }
  }, [favorites, favKey, loading]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeMultipleFromCart,
        clearCart,
        favorites,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
