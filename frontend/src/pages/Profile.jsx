import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchOrders } from "../services/userService";

export default function Profile() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [profilePic, setProfilePic] = useState(null);

  const reload = async () => {
    try {
      setLoading(true);
      const ordersData = await fetchOrders(user.token);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) reload();
  }, [user]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold">Loading orders...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white px-6 py-3 shadow">
        <h1 className="text-xl font-bold text-orange-500">MyShop</h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-700">{user.name}</span>
          <img
            src={profilePic || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full border cursor-pointer"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md p-6">
          <div className="flex flex-col items-center mb-6">
            <label className="relative w-20 h-20">
              <img
                src={profilePic || "https://via.placeholder.com/80"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <input
                type="file"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </label>
            <h2 className="mt-2 font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="space-y-3">
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "orders" ? "bg-orange-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "settings" ? "bg-orange-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "info" ? "bg-orange-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("info")}
            >
              Info
            </button>
            <button
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-red-500"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6">
          {activeTab === "orders" && (
            <>
              <h1 className="text-2xl font-bold mb-4">My Orders</h1>
              {loading ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <p>No orders found</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="p-4 bg-white rounded shadow hover:shadow-md"
                    >
                      <p className="font-semibold">Order ID: {order._id}</p>
                      <p>Total: ${order.total}</p>
                      <p>Items: {order.items?.length || 0}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Settings</h1>
              <form className="space-y-4 bg-white p-4 rounded shadow max-w-md">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "info" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">User Info</h1>
              <div className="bg-white p-4 rounded shadow max-w-md">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Member Since:</strong> 2025</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
