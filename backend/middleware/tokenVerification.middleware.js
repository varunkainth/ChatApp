import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const TokenVerified = async (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Access token not found." });
  }

  try {
    // Verify token using JWT library
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);

    // Check if token is expired
    if (decoded.exp <= Math.floor(Date.now() / 1000)) {
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }
    req.user = user;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ error: "Invalid token." });
  }
};

export default TokenVerified;
