import bcrypt from "bcrypt"
import { authSchema } from "../validations/auth.validation.js"
import { createUser, findUserByEmail, findUserById} from "../DAL/user.dal.js"
import { generateToken } from "../utils/generateToken.js"

export async function registerService(body) {
    const result = authSchema.safeParse(body)

    if (!result.success){
        const error = new Error("Invalid user details")
        error.status = 400
        throw error
    }

    const { email, password } = result.data

    const existingUser = await findUserByEmail(email)

    if(existingUser){
        const error = new Error("Email already exists")
        error.status = 409
        throw error
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = {
        email,
        passwordHash,
        role: "user",
        createdAt: new Date()
    }

    const response = await createUser(user)

    const newUser = {
        id: response.insertedId,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    }

    const token = generateToken(newUser)

    return {
        user: newUser,
        token
    }
}

export async function loginService(body) {
    const result = authSchema.safeParse(body)

    if(!result.success){
        const error = new Error("Invalid user details")
        error.status = 400
        throw error
    }

    const {email, password} = result.data

    const user = await findUserByEmail(email)

    if (!user) {
        const error = new Error("Invalid email or password")
        error.status = 401
        throw error
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatch) {
        const error = new Error("Invalid email or password")
        error.status = 401
        throw error
    }

    const safeUser = {
        id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    }

    const token = generateToken(safeUser)

    return {
        user: safeUser,
        token
    }

}

export async function getMeService(userId) {
    const user = await findUserById(userId)

    if(!user){
        const error = new Error("User not found")
        error.status = 404
        throw error
    }

    return{
        id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    }
}