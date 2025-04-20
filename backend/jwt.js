//checking the user token
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const jwtauthMW = (req, res, next) => {
  //extract the jwt token from the request headers
  const token = req.headers.authorization?.split("")[1];
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    //verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    //attach user info to request object
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "invaild token" });
  }
};

//function to genrate JWT token
const generateToken = (userdata) => {
  //generate token by user data
  return jwt.sign(userdata, JWT_SECRET, { expiresIn: "24h" });
};

export { jwtauthMW, generateToken };
