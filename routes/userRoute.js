import express from "express";
import {
  getUserDetails,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/me",isAuthenticated, getUserDetails);
router.get("/logout", logout);

export default router;
