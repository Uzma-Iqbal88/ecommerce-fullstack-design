import { Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // add this line
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/userService"; // add this

const Cart = () => {
  const { cart, removeFromCart, removeMultipleFromCart } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState(new Set());
   const { user } = useAuth(); // add this line
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: ""
  });
  const [errors, setErrors] = useState({});
  const [showTruck, setShowTruck] = useState(false);

  const navigate = useNavigate();

  const toggleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedItems(newSelected);
  };

  const total = cart.reduce((acc, item) => {
    if (selectedItems.size === 0 || selectedItems.has(item.id)) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Validation functions (same as before) ...

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!/^\d{10,11}$/.test(formData.phone)) newErrors.phone = "Valid phone is required (10-11 digits)";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.payment) newErrors.payment = "Select a payment method";
    if (formData.payment === "card") {
      if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = "Enter valid 16-digit card number";
      if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = "Enter expiry as MM/YY";
      if (!/^\d{3}$/.test(formData.cardCVV)) newErrors.cardCVV = "Enter valid 3-digit CVV";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

const handleOrderNow = async () => {
  if (!validateStep2()) return;

  const selectedCartItems =
    selectedItems.size === 0
      ? cart
      : cart.filter((i) => selectedItems.has(i.id));

  try {
    await createOrder(user.token, {
      items: selectedCartItems,
      total,
      shippingInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      },
      paymentMethod: formData.payment,
    });
  } catch (err) {
    console.error("Failed to place order:", err);
  }

  // Remove from local cart
  const itemsToRemove =
    selectedItems.size === 0
      ? new Set(cart.map((i) => i.id))
      : selectedItems;
  removeMultipleFromCart(itemsToRemove);

  setIsCheckoutOpen(false);
  setShowTruck(true);

  setTimeout(() => {
    setShowTruck(false);
    navigate("/");
  }, 4000);
};

  return (
    <section className="px-4 py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Your Cart ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                  className="mr-4"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <div className="flex-1 ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-blue-600 mr-4">${item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="text-right mt-6 font-bold text-lg dark:text-white">
            Total: ${total.toFixed(2)}
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>
        </>
      )}

      {/* Checkout Dialog and Truck Animation: (same as your code) */}

      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-lg animate-fadeIn">
            {step === 1 && (
              <>
                {/* Customer Details Form (same as your code) */}
                <h2 className="text-xl font-bold mb-4">Customer Details</h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 border rounded mb-2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded mb-2"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-2 border rounded mb-2"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}

                <textarea
                  placeholder="Address"
                  className="w-full p-2 border rounded mb-2"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                {errors.address && <p className="text-red-500">{errors.address}</p>}

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                {cart
                  .filter((item) => selectedItems.size === 0 || selectedItems.has(item.id))
                  .map((item) => (
                    <div key={item.id} className="flex justify-between border-b py-2">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                  ))}
                <div className="mt-2 font-bold">Total: ${total.toFixed(2)}</div>

                <h3 className="mt-4 font-semibold">Payment Method</h3>
                <select
                  className="w-full p-2 border rounded mb-2"
                  value={formData.payment}
                  onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                >
                  <option value="">Select Payment</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
                {errors.payment && <p className="text-red-500">{errors.payment}</p>}

                {formData.payment === "card" && (
                  <>
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full p-2 border rounded mb-2"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    />
                    {errors.cardNumber && <p className="text-red-500">{errors.cardNumber}</p>}

                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded mb-2"
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                    />
                    {errors.cardExpiry && <p className="text-red-500">{errors.cardExpiry}</p>}

                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full p-2 border rounded mb-2"
                      value={formData.cardCVV}
                      onChange={(e) => setFormData({ ...formData, cardCVV: e.target.value })}
                    />
                    {errors.cardCVV && <p className="text-red-500">{errors.cardCVV}</p>}
                  </>
                )}

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleOrderNow}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Order Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showTruck && (
        <div className="fixed inset-0 flex flex-col justify-center items-center backdrop-blur-sm z-50">
          <div className= "px-6 py-4 rounded-xl shadow-lg text-center">
            <div className="text-2xl font-bold mb-2">Order Confirmed!</div>
            <div
              style={{
                fontSize: "3rem",
                position: "relative",
                left: "-150%",
                animation: "truckMoveInline 3s ease-in-out forwards",
              }}
            >
              🚚💨
            </div>

            <style>
              {`
                @keyframes truckMoveInline {
                  0% { left: -150%; }
                  100% { left: 150%; }
                }
              `}
            </style>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
