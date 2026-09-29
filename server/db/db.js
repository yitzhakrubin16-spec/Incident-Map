import { MongoClient } from "mongodb";
import "dotenv/config"

const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"

const client = new MongoClient(url)

const db = client.db("incident-map")

export default db