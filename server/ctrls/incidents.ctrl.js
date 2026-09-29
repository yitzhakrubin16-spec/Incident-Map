import { createIncidentService, getAllIncidentsService, getIncidentByIdService } from "../services/incident.service.js"

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


export async function getAllIncidentsController(req, res, next) {
    try {
        const incidents = await getAllIncidentsService(req.query.category)

        res.json({
            success: true,
            data: incidents
        })
    } catch (error) {
        next(error)
    }
}

export async function getIncidentByIdController(req, res, next) {
    try {
        const incident = await getIncidentByIdService(req.params.id)

        res.json({
            success: true,
            data: incident
        })
    } catch (error) {
        next(error)
    }
}