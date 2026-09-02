import Input from '@/components/Input'
import { getProduct } from '@/lib/api/private/products/getProduct'
import React from 'react'
import ProductDetails from './ProductDetails'
import Link from 'next/link'
import { IoIosArrowRoundBack } from "react-icons/io";
import { getCategories } from '@/lib/api/private/category/getCategories'

const page = async ({ params }) => {
  const { productId } = await params

  const product = await getProduct({ productId })
  const categories = await getCategories()

  return (
    <div className='w-full p-4 flex flex-col mt-8'>
      <span className='flex items-center gap-1 mb-4'>
        <IoIosArrowRoundBack size={20} />
        <Link className='text-sm text-black/80' href={"/admin/products"}>Vissza a termékekhez</Link>
      </span>
      <ProductDetails product={product} categories={categories}/>
    </div>
  )
}

export default page