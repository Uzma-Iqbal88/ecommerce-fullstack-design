
// 📦 Importing images (using your original names)
import speakerImg from '../assets/Bluetooth.jpeg';
import headphonesImg from '../assets/hi.jpeg';
import shoesImg from '../assets/sho.jpeg';
import smartwatchImg from '../assets/w1.jpeg';

const DealsSection = () => {
  const deals = [
    {
      name: 'Wireless Headphones',
      originalPrice: 200,
      discountedPrice: 150,
      discount: '25%',
      image: headphonesImg,
    },
    {
      name: 'Elegant Gold Smartwatch',
      originalPrice: 120,
      discountedPrice: 90,
      discount: '25%',
      image: smartwatchImg,
    },
    {
      name: 'Nike Air Zoom Running Shoes',
      originalPrice: 100,
      discountedPrice: 75,
      discount: '25%',
      image: shoesImg,
    },
    {
      name: 'Portable Bluetooth Speaker',
      originalPrice: 80,
      discountedPrice: 60,
      discount: '25%',
      image: speakerImg,
    },
  ];

  return (
    <section className="mt-5 flex flex-col md:flex-row gap-6 py-10 px-6 bg-gray-50">
      <div className="md:w-1/4 bg-gradient-to-br from-sky-300 to-indigo-500 text-white p-6 rounded-2xl shadow-lg text-center md:text-left">
        <h2 className="text-2xl font-bold mb-4">🔥 Deals & Offers</h2>
        <p className="text-center text-2xl">Limited time only!</p>
        <div className="mt-10 text-2xl font-mono tracking-wide text-center w-full">4d : 2h : 34m</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:w-3/4">
        {deals.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition-shadow hover:scale-105 duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-36 w-full object-contain rounded-lg mb-2 bg-white"
            />
            <h3 className="text-sm font-semibold">{item.name}</h3>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="line-through text-gray-400">
                ${item.originalPrice}
              </span>
              <span className="text-green-600 font-bold">
                ${item.discountedPrice}
              </span>
            </div>
            <span className="inline-block mt-1 text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded">
              {item.discount} OFF
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DealsSection;
