import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const router = Router();

// ✅ Protect all routes
router.use(protect);

// GET user cart
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST add product to cart
router.post('/add', async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const user = await User.findById(req.user._id);
    const existing = user.cart.find(i => i.product.toString() === productId);
    if (existing) existing.qty += qty;
    else user.cart.push({ product: productId, qty });

    await user.save();
    res.status(201).json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST remove product from cart
router.post('/remove', async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(i => i.product.toString() !== productId);
    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET liked products for logged-in user
router.get('/likes', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('likes');
    res.json(user.likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST toggle like
router.post('/like', async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId is required' });

    const user = await User.findById(req.user._id);

    const idx = user.likes.findIndex(id => id.toString() === productId);
    if (idx >= 0) user.likes.splice(idx, 1); // remove like
    else user.likes.push(productId); // add like

    await user.save();

    const populatedLikes = await User.findById(req.user._id).populate('likes');
    res.json(populatedLikes.likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
