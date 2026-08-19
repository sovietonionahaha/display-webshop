import { withAuth } from "@/lib/action-utils";
import prisma from "@/lib/prisma";

async function getCategoriesHandler() {
    const categories = await prisma.category.findMany({
        include: {
            children: true,
            parent: true
        }
    })

    return categories
}

export const getCategories = withAuth(getCategoriesHandler)