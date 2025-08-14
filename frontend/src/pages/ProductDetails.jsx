import { useContext, useState } from "react";
import { FaApple, FaGooglePlay, FaStore } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import supplierImg from "../assets/5.jpeg";
import cameraImg from "../assets/camera.jpg";
import headphonesImg from "../assets/headphones.jpg";
import smartphoneImg from "../assets/phone.jpg";
import watchImg from "../assets/watch.jpg";
import { CartContext } from "../context/CartContext";


const dummyProducts = [
  {
    id: 1,
    name: "Wireless Headphones High-quality, noise-cancelling wireless headphones designed for crystal-clear sound and immersive listening.",
    desc: "High-quality, noise-cancelling wireless headphones designed for crystal-clear sound and immersive listening. Comfortable ear cushions, long-lasting battery life, and seamless Bluetooth connectivity make them perfect for music, calls, and gaming on the go.",
    price: 99,
    images: [headphonesImg, cameraImg, smartphoneImg, watchImg],
    rating: 4.3,
    reviews: 32,
    sold: 154,
  },
  {
    id: 2,
    name: "Smartphone",
    desc: "Latest smartphone with powerful performance.",
    price: 299,
    images: [smartphoneImg, cameraImg, headphonesImg],
    rating: 4.5,
    reviews: 21,
    sold: 98,
  },
  {
    id: 3,
    name: "Smart Watch",
    desc: "Stylish smartwatch with health tracking features.",
    price: 150,
    images: [watchImg, smartphoneImg, cameraImg],
    rating: 4.6,
    reviews: 40,
    sold: 210,
  },
  {
    id: 4,
    name: "Wireless Headphones",
    desc: "Noise-cancelling wireless headphones with premium sound.",
    price: 120,
    images: [headphonesImg, watchImg, smartphoneImg],
    rating: 4.4,
    reviews: 55,
    sold: 180,
  },
  
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = dummyProducts.find((p) => p.id === parseInt(id));
  const { addToCart } = useContext(CartContext); // ✅ Move here
  const [mainImage, setMainImage] = useState(product?.images[0] || "");
  const [activeTab, setActiveTab] = useState("description");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", payment: "", cardNumber: "", cardExpiry: "", cardCVV: ""
  });
  const [errors, setErrors] = useState({});
  const [showTruck, setShowTruck] = useState(false);

  // Step 1 Validation
  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!/^\d{10,11}$/.test(formData.phone)) newErrors.phone = "Valid phone is required (10-11 digits)";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
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

  const handleNext = () => { if(validateStep1()) setStep(2); };

  const handleConfirmOrder = () => {
    if(!validateStep2()) return;
    setIsCheckoutOpen(false);
    setShowTruck(true);
    setTimeout(()=> setShowTruck(false), 4000);
  };

  const handleOrderNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    setIsCheckoutOpen(true);
  };

  

  if (!product) {
    return <p className="p-6">Product not found.</p>;
  }

  const relatedProducts = dummyProducts.filter((p) => p.id !== product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  const tabContent = {
    description: (
      <>
        <table className="w-full border mb-4">
          <tbody>
            <tr>
              <td className="p-2 border font-semibold">Name</td>
              <td className="p-2 border">{product.name}</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">Price</td>
              <td className="p-2 border">${product.price}</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">Type</td>
              <td className="p-2 border">Classic shoes</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">Style</td>
              <td className="p-2 border">Modern nice</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">ID</td>
              <td className="p-2 border">{product.id}</td>
            </tr>
          </tbody>
        </table>
        <ul className="list-disc pl-5 text-gray-700">
          <li>✔ 1-year warranty</li>
          <li>✔ 30-day return policy</li>
          <li>✔ Free maintenance service</li>
        </ul>
      </>
    ),
    reviews: (
      <div>
        <h3 className="font-semibold mb-2">Customer Reviews</h3>
        <p>⭐ 5/5 - Excellent quality!</p>
        <p>⭐ 4/5 - Good but shipping was slow.</p>
      </div>
    ),
    shipping: (
      <div>
        <h3 className="font-semibold mb-2">Shipping Info</h3>
        <p>🚚 Ships worldwide within 5-7 business days.</p>
        <p>💲 Shipping cost depends on location.</p>
      </div>
    ),
    about: (
      <div>
        <h3 className="font-semibold mb-2">About Seller</h3>
        <p>Guangxi Trading LLC</p>
        <p>📍 Germany, Berlin</p>
        <p>✅ Verified Seller</p>
      </div>
    ),
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <Link to="/" className="text-blue-500 hover:underline">
        &larr; Back
      </Link>

      <div className="mt-4">
        <div className="bg-white rounded-lg shadow px-4 py-6">
          <div className="md:grid md:grid-cols-3 gap-4">
            {/* Left: Product Images */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-[28rem] object-contain bg-white rounded border"
                  />
                  <div className="flex items-center gap-3 mt-4">
                    {product.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className={`w-20 h-20 object-contain border rounded cursor-pointer hover:border-blue-500 ${
                          mainImage === img ? "border-blue-500" : "border-gray-300"
                        }`}
                        onClick={() => setMainImage(img)}
                      />
                    ))}
                  </div>
                </div>

                {/* Product details */}
                <div className="space-y-9">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                    In stock
                  </span>
                  <h1 className="text-xl font-semibold">{product.name}</h1>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>⭐ {product.rating}</span>
                    <span className="ml-2">{product.reviews} reviews</span>
                    <span className="ml-2">({product.sold} sold)</span>
                  </div>

                  {/* Price tiers */}
                  <div className="flex gap-4 mt-5">
                    <div className="bg-red-100 p-3 rounded text-center">
                      <p className="text-lg font-bold text-red-600">$98.00</p>
                      <p className="text-sm text-gray-500">50-199 pcs</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded text-center">
                      <p className="text-lg font-bold text-orange-600">$90.00</p>
                      <p className="text-sm text-gray-500">100-499 pcs</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded text-center">
                      <p className="text-lg font-bold text-yellow-600">$78.00</p>
                      <p className="text-sm text-gray-500">500+ pcs</p>
                    </div>
                  </div>

                  {/* Product Specs */}
                  <div className="text-sm space-y-3">
                    <p><strong>Price:</strong> Negotiable</p>
                    <p><strong>Type:</strong> Classic shoes</p>
                    <p><strong>Material:</strong> Plastic material</p>
                    <p><strong>Design:</strong> Modern nice</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-8 mt-4 pl-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-sm font-semibold"
                    >
                      Add to Cart
                    </button>
                     <button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded text-sm font-semibold"
                    onClick={handleOrderNow}>
                          Order Now
                          </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Supplier Info */}
            <div className="border rounded p-4 h-64 md:w-full">
              <div className="flex items-center gap-3">
                <img
                  src={supplierImg}
                  alt="Supplier"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-base">Supplier</h3>
                  <p className="text-gray-600 text-sm">Guangxi Trading LLC</p>
                </div>
              </div>
              <p className="text-gray-600 mt-2 text-sm">📍 Germany, Berlin</p>
              <p className="text-gray-600 text-sm">✅ Verified Seller</p>
              <p className="text-gray-600 text-sm">🚚 Worldwide Shipping</p>
              <button className="mt-3 w-full px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                Send Inquiry
              </button>
              <button className="mt-2 w-full px-3 py-1.5 border text-sm rounded hover:bg-gray-100">
                Seller's Profile
              </button>
              <p className="text-blue-500 text-xs mt-2 cursor-pointer hover:underline">
                Save for later
              </p>
            </div>
          </div>
        </div>

        {/* New Tabs + Layout */}
