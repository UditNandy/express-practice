import express from "express";
import { verifyToken } from "../auth-management/auth-management.controller.js";
import { fetchUserDetails } from "./user-management.controller.js";

const userManagementRoute = express.Router();

userManagementRoute.get("/userDetails", verifyToken, fetchUserDetails);

export default userManagementRoute;
