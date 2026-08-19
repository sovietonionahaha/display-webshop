"use server"

import { withAuth } from "@/lib/action-utils"
import prisma from "@/lib/prisma"

async function editCategoryHandler(ctx, category) {
    await prisma.category.update({
        where: {
            id: category.id
        },
        data: {
            title: category.title,
            uri: category.uri,
            showInNavigation: category.showInNavigation,
            parentId: category.parentId
        }
    })

    return true
}

export const editCategory = withAuth(editCategoryHandler)