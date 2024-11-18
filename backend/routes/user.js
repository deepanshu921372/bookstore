const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//Signup Route
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    //check username length is more than 4
    if (username.length < 4) {
      return res.status(400).json({ message: "Username must be at least 4 characters long" });
    }

    //check username already exists
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //check email already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //check password length is more than 5
    if (password.length <= 5) {
      return res.status(400).json({ message: "Password must be at least 5 characters long" });
    }

    //hash password
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({ username: username, email: email, password: hashPass, address: address });
    await newUser.save();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Signin Route
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    //check user exists
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials!!" });
    }

    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
            {name: existingUser.username},
            {role: existingUser.role}
        ]
        const token = jwt.sign({ authClaims }, process.env.JWT_SECRET, { expiresIn: "30d" });
        return res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token });
      } else {
        return res.status(400).json({ message: "Invalid Credentials!!" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get User information
router.get("/user-info", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

//Update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address: address});
        return res.status(200).json({message: "Address updated successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

module.exports = router;
