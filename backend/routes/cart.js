const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");


//add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.status(200).json({
        status: "success",
        message: "Book already in cart",
      });
    } else {
      await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
      return res.status(200).json({
        status: "success",
        message: "Book added to cart",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//remove book from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });  // Changed 'id' to 'bookid'
    return res.status(200).json({
      status: "success",
      message: "Book removed from cart",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get all cart books
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
