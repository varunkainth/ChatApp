import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const TokenVerified = async (req, res, next) => {
  // Extract token from Authorization header
  // const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  const token = req.header("Authorization")?.replace("Bearer","")
  // console.log(token);

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Access token not found." });
  }

  try {
    // Verify token using JWT library
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);

    // Log decoded payload for debugging
    console.log("Decoded JWT:", decoded);

    // Check if token is expired
    if (decoded.exp <= Math.floor(Date.now() / 1000)) {
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    }

    // Retrieve user information based on _id from token payload
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Attach user object to request object for further middleware or route handlers
    req.user = user;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(403).json({ error: "Invalid token." });
  }
};

export default TokenVerified;
