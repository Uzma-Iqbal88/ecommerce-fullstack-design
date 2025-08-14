import API from "./api.js";

export const fetchCart = async (token) => {
  const { data } = await API.get("/user/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const fetchOrders = async (token) => {
  const { data } = await API.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const fetchLikes = async (token) => {
  const { data } = await API.get("/user/likes", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// New function for placing orders
export const createOrder = async (token, orderData) => {
  const { data } = await API.post("/orders", orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
