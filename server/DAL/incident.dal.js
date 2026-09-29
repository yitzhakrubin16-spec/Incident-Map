import { ObjectId } from "mongodb"
import db from "../db/db.js"

const incidents = db.collection("incidents")

export function getAllIncidents(category) {
    const filter = category ? { category } : {}

    return incidents.find(filter).toArray()
}

export function getIncidentById(id) {
    return incidents.findOne({
        _id: new ObjectId(id)
    })
}

export function createIncident(incident) {
    return incidents.insertOne(incident)
}

export function updateIncident(id, updates) {
    return incidents.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updates },
        { returnDocument: "after" }
    )
}

export function deleteIncident(id) {
    return incidents.findOneAndDelete({
        _id: new ObjectId(id)
    })
}