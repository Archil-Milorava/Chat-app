import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(400).json({ message: "Please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(400).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("error from protect route", error);

    res.status(400).json({ message: "Please login first" });
  }
};

export default protectRoute;