import { createIncidentSchema, updateIncidentSchema } from "../validations/incident.validation.js"
import { 
    createIncident,
    getAllIncidents, 
    getIncidentById, 
    updateIncident, 
    deleteIncident } from "../DAL/incident.dal.js"

export async function createIncidentService(body, userId) {
    const result = createIncidentSchema.safeParse(body)

    if (!result.success) {
        const error = new Error("Invalid incident details")
        error.status = 400
        throw error
    }

    const incident = {
        ...result.data,
        status: "open",
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const response = await createIncident(incident)

    return {
        id: response.insertedId,
        ...incident
    }
}

export async function getAllIncidentsService(category) {
    return getAllIncidents(category)
}

export async function getIncidentByIdService(id) {
    const incident = await getIncidentById(id)

    if (!incident) {
        const error = new Error("Incident not found")
        error.status = 404
        throw error
    }

    return incident
}

export async function updateIncidentService(id, body, user) {
    const result = updateIncidentSchema.safeParse(body)

    if (!result.success) {
        const error = new Error("Invalid incident details")
        error.status = 400
        throw error
    }

    const incident = await getIncidentById(id)

    if (!incident) {
        const error = new Error("Incident not found")
        error.status = 404
        throw error
    }

    if (
        incident.createdBy !== user.id &&
        user.role !== "admin"
    ) {
        const error = new Error("Forbidden")
        error.status = 403
        throw error
    }

    const updates = {
        ...result.data,
        updatedAt: new Date()
    }

    return updateIncident(id, updates)
}

export async function deleteIncidentService(id, user) {
    const incident = await getIncidentById(id)

    if (!incident) {
        const error = new Error("Incident not found")
        error.status = 404
        throw error
    }

    if (
        incident.createdBy !== user.id &&
        user.role !== "admin"
    ) {
        const error = new Error("Forbidden")
        error.status = 403
        throw error
    }

    return deleteIncident(id)
}