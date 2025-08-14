
const product = {
  name: 'Wireless Headphones',
  price: 149,
  description: 'High-quality sound with noise cancellation.',
  image: 'https://via.placeholder.com/300',
};

const ProductDetail = () => {
  return (
    <section className="px-4 py-10 grid md:grid-cols-2 gap-10">
      <img src={product.image} alt={product.name} className="w-full h-auto object-contain" />
      <div>
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-xl text-blue-600 font-semibold">${product.price}</p>
        <p className="text-gray-600 mt-4 mb-6">{product.description}</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default ProductDetail;
