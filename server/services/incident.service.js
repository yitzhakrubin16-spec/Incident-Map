import { createIncidentSchema } from "../validations/incident.validation.js"
import { createIncident, getAllIncidents, getIncidentById } from "../DAL/incident.dal.js"

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