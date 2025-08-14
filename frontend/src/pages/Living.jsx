import { useContext, useState } from "react";
import { FaApple, FaGooglePlay, FaStore } from "react-icons/fa";
import { CartContext } from "../context/CartContext.js";

// Import images from assets
import Galaxy from "../assets/m.jpeg";

import speaker from "../assets/l.jpeg";
import two from "../assets/n.jpeg";
import wine from "../assets/o.jpeg";
import wire from "../assets/p.jpeg";
import head from "../assets/q.jpeg";
import Fridge from "../assets/s.jpeg";
import phone from "../assets/t.jpeg";
import stove from "../assets/u.jpeg";
import Printer from "../assets/y.jpeg";

const Living = () => {
  const [price, setPrice] = useState(0);
  const { addToCart } = useContext(CartContext);
  const [viewType, setViewType] = useState("grid"); // grid | list
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [favorites, setFavorites] = useState(               //heart 
  JSON.parse(localStorage.getItem("favorites")) || []

);


  const products = [
    { id: 1, name: "Book-Shelf", desc: "Modern zigzag bookshelf designed to showcase books and décor in a stylish, space-saving way. Made from durable materials with a sleek finish.", price: 149, image: Printer },
    { id: 2, name: "Bedroom Lighting Tree-Shaped Shelf", desc: "Small Bedroom Lighting Ideas for a Brighter Space.", price: 199, image: Fridge },
    { id: 3, name: "Sophie Chair", desc: "Sophie Chair _ West Elm", price: 180, image: phone },
    { id: 4, name: "oderna ed elegante", desc: "Una versione moderna ed elegante…", price: 90, image:stove },
    { id: 5, name: "Hexagon Wooden Table Lamp", desc: "Hexagon Wooden Table Lamp, Modern Rustic Light.", price: 342, image: wine },
    { id: 6, name: "Hallway Modern Runner Rugs", desc: "Hallway Modern Runner Rugs, Modern Runner Rugs.", price: 26, image: wire },
    { id: 7, name: "driepoot gouden", desc: "Deze vintage staande driepoot gouden…", price: 89, image: head },
    { id: 8, name: "Unique pumpkin-shaped couch", desc: " Unique pumpkin-shaped sofa combining playful design with cozy comfort. Crafted with soft, high-quality upholstery and plush cushioning.", price: 34, image: Galaxy },
    { id: 9, name: " Elegant ocean-colored rug", desc: "Ombre Gradient, blending black to red in a strapless silhouette—ideal for making a bold evening statement.", price: 600, image: two },
    { id: 9, name: " Elegant ocean-colored rug featuring a marble-inspired design that adds a touch of sophistication to any room.", desc: "", price: 600, image: two },
    { id: 10, name: "Unique pumpkin-shaped couch", desc: "Unique pumpkin-shaped sofa combining playful design with cozy comfort. Crafted with soft, high-quality upholstery and plush cushioning.", price: 26, image: Galaxy },
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
    <span className="text-gray-900">Fashion</span>
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h4v4H4V6zM10 6h4v4h-4V6zM16 6h4v4h-4V6zM4 12h4v4H4v-4zM10 12h4v4h-4v-4zM16 12h4v4h-4v-4zM4 18h4v4H4v-4zM10 18h4v4h-4v-4zM16 18h4v4h-4v-4z"/>
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
                "Furniture","Bedding",  "Decor",  "Lighting",  "Rugs & Carpets",  "Curtains & Blinds",  "Kitchenware",  "Bathroom Accessories",
                 "Storage & Organization","Wall Art",  "Outdoor",  "Plants & Planters"
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
                "IKEA","West Elm", ,  "Ashley Furniture",  "Home Centre",  "Lloyd’s",  "Zara Home",
                "H&M Home","CB2","Urban Ladder","Habitt"
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
          <div className="flex justify-end mt-6 gap-2">
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
                    </div>
                     
                  );
                  };

export default Living;
