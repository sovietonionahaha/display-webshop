import getProducts from '@/lib/api/public/products/getProducts'
import React from 'react'

const ListProducts = async () => {
    const products = await getProducts()

    if (products?.length == 0) return (
        <div className='w-full h-full flex items-center justify-center'>
            <h1 className='text-2xl font-medium'>Ebben a kategóriában nincsenek termékek.</h1>
        </div>
    )

    return (
        <div className='grid max-lg:grid-cols-2 grid-cols-6 w-full'>
            {products?.map(product => (
                <div>
                    {product.title}
                </div>
            ))}
        </div>
    )
}

export default ListProducts