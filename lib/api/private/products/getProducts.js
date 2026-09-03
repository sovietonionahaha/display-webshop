import { withAuth } from "@/lib/action-utils"
import prisma from "@/lib/prisma"

async function getProductsHandler() {
    const products = await prisma.product.findMany({
        include: {
            category: true,
            images: true
        }
    })

    return JSON.parse(JSON.stringify(products))
}

export const getProducts = withAuth(getProductsHandler)
