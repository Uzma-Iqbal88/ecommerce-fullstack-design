import ProductCard from '../components/ProductCard.jsx';

const dummyProducts = [
  { name: 'Headphones', price: 99, image: 'https://via.placeholder.com/150' },
  { name: 'Smartphone', price: 299, image: 'https://via.placeholder.com/150' },
  { name: 'Camera', price: 499, image: 'https://via.placeholder.com/150' },
  { name: 'Smart Watch', price: 199, image: 'https://via.placeholder.com/150' },
];

const Products = () => {
  return (
    <section className="px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">All Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {dummyProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
