import API from "./api.js";

export const loginUser = async (email, password) => {
  const { data } = await API.post("/auth/login", { email, password });
  // ✅ Ensure token is stored here if you want to save it earlier
  saveToken(data.token);
  return data; // contains token, role, user
};

export const registerUser = async (name, email, password) => {
  const { data } = await API.post("/auth/register", { name, email, password });
  saveToken(data.token);
  return data; // contains token, role, user
};


// ✅ Fixed getProfile to include Authorization header
export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const { data } = await API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Adjust if your backend wraps user inside data.user
  return data.user || data;
};


export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");
export const saveToken = (token) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");
export const isLoggedIn = () => !!getToken();
