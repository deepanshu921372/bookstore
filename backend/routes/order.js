const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();
      //save order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });
      //remove book from cart
      await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
    }
    return res.status(200).json({
      status: "success",
      message: "Order placed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get order history of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const orders = await Order.find({ user: id })
      .populate('book')
      .sort({ createdAt: -1 });
    
    return res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    console.error("Order history error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get all orders --admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const orderData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      status: "success",
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//update order  --admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.status(200).json({
      status: "success",
      message: "Order status updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
