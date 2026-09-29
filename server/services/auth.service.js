import bcrypt from "bcrypt"
import { authSchema } from "../validations/auth.validation.js"
import { createUser, findUserByEmail } from "../DAL/user.dal.js"

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

    return{
        id: response.insertedId,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    }
}