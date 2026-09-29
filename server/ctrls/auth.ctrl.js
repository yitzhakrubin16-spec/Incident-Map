import { getMeService, loginService, registerService } from "../services/auth.service.js"

export async function registerController(req, res, next) {
    try {
        const result = await registerService(req.body)

        res.status(201).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export async function loginController(req, res, next) {
    try {
        const result = await loginService(req.body)

        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export async function getMeController(req, res, next) {
    try {
        const user = await getMeService(req.user.id)

        res.json({
            success: true,
            data: user
        })
    } catch(error) {
        next(error)
    }    
}