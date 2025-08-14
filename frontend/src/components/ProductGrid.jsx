import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.js";

// Import images (adjust paths as needed)
import pic from "../assets/20.jpeg";
import hed from "../assets/25.jpeg";
import Img from "../assets/28.jpeg";
import watchImg from "../assets/5.jpeg";
import like from "../assets/92.jpeg";
import headphonesImg from "../assets/headphones.jpg";
import smartphoneImg from "../assets/m.jpeg";
import cameraImg from "../assets/x.jpeg";

const dummyProducts = [
  { id: 1, name: "Wireless Headphones", desc: "High-quality sound with noise cancellation.", price: 99, image: headphonesImg },
  { id: 2, name: "Unique pumpkin-shaped couch", desc: "Unique pumpkin-shaped sofa combining playful design with cozy comfort.", price: 299, image: smartphoneImg },
  { id: 3, name: "YSL Black Heels", desc: "Elegant and timeless YSL black heels crafted from premium leather.", price: 499, image: cameraImg },
  { id: 4, name: "Tower air conditioner", desc: "TVertical-style AC unit for cooling rooms.", price: 199, image: watchImg },
  { id: 5, name: " Samsung Golden Color Mobile", desc: "Sleek and stylish Samsung smartphone in a golden finish.", price: 99, image: like},
  { id: 6, name: " Black Color Fridge – Aesthetic & Classy", desc: "Modern black fridge with a minimalist design that adds elegance to any kitchen. Spacious, energy-efficient..", price: 299, image: hed },
  { id: 7, name: "Black Strappy Block-Heel Sandals", desc: "Thick sole, wrap ankle straps; stable and dressy.", price: 499, image: Img },
  { id: 8, name: "Power Bank with Multiple Wires", desc: "Versatile power bank with multiple built-in charging cables for fast and convenient charging of all your devices.", price: 199, image: pic },
];

const ProductGrid = () => {
  const { addToCart } = useContext(CartContext);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [addedProductId, setAddedProductId] = useState(null);

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

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedProductId(item.id);

    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <section className="py-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-10 text-left ml-24">
        Featured Products
      </h3>

      <div className="max-w-[90%] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {dummyProducts.map((item, index) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md p-4 w-[240px]"
          >
            <div className="relative">
      {index === 0 ? (
        <Link to={`/product/${item.id}`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-28 object-contain bg-white rounded"
          />
        </Link>
      ) : (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-28 object-contain bg-white rounded"
        />
      )}

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
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
                       2 8.5 2 5.42 4.42 3 7.5 3
                       c1.74 0 3.41.81 4.5 2.09
                       C13.09 3.81 14.76 3 16.5 3
                       19.58 3 22 5.42 22 8.5
                       c0 3.78-3.4 6.86-8.55 11.54
                       L12 21.35z"
                  />
                </svg>
              </button>
            </div>

            <h2 className="mt-2 font-semibold text-lg">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.desc}</p>
            <p className="text-blue-600 font-bold mt-2">${item.price}</p>

            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-sm">
                {"★".repeat(4)}
                <span className="text-gray-300">{"☆".repeat(1)}</span>
              </span>
              <span className="ml-2 text-sm text-gray-500">(128)</span>
            </div>

            <p className="text-green-600 font-semibold text-sm mt-1">
              Free Shipping
            </p>

            <div className="flex items-center justify-between mt-2">
              <button className="text-blue-500 text-sm hover:underline">
                View details
              </button>
              <button
                onClick={() => handleAddToCart(item)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
              >
                Add to Cart
              </button>
            </div>

            {addedProductId === item.id && (
              <p className="text-green-600 font-semibold mt-2 text-sm">
                Added to cart!
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
