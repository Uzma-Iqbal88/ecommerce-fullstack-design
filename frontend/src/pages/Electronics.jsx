import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.js";


// Import images from assets
import Galaxy from "../assets/Galaxy.jpeg";

import Earbuds from "../assets/10.jpeg";
import speaker from "../assets/11.jpeg";
import two from "../assets/5.jpeg";
import wine from "../assets/6.jpeg";
import wire from "../assets/7.jpeg";
import head from "../assets/8.jpeg";
import Fridge from "../assets/fridge.jpeg";
import phone from "../assets/nk.jpeg";
import Printer from "../assets/print.jpeg";
import stove from "../assets/stove.jpeg";

const Electronics = () => {
  const [price, setPrice] = useState(0);
  const { addToCart } = useContext(CartContext);
  const [viewType, setViewType] = useState("grid"); // grid | list
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [favorites, setFavorites] = useState(               //heart 
  JSON.parse(localStorage.getItem("favorites")) || []

);


  const products = [
    { id: 1, name: "Laser printer", desc: "A monochrome laser printer suited for high-volume document printing.", price: 149, image: Printer },
    { id: 2, name: "Double-door Refrigerator", desc: "BModern refrigerator with digital display panel.", price: 199, image: Fridge },
    { id: 3, name: "Smartphone (purple, in box)", desc: "Latest mid-range phone, from Samsung.", price: 180, image: phone },
    { id: 4, name: "Gas Stove / Cooking Range", desc: "Multi-burner gas stove or oven range for kitchens.", price: 90, image:stove },
    { id: 5, name: "Wine Cooler / Beverage Fridge", desc: "Compact fridge for beverages or wine.", price: 342, image: wine },
    { id: 6, name: "6-in-1 USB Adapter", desc: "Multi-connector adapter for various ports.", price: 26, image: wire },
    { id: 7, name: "Over-ear Headphones (pink/purple)", desc: "Stylish wireless or wired headphones.", price: 89, image: head },
    { id: 8, name: "Wireless Earbuds (black)", desc: "Compact Bluetooth earbuds JBL brand.", price: 34, image: Earbuds },
    { id: 9, name: "Tower air conditioner", desc: "Vertical-style AC unit for cooling rooms.", price: 600, image: two },
    { id: 10, name: "Smartphone (Samsung Galaxy, gold)", desc: "Likely a premium mid-flagship Samsung phone.", price: 26, image: Galaxy },
    { id: 11, name: "Portable Bluetooth speaker (JBL)", desc: "Rugged, waterproof Bluetooth speaker.", price: 45, image: speaker },

    { id: 12, name: "Gaming mouse", desc: "Ergonomic, programmable mouse with colorful lighting.", price: 20, image: Galaxy },
    { id: 13, name: "One-handed gaming keypad", desc: "Specialized keypad for gaming with programmable keys.", price: 400, image: Galaxy },
    { id: 14, name: "Table fan (LG)", desc: "Ergonomic, programmable mouse with colorful lighting.", price: 20, image: Galaxy },
    { id: 15, name: "Gaming mouse", desc: "Ergonomic, programmable mouse with colorful lighting.", price: 20, image: Galaxy },
    { id: 16, name: "Gaming mouse", desc: "Ergonomic, programmable mouse with colorful lighting.", price: 20, image: Galaxy },
  ];

  // Pagination settings
  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const toggleFavorite = (item) => {
  setFavorites((prev) => {
    const isFav = prev.some(fav => fav.id === item.id);
    let updatedFavorites;
    if (isFav) {
      updatedFavorites = prev.filter((fav) => fav.id !== item.id);
    } else {
      updatedFavorites = [...prev, item];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return updatedFavorites;
  });
};

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
  {/* Breadcrumb */}
  <h1 className="text-lg font-semibold flex items-center gap-4">
    <span className="text-gray-400">Category</span>
    <span className="text-gray-400">&gt;</span>
    <span className="text-gray-900">Electronics</span>
    <span className="text-gray-400">&gt;</span>
    <span className="text-gray-900">Items</span>
  </h1>

  {/* Right side - Verified + Featured + View buttons */}
  <div className="flex items-center gap-4">
    {/* Verified only */}
    <label className="flex items-center gap-1 text-sm">
      <input type="checkbox" />
      Verified only
    </label>

    {/* Featured dropdown */}
    <select className="border rounded px-2 py-1 text-sm">
      <option>Featured</option>
      <option>Price: Low to High</option>
      <option>Price: High to Low</option>
    </select>

    {/* View Toggle Buttons */}
    <div className="flex gap-1">
      <button
        onClick={() => setViewType("grid")}
        className={`p-2 border rounded ${viewType === "grid" ? "bg-gray-200" : ""}`}
      >
        {/* Grid Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h4v4H4V6zMdiv6h4v4h-4V6zM16 6h4v4h-4V6zM4 12h4v4H4v-4zM10 12h4v4h-4v-4zM16 12h4v4h-4v-4zM4 18h4v4H4v-4zM10 18h4v4h-4v-4zM16 18h4v4h-4v-4z"/>
        </svg>
      </button>
      <button
        onClick={() => setViewType("list")}
        className={`p-2 border rounded ${viewType === "list" ? "bg-gray-200" : ""}`}
      >
        {/* List Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
    </div>
    </div>


      {/* Sidebar + Products */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 border-r pr-4">
          <h2 className="text-lg font-semibold mb-4">Filter by</h2>

          {/* Category */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Category</h3>
            <ul className="space-y-1 text-sm">
              {[
                "Computers", "Mobile Accessories", "Tablets", "Smart Watch",
                "Hair Straighteners", "Hair Dryers", "Washing Machines",
                "Refrigerators", "Microwave Ovens", "Vacuum Cleaners", "Air Conditioners"
              ].map((item, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Brands</h3>
            <ul className="space-y-1 text-sm">
              {[
                "Apple", "Samsung", "Sony", "Dawlance", "Xiaomi", "HP",
                "Dell", "Lenovo", "LG", "Panasonic", "Dyson", "Waves"
              ].map((brand, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-2 mt-7">Price Range</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>$0</span>
              <span>$1000+</span>
            </div>
            <div className="mt-2 text-center text-sm font-semibold text-gray-700">
              Selected: ${price}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Rating</h3>
            <ul className="space-y-2 text-sm">
              {[5, 4, 3].map((stars) => (
                <li key={stars}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-yellow-500 text-base">
                      {"★".repeat(stars)}
                      <span className="text-gray-400">
                        {"☆".repeat(5 - stars)}
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Products Section */}
<div className="flex-1">
  {viewType === "grid" ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {currentProducts.map((item) => (
        <div key={item.id} className="border rounded-lg shadow-md p-4">
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-contain bg-white rounded"
            />

            {/* Heart Icon */}
            <button
              onClick={() => toggleFavorite(item)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
            >
               <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={favorites.some(fav => fav.id === item.id) ? "red" : "none"}
    stroke="gray"
    strokeWidth="2"
    className="w-6 h-6"
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
         2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09 
         C13.09 3.81 14.76 3 16.5 3 
         19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54
         L12 21.35z"
    />
  </svg>
            </button>
          </div>

          <h2 className="mt-2 font-semibold text-lg">{item.name}</h2>
          <p className="text-sm text-gray-600">{item.desc}</p>
          <p className="text-blue-600 font-bold mt-2">${item.price}</p>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 text-sm">
              {"★".repeat(4)}
              <span className="text-gray-300">{"☆".repeat(1)}</span>
            </span>
            <span className="ml-2 text-sm text-gray-500">(128)</span>
          </div>

          {/* Free Shipping */}
          <p className="text-green-600 font-semibold text-sm mt-1">Free Shipping</p>

          <div className="flex items-center gap-24 mt-2">
        <button className="text-blue-500 text-sm hover:underline">
          View details
        </button>
        <button
          onClick={() => addToCart(item)} // ✅ Direct context se call
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
        >
          Add to Cart
        </button>
      </div>
        </div>
      ))}
    </div>
  
  ) : (
    <div className="space-y-4">
  {currentProducts.map((item) => (
    <div
      key={item.id}
      className="relative flex items-center border rounded-lg shadow-md p-4 gap-4"
    >
      {/* Heart Icon — card ke top-right */}
      <button
        onClick={() => toggleFavorite(item)}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={favorites.some(fav => fav.id === item.id) ? "red" : "none"}
          stroke="gray"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 
                   12.28 2 8.5 2 5.42 4.42 3 7.5 3
                   c1.74 0 3.41.81 4.5 2.09 
                   C13.09 3.81 14.76 3 16.5 3 
                   19.58 3 22 5.42 22 8.5
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>

      {/* Image */}
      <div>
        <img
          src={item.image}
          alt={item.name}
          className="w-32 h-32 object-contain bg-white rounded"
        />
      </div>

      {/* Details */}
      <div>
        <h2 className="font-semibold text-lg">{item.name}</h2>
        <p className="text-sm text-gray-600">{item.desc}</p>
        <p className="text-blue-600 font-bold mt-2">${item.price}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-sm">
            {"★".repeat(4)}
            <span className="text-gray-300">{"☆".repeat(1)}</span>
          </span>
          <span className="ml-2 text-sm text-gray-500">(128)</span>
        </div>

        {/* Free Shipping */}
        <p className="text-green-600 font-semibold text-sm mt-1">Free Shipping</p>

         <div className="flex items-center gap-24 mt-2">
        <button className="text-blue-500 text-sm hover:underline">
          View details
        </button>
        <button
          onClick={() => addToCart(item)} // ✅ Direct context se call
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
        >
          Add to Cart
        </button>
      </div>
      </div>
    </div>
  ))}
</div>
  )}
          {/* Pagination - right aligned */}
          <div className="flex justify-end mt-6 gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm border rounded-full transition ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 hover:bg-blue-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section - Full Width, Bottom */}
      <div className="w-full bg-gray-100 py-20 mt-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
           Get updates about our latest products and offers.
            </p>
            <div className="flex justify-center gap-2">
               <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border rounded w-64"
                />
                <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                   Subscribe
                   </button>
                    </div>
                    </div>
                    
                     </div>
                  );
                  };

export default Electronics;
