import Navbar from '@/components/Navbar'
import React from 'react'
import ListProducts from '../../../../components/ListProducts'
import getProducts from '@/lib/api/public/products/getProducts'

const page = async () => {
    const products = await getProducts()
    
    return (
        <>
            <Navbar />
            <ListProducts products={products}/>
        </>
    )
}

export default page