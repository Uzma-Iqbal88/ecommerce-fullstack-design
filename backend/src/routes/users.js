import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

const router = Router();

router.use(protect);

// Get user orders
router.get('/orders', async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
});

// Place order from cart
router.post('/orders', async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  if (!user.cart.length) return res.status(400).json({ message: 'Cart empty' });

  const items = user.cart.map(i => ({
    product: i.product._id,
    qty: i.qty,
    price: i.product.price
  }));
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const order = await Order.create({ user: user._id, items, total });
  user.cart = []; // clear cart
  await user.save();
  res.status(201).json(order);
});

// Get cart items
router.get('/cart', async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.json(user.cart || []);
});

// Toggle like/unlike
router.post('/likes', async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);
  if (!user.likes) user.likes = [];

  const idx = user.likes.findIndex(id => id.toString() === productId);
  if (idx >= 0) user.likes.splice(idx, 1); // unlike
  else user.likes.push(productId); // like

  await user.save();
  res.json(user.likes);
});

// Get liked items
router.get('/likes', async (req, res) => {
  const user = await User.findById(req.user._id).populate('likes'); // assuming likes are product IDs
  res.json(user.likes || []);
});

export default router;
