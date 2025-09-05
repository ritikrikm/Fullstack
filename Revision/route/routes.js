import express from "express";
import {
  userRegister,
  userVerify,
  resetPassword,
  linkReset,
  userLogin,
  getMe,
  logout,
} from "../controller/user.controller.js";
import isLoggedIn from "../middleware/auth.middleware.js";
const router = express.Router();
console.log("Entered here in routes.js");
router.post("/register", userRegister);
router.get("/verify/:token", userVerify);
router.get("/reset/", resetPassword);
router.get("/resetLink/:pr_token", linkReset);
router.get("/me", isLoggedIn, getMe);
router.get("/login", userLogin);
router.get("/logout", isLoggedIn, logout);
export default router;
