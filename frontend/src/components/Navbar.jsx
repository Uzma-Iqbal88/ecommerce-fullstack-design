import { Heart, Menu, MessageSquare, Moon, ShoppingBag, ShoppingCart, Sun } from 'lucide-react';
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.js";
import { useFav } from "../context/FavContext.js"; // ✅ import FavContext

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { likes } = useFav(); // ✅ get favorites list
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Update cart items count
  useEffect(() => {
    if (cart.length > 0) {
      setCartItemsCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));
    } else {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItemsCount(storedCart.reduce((acc, item) => acc + (item.quantity || 1), 0));
    }
  }, [cart]);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4 gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2 pl-1">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
          <h1 className="text-blue-600 dark:text-white text-3xl font-bold">
            <Link to="/">Brand</Link>
          </h1>
        </div>

        {/* Search */}
        <div className="flex items-center flex-1 max-w-lg border-2 border-blue-500 rounded-full bg-white dark:bg-gray-800 px-2 py-1">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 text-sm px-4 py-2 outline-none bg-white dark:bg-gray-800 dark:text-white text-gray-800 rounded-l-full"
          />
          <div className="w-px h-6 bg-blue-300 mx-2"></div>
          <select
            className="text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 outline-none pr-4 rounded-r-full"
            defaultValue=""
          >
            <option value="" disabled hidden>Category</option>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="beauty">Beauty</option>
          </select>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 text-gray-800 dark:text-gray-200 font-medium text-sm">
          
          {/* Cart */}
          <div className="relative flex items-center justify-center w-8 h-8">
            <button onClick={() => user ? navigate("/cart") : openAuthModal()}>
              <ShoppingCart className="w-5 h-5 hover:text-blue-500" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Favorites */}
          <div className="relative flex items-center justify-center w-8 h-8">
            <button onClick={() => user ? navigate("/favorites") : openAuthModal()}>
              <Heart className="w-5 h-5 hover:text-blue-500" />
              {likes.length > 0 && ( // ✅ show count if any
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-1">
                  {likes.length}
                </span>
              )}
            </button>
          </div>

          {/* Messages */}
          <div className="flex items-center justify-center w-8 h-8">
            <Link to="/msg">
              <MessageSquare className="w-5 h-5 hover:text-blue-500" />
            </Link>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-center w-8 h-8">
            <button onClick={toggleDarkMode} className="focus:outline-none">
              {darkMode ? <Moon className="w-5 h-5 hover:text-blue-500" /> : <Sun className="w-5 h-5 hover:text-blue-500" />}
            </button>
          </div>

          {/* User Avatar / Login */}
          <div className="flex items-center justify-center w-8 h-8">
            {user ? (
              <button
                onClick={() =>
                  navigate(user.role === "admin" ? "/admin" : "/profile")
                }
                className="focus:outline-none"
              >
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "U"
                    )}`
                  }
                  className="w-8 h-8 rounded-full"
                  alt="profile"
                />
              </button>
            ) : (
              <button onClick={openAuthModal}>
                <img
                  src={`https://ui-avatars.com/api/?name=User`}
                  className="w-8 h-8 rounded-full"
                  alt="login"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Second Row Menu */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center">
            <button className="flex items-center gap-2 text-black font-bold pl-0 py-2">
              <Menu className="w-4 h-4" />
              All category
            </button>
            <div className="flex items-center gap-10 ml-16">
              <button className="hover:text-blue-500">Hot offers</button>
              <button className="hover:text-blue-500">Gift boxes</button>
              <button className="hover:text-blue-500">Projects</button>
              <button className="hover:text-blue-500">MenuItems</button>
              <button className="hover:text-blue-500">Help</button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <select className="bg-transparent outline-none cursor-pointer">
              <option>English, USD</option>
            </select>
            <select className="bg-transparent outline-none cursor-pointer">
              <option>Ship to</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
