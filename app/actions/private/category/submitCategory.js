"use server"

import { withAuth } from "@/lib/action-utils"
import prisma from "@/lib/prisma"

async function submitCategoryHandler(ctx, { title, uri, parent, showInNavigation }) {
    await prisma.category.create({
        data: {
            uri: uri,
            title: title,
            showInNavigation: showInNavigation,
            ...(parent !== null && {
                parent: {
                    connect: {
                        id: parent
                    }
                }
            })
        }
    })

    return true
}

export const submitCategory = withAuth(submitCategoryHandler)