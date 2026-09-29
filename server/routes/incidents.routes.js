import express from "express"
import { createIncidentController, getAllIncidentsController, getIncidentByIdController, updateIncidentController } from "../ctrls/incidents.ctrl.js"
import { authMiddleware } from "../utils/authMiddleware.js"

const router = express.Router()

router.get("/", authMiddleware, getAllIncidentsController)
router.get("/:id", authMiddleware, getIncidentByIdController)
router.post("/", authMiddleware, createIncidentController)
router.patch("/:id", authMiddleware, updateIncidentController)

export default router