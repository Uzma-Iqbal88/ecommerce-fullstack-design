import { useEffect, useState } from "react";
import Headphones from "../assets/Headphones.jpeg";
import Relic from "../assets/Relic.jpeg";
import Camera from "../assets/cam1.jpeg";
import Watch from "../assets/w1.jpeg";

const Hero = () => {
  const images = [Relic, Headphones, Camera, Watch];
  const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 3000);
  return () => clearInterval(interval);
}, [images.length]);


  const categories = [
    "Automobiles",
    "Clothes and Wear",
    "Home Interiors",
    "Computer and Tech",
    "Tools & Equipment",
    "Sports and Outdoor",
    "Animal and Pets",
    "Machinery Tools",
    "More Category",
  ];

  return (
    <div className="px-4 md:px-10 max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

      {/* Left: Categories List */}
      <div className="md:col-span-2 hidden md:block">
        <ul className="space-y-3">
          {categories.map((cat, index) => (
            <li
              key={index}
              className="text-gray-700 hover:text-blue-600 cursor-pointer"
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Blue Section */}
      <section className="md:col-span-10 bg-blue-100 rounded-lg grid md:grid-cols-2 items-center overflow-hidden min-h-[340px]">

        {/* Left: Text */}
        <div className="p-10 text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-blue-800 mb-4">
            Discover the Best Deals
          </h2>
          <p className="text-gray-700 text-xl mb-6">
            Shop electronics, fashion, gadgets & more.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
            Start Shopping
          </button>
        </div>

        {/* Right: Clean Full Image Slider */}
        <div className="relative w-full h-72">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 object-contain ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ padding: "0.25rem" }} // 0.25rem ≈ 4px space from edges
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
