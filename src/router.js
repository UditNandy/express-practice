import express from "express";
import userManagement from "./user-management/user-management.routes.js";
import authManagement from "./auth-management/auth-management.routes.js";

const router = express();

router.use("/auth", authManagement);
router.use("/user", userManagement);

export default router;
