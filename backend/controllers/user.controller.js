import { generateToken } from "../jwt.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
// Signup Route - Create User
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.json({ error: "All fields are required" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "User already exists" });
    }

    //saving hashed password

    bcrypt.hash(password, Number(process.env.SALT_ROUND), async (err, hash) => {
      if (err) {
        console.log("error hashing password");
        return res.json({ success: false, error: "Somethings Wrong!" });
      } else {
        const newUser = new User({ username, email, password: hash });
        const response = await newUser.save();
        console.log("Data saved successfully:", response);
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          user: response,
        });
      }
    });
  } catch (err) {
    console.error("Error saving user:", err.message);
    return res.status(500).json({ error: "Internal server error. Try again" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are requried" });
    }
    // Check if user exists
    const result = await User.findOne({ email });
    if (!result) {
      return res.json({
        success: false,
        error: "Please Create an Account First",
      });
    }

    // Correctly get the stored hashed password
    const storedHashedPassword = result.password;

    // Correctly use await for bcrypt.compare()
    const isMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!isMatch) {
      return res.json({ success: false, error: "Invalid Credentials" });
    }

    // Generate Token and Respond
    const payload = { id: result.id, username: result.username,email:result.email,isAdmin:result.isAdmin};
    const token = generateToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: result,
      token,
    });
  } catch (err) {
    console.error(" error:", err.message);
    return res.status(500).json({ error: "Internal server error. Try again." });
  }
};

// logout user
export const userLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    console.error("error:", err.message);
    return res.status(500).json({ error: "Internal server error. Try again." });
  }
};

// fetchAllUsers
export const fetchAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    if (data.length === 0) {
      console.log("No users found");
      return res.status(404).json({ message: "No users found" });
    }

    console.log("Data fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching users:", err);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};
