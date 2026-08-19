import prisma from "@/lib/prisma";

export default async function getProducts(category) {
    const products = await prisma.product.findMany({
        where: {
            enabled: true
        },
        select: {
            description: true,
            title: true,
            price: true,
        }
    })

    return products
}