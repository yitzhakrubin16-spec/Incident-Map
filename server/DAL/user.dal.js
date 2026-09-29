import { ObjectId } from "mongodb"
import db from "../db/db.js"


const users = db.collection("users")

export function findUserByEmail(email) {
    return users.findOne({ email })
}

export function createUser(user) {
    return users.insertOne(user)
}

export function findUserById(id){
    return users.findOne({ _id: new ObjectId(id) })
}