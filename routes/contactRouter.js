import express from "express";
import { isAuthenticated } from "../middlewares/authentication.js";
import { add, all, remove, update, view } from "../controllers/contactController.js";

const router = express.Router();

router.post("/add",isAuthenticated, add);
router.get("/all",isAuthenticated, all);
router.route("/:id",isAuthenticated).get(view).put(update).delete(remove)

export default router;