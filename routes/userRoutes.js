import express from "express"
import { isAuthenticated } from "../middlewares/authentication"

const router = express.Router()

router.post("/new",register)
router.post("/login",login)

router.get("/logout",logout)
router.get("/me",isAuthenticated,getMyProfile)

export default router