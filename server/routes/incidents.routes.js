import express from "express"
import { createIncidentController } from "../ctrls/incidents.ctrl.js"
import { authMiddleware } from "../utils/authMiddleware.js"

const router = express.Router()

router.post("/", authMiddleware, createIncidentController)

export default router