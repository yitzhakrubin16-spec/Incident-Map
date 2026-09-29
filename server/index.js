import express from "express"
import cors from "cors"
import helmet from "helmet"
import "dotenv/config"
import authRouter from "./routes/auth.routes.js"
import { errorHandler } from "./utils/errorHandler.js"

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use("/auth", authRouter)


const PORT = process.env.PORT || 3000

app.get("/health", (req, res) => {
    res.json({message : "Server is running"})
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
