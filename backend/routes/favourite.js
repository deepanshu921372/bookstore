const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add book to favourite
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({
        message: "Book already in favourite",
      });
    } else {
      await User.findByIdAndUpdate(id, {
        $push: { favourites: bookid },
      });
      return res.status(200).json({
        message: "Book added to favourite",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//remove book from favourite
router.delete("/remove-book-from-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) { 
      await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
      return res.status(200).json({
        message: "Book removed from favourite",
      });
    }
    return res.status(400).json({
      message: "Book not in favourites",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
);

//get all favourite books
router.get("/get-all-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res.status(200).json({
      status: "success",
      data: favouriteBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
