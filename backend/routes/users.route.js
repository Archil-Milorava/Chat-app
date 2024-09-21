import express from "express";
import protectRoute  from "../middleware/protect.route.js";
import {getUsersForSidebar} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", protectRoute, getUsersForSidebar);

export default userRoutes;