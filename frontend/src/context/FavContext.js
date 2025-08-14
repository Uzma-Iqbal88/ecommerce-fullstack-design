import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const { user, likes, setLikes } = useAuth(); // ✅ AuthContext ke likes use ho rahe
  const [localLikes, setLocalLikes] = useState([]);

  // Fetch likes when user changes
  useEffect(() => {
    const fetchLikes = async () => {
      if (!user?._id) {
        setLocalLikes([]);
        setLikes([]);
        return;
      }
      try {
        const res = await axios.get("/api/cart/likes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const likesArray = Array.isArray(res.data) ? res.data : [];
        setLocalLikes(likesArray);
        setLikes(likesArray);
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };
    fetchLikes();
  }, [user, setLikes]);

  // Toggle like/unlike
  const toggleLike = async (item) => {
    if (!user?._id) return alert("Please login first");
    if (!item?._id) return alert("Invalid product");

    // Optimistic update
    setLocalLikes((prev) => {
      const exists = prev.some((p) => p._id === item._id);
      let updated;
      if (exists) {
        updated = prev.filter((p) => p._id !== item._id);
      } else {
        updated = [...prev, item];
      }
      setLikes(updated); // ✅ AuthContext ke likes bhi update
      return updated;
    });

    try {
      const res = await axios.post(
        "/api/cart/like",
        { productId: item._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      const likesArray = Array.isArray(res.data) ? res.data : [];
      setLocalLikes(likesArray);
      setLikes(likesArray);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const likesIds = localLikes.map((p) => p._id);

  return (
    <FavContext.Provider value={{ likes: localLikes, likesIds, toggleLike }}>
      {children}
    </FavContext.Provider>
  );
};

export const useFav = () => useContext(FavContext);
