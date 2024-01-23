const jwt = require("jsonwebtoken");
const User = require("../models/users");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });

    console.log(username, email, password);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If the credentials are valid, generate a JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        // Add more fields as needed
      },
      process.env.JWT_SECRET || "thisis osma" // Use a secure and secret key for signing
      // { expiresIn: "1h" } // Set the expiration time for the token
    );

    // Include user profile data in the response
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      // Add more fields as needed
    };

    res
      .status(200)
      .json({ message: "Login successful", token, user: userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { registerUser, loginUser };
