import prisma from "@/lib/prisma";

export default async function getCategories() {
    const categories = await prisma.category.findMany({
        select: {
            title: true,
            uri: true,
            children: true,
            parent: true,
            showInNavigation: true,
            parentId: true
        }
    })

    return categories
}