import { siteConfig } from '@/config/site'
import getCategories from '@/lib/api/public/category/getCategories'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
  const categories = await getCategories()

  return (
    <div className='p-4 sticky top-0 flex w-full bg-(--color-third) text-white'>
      <div className='flex w-full justify-between'>
        <h1>valami gumis</h1>
        <div className='flex gap-2'>
          {categories?.filter(x => x.showInNavigation && x.parentId == null).map(category => (
            <Link key={category.uri} href={`/kategoriak/${category.uri}`}>{category.title}</Link>
          ))}
        </div>
        <div className='flex gap-2'>
          <h1>{siteConfig.company.email}</h1>
          <h1>{siteConfig.company.phone}</h1>
        </div>
      </div>
    </div>
  )
}

export default Navbar