<div className="flex gap-6 mt-10">
  
  {/* Left: Tabs & Content */}
  <div className="flex-1 bg-white rounded shadow p-4">
    {/* Tabs */}
    <div className="flex gap-6 border-b pb-2">
      {["description", "reviews", "shipping", "about"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`capitalize pb-1 ${
            activeTab === tab
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Tab Content */}
    <div className="mt-4">{tabContent[activeTab]}</div>
  </div>

  {/* Right: Related Products */}
  <div className="w-1/4 bg-white rounded shadow p-4">
    <h3 className="font-bold mb-3">You may like</h3>
    <div className="space-y-3">
      {relatedProducts.map((item) => (
        <Link
          key={item.id}
          to={`/product/${item.id}`}
          className="block border rounded p-2 hover:shadow"
        >
          <img
            src={item.images[0]}
            alt={item.name}
            className="h-24 w-full object-contain"
          />
          <p className="text-sm mt-1 font-semibold">{item.name}</p>
          <p className="text-red-500 font-bold">${item.price}</p>
        </Link>
        
      ))}
    </div>
  </div>
</div>
{/* Horizontal Related Products */}
<div className="mt-10 bg-white p-6 rounded shadow">
  <h3 className="font-bold mb-4 text-lg">Related Products</h3>
  <div className="flex gap-4 overflow-x-auto scrollbar-hide">
    {relatedProducts.map((item) => (
      <Link
        key={item.id}
        to={`/product/${item.id}`}
        className="min-w-[180px] flex-shrink-0 border rounded p-2 hover:shadow"
      >
        <img
          src={item.images[0]}
          alt={item.name}
          className="h-36 w-full object-contain mb-2"
        />
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="text-red-500 font-bold">${item.price}</p>
      </Link>
    ))}
  </div>
</div>

{/* Newsletter Section - Full Width, Bottom */}
      <div className="bg-gray-50 w-full h-70 mx-auto p-6 rounded-lg shadow-sm text-center mb-11 mt-8">
            <h3 className="text-xl font-semibold mb-2">Subscribe on our newsletter</h3>
            <p className="text-sm mb-4">
              Get daily news on upcoming offers from many suppliers all over the world
            </p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded-l-md w-64"
              />
              <button className="bg-blue-500 text-white px-4 rounded-r-md">
                SUBSCRIBE
              </button>
            </div>
          </div>
      
          {/* Footer Links Section */}
          <div className="max-w-6xl mx-auto px-6 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-sm text-center md:text-left">
              
              {/* Brand with Store Icon */}
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2 text-blue-600 text-lg font-bold">
                  <FaStore className="text-3xl" /> {/* ✅ Bigger & new icon */}
                  <span>Brand</span>
                </div>
                <p className="text-xs mt-2 text-gray-700">
                  Best information about the company goes here but now lorem ipsum is
                </p>
              </div>
      
              {/* About */}
      <div>
        <h4 className="font-bold mb-3">About</h4> {/* ✅ Spacing increased */}
        <ul className="space-y-2">
          <li className="hover:text-blue-600 cursor-pointer">About Us</li>
          <li className="hover:text-blue-600 cursor-pointer">Find store</li>
          <li className="hover:text-blue-600 cursor-pointer">Categories</li>
          <li className="hover:text-blue-600 cursor-pointer">Blogs</li>
        </ul>
      </div>
      
      {/* Partnership */}
      <div>
        <h4 className="font-bold mb-3">Partnership</h4>
        <ul className="space-y-2">
          <li className="hover:text-blue-600 cursor-pointer">About Us</li>
          <li className="hover:text-blue-600 cursor-pointer">Find store</li>
          <li className="hover:text-blue-600 cursor-pointer">Categories</li>
          <li className="hover:text-blue-600 cursor-pointer">Blogs</li>
        </ul>
      </div>
      
      {/* Information */}
      <div>
        <h4 className="font-bold mb-3">Information</h4>
        <ul className="space-y-2">
          <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-blue-600 cursor-pointer">Money Refund</li>
          <li className="hover:text-blue-600 cursor-pointer">Shipping</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact us</li>
        </ul>
      </div>
      
      {/* For users */}
      <div>
        <h4 className="font-bold mb-3">For users</h4>
        <ul className="space-y-2 ">
          <li className="hover:text-blue-600 cursor-pointer">Login</li>
          <li className="hover:text-blue-600 cursor-pointer">Register</li>
          <li className="hover:text-blue-600 cursor-pointer">Settings</li>
          <li className="hover:text-blue-600 cursor-pointer">My Orders</li>
        </ul>
      </div>
      
              {/* Get App */}
      <div>
        <h4 className="font-bold mb-4 ">Get app</h4>
        <button className="flex items-center justify-center bg-black text-white py-1 mb-3 px-3 rounded my-1 text-xs w-full">
          <FaApple className="mr-2 text-lg" />
          DOWNLOAD ON APP STORE
        </button>
        <button className="flex items-center justify-center bg-black text-white py-1 px-3 rounded text-xs w-full">
          <FaGooglePlay className="mr-2 text-lg" />
          GET ON GOOGLE PLAY
        </button>
      </div>
      </div>
      </div>   
       {isCheckoutOpen && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-lg">
      {step === 1 && (
        <>
          <h2 className="text-xl font-bold mb-4">Customer Details</h2>
          <input type="text" placeholder="Full Name" className="w-full p-2 border rounded mb-2" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input type="tel" placeholder="Phone" className="w-full p-2 border rounded mb-2" value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})}/>
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          <textarea placeholder="Address" className="w-full p-2 border rounded mb-2" value={formData.address} onChange={(e)=>setFormData({...formData,address:e.target.value})}/>
          {errors.address && <p className="text-red-500">{errors.address}</p>}
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={()=>setIsCheckoutOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button onClick={handleNext} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Proceed to Payment</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <select className="w-full p-2 border rounded mb-2" value={formData.payment} onChange={(e)=>setFormData({...formData,payment:e.target.value})}>
            <option value="">Select Payment</option>
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
          </select>
          {errors.payment && <p className="text-red-500">{errors.payment}</p>}
          {formData.payment === "card" && (
            <>
              <input type="text" placeholder="Card Number" className="w-full p-2 border rounded mb-2" value={formData.cardNumber} onChange={(e)=>setFormData({...formData,cardNumber:e.target.value})}/>
              {errors.cardNumber && <p className="text-red-500">{errors.cardNumber}</p>}
              <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded mb-2" value={formData.cardExpiry} onChange={(e)=>setFormData({...formData,cardExpiry:e.target.value})}/>
              {errors.cardExpiry && <p className="text-red-500">{errors.cardExpiry}</p>}
              <input type="text" placeholder="CVV" className="w-full p-2 border rounded mb-2" value={formData.cardCVV} onChange={(e)=>setFormData({...formData,cardCVV:e.target.value})}/>
              {errors.cardCVV && <p className="text-red-500">{errors.cardCVV}</p>}
            </>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={()=>setStep(1)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back</button>
            <button onClick={handleConfirmOrder} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Confirm Order</button>
          </div>
        </>
      )}
    </div>
  </div>
)}

{showTruck && (
  <div className="fixed inset-0 flex flex-col justify-center items-center backdrop-blur-sm z-50">
    <div className="px-6 py-4 rounded-xl shadow-lg text-center bg-white">
      <div className="text-2xl font-bold mb-2">Order Confirmed!</div>
      <div 
        style={{
          fontSize: "3rem", 
          position: "relative", 
          left: "-150%", 
          animation: "truckMoveInline 3s ease-in-out forwards"
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
</div>
</div>
  )};
