import { withAuth } from "@/lib/action-utils"
import prisma from "@/lib/prisma"

async function getProductsHandler() {
    const products = await prisma.product.findMany({

    })

    return products
}

export const getProducts = withAuth(getProductsHandler)
