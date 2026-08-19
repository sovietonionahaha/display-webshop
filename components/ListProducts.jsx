import getProducts from '@/lib/api/public/products/getProducts'
import React from 'react'

const ListProducts = async () => {
    const products = await getProducts()

    if (products?.length == 0) return (
        <div className='w-full h-full flex items-center justify-center h-[320px]'>
            <h1 className='text-2xl font-medium'>Ebben a kategóriában nincsenek termékek.</h1>
        </div>
    )

    return (
        <div className='grid max-lg:grid-cols-2 grid-cols-4 w-full gap-3 h-[320px]'>
            {products?.map(product => (
                <div className='w-full h-full flex flex-col'>
                    <img src="hero-bg.jpg" alt="" />
                    <div className='flex flex-col p-4'>
                        <h1 className='text-2xl'>{product.title}</h1>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListProducts