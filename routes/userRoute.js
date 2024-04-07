import express from "express";
import {
  getUserDetails,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.route("/new").post(register);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/logout").get(isAuthenticated, logout);

export default router;
