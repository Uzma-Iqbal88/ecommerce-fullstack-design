import { Link } from 'react-router-dom'; // ✅ Required for navigation
import electronicsImg from '../assets/ee1.jpeg';
import fashionImg from '../assets/fasion.jpeg';
import homeImg from '../assets/home.jpeg';
import shoesImg from '../assets/shoe.jpeg';

const categories = [
  { name: 'Electronics', image: electronicsImg, path: '/electronics' },
  { name: 'Fashion', image: fashionImg, path: '/fashion' },
  { name: 'Home & Living', image: homeImg, path: '/living' },
  { name: 'Shoes', image: shoesImg, path: '/shoes' },
];

const CategorySection = () => {
  return (
    <section className="py-10 px-4">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Shop by Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <Link to={cat.path} key={index}>
            <div className="relative h-40 md:h-48 rounded-xl overflow-hidden group shadow-md cursor-pointer">
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              {/* Category Name */}
              <div className="relative z-10 flex items-center justify-center h-full text-white font-semibold text-lg">
                {cat.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
