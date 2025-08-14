import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = Router();

router.use(protect);

router.get('/', async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
});

router.post("/", protect, async (req, res) => {
  const newOrder = new Order({
    user: req.user.id,
    items: req.body.items,
    total: req.body.total,
    shippingInfo: req.body.shippingInfo,
    paymentMethod: req.body.paymentMethod,
    status: "pending",
  });
  await newOrder.save();
  res.status(201).json(newOrder);
});



export default router;
