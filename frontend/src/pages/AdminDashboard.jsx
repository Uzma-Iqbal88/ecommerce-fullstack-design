import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [data, setData] = useState({ users: [], orders: [], products: [] });
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '', category: '', stock: 0 });
  const [showModal, setShowModal] = useState(false);
  const [snackbar, setSnackbar] = useState("");

  const load = async () => {
    try {
      const { data } = await API.get("/admin/stats");
      setData(data);
    } catch (err) {
      console.error("Error loading admin stats:", err);
      if (err.response?.status === 401) logout();
    }
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    try {
      await API.post("/products", {
        name: form.name,
        price: Number(form.price),
        image: form.image,
        description: form.description,
        category: form.category,
        stock: Number(form.stock)
      });

      setForm({ name: '', price: '', image: '', description: '', category: '', stock: 0 });
      setShowModal(false);
      load();

      setSnackbar("✅ Product added successfully!");
      setTimeout(() => setSnackbar(""), 3000);
    } catch (err) {
      console.error("Error creating product:", err);
      if (err.response?.status === 401) logout();
      setSnackbar("❌ Failed to add product");
      setTimeout(() => setSnackbar(""), 3000);
    }
  };

  const update = async (p) => {
    try {
      await API.put(`/products/${p._id}`, p);
      load();
      setSnackbar("✅ Product updated");
      setTimeout(() => setSnackbar(""), 2000);
    } catch (err) {
      console.error("Error updating product:", err);
      if (err.response?.status === 401) logout();
    }
  };

  const remove = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      load();
      setSnackbar("🗑 Product deleted");
      setTimeout(() => setSnackbar(""), 2000);
    } catch (err) {
      console.error("Error deleting product:", err);
      if (err.response?.status === 401) logout();
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6 relative">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-center w-full">Admin Dashboard</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {snackbar && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded shadow-lg z-50 animate-slide-up">
            {snackbar}
          </div>
        )}

        <section className="text-center">
          <button
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 font-semibold"
            onClick={() => setShowModal(true)}
          >
            Create Product
          </button>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded p-6 w-11/12 max-w-2xl space-y-4">
                <h2 className="text-xl font-bold">Add New Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.keys(form).map((k) => (
                    <input
                      key={k}
                      type={k === "image" ? "file" : "text"}
                      className="border p-2"
                      placeholder={k}
                      onChange={e =>
                        k === "image"
                          ? setForm({ ...form, image: e.target.files[0] })
                          : setForm({ ...form, [k]: e.target.value })
                      }
                    />
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    onClick={create}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <div className="grid gap-2">
            {data.products.map(p => (
              <div key={p._id} className="border rounded p-3 grid md:grid-cols-6 gap-2 items-center">
                <input className="border p-1" value={p.name} onChange={e => update({ ...p, name: e.target.value })} />
                <input className="border p-1" value={p.price} onChange={e => update({ ...p, price: Number(e.target.value) })} />
                <input className="border p-1" value={p.category || ''} onChange={e => update({ ...p, category: e.target.value })} />
                <input className="border p-1" value={p.stock} onChange={e => update({ ...p, stock: Number(e.target.value) })} />
                <button className="border px-2 py-1 text-red-600" onClick={() => remove(p._id)}>Delete</button>
                <span className="text-xs text-gray-600">{p._id.slice(-6)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <ul className="space-y-2">
              {data.users.map(u => (
                <li key={u._id} className="border p-2 rounded">
                  <div className="font-medium">{u.name} ({u.email})</div>
                  <div className="text-sm">Cart: {u.cart.length} items • Likes: {u.likes.length}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <ul className="space-y-2">
              {data.orders.map(o => (
                <li key={o._id} className="border p-2 rounded text-sm">
                  <div>#{o._id.slice(-6)} • {o.user?.email}</div>
                  <div>{o.items.length} items • Total ${o.total}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes slideUp {
          0% { transform: translate(-50%, 50px); opacity: 0; }
          20% { transform: translate(-50%, 0); opacity: 1; }
          80% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, 50px); opacity: 0; }
        }
        .animate-slide-up {
          animation: slideUp 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
