import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  line1: String,
  line2: String,
  city: String,
  region: String,
  postalCode: String,
  country: String
},{ _id:false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: [] }],
  cart: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    qty: { type: Number, default: 1 }
  }],
  address: AddressSchema
}, { timestamps: true });


export default mongoose.model('User', UserSchema);