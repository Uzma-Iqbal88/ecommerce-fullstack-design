import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import { getProfile, loginUser, registerUser, removeToken, saveToken } from "../services/authService.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // ✅ Get user profile
      const profile = await getProfile();
      setUser(profile);

      if (profile?._id) {
        // ✅ Fetch cart
        const cartRes = await axios.get("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(cartRes.data);

        // ✅ Fetch likes
        const likesRes = await axios.get("/api/cart/likes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikes(likesRes.data);
      }
    } catch (err) {
      console.error("Error loading profile/cart/likes:", err);
      removeToken();
      setUser(null);
      setCart([]);
      setLikes([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProfileData();
}, []);


  const openAuthModal = () => setShowModal(true);
  const closeAuthModal = () => setShowModal(false);

  const login = async (email, password) => {
    const { token, role, user: loggedUser } = await loginUser(email, password);
    saveToken(token);
    setUser({ ...loggedUser, role });

    const cartRes = await axios.get("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart(cartRes.data);

    const likesRes = await axios.get("/api/cart/likes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLikes(likesRes.data);

    closeAuthModal();
    navigate(role === "admin" ? "/admin" : "/Profile");
  };

  const signup = async (name, email, password) => {
    const { token, role, user: newUser } = await registerUser(name, email, password);
    saveToken(token);
    setUser({ ...newUser, role });

    setCart([]);
    setLikes([]);

    closeAuthModal();
    navigate(role === "admin" ? "/admin" : "/Profile");
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setCart([]);
    setLikes([]);
    navigate("/");
  };

  // Toggle like function
  const toggleLike = async (product) => {
    if (!user) return;
    try {
      const res = await axios.post(
        "/api/cart/likes",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setLikes(res.data);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cart,
        likes,
        setLikes,
        loading,
        login,
        signup,
        logout,
        toggleLike,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
      {showModal && <AuthModal onClose={closeAuthModal} onLogin={login} onSignup={signup} />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
