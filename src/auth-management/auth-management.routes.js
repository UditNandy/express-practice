import express from "express";
import { signin, signout, signup } from "./auth-management.controller.js";

const authManagement = express();

authManagement.post("/signup", signup);
authManagement.post("/signin", signin);
authManagement.get("/signout", signout);

export default authManagement;
