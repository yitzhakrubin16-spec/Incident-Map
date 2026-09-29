import express from "express"
import cors from "cors"
import helmet from "helmet"
import "dotenv/config"

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/health", (req, res) => {
    res.json({message : "Server is running"})
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
