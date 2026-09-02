import prisma from "@/lib/prisma";

export default async function getProduct(productId) {
    if (!productId) return null

    const product = await prisma.product.findUnique({
        where: {
            id: productId,
            enabled: true
        },
        select: {
            id: true,
            discountPrice: true,
            condition: true,
            description: true,
            discountPercent: true,
            title: true,
            images: {
                select: {
                    path: true
                }
            },
            price: true,
            category: {
                select: {
                    parent: {
                        select: {
                            title: true,
                            uri: true
                        }
                    },
                    title: true,
                    uri: true
                }
            }
        }
    })

    return product
}