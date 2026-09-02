"use server"

import { withAuth } from "@/lib/action-utils"
import { getProduct } from "@/lib/api/private/products/getProduct"
import prisma from "@/lib/prisma"
import axios from "axios"

async function editProductHandler(ctx, product) {
    const { id, title, price, description, categoryId, enabled, condition, images, discountPercent } = product

    const prev = await getProduct({ productId: id })

    const newProduct = await prisma.product.update({
        where: {
            id: id
        },
        data: {
            title: title,
            price: Number(price),
            discountPercent: Number(discountPercent),
            description: description,
            enabled: enabled,
            condition: condition,
            ...(categoryId !== null && {
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            })
        }
    })

    const toDelete = prev.images.filter(x => !(Array.from(images.map(y => y?.id)).includes(x.id)))

    axios.post("https://cdn.sovietprojects.hu/delete/business", { paths: Array.from(toDelete.map(x => x.path)) })

    await prisma.file.deleteMany({
        where: {
            path: {
                in: Array.from(toDelete.map(x => x.path))
            }
        }
    })


    const newImages = images.filter(x => x?.id == null)

    if (newImages?.length > 0) {

        newImages?.forEach(file => {
            const formData = new FormData()
            formData.append("file", file)

            axios.post("https://cdn.sovietprojects.hu/upload/business", formData)
                .then(async res => {
                    const { uuid, filename } = res.data

                    await prisma.file.create({
                        data: {
                            path: filename,
                            product: {
                                connect: {
                                    id: id
                                }
                            }
                        }
                    })
                })
        })
    }

    return true
}

export const editProduct = withAuth(editProductHandler)