import Navbar from '@/components/Navbar'
import React from 'react'
import ListProducts from '../../../../components/ListProducts'
import getProducts from '@/lib/api/public/products/getProducts'
import ListCategories from '@/components/ListCategories'
import Footer from '@/components/Footer'
import getCategory from '@/lib/api/public/category/getCategory'

const page = async ({ params }) => {

    const { categoryUri } = await params

    const products = await getProducts()

    const category = await getCategory(categoryUri)

    return (
        <>
            <Navbar />
            <div className="w-full max-w-4/6 mx-auto flex-1 flex-col mt-[64px]">
                <div className="flex flex-col w-full gap-8">
                    <h1 className="text-2xl font-medium">{category.title}</h1>
                    <ListCategories />
                </div>
                <div className="flex flex-col w-full mt-4">
                    <ListProducts />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page