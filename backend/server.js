import "dotenv/config";
import express from "express";

import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/connectMongoDB.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});
