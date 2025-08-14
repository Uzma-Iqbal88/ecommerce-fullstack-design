import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useFav } from "../context/FavContext"; // 🔹 ADD THIS LINE

const Fav = () => {
  const { likes, toggleLike } = useFav(); // useFav instead of useAuth
  const { addToCart } = useContext(CartContext);

  if (!likes) return <p className="text-center mt-10">Login first to see favorites.</p>;

   return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Your Favorite Products</h1>

      {likes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {likes.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow-md p-4 relative bg-white dark:bg-gray-800 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img src={item.image} alt={item.name} className="w-full h-48 object-contain rounded" />
              <h2 className="mt-4 font-semibold text-xl text-gray-900 dark:text-white">{item.name}</h2>
              <p className="text-gray-500 dark:text-gray-300 text-sm mt-1 line-clamp-2">{item.desc}</p>
              <p className="text-blue-600 font-bold mt-3 text-lg">
                <span className="text-gray-700 dark:text-gray-300 text-base mr-1">$</span>
                {item.price}
              </p>

              {/* Remove/Toggle Like */}
              <button
                onClick={() => toggleLike(item)}
                className="absolute top-3 right-3 p-2 rounded-full bg-red-100 shadow-md hover:bg-red-200 transition cursor-pointer"
                aria-label="Remove from favorites"
              >
                ❤️
              </button>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(item)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fav;
