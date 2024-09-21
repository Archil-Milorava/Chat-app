import "dotenv/config";
import express from "express";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.route.js";
import connectDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.listen(5000, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});
