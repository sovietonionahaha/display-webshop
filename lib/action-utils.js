import { cookies } from "next/headers"
import prisma from "./prisma"
import jwt from "jsonwebtoken"
import { getCurrentUser } from "./api/public/auth/getCurrentUser"

export function withAuth(action) {
    return async (...args) => {
        const user = await getCurrentUser()

        if (!user) {
            return null
        }

        return action({ userId: user.id }, ...args)
    }
}
