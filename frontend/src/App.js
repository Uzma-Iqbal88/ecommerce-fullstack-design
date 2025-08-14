import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.js";
import { FavProvider } from "./context/FavContext.js";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import Cart from "./pages/Cart.jsx";
import Electronics from "./pages/Electronics.jsx";
import Fashion from "./pages/Fashion.jsx";
import Fav from "./pages/fav.jsx";
import Home from "./pages/Home.jsx";
import Living from "./pages/Living.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Products from "./pages/Products.jsx";
import Profile from "./pages/Profile.jsx";
import Shoes from "./pages/Shoes.jsx";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FavProvider> 
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/living" element={<Living />} />
            <Route path="/favorites" element={<Fav />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/msg" element={<MessagesPage />} />
            <Route path="/grid" element={<ProductGrid />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
           </FavProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
