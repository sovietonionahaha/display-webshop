import getProducts from '@/lib/api/public/products/getProducts'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { MdOutlineImageNotSupported } from "react-icons/md";

const ListProducts = async ({ excludeId }) => {
    const products = await getProducts()

    if (products?.length == 0) return (
        <div className='w-full h-full flex items-center justify-center h-[320px] bg-(--color-secondary)'>
            <h1 className='text-2xl font-medium'>Ebben a kategóriában nincsenek termékek.</h1>
        </div>
    )

    return (
        <div className='grid max-lg:grid-cols-2 grid-cols-4 w-full gap-3 h-[320px]'>
            {products.filter(x => x.id !== excludeId)?.map(product => (
                <Link href={`/termek/${product.id}`} key={product.title} className='w-full h-full flex flex-col bg-(--color-secondary)/30 cursor-pointer'>
                    {product?.images[0]?.path ? (
                        <Image src={`https://cdn.sovietprojects.hu/get/business/${product.images[0]?.path}`} width={300} height={300} alt="" className='w-full object-cover h-3/4' />
                    ) : (
                        <div className='w-full h-3/4 flex items-center justify-center text-black/30 bg-white'>
                            <MdOutlineImageNotSupported size={50} />
                        </div>
                    )}
                    <div className='flex-1 flex-col p-4'>
                        <h1 className='text-2xl font-medium flex gap-1 items-center'>
                            {product.discountPrice.toLocaleString()} Ft
                        </h1>
                        <h2>{product.title}</h2>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ListProducts