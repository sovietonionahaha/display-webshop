import prisma from "@/lib/prisma";

export default async function getProducts(category) {
    const products = await prisma.product.findMany({
        where: {
            enabled: true
        },
        select: {
            id: true,
            description: true,
            title: true,
            price: true,
            condition: true,
            discountPercent: true,
            discountPrice: true,
            images: {
                select: {
                    path: true
                }
            }
        }
    })

    return products
}