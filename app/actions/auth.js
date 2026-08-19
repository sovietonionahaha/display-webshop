'use server'

import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { withAuth } from "@/lib/action-utils"

export async function signIn(credentials) {
    const { username, password } = credentials

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (!user) return {
        success: false,
        message: "Hibás jelszó"
    }

    const isAuthenticated = await bcrypt.compare(password, user.password)

    if (!isAuthenticated) return {
        success: false,
        message: "Hibás jelszó"
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    const cookieStore = await cookies()

    cookieStore.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    })

    return {
        success: true,
        message: "Sikeres bejelentkezés"
    }
}

async function authLogoutHandler(ctx) {
    const cookieStore = await cookies()
    cookieStore.delete("access_token")

    return {
        success: true
    }
}

export const authLogout = withAuth(authLogoutHandler)