import { 
    createIncidentService, 
    getAllIncidentsService, 
    getIncidentByIdService, 
    updateIncidentService,
    deleteIncidentService } from "../services/incident.service.js"
import { getIO } from "../utils/socket.js"

export async function createIncidentController(req, res, next) {
    try {
        const incident = await createIncidentService(
            req.body,
            req.user.id
        )

        getIO().emit("incident:created", incident)
        
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

export async function updateIncidentController(req, res, next) {
    try {
        const incident = await updateIncidentService(
            req.params.id,
            req.body,
            req.user
        )

        getIO().emit("incident:updated", incident)

        res.json({
            success: true,
            data: incident
        })
    } catch (error) {
        next(error)
    }
}

export async function deleteIncidentController(req, res, next) {
    try {
        const incident = await deleteIncidentService(
            req.params.id,
            req.user
        )

        getIO().emit("incident:deleted", {id: incident.id})

        res.json({
            success: true,
            data: incident
        })
    } catch (error) {
        next(error)
    }
}