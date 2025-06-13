// backend/middleware/protectRoute.js
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      console.warn("No token found in cookies");
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userId) {
      console.warn("Token decoded but userId missing");
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.warn("User not found for ID:", decoded.userId);
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
