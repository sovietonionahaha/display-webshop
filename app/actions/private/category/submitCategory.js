"use server"

import { withAuth } from "@/lib/action-utils"
import prisma from "@/lib/prisma"

async function submitCategoryHandler(ctx, { title, uri }) {    
    await prisma.category.create({
        data: {
            uri: uri,
            title: title
        }
    })

    return true
}

export const submitCategory = withAuth(submitCategoryHandler)