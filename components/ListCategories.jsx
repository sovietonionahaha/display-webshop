import getCategories from '@/lib/api/public/category/getCategories'
import Link from 'next/link'
import React from 'react'

const ListCategories = async () => {
  const categories = await getCategories()

  return (
    <div className='w-full grid grid-cols-6 gap-4'>
      {categories?.map(category => (
        <Link key={category.uri} href={`/kategoriak/${category.uri}`} className='border border-black/40 flex flex-col p-4'>
          <h1>{category.title}</h1>
        </Link>
      ))}
    </div>
  )
}

export default ListCategories