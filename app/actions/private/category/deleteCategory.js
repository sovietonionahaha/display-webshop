"use server"

import { withAuth } from "@/lib/action-utils"
import prisma from "@/lib/prisma"

async function deleteCategoryHandler(ctx, category) {
    await prisma.category.delete({
        where: {
            id: category.id
        }
    })
    return true
}

export const deleteCategory = withAuth(deleteCategoryHandler)
