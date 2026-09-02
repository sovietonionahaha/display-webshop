"use server"

import { withAuth } from "@/lib/action-utils"
import prisma from "@/lib/prisma"
import axios from "axios"

async function submitProductHandler(ctx, product) {
    const { title, price, description, categoryId, enabled, condition, files } = product

    const newProduct = await prisma.product.create({
        data: {
            title: title,
            price: Number(price),
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

    if (files?.length > 0) {

        files?.forEach(file => {
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
                                    id: newProduct.id
                                }
                            }
                        }
                    })
                })
        })
    }

    return true
}

export const submitProduct = withAuth(submitProductHandler)