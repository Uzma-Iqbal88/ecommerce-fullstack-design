
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
      <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-4" />
      <h4 className="text-lg font-semibold">{product.name}</h4>
      <p className="text-blue-600 font-bold mt-2">${product.price}</p>
    </div>
  );
};

export default ProductCard;
