import { Router } from "express";
import mongoose from "mongoose";
import { adminOnly, protect } from "../middleware/auth.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";


const router = Router();

// ✅ Admin stats route
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("cart.product likes");

    const orders = await Order.find()
      .populate("user", "name email")          // user info
      .populate("items.product", "name price"); // product info

    const products = await Product.find();

    res.json({ users, orders, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public - list products
router.get("/", async (req, res) => {
  const q = {};
  if (req.query.q) q.name = { $regex: req.query.q, $options: "i" };
  if (req.query.category) q.category = req.query.category;
  const products = await Product.find(q).sort({ createdAt: -1 });
  res.json(products);
});

// Public - get single product by ID
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ error: "Product not found" });
  res.json(p);
});

// Admin CRUD
router.post("/", protect, adminOnly, async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!p) return res.status(404).json({ error: "Product not found" });
  res.json(p);
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
