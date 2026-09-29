import { createIncidentService } from "../services/incident.service.js"

export async function createIncidentController(req, res, next) {
    try {
        const incident = await createIncidentService(
            req.body,
            req.user.id
        )

        res.status(201).json({
            success: true,
            data: incident
        })
    } catch (error) {
        next(error)
    }
}