import express from "express"
import cors from "cors"
import helmet from "helmet"
import { createServer } from "http"
import { Server } from "socket.io"
import "dotenv/config"
import authRouter from "./routes/auth.routes.js"
import incidentsRouter from "./routes/incidents.routes.js"
import { errorHandler } from "./utils/errorHandler.js"
import { initSocket } from "./utils/socket.js"

const app = express()

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_ORIGIN
    }
})
initSocket(io)

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id)

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id)
    })
})

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use("/auth", authRouter)
app.use("/incidents", incidentsRouter)

const PORT = process.env.PORT || 3000

app.get("/health", (req, res) => {
    res.json({message : "Server is running"})
})

app.use(errorHandler)

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
