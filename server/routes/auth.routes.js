import express from "express"
import { getMeController, loginController, registerController } from "../ctrls/auth.ctrl.js"
import { authMiddleware } from "../utils/authMiddleware.js"

const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/me", authMiddleware, getMeController)

export default router