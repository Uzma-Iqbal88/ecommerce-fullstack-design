import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  category: String,
  stock: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);

