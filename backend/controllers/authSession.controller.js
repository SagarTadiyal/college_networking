import jwt from "jsonwebtoken";

export const authSessionCheck = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: "Session expired" });
  }
};
