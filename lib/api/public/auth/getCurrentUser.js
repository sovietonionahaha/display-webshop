import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function getCurrentUser() {
    const cookieStore = await cookies()
    const token = cookieStore?.get("access_token")?.value

    if (!token) return null

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where: {
                id: payload?.userId
            }
        })
        return user
    } catch (err) {
        console.warn(err)
        return null
    }
}