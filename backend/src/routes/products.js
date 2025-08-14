import { Router } from "express";
import mongoose from "mongoose";
import { adminOnly, protect } from "../middleware/auth.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = Router();
router.use(protect, adminOnly);

// ✅ GET full admin stats (put this BEFORE any :id route)
router.get("/stats", async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("cart.product likes");
    const orders = await Order.find().populate("items.product user");
    const products = await Product.find();

    res.json({ users, orders, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin CRUD for products
router.post('/add-product', async (req, res) => {
  const { name, price, ...rest } = req.body;
  if (price == null) {
    return res.status(400).json({ message: "Price is required" });
  }
  const product = await Product.create({ name, price, ...rest });
  res.status(201).json(product);
});


router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Product not found" });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
