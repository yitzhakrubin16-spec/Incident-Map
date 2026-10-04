import { 
    createIncidentSchema,
    updateIncidentSchema,
    incidentIdSchema,
    categoryQuerySchema } from "../validations/incident.validation.js"
import { 
    createIncident,
    getAllIncidents, 
    getIncidentById, 
    updateIncident, 
    deleteIncident } from "../DAL/incident.dal.js"

function formatIncident(incident) {
    const { _id, ...rest } = incident

    return {
        id: _id.toString(),
        ...rest
    }
}

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
        id: response.insertedId.toString(),
        ...incident
    }
}

export async function getAllIncidentsService(category) {
    const result = categoryQuerySchema.safeParse(category)

    if (!result.success) {
        const error = new Error("Invalid category")
        error.status = 400
        throw error
    }

    const incidents = await getAllIncidents(result.data)

    return incidents.map(formatIncident)
}

export async function getIncidentByIdService(id) {
    const result = incidentIdSchema.safeParse(id)

    if (!result.success) {
        const error = new Error("Invalid incident id")
        error.status = 400
        throw error
    }

    const incident = await getIncidentById(result.data)

    if (!incident) {
        const error = new Error("Incident not found")
        error.status = 404
        throw error
    }

    return formatIncident(incident)
}

export async function updateIncidentService(id, body, user) {
    const idResult = incidentIdSchema.safeParse(id)

    if (!idResult.success) {
        const error = new Error("Invalid incident id")
        error.status = 400
        throw error
    }

    const result = updateIncidentSchema.safeParse(body)

    if (!result.success) {
        const error = new Error("Invalid incident details")
        error.status = 400
        throw error
    }

    const incident = await getIncidentById(idResult.data)

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

    const updatedIncident = await updateIncident(idResult.data, updates)

    return formatIncident(updatedIncident)
}

export async function deleteIncidentService(id, user) {
    const result = incidentIdSchema.safeParse(id)

    if (!result.success) {
        const error = new Error("Invalid incident id")
        error.status = 400
        throw error
    }

    const incident = await getIncidentById(result.data)

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

    const deletedIncident = await deleteIncident(result.data)

    return formatIncident(deletedIncident)
}