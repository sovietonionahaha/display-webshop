import { withAuth } from "@/lib/action-utils"
import prisma from "@/lib/prisma"

async function getProductHandler (ctx, { productId }) {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        },
        include: {
            category: true,
            images: true
        }
    })

    return JSON.parse(JSON.stringify(product))
}

export const getProduct = withAuth(getProductHandler)
