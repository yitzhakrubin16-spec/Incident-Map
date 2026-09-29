import jwt from "jsonwebtoken"

export function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Missing authorization header"
        })
    }

    const token = authHeader.split("Bearer ")[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid authorization header"
        })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()

    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}